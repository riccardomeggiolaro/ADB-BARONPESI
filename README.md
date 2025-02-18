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