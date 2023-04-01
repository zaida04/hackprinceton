/**
 * POST
 * /api.cloudflare.com/client/v4/accounts/${account_id}/stream/live_inputs
 */

export type CreateCloudflareStream = {
  result: {
    uid: string;
    rtmps: Rtmps;
    created: Date;
    modified: Date;
    meta: {
      name: string;
    };
    status: null;
    recording: {
      mode: string;
      requireSignedURLs: boolean;
      allowedOrigins: null;
    };
  };
};

export type Rtmps = {
  url: string;
  streamKey: string;
};

/**
 * GET
 * api.cloudflare.com/client/v4/accounts/${account_id}/stream/live_inputs/${stream_uid}/videos
 */

export type GetCloudflareStream = {
  result: {
    uid: string;
    thumbnail: string;
    status: {
      state: string;
      errorReasonCode: string;
      errorReasonText: string;
    };
    meta: {
      name: string;
    };
    created: Date;
    modified: Date;
    size: number;
    preview: string;
    playback: {
      hls: string;
      dash: string;
    };
  }[];
};
