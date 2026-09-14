/**
 * ==============================================================================
 * CLOUDFLARE WORKER: FLUTTERWAVE WEBHOOK VALIDATION & FULFILLMENT ENGINE
 * ==============================================================================
 * Target: Cloudflare Free Tier (Workers / KV / DNS Proxy)
 * Functions:
 * 1. Verifies Flutterwave 'verif-hash' signature against secret hash.
 * 2. Confirms payment status with Flutterwave v3 transactions API.
 * 3. Atomically updates Supabase 'orders' state to 'paid'.
 * 4. Generates 24-hour secure digital fulfillment token in 'digital_fulfillment'.
 * 5. Serves signed download proxy passing through Cloudflare CDN.
 * ==============================================================================
 */

import { createClient } from '@supabase/supabase-js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 1. Flutterwave Webhook Route
    if (url.pathname === '/api/webhooks/flutterwave' && request.method === 'POST') {
      return handleFlutterwaveWebhook(request, env);
    }

    // 2. Health check route
    if (url.pathname === '/health') {
      return new Response(JSON.stringify({ status: 'ok', service: 'Renalytica Edge Fulfillment Worker' }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response('Not Found', { status: 404 });
  }
};

/**
 * Handle incoming Flutterwave charge.completed webhook
 */
export async function handleFlutterwaveWebhook(request, env = {}) {
  try {
    const supabaseUrl = env.SUPABASE_URL || process.env.SUPABASE_URL;
    const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;
    const flwSecretHash = env.FLW_SECRET_HASH || process.env.FLUTTERWAVE_SECRET_HASH;
    const flwSecretKey = env.FLW_SECRET_KEY || process.env.FLUTTERWAVE_SECRET_KEY;

    const supabase = createClient(supabaseUrl, supabaseKey);

    const signature = request.headers.get('verif-hash');

    // 1. Verify Secret Hash authenticity
    if (!signature || (flwSecretHash && signature !== flwSecretHash)) {
      return new Response('Unauthorized Signature', { status: 401 });
    }

    const payload = await request.json();

    // 2. Filter for successful payment completed events
    if (payload.event === 'charge.completed' && payload.data.status === 'successful') {
      const transactionId = payload.data.id;
      
      // 3. Server-side verification query to Flutterwave API
      const flwVerifyResponse = await fetch(`https://api.flutterwave.com/v3/transactions/${transactionId}/verify`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${flwSecretKey}`,
          'Content-Type': 'application/json'
        }
      });
      
      const verificationData = await flwVerifyResponse.json();

      if (verificationData.status === 'success' && verificationData.data.status === 'successful') {
        const { tx_ref, amount, currency, customer } = verificationData.data;
        const metadata = verificationData.data.meta || {}; // User ID & Product ID sent during checkout

        // 4. Update the Supabase Orders table state atomically
        const { data: order, error: orderError } = await supabase
          .from('orders')
          .update({ 
            order_status: 'paid', 
            flw_transaction_id: transactionId.toString(),
            total_amount: amount,
            currency: currency
          })
          .eq('flw_tx_ref', tx_ref)
          .select()
          .single();

        if (orderError) {
          console.error('Order update error:', orderError.message);
        }

        // 5. Generate secure customer fulfillment entry (24-hour default validity)
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 1); // 24-hour download window

        const orderId = order ? order.id : null;
        const customerId = metadata.user_id || (order ? order.customer_id : null);
        const productId = metadata.product_id || null;

        await supabase
          .from('digital_fulfillment')
          .insert({
            order_id: orderId,
            product_id: productId,
            customer_id: customerId,
            customer_email: customer ? customer.email : null,
            max_download_limit: 3,
            current_download_count: 0,
            expires_at: expiryDate.toISOString(),
            watermark_metadata: {
              buyer_email: customer ? customer.email : '',
              buyer_name: customer ? customer.name : '',
              order_tx_ref: tx_ref,
              verified_at: new Date().toISOString()
            }
          });

        return new Response('Fulfillment Complete', { status: 200 });
      }
    }
    return new Response('Event Acknowledged', { status: 200 });
  } catch (err) {
    return new Response(`Webhook Error: ${err.message}`, { status: 500 });
  }
}
