# AI-Powered Workforce Analytics & Talent Intelligence Dashboard

## Overview

The **AI-Powered Workforce Analytics & Talent Intelligence Dashboard** is being developed as part of the **Infosys Springboard Internship**.

This project aims to build an intelligent workforce analytics platform that provides HR insights using **FastAPI**, **MongoDB Atlas**, **Google Cloud Platform (GCP)**, **BigQuery**, **Vertex AI**, and a **React-based dashboard**.

The platform enables employee management, workforce analytics, department insights, attrition analysis, and AI-powered decision support.

---

# Features

### Employee Management
- Employee CRUD APIs
- Employee search by Employee ID
- Employee pagination

### Workforce Analytics
- Dashboard Overview
- Attrition Analytics
- Department Analytics
- Gender Distribution
- Job Role Distribution
- Salary Analytics
- Age Analytics
- Employee Wellbeing Analytics
- Experience Summary
- Job Satisfaction Distribution
- Work-Life Balance Distribution
- Salary Distribution by Department
- Age Group Distribution

### API Documentation

- Interactive Swagger UI
- Automatic request/response documentation

---

# Project Status

🚧 The project is currently under active development.

## Completed

- ✅ Workforce dataset preparation
- ✅ Data cleaning and preprocessing
- ✅ Dataset expansion to 10,000 employee records
- ✅ MongoDB Atlas database setup
- ✅ MongoDB integration with FastAPI
- ✅ Modular FastAPI backend
- ✅ Employee CRUD APIs
- ✅ Workforce Analytics APIs
- ✅ Dashboard APIs
- ✅ Swagger API documentation
- ✅ MongoDB connection testing

## In Progress

- 🔄 Google Cloud Platform Integration
- 🔄 React Dashboard Development
- 🔄 Vertex AI Integration
- 🔄 Workflow Automation

---

# Development Roadmap

## Phase 1 – Data Collection
- ✅ Dataset Collection

## Phase 2 – Data Preparation
- ✅ Data Cleaning
- ✅ Data Augmentation
- ✅ Dataset Preparation

## Phase 3 – Database
- ✅ MongoDB Atlas
- ✅ Employee Collection
- ✅ Data Import

## Phase 4 – Backend Development
- ✅ FastAPI Project Setup
- ✅ MongoDB Connection
- ✅ REST API Development
- ✅ Analytics APIs
- ✅ API Testing (Swagger)

## Phase 5 – Google Cloud Platform
- 🔄 Cloud Storage
- 🔄 ETL Pipeline
- 🔄 Cloud Composer
- 🔄 BigQuery
- 🔄 Dataform

## Phase 6 – Frontend
- 🔄 React Dashboard

## Phase 7 – Vertex AI
- 🔄 Gemini Integration

## Phase 8 – Automation
- 🔄 Cloud Composer Workflow Automation

---

# Technology Stack

## Backend

- Python 3.13
- FastAPI
- Uvicorn
- PyMongo
- Pydantic
- python-dotenv

## Database

- MongoDB Atlas

## Cloud (Upcoming)

- Google Cloud Platform
- Cloud Storage
- BigQuery
- Dataform
- Cloud Composer
- Vertex AI

## Frontend (Upcoming)

- React

---

# Getting Started

> **Note:** These setup instructions have been tested on Windows PowerShell.

---

## Step 1 — Clone the Repository

```bash
git clone https://github.com/SaiKavya210804/AI_Powered_Workforce_Analytics_-_Talent_Intelligence_Dashboard_Team_B.git

cd AI_Powered_Workforce_Analytics_-_Talent_Intelligence_Dashboard_Team_B
```

---

## Step 2 — Create Virtual Environment

```bash
python -m venv venv
```

---

## Step 3 — Activate Virtual Environment

PowerShell

```powershell
.\venv\Scripts\Activate.ps1
```

Expected

```text
(venv)
```

---

## Step 4 — Install Dependencies

