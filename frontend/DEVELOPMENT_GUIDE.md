# Frontend Development Guide

## AI-Powered Workforce Analytics & Talent Intelligence Dashboard

This document explains the frontend development workflow, completed foundation, module responsibilities, coding rules, and Git workflow for the frontend team.

The frontend foundation has already been completed.

The remaining frontend development is divided into **three independent modules** to reduce merge conflicts.

The common architecture should not be changed unless required, because it is already connected with routing, layout, and backend communication.

---

# Current Frontend Status

## Completed Work

- ✅ React + Vite setup
- ✅ Project structure creation
- ✅ Material UI theme setup
- ✅ Application routing
- ✅ Common layout implementation
- ✅ Sidebar navigation
- ✅ Top Navbar
- ✅ Page structure creation
- ✅ Axios API configuration
- ✅ AI Assistant backend integration

---

# Completed Common Structure

Current frontend structure:

```text
frontend/
└── src/
    ├── assets/
    │
    ├── components/
    │   └── layout/
    │       ├── Layout.jsx
    │       ├── Sidebar.jsx
    │       └── TopNavbar.jsx
    │
    ├── pages/
    │   ├── Dashboard/
    │   │   └── Dashboard.jsx
    │   │
    │   ├── Employees/
    │   │   └── Employees.jsx
    │   │
    │   ├── Analytics/
    │   │   └── Analytics.jsx
    │   │
    │   ├── AIAssistant/
    │   │   └── AIAssistant.jsx
    │   │
    │   └── Settings/
    │       └── Settings.jsx
    │
    ├── routes/
    │   └── AppRoutes.jsx
    │
    ├── services/
    │   ├── api.js
    │   ├── aiService.js
    │   ├── dashboardService.js (to be implemented)
    │   ├── employeeService.js (to be implemented)
    │   └── analyticsService.js (to be implemented)
    │
    ├── styles/
    │   └── layout.css
    │
    ├── theme/
    │   └── theme.js
    │
    ├── App.jsx
    ├── main.jsx
    └── index.css
```

---

# Before Starting Work

Every developer must follow these steps.

---

## Step 1: Pull Latest Changes

Run:

```bash
git pull origin feature/frontend-foundation
```

Always start with the latest code.

---

## Step 2: Create Your Feature Branch

**Do not work directly on:**

```text
feature/frontend-foundation
```

Create your own feature branch.

Example:

```bash
git checkout -b feature/module-name
```

Examples:

**Dashboard**

```bash
git checkout -b feature/dashboard-ui
```

**Employee Management**

```bash
git checkout -b feature/employee-management
```

**Analytics**

```bash
git checkout -b feature/analytics-dashboard
```

---

# Common Files Rule

The following files are **shared across the entire application**.

Do **not** modify these without discussion.

```text
src/components/layout/
src/routes/AppRoutes.jsx
src/services/api.js
src/theme/
src/main.jsx
src/App.jsx
src/index.css
src/styles/layout.css
```

### Reason

These files affect the complete application and unnecessary modifications may create merge conflicts.

---

# API Development Rules

Never create Axios instances inside React components.

### ❌ Wrong

```javascript
axios.get("http://127.0.0.1:8000/dashboard");
```

### ✅ Correct

Create API functions inside:

```text
src/services/
```

Example:

```javascript
import api from "./api";

export const getDashboardData = async () => {
  const response = await api.get("/dashboard");
  return response.data;
};
```

React components should only call service functions.

---

# Development Order

Follow this order while building modules:

1. Understand required backend APIs.

2. Implement service functions inside:
   
   src/services/

3. Test API response.

4. Create UI components.

5. Connect UI with service functions.

6. Test complete module.

---

# Module Responsibilities

Frontend development is divided into **three independent modules**.

Each developer should primarily work within their assigned folders.

---

# Member 1 — Dashboard Module

### Developer

**Sai Kavya**

### Working Folder

```text
src/pages/Dashboard/
```

