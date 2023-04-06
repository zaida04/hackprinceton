# `edulive`

> Update: 🏆 Education track at [HackPrinceton](https://www.hackprinceton.com/)
Built in **under** 32 hours.

## Overview

Idea name options: `ClassCast`, `StudentCast`, `StuTube`, `EduStream`, etc?

Description: Platform that enables students to have paid entrance college-level localized livestreams for their fellow classmates for college. Exploring opportunity for potential localized tutoring.

Potential markets: College local courses (per-college basis) or High school local courses.

Stack: `TypeScript`, `Next.JS`, `React`  
Providers: `Cloudflare`, `Vercel`

### Page - `/create`

**Phase 1 - Creating the stream**  
When you click the "Create Stream" button, the first thing that happens is the react client makes a `POST` request to Cloudflare's API to make the stream. Do note, no content is being broadcasted yet. The API then returns the url and token we can use for broadcasting.

**Phase 2 - Broadcasting to the stream**  
Now that we have a created stream, we need to broadcast to it. Using [`OBS`](https://obsproject.com/), we set the [_RTMP url and token_](https://www.youtube.com/watch?v=EygAwWRN_G0). Once we have that, we just click "Start Streaming" and viola, your stream has started.

**Phase 3 - Watching the stream**  
Now, all you have to do is distribute the viewing URL to your viewers (`http://domain-or-localhost/streams/:stream_id) and now people can see your live stream.

## What next?

- [x] OAuth login and email/pass support
- [x] User flow for associating a user with a university (use their sign up email and map it to the college they go to)
- [x] Home page with scheduled/current streams
- [ ] Dashboard for creators to see their scheduled streams (add stuff like being able to cancel a stream and etc).
- [x] Fake checkout page for viewers that simulates buying access to the stream
- [x] User view for streams

## Team Members

- Nico: backend & frontend
- Mudassir: backend & frontend
- Ellis: frontend
- Ishita: frontend
