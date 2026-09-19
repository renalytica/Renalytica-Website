/**
 * ==============================================================================
 * RENALYTICA SUPABASE INACTIVITY KEEP-ALIVE RUNNER (scripts/supabase-keep-alive.js)
 * ==============================================================================
 * Prevents Supabase free-tier project (coxgmruxamzcojgpaawh) from auto-pausing
 * after 7 days of inactivity.
 *
 * Can be run manually, via node server startup, or automated via GitHub Actions cron.
 * ==============================================================================
 */

const https = require('https');

const SUPABASE_PROJECT_ID = process.env.SUPABASE_PROJECT_ID || 'coxgmruxamzcojgpaawh';
const SUPABASE_URL = process.env.SUPABASE_URL || `https://${SUPABASE_PROJECT_ID}.supabase.co`;
const SUPABASE_KEY = (process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || 'sb_publishable_A_tIjsdMQDkBo-1XNfkghw_Oq0n0yvF3').replace(/\s+/g, '');

const endpoints = [
  { name: 'Auth Health Check', path: '/auth/v1/health' },
  { name: 'REST v1 Root', path: '/rest/v1/' }
];

function pingEndpoint(endpoint) {
  return new Promise((resolve) => {
    try {
      const url = new URL(endpoint.path, SUPABASE_URL);
      const options = {
        method: 'GET',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'User-Agent': 'Renalytica-KeepAlive/2.0'
        },
        timeout: 10000
      };

      const req = https.request(url, options, (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
          resolve({
            name: endpoint.name,
            url: url.href,
            status: res.statusCode,
            ok: res.statusCode >= 200 && res.statusCode < 400
          });
        });
      });

      req.on('error', (err) => {
        resolve({
          name: endpoint.name,
          url: url.href,
          status: err.code || 'ERR',
          ok: false,
          error: err.message
        });
      });

      req.on('timeout', () => {
        req.destroy();
        resolve({
          name: endpoint.name,
          url: url.href,
          status: 'TIMEOUT',
          ok: false
        });
      });

      req.end();
    } catch (err) {
      resolve({
        name: endpoint.name,
        url: endpoint.path,
        status: 'EXCEPTION',
        ok: false,
        error: err.message
      });
    }
  });
}

async function runKeepAlive() {
  console.log(`[Renalytica Keep-Alive] Initiating heartbeat for Supabase project: ${SUPABASE_PROJECT_ID}`);
  console.log(`[Renalytica Keep-Alive] Target Base URL: ${SUPABASE_URL}`);
  console.log(`[Renalytica Keep-Alive] Timestamp: ${new Date().toISOString()}`);

  try {
    const results = await Promise.all(endpoints.map(pingEndpoint));

    let anySuccess = false;
    results.forEach((r) => {
      console.log(` -> [${r.name}] ${r.url} => Status: ${r.status} (${r.ok ? 'SUCCESS' : 'NOTICE'})${r.error ? ' - ' + r.error : ''}`);
      if (r.ok || r.status === 200 || r.status === 401 || r.status === 404 || r.status === 400) {
        // Any HTTP response from the Supabase edge gateway means compute is responsive!
        anySuccess = true;
      }
    });

    if (anySuccess) {
      console.log('✔ [Renalytica Keep-Alive] Heartbeat acknowledged. Supabase project activity registered.');
    } else {
      console.warn('⚠️ [Renalytica Keep-Alive] Note: Remote host did not return 2xx-4xx, check connection.');
    }

    return anySuccess;
  } catch (e) {
    console.error('[Renalytica Keep-Alive] Error running keep-alive:', e.message);
    return false;
  }
}

if (require.main === module) {
  runKeepAlive().then((ok) => {
    process.exit(0);
  });
}

module.exports = { runKeepAlive };
