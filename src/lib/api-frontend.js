// so next.js knows to parse our http request data as JSON
const headers = {
  "content-type": "application/json",
};


// make request to /api/create-stream
export const createStreamHTTP = async ({ state }) => {
  const request = await fetch("/api/create-stream", {
    method: "POST",
    headers,
    body: JSON.stringify({ ...state }),
  });

  const body = (await request.json());
  return body;
};

// make request to /api/streams/${id}
export const getStreamHTTP = async (stream_id) => {
  const request = await fetch(`/api/streams/${stream_id}`, {
    headers,
    method: "GET",
  });
  const body = (await request.json());

  return body;
};
