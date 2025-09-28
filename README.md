# Mercatura 🛒

A full-stack **e-commerce MVP** built with **Spring Boot (Java)** and **Angular**, designed as a portfolio project to showcase modern software engineering skills.

## 📌 Features (planned)

- User authentication (JWT, roles: user/admin)
- Product catalog with search & filters
- Shopping cart & checkout (transactional)
- Order management (user & admin)
- Admin dashboard (products & sales stats)
- Bonus: product reviews, fake payment sandbox, email notifications

## 🛠️ Tech Stack

- **Backend:** Spring Boot 3, Spring Security (JWT), Spring Data JPA, MapStruct, PostgreSQL
- **Frontend:** Angular 20, Angular Material
- **Database:** PostgreSQL (via Docker)
- **CI/CD:** GitHub Actions (build, test, deploy)
- 
## 📂 Project Structure

mercatura/
├── backend/        # Spring Boot application
├── frontend/       # Angular application
├── docker-compose.yml
└── README.md

## 🚀 Getting Started

### Prerequisites
- Java 21+
- Node.js 20+
- Docker & Docker Compose

### Run locally

```bash
# Start database
docker-compose up -d

# Backend
cd backend
./mvnw spring-boot:run

# Frontend
cd frontend
npm install
npm start
```

🧪 Tests
	•	Backend: JUnit 5 + Mockito + Testcontainers
	•	Frontend: Jasmine/Karma

Run all tests in CI/CD via GitHub Actions.

📈 Roadmap (Sprints)
	•	Sprint 0: Repo setup (this README, Docker Compose, base apps)
	•	Sprint 1: MVP (auth, catalog, cart, checkout, orders)
	•	Sprint 2: Admin features & dashboard
	•	Sprint 3: Bonus (reviews, payments, emails, analytics)

🔗 Created by Nicolas Perrin as a personal portfolio project.