### Responsibility

Build the main workforce dashboard.

### Tasks

- Create dashboard UI
- Create KPI cards
- Connect dashboard API
- Display workforce summary
- Add charts and visualizations

### Dashboard Should Display

- Total employees
- Attrition rate
- Department statistics
- Workforce overview
- Employee summary

### Allowed Component Creation

```text
src/components/cards/
src/components/charts/
```

### Service File

Implement:

```text
src/services/dashboardService.js
```

### Backend API

```http
GET /dashboard
```

---

# Member 2 — Employee Management Module

### Developer

**Vishnu Vardhan**

### Working Folder

```text
src/pages/Employees/
```

### Responsibility

Create the employee management interface.

### Tasks

- Create employee table
- Display employee records
- Add search functionality
- Add pagination
- Display employee details

### Allowed Component Creation

```text
src/components/tables/
src/components/forms/
```

### Service File

Implement:

```text
src/services/employeeService.js
```

### Backend APIs

```http
GET /employees
GET /employee/{emp_id}
```

---

# Member 3 — Analytics Module

### Developer

**Sudeeksha**

### Working Folder

```text
src/pages/Analytics/
```

### Responsibility

Create the workforce analytics dashboard.

### Tasks

Create charts and visualizations for:

- Attrition analysis
- Gender distribution
- Job role distribution
- Salary analysis
- Age analysis
- Employee wellbeing
- Job satisfaction
- Work-life balance
- Experience summary

### Allowed Component Creation

```text
src/components/charts/
```

### Service File

Implement:

```text
src/services/analyticsService.js
```

### Backend APIs

```http
GET /attrition
GET /gender-distribution
GET /job-role-distribution
GET /salary-analytics
GET /age-analytics
GET /employee-wellbeing
GET /experience-summary
GET /job-satisfaction
GET /work-life-balance
```

---

# Coding Guidelines

## Reusable Components

Create reusable components instead of duplicating code.

### ❌ Avoid

```text
EmployeeCard.jsx
SalaryCard.jsx
DepartmentCard.jsx
```

### ✅ Prefer

```text
components/cards/
    MetricCard.jsx
```

Reuse components wherever possible.

---

## Naming Convention

### Components

Use **PascalCase**.

Examples:

```text
EmployeeTable.jsx
MetricCard.jsx
DashboardCard.jsx
```

### Functions

Use **camelCase**.

Examples:

```text
getEmployees()
getDashboardData()
fetchAnalytics()
```

---

# Testing Before Push

Before pushing your changes:

Run:

```bash
npm run dev
```

Verify:

- ✅ Page loads correctly
- ✅ No console errors
- ✅ API calls work
- ✅ Existing layout is not broken

---

# Git Workflow

After completing your work:

### Check status

```bash
git status
```

### Add files

```bash
git add .
```

### Commit

Example:

```bash
git commit -m "Added dashboard UI"
```

### Push

Example:

```bash
git push origin feature/dashboard-ui
```

Finally, create a **Pull Request** for review.

### Before merging:

- Pull latest feature/frontend-foundation changes.
- Resolve conflicts if any.
- Request review before merging.
---

# Important Rules

- Do **not** push directly to the `main` branch.
- Do **not** modify another developer's module.
- Do **not** modify common files without prior discussion.
- Keep all API calls inside the `services` folder.
- Pull the latest code before starting work.
- Test your changes before pushing.
- Keep components reusable and modular.

---

# Final Integration Plan

After all modules are completed:

```text
Dashboard Module
        +
Employee Module
        +
Analytics Module
        ↓
AI-Powered Workforce Analytics Dashboard
```

All modules will then be integrated and tested together.

---

# Frontend Team

| Developer | Module |
|-----------|--------|
| **Sai Kavya** | Dashboard Development |
| **Vishnu Vardhan** | Employee Management Development |
| **Sudeeksha** | Analytics Development |

---

# Project Maintainer

**Sai Kavya**