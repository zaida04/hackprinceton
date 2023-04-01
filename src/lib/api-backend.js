import { ACCOUNT_ID, NEXT_PUBLIC_ACCOUNT_ID, NEXT_PUBLIC_ACCOUNT_TOKEN } from "./env";

export const cloudflareHeaders = {
  Authorization: "Bearer " + NEXT_PUBLIC_ACCOUNT_TOKEN,
};

const getCloudflareStream = (account_id, stream_uid) =>
  `https://api.cloudflare.com/client/v4/accounts/${account_id}/stream/live_inputs/${stream_uid}/videos`;

// get stream from cloudflare
export const getCloudflareStreamHTTP = async (stream_uid) => {
  const httpReq = await fetch(getCloudflareStream(ACCOUNT_ID, stream_uid), {
    headers: cloudflareHeaders,
    method: "GET",
  });

  const response = (await httpReq.json());
  return response.result;
};

const cloudflareCreateStreamUrl = (account_id) =>
  `https://api.cloudflare.com/client/v4/accounts/${account_id}/stream/live_inputs`;

// create stream from cloudflare
export const createCloudflareStreamHTTP = async (name) => {
  const httpReq = await fetch(cloudflareCreateStreamUrl(NEXT_PUBLIC_ACCOUNT_ID), {
    headers: cloudflareHeaders,
    body: JSON.stringify({
      name,
      // this will automatically start the livestream.
      // mode: "automatic",
    }),
    method: "POST",
  });

  const response = (await httpReq.json());
  return response.result;
};
