# AI-Powered Workforce Analytics & Talent Intelligence Dashboard

# Frontend Application

## Overview

This folder contains the frontend application for the **AI-Powered Workforce Analytics & Talent Intelligence Dashboard** developed as part of the **Infosys Springboard Internship**.

The frontend is built using **React + Vite** and provides the user interface for:

- Workforce dashboard visualization
- Employee management
- Workforce analytics
- AI-powered workforce assistant
- User navigation and interaction

The frontend communicates with the FastAPI backend through REST APIs.

---

# Technology Stack

## Frontend Technologies

- React
- Vite
- JavaScript
- Axios
- CSS

## Backend Communication

- FastAPI REST APIs
- MongoDB Atlas (accessed through backend APIs)

---

# Current Development Status

🚧 Frontend development is currently in progress.

The frontend foundation has been completed and the remaining development work is divided into independent modules.

---

# Completed Work

## 1. React Application Setup

Completed:

✅ React project created using Vite

✅ Project structure organized

✅ Development environment configured

✅ Dependencies installed

---

# 2. Application Layout

Location:

```
src/components/layout/
```

Implemented components:

```
components

└── layout

    ├── Layout.jsx
    ├── Sidebar.jsx
    └── TopNavbar.jsx
```


## Layout.jsx

Responsible for:

- Common application structure
- Combining Sidebar and TopNavbar
- Maintaining overall dashboard layout


## Sidebar.jsx

Responsible for:

- Dashboard navigation
- Employees navigation
- Analytics navigation
- AI Assistant navigation
- Settings navigation


## TopNavbar.jsx

Responsible for:

- Application title
- Admin/user section
- Top navigation area

---

# 3. Routing System

Location:

```
src/routes/AppRoutes.jsx
```

Implemented:

- Page navigation
- Route management
- Connecting pages with layout


Current routes:

```
/dashboard

/employees

/analytics

/ai-assistant

/settings
```

---

# 4. Pages Created

Location:

```
src/pages/
```

Current page structure:

```
pages

├── Dashboard
│   └── Dashboard.jsx
│
├── Employees
│   └── Employees.jsx
│
├── Analytics
│   └── Analytics.jsx
│
├── AIAssistant
│   └── AIAssistant.jsx
│
└── Settings
    └── Settings.jsx
```


Current status:

- Page folders created
- Basic page components created
- Routing completed
- Individual module development pending

---

# 5. AI Assistant Integration

Status:

✅ Completed


Files:

```
src/pages/AIAssistant/AIAssistant.jsx

src/services/aiService.js
```


Implemented features:

- User question input
- API request handling
- Loading state
- AI response display


Backend API connected:

```
POST /ask-ai
```


Request example:

```json
{
  "question": "What is the attrition rate?"
}
```


Response example:

```json
{
  "answer": "The attrition rate is 15.6%"
}
```

---

# API Service Layer

Location:

```
src/services/
```


Current implementation:

```
services

└── aiService.js
```


Purpose:

- Central location for API communication
- Axios configuration
- Separation of backend calls from UI components


Future service files:

```
services

├── aiService.js
├── dashboardService.js
├── employeeService.js
└── analyticsService.js
```


---

# Frontend Folder Structure

Current structure:

```
frontend

│
├── public
│
├── src
│
│   ├── assets
│   │
│   ├── components
│   │   └── layout
│   │       ├── Layout.jsx
│   │       ├── Sidebar.jsx
│   │       └── TopNavbar.jsx
│   │
│   ├── pages
│   │   │
│   │   ├── Dashboard
│   │   │   └── Dashboard.jsx
│   │   │
│   │   ├── Employees
│   │   │   └── Employees.jsx
│   │   │
│   │   ├── Analytics
│   │   │   └── Analytics.jsx
│   │   │
│   │   ├── AIAssistant
│   │   │   └── AIAssistant.jsx
│   │   │
│   │   └── Settings
│   │       └── Settings.jsx
│   │
│   ├── routes
│   │   └── AppRoutes.jsx
│   │
│   ├── services
│   │   └── aiService.js
│   │
│   ├── styles
│   │   └── layout.css
│   │
│   ├── theme
│   │   └── theme.js
│   │
│   ├── utils
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
└── vite.config.js
```

---

# How To Run Frontend

## Step 1 — Navigate to frontend

```bash
cd frontend
```


## Step 2 — Install Dependencies

```bash
npm install
```


## Step 3 — Start Development Server

```bash
npm run dev
```


Frontend runs at:

```
http://localhost:5173/
```

---

# Backend Connection

The FastAPI backend must be running before testing API-based features.


Start backend:

```bash
cd backend

python run.py
```


Backend URL:

```
http://127.0.0.1:8000
```


Communication flow:

```
React Component

        ↓

Service Layer (Axios)

        ↓

FastAPI REST API

        ↓

MongoDB Atlas
```

---

# Pending Frontend Development

The remaining frontend work is divided into three independent modules.

Each member should mainly work inside their assigned folder.

---

# Module 1 — Dashboard Development

Folder:

```
src/pages/Dashboard/
```


Responsibility:

Develop the main workforce dashboard.


Tasks:

- Create dashboard UI
- Create KPI cards
- Connect dashboard APIs
- Display workforce summary
- Add charts and visualizations


Expected data:

- Total employees
- Attrition rate
- Department statistics
- Workforce overview


Backend API:

```
GET /dashboard
```

---

# Module 2 — Employee Management Development

Folder:

```
src/pages/Employees/
```


Responsibility:

Develop employee management interface.


Tasks:

- Create employee table
- Display employee records
- Add employee search
- Add pagination
- Display employee details


Backend APIs:

```
GET /employees

GET /employee/{emp_id}
```

---

# Module 3 — Analytics Dashboard Development

Folder:

```
src/pages/Analytics/
```


Responsibility:

Develop workforce analytics visualizations.


Tasks:

Create charts and visualizations for:

- Attrition analysis
- Gender distribution
- Job role distribution
- Salary analysis
- Age analysis
- Employee wellbeing
- Job satisfaction
- Work-life balance


Backend APIs:

```
GET /attrition

GET /gender-distribution

GET /job-role-distribution

GET /salary-analytics

GET /age-analytics
```

---

# Development Rules

Before starting work:

```bash
git pull
```


Create a separate feature branch:

Example:

```bash
git checkout -b feature/dashboard-ui
```


After completing changes:

Add only your modified files:

Example:

```bash
git add frontend/src/pages/Dashboard/
```


Commit:

```bash
git commit -m "Added dashboard UI"
```


Push:

```bash
git push origin feature/dashboard-ui
```


Create a Pull Request after testing.

---

# Important Guidelines

- Do not modify another member's module without discussion.
- Keep API calls inside the `services` folder.
- Keep reusable UI components inside the `components` folder.
- Test changes before pushing.
- Pull the latest changes before starting new work.
- Avoid committing unrelated files.

---

# Future Improvements

Planned:

- Advanced charts
- Improved UI styling
- Responsive design
- AI assistant improvements
- Cloud deployment support
- Real-time analytics


---

# Contributors

Developed as part of the **Infosys Springboard Internship**.


Frontend Team:

- Sai Kavya
- Vishnu Vardhan
- Sudeekshaa


---

# Project Maintainer

**Sai Kavya**