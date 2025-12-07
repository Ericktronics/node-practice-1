# Node Practice 1

A RESTful API built with Node.js, Express, TypeScript, and MySQL. Features user authentication with JWT tokens, password hashing with bcrypt, and comprehensive logging with Winston.

## Features

- 🔐 **JWT Authentication** - Secure token-based authentication
- 🔒 **Password Hashing** - Bcrypt with 11 salt rounds
- 📝 **Winston Logging** - Comprehensive application logging
- 🗄️ **MySQL Database** - Relational database with connection pooling
- 🐳 **Docker Support** - Containerized application with Docker Compose
- 📦 **TypeScript** - Type-safe development
- 🛡️ **Request Logging** - HTTP request/response logging middleware
- 🔄 **Token Refresh** - JWT token refresh mechanism

## Tech Stack

- **Runtime**: Node.js 18
- **Framework**: Express 5.2
- **Language**: TypeScript 5.9
- **Database**: MySQL 8.0
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcrypt
- **Logging**: Winston
- **Containerization**: Docker & Docker Compose

## Prerequisites

- Node.js 18 or higher
- npm or yarn
- MySQL 8.0 (or use Docker)
- Docker & Docker Compose (optional)

## Installation

### Using npm

1. Clone the repository:
```bash
git clone <repository-url>
cd node-practice-1
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the `src/` directory:
```env
DB_HOST=localhost
DB_USER=user
DB_PASS=password
DB_PORT=3306
DB_DATABASE=node-practice-1
PORT=3000
JWT_SECRET=your-secret-key-change-in-production
LOG_LEVEL=debug
```

4. Set up the database:
```bash
mysql -u root -p < scripts/db_dump.sql
```

5. Build the project:
```bash
npm run build
```

6. Start the server:
```bash
npm start
```

For development with hot reload:
```bash
npm run dev
```

### Using Docker

1. Build and start containers:
```bash
docker-compose up -d
```

2. The application will be available at `http://localhost:3000`

## Project Structure

```
node-practice-1/
├── src/
│   │   ├── dbConnect.ts # Database connection
│   │   ├── env.ts       # Environment variables
│   │   └── logger.ts    # Winston logger setup
│   ├── controllers/     # Request handlers
│   │   ├── auth.controller.ts
│   │   └── user.controller.ts
│   ├── middlewares/     # Express middlewares
│   │   ├── auth.ts           # JWT authentication
│   │   ├── refreshToken.ts   # Token refresh
│   │   └── requestLogger.ts  # Request logging
│   ├── routes/          # API routes
│   │   ├── auth.route.ts
│   │   └── user.route.ts
│   ├── services/        # Business logic
│   │   ├── auth.service.ts
│   │   └── user.service.ts
│   ├── types/           # TypeScript types
│   │   ├── express.d.ts # Express type extensions
│   │   └── user.type.ts
│   ├── utils/           # Utility functions
│   │   └── password.ts  # Password hashing utilities
│   ├── app.ts           # Express app setup
│   └── server.ts        # Server entry point
├── scripts/
│   └── db_dump.sql      # Database schema
├── dist/                # Compiled JavaScript
├── logs/                # Log files (gitignored)
├── docker-compose.yml
├── Dockerfile
└── package.json
```

### Health Check

#### GET `/healthCheck`
Check if the server is running.

**Response:**
```
13 is alive and well!
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_HOST` | MySQL host | `localhost` |
| `DB_USER` | MySQL username | `user` |
| `DB_PASS` | MySQL password | `password` |
| `DB_PORT` | MySQL port | `3306` |
| `DB_DATABASE` | Database name | `node-practice-1` |
| `PORT` | Server port | `3000` |
| `JWT_SECRET` | JWT secret key | `default_secret` |
| `LOG_LEVEL` | Logging level (error, warn, info, debug) | `info` (prod) / `debug` (dev) |
| `LOG_TO_FILE` | Enable file logging | `false` |
| `NODE_ENV` | Environment (development/production) | `development` |

## Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start the production server
- `npm run dev` - Start development server with hot reload
- `npm run typecheck` - Type check without compiling

## Logging

The application uses Winston for logging. Logs are output to:
- **Console**: Colored output in all environments
- **Files** (production or when `LOG_TO_FILE=true`):
  - `logs/combined.log` - All logs
  - `logs/error.log` - Error logs only
  - `logs/exceptions.log` - Uncaught exceptions
  - `logs/rejections.log` - Unhandled promise rejections

## Security Features

- ✅ Password hashing with bcrypt (11 salt rounds)
- ✅ JWT token-based authentication
- ✅ Token refresh mechanism
- ✅ Request logging for audit trails
- ✅ Environment variable configuration
- ✅ SQL injection protection (parameterized queries)

## Database Schema

The main table structure:

```sql
tbuser_main
├── id (INT UNSIGNED, AUTO_INCREMENT, PRIMARY KEY)
├── first_name (VARCHAR(100))
├── last_name (VARCHAR(100))
├── email (VARCHAR(255), UNIQUE)
├── password_hash (VARCHAR(255))
├── is_active (TINYINT(1), DEFAULT 1)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

## Development

### Type Checking
```bash
npm run typecheck
```

### Building
```bash
npm run build
```

### Running Tests
(Add test commands when tests are implemented)

## Docker

### Build and Run
```bash
docker-compose up -d
```

### View Logs
```bash
docker-compose logs -f app
```

### Stop Containers
```bash
docker-compose down
```

### Rebuild After Changes
```bash
docker-compose up -d --build
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

