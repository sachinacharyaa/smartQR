# smartQR

Production-ready monorepo for a modern QR platform.

## Structure
- `frontend` - React (Vite) UI
- `backend` - Node.js (Express) API

## Local Setup
1. Backend
   - `cd backend`
   - `npm install`
   - Copy `.env.example` to `.env` and set `MONGODB_URI`
   - `npm run dev`

2. Frontend
   - `cd frontend`
   - `npm install`
   - Copy `.env.example` to `.env` and set `VITE_API_URL`
   - `npm run dev`

## Vercel Deployment (two projects)
1. Backend project
   - Root directory: `backend`
   - Build command: `npm install` (Vercel default)
   - Output: uses `backend/vercel.json`
   - Environment variables:
     - `MONGODB_URI` (Mongo connection string)
     - `FRONTEND_ORIGIN` (comma-separated list, e.g. `https://smartqr.vercel.app`)

2. Frontend project
   - Root directory: `frontend`
   - Framework: Vite
   - Environment variables:
     - `VITE_API_URL` set to your backend URL (e.g. `https://smartqr-api.vercel.app/api`)

## Notes
- Keep the MongoDB connection string out of source control.
- The frontend gracefully handles missing backend, but analytics and save flow work best when the API is running.
