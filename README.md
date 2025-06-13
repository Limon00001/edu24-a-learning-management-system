<div align="center">

![Author](https://img.shields.io/badge/Limon-5E0D73?style=flat&logo=autocad&logoColor=whitesmoke) ![Contributor](https://img.shields.io/badge/Contributor-000?style=flat&logo=c&logoColor=whitesmoke) ![React](https://img.shields.io/badge/-React-61DAFB?style=flat&logo=react&logoColor=black) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) ![NPM](https://img.shields.io/badge/Npm-CC342D?style=flat&logo=npm&logoColor=white)
![GitHub](https://img.shields.io/badge/Github-000?style=flat&logo=github&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/-TailwindCss-38BDF8?style=flat&logo=tailwind-css&logoColor=white) ![Visual Studio Code](https://custom-icon-badges.demolab.com/badge/Visual%20Studio%20Code-0078d7.svg?logo=vsc&logoColor=white) ![GitHub Copilot](https://img.shields.io/badge/GitHub%20Copilot-000?logo=githubcopilot&logoColor=fff) ![Google Chrome](https://img.shields.io/badge/Google%20Chrome-4285F4?logo=GoogleChrome&logoColor=white) ![Vercel](https://img.shields.io/badge/Vercel-%23000000.svg?logo=vercel&logoColor=white) ![Read the Docs](https://img.shields.io/badge/Read%20the%20Docs-8CA1AF?logo=readthedocs&logoColor=fff) ![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff) ![shadcn](https://img.shields.io/badge/shadcn-000?logo=shadcnui&logoColor=fff) ![router](https://img.shields.io/badge/React%20Router-CA4245?logo=reactrouter&logoColor=fff) ![axios](https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=fff) ![stripe](https://img.shields.io/badge/Stripe-626CD9?logo=stripe&logoColor=fff) ![jwt](https://img.shields.io/badge/JWT-000?logo=jsonwebtokens&logoColor=fff) ![cloudinary](https://img.shields.io/badge/Cloudinary-000?logo=cloudinary&logoColor=fff)

</div>

# Learning Management System (LMS) - Edu'24

![LMS](./client/public/lms-thrmbnail.png)

## Overview

This Learning Management System built with React and Node.js that allows instructors to create and manage courses while enabling students to enroll and learn effectively.

## Credentials

### Instructor Access
```properties
Email: instructor@edu24.com
Password: instructor123
```

> **Note:** Use these credentials to explore instructor features like:
> - Course creation and management
> - Curriculum building
> - Student progress tracking
> - Revenue monitoring
> - Analytics dashboard

### Student Access (Optional)
```properties
Email: student@edu24.com
Password: student123
```

> **Note:** Use these credentials to explore student features like:
> - Course browsing
> - Course enrollment
> - Course progress tracking
> - Free preview of selected lectures

![Student Dashboard](./client/public/student_dashboard.png)

## Tech Stack

- React 19 for frontend with Vite
- TailwindCSS for styling
- Shadcn UI components
- Axios for API calls
- React Router v6 for routing
- Context API for state management
- Cloudinary for media storage
- Stripe for payment processing
- JWT for authentication
- Node.js for backend
- Express for server
- MongoDB and Prisma for database

## Key Features

- Authentication
- User registration and login
- Role-based access control (Student/Instructor)
- JWT-based authentication
- Persistent auth state using localStorage

## Student Features

- Course browsing with filters and search
- Course enrollment with Stripe integration
- Course progress tracking
- Free preview of selected lectures
- Responsive video player
- Course completion tracking

## Instructor Features

- Course creation and management
- Rich course curriculum builder
- Video lecture upload system
- Student enrollment tracking
- Revenue monitoring
- Course analytics

![Instructor Dashboard](./client/public/instructor_dashboard.png)
![Instructor Dashboard](./client/public/instructor_course_creation.png)

## Major Implementation Challenges & Solutions

1. Files Upload System

- **Challenge:** Implementing progress tracking for large video uploads

- **Solution:**

  - How to Implement:

    1. Create a service to handle file uploads

    2. Track upload progress:

       - Calculate percentage based on loaded vs total bytes
       - Show progress bar to user
       - Update UI in real-time

    3. Handle success/failure states

  - **Tips:**
    1. Use FormData for file handling
    2. Implement progress tracking callback
    3. Show loading indicator for better user experience
    4. Handle network errors
    5. Validate file types and sizes

2. Course Media Management

- **Challenge:** Handling Cloudinary media deletion, especially course images

- **Current Issue:**

  - Videos delete successfully but course images remain in Cloudinary
  - Need to implement proper public_id tracking for course images

3. Payment Integration

- **Challenge:** Implementing secure payment flow with Stripe

- **Solution:**

  - Implementation Flow:
    1. Start payment process
    2. Redirect to Stripe checkout
    3. Handle payment success:
       - Verify payment status
       - Update enrollment status
       - Show success message
       - Redirect to courses page
    4. Handle payment failure:
       - Show error message
       - Allow retry
       - Maintain payment state

- **Key Points:**
  - Secure payment verification
  - Clear user feedback
  - Proper error handling
  - Smooth navigation flow

4. Course Progress Tracking

- **Challenge:** Real-time progress updates for students and streamlining course completion

- **Solution:**

  - How to Calculate:
    1. Get total number of lectures
    2. Track completed lectures
    3. Calculate percentage:
    4. Count completed lectures
    5. Divide by total lectures
    6. Multiply by 100
    7. Round to whole number

## Best Practices

1. Code Organization

   - Separate service layer
   - Context-based state management

2. Security

   - Protected routes
   - JWT token management
   - Secure payment handling

3. User Experience
   - Loading states
   - Error handling
   - Toast notifications
   - Responsive design

## Areas for Improvement

1. Media Management

   - Implement better tracking of Cloudinary assets
   - Improve image deletion functionality

2. State Management

   - Consider using `Redux/Zustand` for complex state
   - Implement better caching

3. Performance
   - Add `Suspense` for lazy loading for routes
   - Implement better video streaming
   - Add client-side caching

## Getting Started

**Installation:**

First, make sure you have `pnpm` or other package manager installed. You'll need to install dependencies for both client and server:

```
# Install dependencies in client directory
cd client
pnpm install

# Install dependencies in server directory 
cd ../server
pnpm install
```

**Environment Setup:**

```
Create a .env file in the both client and server directory and set the necessary environment variables for your application. Please refer to the .env.example file for more details.
```

**Development:**

Start the development

```
# Start the client (in client directory)
cd client
pnpm dev

# Start the server (in server directory)
cd server
pnpm dev
```

**Build:**

To build for production

```
# Build the client
cd client
pnpm build

# Build the server
cd server
pnpm build
```

## Author

**Monayem Hossain Limon**

- GitHub: [@Limon00001](https://github.com/Limon00001)
- LinkedIn: [monayem-hossain-limon](https://linkedin.com/in/monayem-hossain-limon)
- Date: May 25, 2025

---

Feel free to star ⭐ this repository if you find it helpful!
