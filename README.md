# Social Media Robot - MVP

This is the MVP of the Social Media Robot, a powerful tool to automate your social media posting. This version focuses on providing a core set of features to get you started with automating your Twitter posts.

## Getting Started

To get started, you'll need to have Docker and Docker Compose installed.

1.  Clone the repository.
2.  Create a `.env` file in the `backend` directory and fill in the required environment variables. You can use the `.env.example` file as a template.
3.  Run `docker-compose up` to start the application.

The application will be available at `http://localhost:3000`.

## API Documentation

### Authentication

*   `POST /api/v1/auth/register` - Register a new user.
*   `POST /api/v1/auth/login` - Log in and get a JWT.

### Billing

*   `POST /api/v1/billing/create-checkout-session` - Create a new Stripe checkout session.
*   `POST /api/v1/billing/webhook` - Handle Stripe webhooks.

### Posts

*   `POST /api/v1/posts/create` - Create a new post draft.
*   `POST /api/v1/posts/publish/:id` - Publish a post to Twitter.
*   `GET /api/v1/posts` - Get all posts for a user.

### Social

*   `POST /api/v1/social/twitter/post` - Post to Twitter.
