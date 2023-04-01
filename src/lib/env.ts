if (!process.env.ACCOUNT_ID) throw new Error("Missing cloudflare account ID");
export const ACCOUNT_ID = process.env.ACCOUNT_ID;

if (!process.env.ACCOUNT_TOKEN)
  throw new Error("Missing cloudflare account token");
export const ACCOUNT_TOKEN = process.env.ACCOUNT_TOKEN;
