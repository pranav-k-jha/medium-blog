# Medium Clone Project

This project is a clone of the Medium platform, built using modern technologies including React, Cloudflare Workers, Zod for validation, TypeScript, Prisma with connection pooling, Postgres, and JWT for authentication (Cookies approach).

## Getting Started

### Setup Backend

1. Create a new folder named `medium`.
2. Initialize a Cloudflare Worker app using Hono targeting the backend directory:
   - Template: cloudflare-workers
   - Install project dependencies: yes
   - Package manager: npm
3. For detailed instructions, refer to [Hono's documentation](https://hono.dev/top).

### Initialize Handlers

Set up handlers for the following routes:
- POST `/api/v1/signup`
- POST `/api/v1/signin`
- POST `/api/v1/blog`
- PUT `/api/v1/blog`
- GET `/api/v1/blog/:id`

Refer to [Hono's API routing documentation](https://hono.dev/api/routing) for more details.

### Set up Database (Prisma)

1. Obtain the connection URL from `neon.db` or `aieven.tech`.
2. Get the connection pool URL from Prisma Accelerate.
   - Visit [Prisma Accelerate](https://www.prisma.io/data-platform/accelerate).
3. Initialize Prisma in your project:
   - Replace `DATABASE_URL` in `.env`.
   - Add `DATABASE_URL` as the connection pool URL in `wrangler.toml`.
   - Ensure sensitive URLs are not committed to GitHub.
4. Initialize the schema and migrate your database.
5. Generate the Prisma client and add the Accelerate extension.

### Implement Routes

1. Implement a signup route with data insertion and error handling.
2. Add JWT functionality to the signup route.
3. Create a signin route for user authentication.

### Middlewares

1. Create middleware to extract user IDs and pass them to route handlers.
2. Test authenticated routes using Postman.

### Blog Routes and Better Routing

1. Group routes for better file structure.
   - Create `routes/user.ts` and `routes/blog.ts`.
2. Implement routes for blog creation, update, and retrieval.

### Types and Context

1. Set up environment variables like `JWT_SECRET` and `DATABASE_URL`.
2. Use TypeScript for context variables and Prisma integration.

### Deployment

Deploy your Cloudflare Worker app and test the production URL using Postman.

## Folder Structure

- `backend/`: Contains the Cloudflare Worker backend code.
- `frontend/`: Contains the React frontend code.
- `common/`: Contains shared code and types used by both frontend and backend.

## Usage

1. Clone the repository.
2. Navigate to the respective directories (`backend/`, `frontend/`, `common/`) and follow the setup instructions in the README files.
3. Start the backend server and frontend development server.
4. Test the application using Postman and in the browser.

## License

This project is licensed under the [MIT License](LICENSE).
