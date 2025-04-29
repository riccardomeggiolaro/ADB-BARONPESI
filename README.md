# 🚀 NestJS Project Structure

This project is built using NestJS, a progressive Node.js framework for building efficient and scalable server-side applications.

## 📁 Project Structure

```
.
├── app.controller.ts
├── app.module.ts
├── app.service.ts
├── config/
│   ├── config.module.ts
│   ├── database/
│   │   └── database.module.ts
│   ├── env.configuration.ts
│   └── env.validation.ts
├── core/
│   ├── constants/
│   │   └── index.ts
│   └── enums/
│       └── index.ts
├── main.ts
├── modules/
└── shared/
    ├── decorators/
    ├── exception-filters/
    ├── guards/
    ├── interceptors/
    ├── middleware/
    ├── pipes/
    ├── presenter/
    ├── utils/
    └── validators/
```

### 🔑 Key Components

- `app.controller.ts`, `app.module.ts`, `app.service.ts`: Main application files
- `config/`: Configuration-related modules and files
- `core/`: Core application constants and enums
- `main.ts`: Application entry point
- `modules/`: Feature modules (currently empty, ready for future development)
- `shared/`: Shared components, utilities, and helpers

## ⚙️ Configuration

The project uses a configuration module for managing environment variables and database connections.

## 📚 API Documentation

Swagger is set up for API documentation. Access it at `/api/swagger` when the application is running.

## 💻 Development

### Prerequisites

- Node.js
- pnpm (Package manager)

### 🛠️ Installation

```bash
pnpm install
```

### 🏃‍♂️ Running the app

```bash
# development
pnpm run start

# watch mode
pnpm run start:dev

# production mode
pnpm run start:prod
```

### 📬 Generate Postman Collection

```bash
pnpm run generate:postman
```

## ✨ Features

- 🗜️ Compression for optimized responses
- 🛡️ Helmet for security
- 🌐 CORS enabled
- ✅ Global validation pipe
- 📖 Swagger for API documentation
- 📄 OpenAPI spec generation

## 🔧 TypeScript Configuration

The project uses TypeScript with path aliases for easier imports. Check `tsconfig.json` for details.

## 🤝 Contributing

Please read our contributing guidelines (link to CONTRIBUTING.md if available) before submitting pull requests.

## 📄 License

[MIT License](LICENSE) (Add this file if not present)

# .env

# Environment Configuration Template

# Application environment: can be 'development', 'production', or 'test'
NODE_ENV=development

# Server port
PORT=3000

# MySQL database configuration
DATABASE_URL="mysql://baronpesi:MCu-xxQHI)CjP75x@10.0.6.105:3306/ADB-BARONPESI"

# JWT configuration
JWT_SECRET="iuwriregiergwengiwgnwrioegoixrbgrib"                # Secret key for signing JWTs (keep secure in production)
JWT_EXPIRATION_TIME=7d                      # JWT token expiration time, e.g., '7d', '24h'

# Email service configuration - use a test email provider like Mailtrap or replace with production SMTP settings
EMAIL_HOST=smtp.gmail.com                      # SMTP host, e.g., 'smtp.mailtrap.io' for Mailtrap
EMAIL_USER=baronpesi.it@gmail.com                      # SMTP username
EMAIL_PASS=qyuc wryv iphi igsg                       # SMTP password
EMAIL_FROM=baronpesi.it@gmail.com             # Default "from" email address, e.g., 'noreply@example.com'

# Internationalization (i18n) configuration
I18N_FALLBACK=en                            # Fallback language if a translation is missing (ISO 639-1)

# Web application configuration
APP_BASEURL=https://www.example.com          # Replace with your app's base URL