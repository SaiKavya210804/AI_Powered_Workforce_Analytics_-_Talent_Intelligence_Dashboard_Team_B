# Frontend Development Guide

## AI-Powered Workforce Analytics & Talent Intelligence Dashboard

This document explains the frontend development workflow, completed foundation, module responsibilities, coding rules, and Git workflow for the frontend team.

The frontend foundation has already been completed.

The remaining frontend development is divided into three independent modules to reduce merge conflicts.

The common architecture should not be changed unless required because it is already connected with routing, layout, and backend communication.

---

## Current Frontend Status

### Completed Work

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

## Completed Common Structure

Current frontend structure:

```text
frontend/
└── src/
    ├── assets/
    │
    ├── components/
    │   ├── layout/
    │   │   ├── Layout.jsx
    │   │   ├── Sidebar.jsx
    │   │   └── TopNavbar.jsx
    │   │
    │   ├── cards/
    │   │   └── MetricCard.jsx
    │   │
    │   ├── charts/
    │   │   ├── GenderDistributionChart.jsx
    │   │   ├── AttritionChart.jsx
    │   │   ├── DepartmentChart.jsx
    │   │   ├── JobRoleChart.jsx
    │   │   ├── SalaryChart.jsx
    │   │   ├── AgeChart.jsx
    │   │   ├── SatisfactionChart.jsx
    │   │   ├── WorkLifeChart.jsx
    │   │   ├── AttritionDepartmentChart.jsx
    │   │   ├── WellbeingChart.jsx
    │   │   └── SalaryDepartmentChart.jsx
    │   │
    │   ├── chatbot/
    │   └── common/
    │
    ├── pages/
    │   ├── Dashboard/
    │   │   └── Dashboard.jsx
    │   │
    │   ├── Employees/
    │   │   └── Employees.jsx
    │   │
    │   ├── Departments/
    │   │
    │   ├── JobRoles/
    │   │
    │   ├── Analytics/
    │   │   └── Analytics.jsx
    │   │
    │   ├── AIAssistant/
    │   │   └── AIAssistant.jsx
    │   │
    │   ├── Reports/
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
    │   ├── dashboardService.js
    │   ├── employeeService.js
    │   └── analyticsService.js
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

## Before Starting Work

Every developer must follow these steps before starting development.

---

### Step 1: Pull Latest Changes

First, switch to the shared development branch:

```bash
git checkout develop
```

Pull the latest changes:

```bash
git pull origin develop
```

Always start development with the latest code.

---

### Step 2: Create Your Feature Branch

Do **not** work directly on:

```text
main
develop
feature/frontend-foundation
```

Create your own feature branch.

Example:

```bash
git checkout -b feature/module-name
```

Current feature branches:

#### Dashboard & Analytics

```bash
git checkout -b feature/dashboard-ui
```

#### Employee Management

```bash
git checkout -b feature/employee-management
```

#### AI Assistant & Utility Modules

```bash
git checkout -b feature/ai-utility
```

---

## Common Files Rule

The following files are shared across the complete frontend application.

Do **not** modify these files without discussion.

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

These files affect the complete application structure.

Unnecessary modifications may create merge conflicts between team members.

---

## API Development Rules

Never create Axios calls directly inside React components.

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

## Development Order

Follow this order while developing modules:

1. Understand the required backend APIs.
2. Implement service functions inside:

```text
src/services/
```

3. Test API responses.
4. Create reusable UI components.
5. Connect UI components with service functions.
6. Test the complete module.

---

## Module Responsibilities

Frontend development is divided into three independent modules.

Each developer should primarily work inside their assigned folders.

---

## Member 1 — Dashboard & Analytics Module

### Developer

**Sai Kavya**

### Working Folders

```text
src/pages/Dashboard/
src/pages/Analytics/
src/components/cards/
src/components/charts/
```

### Responsibility

Develop workforce dashboard and analytics visualization modules.

---

### Dashboard Tasks

- Create dashboard UI
- Create KPI cards
- Display workforce summary
- Connect dashboard APIs
- Add dashboard charts
- Display employee overview information

### Dashboard Features

- Total employees
- Attrition rate
- Department summary
- Average age
- Average income
- Gender distribution
- Department distribution
- Workforce overview

### Service File

Implement:

```text
src/services/dashboardService.js
```

### Backend APIs

```http
GET /dashboard
GET /attrition
GET /gender-distribution
GET /departments
```

---

### Analytics Tasks

Create workforce analytics visualizations:

- Job role distribution
- Salary analytics
- Age analytics
- Employee wellbeing
- Job satisfaction
- Work-life balance
- Attrition by department
- Salary distribution by department

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
GET /age-distribution
GET /employee-wellbeing
GET /experience-summary
GET /job-satisfaction
GET /work-life-balance
GET /salary-distribution
GET /attrition-by-department
```

