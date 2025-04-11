# Next.js Project Setup

This guide will help you get started with running this Next.js project locally.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (version 18.17.0 or later)
- npm (Node Package Manager) or yarn
- Git (for version control)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/AFK247/invoice-dashboard
cd invoice-dashboard
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

## Environment Variables

Create a `.env` file in the root directory and add your environment variables:

```plaintext
NEXT_PUBLIC_QUICK_BOOK_CLIENT_ID="your client ID"
QUICK_BOOK_CLIENT_SECRET="your client secret"
NEXT_PUBLIC_QUICK_BOOK_REDIRECT_URI="http://localhost:3000/api/auth/callback"
NEXT_PUBLIC_QUICK_BOOK_SCOPES="com.intuit.quickbooks.accounting"

NEXT_PUBLIC_BASE_URL="http://localhost:3000"
NEXT_PUBLIC_API_BASE_URL="http://localhost:5000"
```

## Running the Project

### Development Mode

To run the project in development mode with hot-reload:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`

### Production Build

To create a production build:

```bash
npm run build
# or
yarn build
```

To start the production server:

```bash
npm run start
# or
yarn start
```
