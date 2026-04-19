# Columbia Custom PCs

React and Tailwind frontend with an Express API and MariaDB-ready persistence for custom PC inventory and commission requests.

## Stack

- React 18 with Vite for the client UI
- Tailwind CSS for responsive styling and reusable utility classes
- Node.js and Express for API endpoints
- MariaDB for build inventory and commission request storage

## Local setup

1. Install dependencies:
   `npm install`
2. Copy `.env.example` to `.env` and set the MariaDB credentials.
3. Apply the schema:
   `mysql -u root -p < server/schema.sql`
4. Seed sample inventory:
   `mysql -u root -p < server/seed.sql`
5. Run the app:
   `npm run dev`

The Vite frontend runs on `http://localhost:5173` and proxies `/api/*` requests to the Express server on `http://localhost:4000`.

## API endpoints

- `GET /api/health`: service and database status
- `GET /api/builds`: active PC builds as JSON
- `POST /api/commissions`: store a commission request

If the database is unavailable, the frontend still renders sample inventory from a fallback data source so the site remains usable during development.