---

## Member 2 — Employee Management Module

### Developer

**Vishnu Vardhan**

### Working Folders

```text
src/pages/Employees/
src/pages/Departments/
src/pages/JobRoles/
src/components/tables/
src/components/forms/
```

### Responsibility

Develop employee and organizational management features.

---

### Tasks

- Create employee listing
- Display employee records
- Create employee details page
- Add search functionality
- Add filtering
- Add pagination
- Implement CRUD operations
- Department management
- Job role management

### Service File

Implement:

```text
src/services/employeeService.js
```

### Backend APIs

```http
GET /employees
GET /employee/{emp_id}
POST /employees
PUT /employees/{emp_id}
DELETE /employees/{emp_id}
GET /departments
```

---

## Member 3 — AI Assistant & Utility Module

### Developer

**Sudeekshaa**

### Working Folders

```text
src/pages/AIAssistant/
src/pages/Reports/
src/pages/Settings/
src/components/chatbot/
src/components/common/
```

### Responsibility

Develop AI-based features and supporting utility modules.

---

### Tasks

- Create AI assistant interface
- Develop chatbot UI
- Handle user prompts
- Display AI responses
- Connect AI backend services
- Create report generation interface
- Create smart alerts interface
- Develop settings page
- Create reusable common components

### Service File

Implement:

```text
src/services/aiService.js
```

### Current Backend API

```http
POST /ask-ai
```

### Future APIs

```text
POST /predict
Reports APIs
Smart Alert APIs
```

---

## Coding Guidelines

### Reusable Components

Create reusable components instead of duplicate code.

#### ❌ Avoid

```text
EmployeeCard.jsx
SalaryCard.jsx
DepartmentCard.jsx
```

#### ✅ Prefer

```text
components/cards/
└── MetricCard.jsx
```

Reuse components wherever possible.

---

### Naming Convention

#### Components

Use PascalCase.

Examples:

```text
EmployeeTable.jsx
MetricCard.jsx
DashboardCard.jsx
```

#### Functions

Use camelCase.

Examples:

```text
getEmployees()
getDashboardData()
fetchAnalytics()
```

---

## Testing Before Push

Before pushing changes, run:

```bash
npm run dev
```

Verify:

- ✅ Page loads correctly
- ✅ No console errors
- ✅ API calls work correctly
- ✅ Existing layout is not broken

---

## Git Workflow

After completing development:

### Check Status

```bash
git status
```

### Add Changes

```bash
git add .
```

### Commit Changes

Example:

```bash
git commit -m "Added dashboard analytics module"
```

### Push Feature Branch

Example:

```bash
git push origin feature/dashboard-ui
```

Create a Pull Request after pushing.

---

### Before Merging

Before merging into `develop`:

- Pull the latest changes from `develop`.
- Resolve conflicts if required.
- Test the complete frontend.
- Request a review from team members.

---

## Important Rules

- Do not push directly to the `main` branch.
- Do not modify another developer's module without discussion.
- Do not modify common files unnecessarily.
- Keep all API calls inside the `services` folder.
- Pull the latest changes before starting work.
- Test before pushing.
- Keep components reusable and modular.

---

## Final Integration Plan

After completing all modules:

```text
Dashboard & Analytics Module
              +
Employee Management Module
              +
AI Assistant & Utility Module
              │
              ▼
AI-Powered Workforce Analytics Dashboard
```

All modules will be integrated and tested together.

---

## Frontend Team

| Developer | Module |
| ---------- | ------ |
| **Sai Kavya** | Dashboard & Analytics Development |
| **Vishnu Vardhan** | Employee Management Development |
| **Sudeekshaa** | AI Assistant & Utility Development |

---

## Project Maintainer

**Sai Kavya**