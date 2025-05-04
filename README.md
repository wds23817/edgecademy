# CSV Uploader to MongoDB (Next.js + Docker)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

It provides a full-stack CSV upload solution:  
📤 Upload `.csv` → 🔎 Parse → 🧩 API → 💾 Store in Docker-based MongoDB

---

## 🛠️ Tech Stack

- **Frontend**: Next.js (App Router, TypeScript, React)
- **Backend**: API routes (`pages/api/upload-csv.ts`)
- **Database**: MongoDB (Docker container)
- **Styling**: styled-components
- **CSV Parsing**: papaparse (client) & `csv-parse/sync` (server)

---

## 🚀 Getting Started

Install dependencies:

````bash
npm install
# or
yarn install
```

```Start MongoDB using Docker:
docker run -d \
  --name mongodb \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=secret \
  mongo
```

```Create a .env.local file in the project root:
MONGODB_URI=mongodb://admin:secret@localhost:27017/edgecademydb?authSource=admin
MONGODB_DB=edgecademydb
```

```Start the development server:
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
````

Open http://localhost:3000 in your browser to see the app.
