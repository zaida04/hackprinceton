import { CreateCloudflareStream, GetCloudflareStream } from "./cloudflare";
import { ACCOUNT_ID, ACCOUNT_TOKEN } from "./env";

export const cloudflareHeaders = {
  Authorization: "Bearer " + ACCOUNT_TOKEN,
};

const getCloudflareStream = (account_id: string, stream_uid: string) =>
  `https://api.cloudflare.com/client/v4/accounts/${account_id}/stream/live_inputs/${stream_uid}/videos`;

// get stream from cloudflare
export const getCloudflareStreamHTTP = async (stream_uid: string) => {
  const httpReq = await fetch(getCloudflareStream(ACCOUNT_ID, stream_uid), {
    headers: cloudflareHeaders,
    method: "GET",
  });

  const response = (await httpReq.json()) as GetCloudflareStream;
  return response.result;
};

const cloudflareCreateStreamUrl = (account_id: string) =>
  `https://api.cloudflare.com/client/v4/accounts/${account_id}/stream/live_inputs`;

// create stream from cloudflare
export const createCloudflareStreamHTTP = async (name: string) => {
  const httpReq = await fetch(cloudflareCreateStreamUrl(ACCOUNT_ID), {
    headers: cloudflareHeaders,
    body: JSON.stringify({
      name,
      // this will automatically start the livestream.
      // mode: "automatic",
    }),
    method: "POST",
  });

  const response = (await httpReq.json()) as CreateCloudflareStream;
  return response.result;
};
