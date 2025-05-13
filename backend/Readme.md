# CINOX Backend

A robust Spring Boot backend for the CINOX movie booking system, providing secure REST APIs and efficient data management.

## Features

- 🎬 Complete movie management system
- 🎟️ Booking and payment processing
- 📊 Theater and show management
- 👥 User management with role-based access
- 🌍 Multi-city support
- 💳 Razorpay payment integration

## Tech Stack

- Java 21
- Spring Boot 3.4.4
- Spring Security
- Spring Data JPA
- MySQL Database
- Maven
- Razorpay API

## Database Schema

### Core Entities
- User
- Movie
- Theater
- Screen
- Show
- Booking
- Payment
- City

## API Endpoints

### Authentication
```
POST /api/auth/register - Register new user
POST /api/auth/login    - User login
```

### Movie Management
```
GET    /api/movie/      - List all movies
POST   /api/movie/add   - Add new movie
GET    /api/movie/{id}  - Get movie details
PUT    /api/movie/edit  - Update movie
DELETE /api/movie/delete/{id}  - Delete movie
```

### Booking Management
```
POST /api/booking/add          - Create booking
GET  /api/booking/             - List all bookings
GET  /api/booking/{id}         - Get booking details
POST /api/payment/confirm      - Confirm payment
GET  /api/payment/getRazorpayOrderId/{id}    - Get payment status
```

### Theater Management
```
GET    /api/theater/           - List all theaters
POST   /api/theater/add       - Add new theater
GET    /api/theater/{id}      - Get theater details
PUT    /api/theater/edit      - Update theater
DELETE /api/theater/delet/{id}      - Delete theater
```

## Getting Started

### Prerequisites
- JDK 21
- MySQL 8.0+
- Maven 3.x
- Razorpay account for payments

### Installation

1. Clone the repository and navigate to backend:
```powershell
cd cinox/backend
```

2. Configure database in application.properties:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/cinox
spring.datasource.username=your_username
spring.datasource.password=your_password
```

3. Configure Razorpay credentials:
```properties
razorpay.key_id=your_key_id
razorpay.key_secret=your_key_secret
```

4. Build the project:
```powershell
./mvnw clean install
```

5. Run the application:
```powershell
./mvnw spring-boot:run
```

## Security Implementation

- Role-based access control (USER/ADMIN)
- API endpoint security
- Input validation and sanitization