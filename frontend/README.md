# AI-Powered Workforce Analytics & Talent Intelligence Dashboard

## Frontend Application

## Overview

This folder contains the frontend application for the **AI-Powered Workforce Analytics & Talent Intelligence Dashboard** developed as part of the **Infosys Springboard Internship**.

The frontend is built using **React + Vite** and provides the user interface for:

- Workforce dashboard visualization
- Employee management
- Workforce analytics
- AI-powered workforce assistant
- Reports and utility modules
- User navigation and interaction

The frontend communicates with the FastAPI backend through REST APIs.

---

# Technology Stack

## Frontend

- React
- Vite
- JavaScript
- Axios
- CSS
- Recharts
- React Router

## Backend Communication

- FastAPI REST APIs
- MongoDB Atlas through backend services

---

# Current Development Status

🚧 Frontend development is in progress.

The frontend architecture and common layout are completed.

Development is divided into independent feature modules:

1. Dashboard & Analytics
2. Employee Management
3. AI Assistant & Utility Modules

---

# Completed Common Foundation

## 1. React Application Setup

Completed:

- ✅ React project created using Vite
- ✅ Development environment configured
- ✅ Dependencies installed
- ✅ Folder structure organized

---

## 2. Application Layout

### Location

```text
src/components/layout/
```

### Implemented Components

```text
components
└── layout
    ├── Layout.jsx
    ├── Sidebar.jsx
    └── TopNavbar.jsx
```

### Layout.jsx

Responsible for:

- Overall application structure
- Combining sidebar and navbar
- Maintaining common page layout

### Sidebar.jsx

Responsible for:

- Application navigation
- Dashboard navigation
- Employee navigation
- Analytics navigation
- AI assistant navigation
- Settings navigation

### TopNavbar.jsx

Responsible for:

- Application title
- User section
- Top navigation area

---

## 3. Routing System

### Location

```text
src/routes/AppRoutes.jsx
```

Implemented:

- Route management
- Page navigation
- Layout integration

### Current Routes

```text
/dashboard
/employees
/analytics
/ai-assistant
/settings
```

---

## 4. Service Layer

### Location

```text
src/services/
```

Purpose:

- Centralized API communication
- Axios configuration
- Separation of backend calls from UI components

### Current Services

```text
services
├── api.js
├── aiService.js
├── dashboardService.js
└── analyticsService.js
```

---

# Current Folder Structure

```text
frontend
│
├── public
│
├── src
│   ├── assets
│   │
│   ├── components
│   │   ├── layout
│   │   │   ├── Layout.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── TopNavbar.jsx
│   │   │
│   │   ├── cards
│   │   │   └── MetricCard.jsx
│   │   │
│   │   ├── charts
│   │   │   ├── GenderDistributionChart.jsx
│   │   │   ├── AttritionChart.jsx
│   │   │   ├── DepartmentChart.jsx
│   │   │   ├── JobRoleChart.jsx
│   │   │   ├── SalaryChart.jsx
│   │   │   ├── AgeChart.jsx
│   │   │   ├── SatisfactionChart.jsx
│   │   │   ├── WorkLifeChart.jsx
│   │   │   ├── AttritionDepartmentChart.jsx
│   │   │   ├── WellbeingChart.jsx
│   │   │   └── SalaryDepartmentChart.jsx
│   │   │
│   │   ├── tables
│   │   ├── forms
│   │   ├── chatbot
│   │   └── common
│   │
│   ├── pages
│   │   ├── Dashboard
│   │   │   └── Dashboard.jsx
│   │   ├── Employees
│   │   │   └── Employees.jsx
│   │   ├── Departments
│   │   ├── JobRoles
│   │   ├── Analytics
│   │   │   └── Analytics.jsx
│   │   ├── AIAssistant
│   │   │   └── AIAssistant.jsx
│   │   ├── Reports
│   │   ├── Settings
│   │   │   └── Settings.jsx
│   │   └── Login
│   │
│   ├── routes
│   │   └── AppRoutes.jsx
│   │
│   ├── services
│   │   ├── api.js
│   │   ├── aiService.js
│   │   ├── dashboardService.js
│   │   └── analyticsService.js
│   │
│   ├── styles
│   │   └── layout.css
│   ├── theme
│   │   └── theme.js
│   ├── utils
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
└── vite.config.js
```

---

# Development Module Distribution

The frontend development is divided among three developers to minimize merge conflicts.

---

# Module 1 — Dashboard & Analytics

**Developer:** Sai Kavya

### Responsibilities

Develop workforce visualization modules.

### Folders

```text
src/pages/Dashboard/
src/pages/Analytics/
src/components/charts/
src/components/cards/
```

## Dashboard Module

### Tasks

- Dashboard UI development
- KPI cards
- Workforce summary
- Dashboard API integration
- Employee overview charts

