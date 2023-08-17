This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started
### Setting up the environments
***

You need to create a ```.env.local``` in the root directory. See ```.env``` file for example. Replace with your own values.

NEXTAUTH_SECRET - Generate a unique id. You can get a value by running ```$ openssl rand -base64 32```

GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET - Go to [Google developer console](https://console.cloud.google.com/apis/credentials) to get those values

GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET - Go to [GitHub settings](https://github.com/settings/apps) to get those values

### Running up the project
***

Install dependencies and run database migrations:
```bash
npm install
npm run migrate
```

And finally, start the development server:
```bash
npm run dev
```

An optimized build version can also be run on the development server:
```bash
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Project Architecture

This project is using TypeScript

#### Frontend

Technology: [NextJS](https://github.com/vercel/next.js), [Tailwind](https://github.com/tailwindlabs/tailwindcss)

#### Backend

Technology: [NextJS](https://github.com/vercel/next.js), [Prisma](https://github.com/prisma/prisma), [SQLite](https://www.sqlite.org/index.html)

#### Authentication

Technology: [NextAuth](https://github.com/nextauthjs/next-auth)

***

This is a NextJS application. This is using server side rendering technology to handle requests from client (in the frontend) and then returning corresponding responses. The database used here is **SQLite**. But other database technologies can be configured easily. The ORM used here is **Prisma**. And for authentication **NextAuth** is used. There is a convenient adapter in **NextAuth** for Prisma. It basically enables authenticated user data to be automatically stored in the database using Prisma.

Folder structure

```
|-- .husky/ (for git commit hook)
|-- prisma/
|   |-- migrations (migrations, db and schema files are here)
|-- public/ (public folder for client side necessities)
|   
|-- src/
|   |-- app/
|   |   |-- api/ (contains all the business logic of api, basically the backend folder!)
|   |   |-- about.js
|   |   |-- contact.js
|   |-- components/ (reusable react components)
|   |-- context/ (react context)
|   |-- data/ (contains database seeding data)
|   |-- hooks/ (react hooks)
|   |-- lib/
|       |-- api/ (api client)
|       |-- auth/ (authentication config)
|       |-- database/ (ORM config files)
|       |-- utils/ (utility functions)
|   |-- queries/ (all the queries by API client lives here)
|-- .env (example environment variable file)
|-- package.json
|-- README.md
|-- next.config.js
```