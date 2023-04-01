import { Rtmps } from "./cloudflare";

// so next.js knows to parse our http request data as JSON
const headers = {
  "content-type": "application/json",
};

// respones from our /api/create-stream route
export interface CreateStream {
  id: string;
  createdAt: Date;
  connectionInfo: Rtmps;
  name: string;
}

// make request to /api/create-stream
export const createStreamHTTP = async (name: string) => {
  const request = await fetch("/api/create-stream", {
    method: "POST",
    headers,
    body: JSON.stringify({ name }),
  });

  const body = (await request.json()) as CreateStream;
  return body;
};

// response from our /api/streams/${id} route
export interface GetStream {
  videoId: string | null;
  name: string | null;
}

// make request to /api/streams/${id}
export const getStreamHTTP = async (stream_id: string) => {
  const request = await fetch(`/api/streams/${stream_id}`, {
    headers,
    method: "GET",
  });
  const body = (await request.json()) as GetStream;

  return body;
};