```bash
pip install -r requirements.txt
```

---

## Step 5 — Configure Environment Variables

Create a file named

```text
.env
```

Add

```env
MONGODB_URI=your_mongodb_connection_string
```

> **Important:** Never commit the `.env` file to GitHub.

---

## Step 6 — Run the Application

```bash
python run.py
```

Expected output

```text
INFO: Uvicorn running on http://127.0.0.1:8000
```

---

## Step 7 — Verify the Application

### Home

```
http://127.0.0.1:8000/
```

Expected

```json
{
  "message": "Welcome to the AI-Powered Workforce Analytics API"
}
```

---

### Database Connection

```
http://127.0.0.1:8000/test-db
```

Expected

```json
{
  "status": "Connected Successfully",
  "total_employees": 10000
}
```

---

### Swagger Documentation

```
http://127.0.0.1:8000/docs
```

Swagger UI displays all available APIs.

---

# Available API Endpoints

| Category | Endpoint |
|----------|----------|
| Home | `/` |
| Database | `/test-db` |
| Employees | `/employees` |
| Employees | `/employee/{emp_id}` |
| Departments | `/departments` |
| Dashboard | `/dashboard` |
| Analytics | `/attrition` |
| Analytics | `/gender-distribution` |
| Analytics | `/job-role-distribution` |
| Analytics | `/salary-analytics` |
| Analytics | `/age-analytics` |
| Analytics | `/employee-wellbeing` |
| Analytics | `/attrition-by-department` |
| Analytics | `/experience-summary` |
| Analytics | `/job-satisfaction` |
| Analytics | `/work-life-balance` |
| Analytics | `/salary-distribution` |
| Analytics | `/age-distribution` |

---

# Project Architecture

```
MongoDB Atlas
      │
      ▼
 FastAPI Backend
      │
      ▼
 REST APIs
      │
      ▼
 React Dashboard
      │
      ▼
 Vertex AI (Upcoming)
```

---

# Project Structure

```text
AI_Powered_Workforce_Analytics_-_Talent_Intelligence_Dashboard_Team_B
│
├── app/
│   ├── __init__.py
│   ├── config.py          # Environment configuration
│   ├── database.py        # MongoDB connection
│   ├── main.py            # FastAPI application
│   ├── models.py          # Pydantic models
│   ├── routes.py          # API endpoints
│   └── utils.py           # Analytics utility functions
│
├── .gitignore
├── README.md
├── requirements.txt
└── run.py
```

---

# GitHub Rules

Never upload

- `.env`
- `venv/`
- `__pycache__/`

Example `.gitignore`

```gitignore
venv/
.env
__pycache__/
*.pyc
.vscode/
.DS_Store
```

---

# How to Contribute

1. Pull the latest changes.

```bash
git pull
```

2. Create a feature branch.

```bash
git checkout -b feature/feature-name
```

3. Make your changes.

4. Test the application.

5. Commit.

```bash
git add .
git commit -m "Describe your changes"
```

6. Push.

```bash
git push origin feature/feature-name
```

7. Create a Pull Request.

---

# Future Enhancements

- Google Cloud Storage Integration
- ETL Pipeline
- BigQuery Analytics
- Dataform Transformations
- React Dashboard
- Vertex AI Chatbot
- Predictive Attrition Analytics
- Automated Workforce Pipelines

---

# Contributors

Developed as part of the **Infosys Springboard Internship**.

### Team Members

- Sai Kavya (Project Owner)
- Vidushi Bhardwaj
- Vishnu Vardhan
- Ankit Rajak
- Bhagyashri Shinde
- Gayatri Jarajapu
- GVL Sahithi
- Sudeekshaa

---

# License

This project is licensed under the **MIT License**.

---

# Internship

Developed under the **Infosys Springboard Internship Program**.

---

# Project Maintainer

**Sai Kavya**

For project setup, repository access, or technical queries, please contact the project owner.