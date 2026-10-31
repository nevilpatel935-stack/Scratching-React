# Movie API

Displays popular movies from The Movie Database (TMDB).

## Setup

1. Copy `.env.example` to `.env.local`.
2. Set `VITE_TMDB_ACCESS_TOKEN` to your TMDB API Read Access Token (not the shorter API key).
3. Restart the Vite dev server, then run `npm run dev`.

The token is used in the browser to call TMDB's popular-movies endpoint. Vite exposes `VITE_` variables to client code, so use a read-only token and do not commit `.env.local`.
