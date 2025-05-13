# CINOX - Modern Movie Booking System

## Overview
CINOX is a full-stack web application for modern cinema ticket booking. It provides an intuitive interface for users to browse movies, select shows, book seats, and make secure payments. The system includes a comprehensive admin dashboard for managing all aspects of the cinema operation.

## Tech Stack

### Frontend
- React.js 19.0.0
- TailwindCSS 4.1.3
- Framer Motion for animations
- React Router for navigation
- Axios for API calls
- React Toastify for notifications

### Backend
- Java 21
- Spring Boot 3.4.4
- MySQL Database
- JPA for data persistence
- Razorpay payment integration

## Features

### User Features
1. **Authentication**
   - User registration and login
   - Role-based access control

2. **Movie Browsing**
   - View now showing movies
   - Search and filter movies
   - View movie details and trailers
   - Dark/Light theme support

3. **Booking System**
   - Interactive seat selection
   - Real-time seat availability
   - Secure payment via Razorpay
   - Booking confirmation
   - Booking history

### Admin Features
1. **Dashboard**
   - Comprehensive management interface
   - Analytics and reports
   - User management
   - Booking management

2. **Content Management**
   - Movie CRUD operations
   - Show scheduling
   - Theater management
   - Screen configuration
   - City management

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Java JDK 21
- MySQL 8.0 or higher
- Maven 3.x

### Backend Setup
1. Configure MySQL database:
   ```sql
   CREATE DATABASE cinox;
   ```

2. Update application.properties with your database credentials:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/cinox
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

3. Build and run the backend:
   ```powershell
   cd backend
   ./mvnw spring-boot:run
   ```

### Frontend Setup
1. Install dependencies:
   ```powershell
   cd frontend
   npm install
   ```

2. Start development server:
   ```powershell
   npm run dev
   ```

3. Access the application at http://localhost:5173

## API Documentation

### Authentication APIs
- POST /api/auth/register - User registration
- POST /api/auth/login - User login

### Movie APIs
- GET /api/movie/ - List all movies
- POST /api/movie/add - Add new movie
- GET /api/movie/{id} - Get movie details
- PUT /api/movie/edit - Update movie
- DELETE /api/movie/delete/{id} - Delete movie

### Booking APIs
- POST /api/booking/add - Create booking
- GET /api/booking/ - List all bookings
- GET /api/booking/{id} - Get booking details
- POST /api/payment/confirm - Confirm payment

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details.