# Simple Node.js CRUD API

A simple Node.js CRUD API with Express, MongoDB, and Jest tests.

## Installation

```bash
npm install
```

## Running the Application

Make sure MongoDB is running locally, then:

```bash
npm start
```

For development with auto-reload:

```bash
npm run dev
```

## Running Tests

```bash
npm test
```

## API Endpoints

- **Create User**: POST /api/users
- **Get All Users**: GET /api/users
- **Get User by ID**: GET /api/users/:id
- **Update User**: PATCH /api/users/:id
- **Delete User**: DELETE /api/users/:id

## Request/Response Examples

### Create User
```
POST /api/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30
}
```

### Get All Users
```
GET /api/users
```

### Get User by ID
```
GET /api/users/60d21b4667d0d8992e610c85
```

### Update User
```
PATCH /api/users/60d21b4667d0d8992e610c85
Content-Type: application/json

{
  "name": "Updated Name",
  "age": 31
}
```

### Delete User
```
DELETE /api/users/60d21b4667d0d8992e610c85
```