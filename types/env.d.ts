/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    /**
     * Cal.com Enterprise Live API Key for scheduling discovery calls
     * Example: cal_live_your_api_key_here
     */
    readonly NEXT_PUBLIC_CAL_API_KEY: string;

    /**
     * Default Cal.com event link or username/event
     * Example: 'renalytica/30min'
     */
    readonly NEXT_PUBLIC_CAL_LINK?: string;

    /**
     * Supabase public project URL for browser and SSR clients
     */
    readonly NEXT_PUBLIC_SUPABASE_URL?: string;

    /**
     * Supabase public anonymous API key
     */
    readonly NEXT_PUBLIC_SUPABASE_ANON_KEY?: string;

    /**
     * Flutterwave public client key for inline payments
     */
    readonly NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY?: string;

    /**
     * Server-side Supabase Service Role secret key
     */
    readonly SUPABASE_SECRET_KEY?: string;

    /**
     * Server-side Flutterwave Secret Key
     */
    readonly FLUTTERWAVE_SECRET_KEY?: string;

    /**
     * Server-side Flutterwave Encryption Key
     */
    readonly FLUTTERWAVE_ENCRYPTION_KEY?: string;

    /**
     * Server-side Resend API key for transactional emails
     */
    readonly RESEND_API_KEY?: string;

    /**
     * Google Gemini API Key for synthesis and chat
     */
    readonly FIREBASE_GEMINI_API_KEY?: string;

    /**
     * Cloudflare R2 credentials
     */
    readonly CLOUDFLARE_ACCOUNT_ID?: string;
    readonly CLOUDFLARE_API_TOKEN?: string;
    readonly CLOUDFLARE_R2_ACCESS_KEY_ID?: string;
    readonly CLOUDFLARE_R2_SECRET_ACCESS_KEY?: string;
    readonly CLOUDFLARE_R2_S3_ENDPOINT?: string;

    /**
     * Current Node environment
     */
    readonly NODE_ENV: 'development' | 'production' | 'test';
  }
}
