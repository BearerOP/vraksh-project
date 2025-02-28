# Linktr.ee / Bento.me Clone Backend

A complete Node.js backend implementation for a Linktr.ee / Bento.me clone with user authentication and referral system.

## Features

- **User Authentication**
  - Registration with email validation
  - Login with JWT authentication
  - Password reset with email verification
  - Secure password storage with bcrypt

- **Referral System**
  - Unique referral codes for each user
  - Tracking of referral relationships
  - Statistics for user referrals
  - Rewards tracking (extensible)

- **Security Features**
  - Rate limiting for sensitive endpoints
  - Input validation with express-validator
  - JWT authentication with protected routes
  - Password hashing with bcrypt
  - Security headers with helmet
  - CORS protection

- **API Endpoints**
  - User registration and authentication
  - Password reset flow
  - Referral management
  - User profile management

## Tech Stack

- Node.js & Express.js
- MongoDB with Mongoose
- JWT for authentication
- Nodemailer for email services
- Express Validator for input validation
- Bcrypt for password hashing
- Jest & Supertest for testing

## Project Structure

```
/backend
  /config
    - db.js            # Database connection
    - jwt.js           # JWT configuration
  /controllers
    - authController.js       # Authentication logic
    - referralController.js   # Referral system logic
  /middleware
    - auth.js          # Authentication middleware
    - rateLimiter.js   # Rate limiting middleware
  /models
    - User.js          # User model
    - Referral.js      # Referral model
    - Token.js         # Token model for password reset
  /routes
    - authRoutes.js    # Authentication routes
    - referralRoutes.js # Referral routes
  /utils
    - emailService.js  # Email sending utility
    - validators.js    # Input validation
  /tests
    - auth.test.js     # Authentication tests
    - referral.test.js # Referral tests
  - server.js          # Main application file
  - package.json       # Project dependencies
  - .env               # Environment variables
  - README.md          # Project documentation
```

## API Documentation

### Authentication Endpoints

#### Register a new user
```
POST /api/register
```
**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123",
  "referralCode": "abc123" // Optional
}
```
**Response:**
```json
{
  "success": true,
  "message": "Registration successful",
  "token": "JWT_TOKEN",
  "user": {
    "id": "user_id",
    "username": "johndoe",
    "email": "john@example.com",
    "referralCode": "generated_code"
  }
}
```

#### Login
```
POST /api/login
```
**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
**Response:**
```json
{
  "success": true,
  "token": "JWT_TOKEN",
  "user": {
    "id": "user_id",
    "username": "johndoe",
    "email": "john@example.com",
    "referralCode": "user_referral_code"
  }
}
```

#### Forgot Password
```
POST /api/forgot-password
```
**Request Body:**
```json
{
  "email": "john@example.com"
}
```
**Response:**
```json
{
  "success": true,
  "message": "Password reset email sent"
}
```

#### Reset Password
```
POST /api/reset-password/:resetToken
```
**Request Body:**
```json
{
  "password": "newpassword123"
}
```
**Response:**
```json
{
  "success": true,
  "message": "Password reset successful"
}
```

#### Get Current User
```
GET /api/me
```
**Headers:**
```
Authorization: Bearer JWT_TOKEN
```
**Response:**
```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "username": "johndoe",
    "email": "john@example.com",
    "referralCode": "user_referral_code",
    "referralCount": 5
  }
}
```

### Referral Endpoints

#### Get User Referrals
```
GET /api/referrals
```
**Headers:**
```
Authorization: Bearer JWT_TOKEN
```
**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "referrer": "user_id",
      "referred": {
        "username": "janedoe",
        "email": "jane@example.com",
        "createdAt": "2023-05-01T12:00:00.000Z"
      },
      "status": "successful",
      "createdAt": "2023-05-01T12:00:00.000Z"
    },
    {
      "referrer": "user_id",
      "referred": {
        "username": "bobsmith",
        "email": "bob@example.com",
        "createdAt": "2023-05-02T12:00:00.000Z"
      },
      "status": "successful",
      "createdAt": "2023-05-02T12:00:00.000Z"
    }
  ]
}
```

#### Get Referral Statistics
```
GET /api/referral-stats
```
**Headers:**
```
Authorization: Bearer JWT_TOKEN
```
**Response:**
```json
{
  "success": true,
  "data": {
    "totalReferrals": 5,
    "monthlyReferrals": 2,
    "referredBy": {
      "username": "alice",
      "email": "alice@example.com"
    },
    "referralLink": "https://yourdomain.com/register?ref=abc123"
  }
}
```

## Installation and Setup

1. Clone the repository
```
git clone <repository-url>
cd linktree-clone-backend
```

2. Install dependencies
```
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/linktree-clone
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d
EMAIL_SERVICE=gmail
EMAIL_USERNAME=your_email@gmail.com
EMAIL_PASSWORD=your_email_password
EMAIL_FROM=your_email@gmail.com
BASE_URL=http://localhost:5000
FRONTEND_URL=http://localhost:3000
```

4. Start the server
```
# Development mode
npm run dev

# Production mode
npm start
```

## Testing

Run the test suite:
```
NODE_ENV=test npm test
```

Or with coverage report:
```
NODE_ENV=test npm test -- --coverage
```

## Error Handling

The API uses consistent error responses in the following format:
```json
{
  "success": false,
  "message": "Error message",
  "errors": [
    {
      "field": "email",
      "message": "Email already in use"
    }
  ]
}
```

## Rate Limiting

To protect against brute force attacks, the following endpoints have rate limiting:
- `/api/login`: 5 requests per 15 minutes
- `/api/register`: 3 requests per hour
- `/api/forgot-password`: 3 requests per hour