### APIs

```http
GET /dashboard
GET /attrition
GET /gender-distribution
GET /departments
```

## Analytics Module

### Tasks

Create workforce analytics visualizations:

- Attrition analysis
- Gender distribution
- Job role distribution
- Salary analytics
- Age analytics
- Employee wellbeing
- Job satisfaction
- Work-life balance
- Department salary analysis
- Department attrition analysis

### APIs

```http
GET /attrition
GET /gender-distribution
GET /job-role-distribution
GET /salary-analytics
GET /age-analytics
GET /age-distribution
GET /employee-wellbeing
GET /experience-summary
GET /job-satisfaction
GET /work-life-balance
GET /salary-distribution
GET /attrition-by-department
```

---

# Module 2 — Employee Management

**Developer:** Vishnu Vardhan

### Responsibilities

Develop employee and organizational management modules.

### Folders

```text
src/pages/Employees/
src/pages/Departments/
src/pages/JobRoles/
src/components/forms/
src/components/tables/
```

### Tasks

- Employee listing
- Employee details
- Search functionality
- Filtering
- Pagination
- Department management
- Job role management
- CRUD operations

### APIs

```http
GET /employees
GET /employee/{id}
POST /employees
PUT /employees/{id}
DELETE /employees/{id}
GET /departments
```

---

# Module 3 — AI & Utility Modules

**Developer:** Sudeekshaa

### Responsibilities

Develop AI and supporting utility features.

### Folders

```text
src/pages/AIAssistant/
src/pages/Reports/
src/pages/Settings/
src/components/chatbot/
src/components/common/
```

### Tasks

- AI assistant interface
- Chat interface
- Prompt handling
- AI response display
- Report generation UI
- Smart alerts
- Settings page
- User profile components

### APIs

```http
POST /ask-ai

Future APIs:

POST /predict

Reports APIs

Smart alert APIs
```

---

# Current Completed Features

## Dashboard

Completed:

- ✅ Workforce KPI cards
- ✅ Total employee overview
- ✅ Department summary
- ✅ Average age and income metrics
- ✅ Attrition rate indicator
- ✅ Gender distribution visualization
- ✅ Attrition visualization
- ✅ Department distribution visualization

## Analytics

Completed:

- ✅ Job role distribution chart
- ✅ Salary analytics chart
- ✅ Age analytics chart
- ✅ Job satisfaction chart
- ✅ Work-life balance chart
- ✅ Attrition by department chart
- ✅ Employee wellbeing chart
- ✅ Salary distribution by department chart

Current implementation contains 8 workforce analytics visualizations:

1. Job Role Distribution
2. Salary Analytics
3. Age Analytics
4. Job Satisfaction
5. Work-Life Balance
6. Attrition by Department
7. Employee Wellbeing
8. Salary Distribution by Department

## AI Assistant

Completed:

- ✅ AI assistant page
- ✅ User input handling
- ✅ Backend API connection

### API

```http
POST /ask-ai
```

---

# Running the Frontend

## Step 1

Navigate to the frontend directory:

```bash
cd frontend
```

## Step 2

Install dependencies:

```bash
npm install
```

## Step 3

Start the development server:

```bash
npm run dev
```

Frontend runs at:

```text
http://localhost:5173/
```

---

# Backend Connection

The backend must be running before testing API features.

Start the backend:

```bash
cd backend
python run.py
```

Backend URL:

```text
http://127.0.0.1:8000
```

### Communication Flow

```text
React Components
        │
        ▼
Service Layer (Axios)
        │
        ▼
FastAPI REST API
        │
        ▼
MongoDB Atlas
```

---

# Git Workflow

## Pull Latest Changes

```bash
git pull
```

## Create Feature Branch

```bash
git checkout -b feature/dashboard-analytics
```

## Stage Changes

```bash
git add .
```

## Commit Changes

```bash
git commit -m "Added dashboard analytics module"
```

## Push Changes

```bash
git push origin feature/dashboard-analytics
```

Finally, create a Pull Request for review.

---

# Development Rules

- Do not modify another developer's module without discussion.
- Keep API calls inside the `services` folder.
- Keep reusable components inside the `components` folder.
- Test before pushing.
- Pull the latest changes before starting work.
- Avoid committing unrelated files.
- Maintain a modular folder structure.

---

# Future Improvements

Planned features:

- Advanced AI predictions
- Recruitment intelligence
- Career path recommendations
- Performance prediction
- Workflow automation
- Advanced reporting
- Responsive mobile design
- Cloud deployment
- Real-time analytics

---

# Contributors

Developed as part of the **Infosys Springboard Internship**.

### Frontend Team

- Sai Kavya
- Vishnu Vardhan
- Sudeekshaa

---

# Project Maintainer

**Sai Kavya**