`hackprinceton-practice-repo`

## Overview

Idea name options: `ClassCast`, `StudentCast`, `StuTube`, `EduStream`, etc?

Description: Platform that enables students to have paid entrance livestreams for their fellow classmates for college/high school courses.

Potential markets: College courses (per-college basis), AP classes, High school courses (per-HS basis).

Stack: `TypeScript`, `Next.JS`, `React`  
Providers: `Cloudflare`, `Vercel`

## How does this work?

This demo has two pages, `/` and `/streams/:id`. The first one is meant to be the page where a creator can create their live stream. The second one is meant to be the page where a viewer can view the stream.

### Page - `/`

****Phase 1 - Creating the stream****
When you click the "Create Stream" button, the first thing that happens is the react client makes a `POST` request to the Next.JS API route `/api/create-stream`. This makes a request to Cloudflare's API to make the stream. Do note, no content is being broadcasted yet. The API then returns the url and token we can use for broadcasting.

****Phase 2 - Broadcasting to the stream****
Now that we have a created stream, we need to broadcast to it. Using [`OBS`](https://obsproject.com/), we set the [_RTMP url and token_](https://www.youtube.com/watch?v=EygAwWRN_G0). Once we have that, we just click "Start Streaming" and viola, your stream has started.

****Phase 3 - Watching the stream****
Now, all you have to do is distribute the viewing URL to your viewers (`http://domain-or-localhost/streams/:stream_id) and now people can see your live stream.

## What next?

- [ ] OAuth login and email/pass support
- [ ] User flow for associating a user with a university (use their sign up email and map it to the college they go to)
- [ ] Home page with scheduled/current streams
- [ ] Dashboard for creators to see their scheduled streams (add stuff like being able to cancel a stream and etc).
- [ ] Fake checkout page for viewers that simulates buying access to the stream
