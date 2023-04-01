if (!process.env.NEXT_PUBLIC_ACCOUNT_ID) throw new Error("Missing cloudflare account ID");
export const NEXT_PUBLIC_ACCOUNT_ID = process.env.NEXT_PUBLIC_ACCOUNT_ID;

if (!process.env.NEXT_PUBLIC_ACCOUNT_TOKEN)
  throw new Error("Missing cloudflare account token");
export const NEXT_PUBLIC_ACCOUNT_TOKEN = process.env.NEXT_PUBLIC_ACCOUNT_TOKEN;
