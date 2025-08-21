# ExpenSum - Smart Expense Tracker

A comprehensive expense tracking application with AI-powered receipt parsing capabilities. ExpenSum consists of three main components: a React frontend, a Spring Boot backend, and an AI service for intelligent expense extraction.

## 🚀 Features

- **User Authentication**: Secure JWT-based authentication system
- **Expense Management**: Add, edit, delete, and categorize expenses
- **AI-Powered Parsing**: Automatically extract expense details from text using AI
- **Responsive Design**: Modern UI built with React and Tailwind CSS
- **Real-time Updates**: Instant expense tracking and summary updates
- **Data Persistence**: SQLite database with JPA/Hibernate
- **RESTful API**: Comprehensive backend API with OpenAPI documentation

## 🏗️ Architecture

```
ExpenSum/
├── frontend/          # React + TypeScript + Vite
├── backend/           # Spring Boot + JPA + Security
└── ai/               # FastAPI + AI/ML parsing service
```

## 🛠️ Tech Stack

### Frontend

- **React 19** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Sonner** for toast notifications
- **Lucide React** for icons

### Backend

- **Spring Boot 3.4.5** with Java 17
- **Spring Security** with JWT authentication
- **Spring Data JPA** with Hibernate
- **SQLite** database
- **Lombok** for boilerplate reduction
- **OpenAPI/Swagger** for API documentation

### AI Service

- **FastAPI** for API framework
- **Transformers** for AI/ML models
- **LangChain** for AI processing
- **PyTorch** for deep learning

## 📋 Prerequisites

- **Java 17** or higher
- **Node.js 18** or higher
- **Python 3.8** or higher
- **Maven** (for backend)
- **npm** or **yarn** (for frontend)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ExpenSum
```

### 2. Backend Setup

```bash
cd backend

# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will start on `http://localhost:5173`

### 4. AI Service Setup

```bash
cd ai

# Install dependencies
pip install -r requirements.txt

# Run the service
uvicorn main:app --reload
```

The AI service will start on `http://localhost:8000`

## 📖 API Documentation

### Backend API

Once the backend is running, you can access the API documentation at:

- Swagger UI: `http://localhost:8080/swagger-ui.html`
- OpenAPI JSON: `http://localhost:8080/v3/api-docs`

### AI Service API

The AI service provides the following endpoints:

- `GET /` - Health check
- `POST /parse` - Parse expense text and extract details

## 🔧 Configuration

### Backend Configuration

The backend uses `application.properties` for configuration. Key settings include:

- Database configuration (SQLite)
- JWT secret and expiration
- CORS settings
- Server port

### Frontend Configuration

The frontend uses environment variables for API endpoints. Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:8080
VITE_AI_SERVICE_URL=http://localhost:8000
```

## 🗄️ Database

The application uses SQLite as the database. The database file is automatically created when the application starts. Key entities include:

- **User**: User authentication and profile information
- **Expense**: Expense records with amount, category, date, and description

## 🔐 Authentication

The application uses JWT-based authentication:

1. **Registration**: Users can create new accounts
2. **Login**: Users authenticate with email/password
3. **Protected Routes**: Frontend routes are protected based on authentication status
4. **JWT Tokens**: Backend validates JWT tokens for API access

## 🤖 AI Features

The AI service provides intelligent expense parsing:

- **Text Analysis**: Extracts expense details from natural language text
- **Category Classification**: Automatically categorizes expenses
- **Amount Extraction**: Identifies and extracts monetary amounts
- **Date Parsing**: Recognizes and formats dates

## 📁 Project Structure

```
ExpenSum/
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context providers
│   │   ├── types/         # TypeScript type definitions
│   │   └── lib/           # Utility functions
│   ├── public/            # Static assets
│   └── package.json       # Frontend dependencies
├── backend/
│   ├── src/main/java/com/expensum/
│   │   ├── controller/    # REST controllers
│   │   ├── service/       # Business logic
│   │   ├── repository/    # Data access layer
│   │   ├── entity/        # JPA entities
│   │   ├── config/        # Configuration classes
│   │   └── auth/          # Authentication components
│   └── pom.xml           # Maven dependencies
└── ai/
    ├── main.py           # FastAPI application
    ├── parser/           # AI parsing logic
    └── requirements.txt  # Python dependencies
```

## 🧪 Testing

### Backend Testing

```bash
cd backend
mvn test
```

### Frontend Testing

```bash
cd frontend
npm run lint
```

## 🚀 Deployment

### Backend Deployment

The backend can be deployed as a JAR file:

```bash
cd backend
mvn clean package
java -jar target/expensum-backend-0.0.1-SNAPSHOT.jar
```

### Frontend Deployment

Build the frontend for production:

```bash
cd frontend
npm run build
```

### AI Service Deployment

The AI service can be deployed using any ASGI server:

```bash
cd ai
uvicorn main:app --host 0.0.0.0 --port 8000
```

