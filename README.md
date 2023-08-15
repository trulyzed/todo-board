This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started
### Setting up the environments

You need to create a ```.env.local``` in the root directory. See ```.env``` file for example. Replace with your own values.

NEXTAUTH_SECRET - Generate a unique id. You can get a value by running ```$ openssl rand -base64 32```

GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET - Go to [Google developer console](https://console.cloud.google.com/apis/credentials) to get those values

GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET - Go to [GitHub settings](https://github.com/settings/apps) to get those values

### Running up the project

Install dependencies and run database migrations:
```bash
npm install
npm run migrate
```

And finally, start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Project Architecture

This project is using TypeScript

### Frontend

Technology: [NextJS](https://github.com/vercel/next.js), [Tailwind](https://github.com/tailwindlabs/tailwindcss)

### Backend

Technology: [NextJS](https://github.com/vercel/next.js), [Prisma](https://github.com/prisma/prisma)

### Authentication

Technology: [NextAuth](https://github.com/nextauthjs/next-auth)
