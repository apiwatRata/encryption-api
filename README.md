# Encrypt Service

A NestJS-based encryption service application built with TypeScript.

## Description

This is an encryption service API that provides endpoints for encrypting and decrypting data. The service is built using the NestJS framework and includes comprehensive API documentation via Swagger.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (comes with Node.js)

### Installation

Install the required packages:

```bash
npm install
```

### Running the Application

Start the development server:

```bash
npm run start
```

The application will start and be available at `http://localhost:3000`

### API Documentation

Once the application is running, you can access the Swagger API documentation at:

```
http://localhost:3000/api-docs
```

This provides an interactive interface where you can view all available endpoints and test the API directly.

## Testing

### Run Unit Tests

Execute the unit tests:

```bash
npm run test
```

## Project Structure

```
src/
├── app.controller.ts       # Main controller
├── app.service.ts          # Main service
├── app.module.ts           # Application module
├── main.ts                 # Application entry point
├── configs/                # Configuration files
└── dto/                    # Data Transfer Objects
    ├── encrypt-data.dto.ts
    ├── decrypt-data.dto.ts
    └── response.dto.ts
test/                       # Test files
```

## Available Scripts

- `npm run start` - Start the application in development mode
- `npm run start:dev` - Start the application in watch mode
- `npm run start:prod` - Start the application in production mode
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run end-to-end tests
- `npm run test:cov` - Run tests with coverage report

## License

This project is licensed under the MIT License.
