# AI-Powered Workforce Analytics & Talent Intelligence Dashboard

## Overview

This project is being developed as part of the Infosys Springboard Internship.

The objective of this project is to build an AI-powered workforce analytics platform using MongoDB Atlas, FastAPI, Google Cloud Platform (GCP), BigQuery, Vertex AI, and an interactive dashboard for workforce insights.

---

## Prerequisites

Before setting up the project, ensure you have:

- Python 3.13 or later
- Git
- Visual Studio Code (recommended)
- A MongoDB Atlas account or access to the shared project database

---

## Project Status

🚧 Currently under active development.

The backend setup, MongoDB integration, and API development are in progress. Additional features such as GCP integration, BigQuery, Vertex AI, and the analytics dashboard will be added in upcoming phases.

### Completed

- ✅ Data preprocessing completed
- ✅ MongoDB Atlas database created
- ✅ 10,000 employee records imported into MongoDB
- ✅ FastAPI backend initialized
- ✅ MongoDB connected successfully
- ✅ Swagger API documentation enabled

---

## Roadmap

- ✅ Data Preprocessing
- ✅ MongoDB Atlas Integration
- ✅ FastAPI Project Setup
- 🔄 Employee APIs
- 🔄 Department Analytics APIs
- 🔄 Attrition Analytics
- ⏳ Google Cloud Platform (GCP)
- ⏳ BigQuery
- ⏳ Dataform
- ⏳ Vertex AI
- ⏳ Dashboard Development
- ⏳ Deployment

---

# Getting Started

> **Note:** These setup instructions have been tested on Windows PowerShell. If you're using macOS or Linux, the commands to activate the virtual environment will be different.

---

## Step 1: Clone the Repository

```bash
git clone https://github.com/SaiKavya210804/AI_Powered_Workforce_Analytics_-_Talent_Intelligence_Dashboard_Team_B.git
cd AI_Powered_Workforce_Analytics_-_Talent_Intelligence_Dashboard_Team_B
```

> The repository already contains the required project structure. Do not recreate folders manually unless instructed.

---

## Step 2: Create a Virtual Environment

Windows

```bash
python -m venv venv
```

---

## Step 3: Activate the Virtual Environment

PowerShell

```powershell
.\venv\Scripts\Activate.ps1
```

You should now see:

```text
(venv)
```

before your terminal prompt.

---

## Step 4: Install Project Dependencies

```bash
pip install -r requirements.txt
```

---

## Step 5: Create the Environment File

Create a file named:

```text
.env
```

inside the project root.

Add the following:

```env
MONGODB_URI=your_mongodb_connection_string
```

> **Note:** Do not commit your `.env` file to GitHub. The MongoDB connection string will be shared securely by the project owner.
> Contact the project owner to obtain the MongoDB connection string securely.

---

## Step 6: Run the FastAPI Server

```bash
python run.py
```

If everything is configured correctly, you should see:

```text
INFO: Uvicorn running on http://127.0.0.1:8000
```

---

## Step 7: Verify the Application

Open the following URLs in your browser:

### Home

```
http://127.0.0.1:8000/
```

Expected Response

```json
{
    "message": "Welcome to the AI-Powered Workforce Analytics API"
}
```

---

### Database Connection Test

```
http://127.0.0.1:8000/test-db
```

Expected Response

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

Swagger UI should display all available API endpoints.

---

## Project Structure

```text
AI_Powered_Workforce_Analytics_-_Talent_Intelligence_Dashboard_Team_B
│
├── app/
│   ├── __init__.py
│   ├── config.py
│   ├── database.py
│   ├── main.py
│   ├── models.py
│   ├── routes.py
│   └── utils.py
│
├── .gitignore
├── README.md
├── requirements.txt
└── run.py
```

> **Local files (not committed to GitHub):**
>
> - `.env`
> - `venv/`

---

# Important Notes

### Do NOT upload the following files to GitHub

- `venv/`
- `.env`
- `__pycache__/`

These files are machine-specific or contain sensitive information.

---

## Configure `.gitignore`

Ensure your `.gitignore` contains:

```gitignore
# Virtual Environment
venv/

# Environment Variables
.env

# Python Cache
__pycache__/
*.pyc

# VS Code Settings
.vscode/

# macOS
.DS_Store
```

---

# How to Contribute

1. Pull the latest changes from the repository.
2. Create a new branch for your work.

```bash
git checkout -b feature/your-feature-name
```

3. Make your changes.
4. Test the application locally.
5. Commit your changes.

```bash
git add .
git commit -m "Describe your changes"
```

6. Push your branch.

```bash
git push origin feature/your-feature-name
```

7. Create a Pull Request on GitHub for review.

---

# Repository Rules

To keep the project organized, please follow these guidelines:

- Do not commit the `.env` file.
- Do not commit the `venv/` folder.
- Always pull the latest changes before starting work.
- Create a new branch for every feature or bug fix.
- Write clear and meaningful commit messages.
- Test your code before pushing.
- Create a Pull Request before merging into the `main` branch.
- Keep the README and requirements.txt updated when making significant changes.

---

> **Note:** During the initial development phase, the project owner may commit directly to the `main` branch. Once multiple contributors start developing features simultaneously, all contributions should be made through feature branches and Pull Requests.

## Current Technologies

- Python 3.13
- FastAPI
- Uvicorn
- MongoDB Atlas
- PyMongo
- Pydantic
- Pandas
- Python Dotenv

## Planned Technologies

- Google Cloud Platform (GCP)
- Cloud Storage
- BigQuery
- Dataform
- Vertex AI
- React / Streamlit

---

## Contributors

This project is being developed as part of the Infosys Springboard Internship.

Current Team Members:

- Sai Kavya (Project Owner)
- Vidushi Bhardwaj
- Vishnu Vardhan
- Ankit Rajak
- Bhagyashri Shinde
- Gayatri Jarajapu 
- GVL Sahithi
- Sudeekshaa

> Remaining team members will be added as they join the repository.

---

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

---

# Internship

Developed as part of the **Infosys Springboard Internship Program**.

---

## Project Maintainer

**Project Owner:** Sai Kavya

For setup issues, repository access, or project-related queries, please contact the project owner.