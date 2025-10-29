# Project Setup Guide

## Prerequisites

* Git
* Docker & Docker Compose
* Python 3 & Pip
* Node.js & npm

---

## Backend Setup (Flask)

1. **Clone the Project**
   ```bash
   git clone https://github.com/DariaSavuSoftwire/Bookish.git
   cd Bookish
   ```

2. **Configure Environment Variables**
   Rename `env.template` to `.env` and fill in your database details.

3. **Start the Database with Docker**
   From the project's root directory, run:
   ```bash
   docker-compose up -d
   ```

4. **Set Up Python Virtual Environment**
   Navigate to the backend directory (`bookish`), create, and activate a virtual environment.
   ```bash
   cd bookish
   python -m venv venv
   
   venv\Scripts\activate
   ```

5. **Install Python Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

6. **Apply Database Migrations**
   Initialize the migrations folder (only needs to be run once for the project), then create and apply the migrations to
   the database schema.
   ```bash
   # Run this only if the 'migrations' folder doesn't exist
   flask db init

   # Generate the migration script
   flask db migrate -m "Initial migration"
   
   # Apply the migration to the database
   flask db upgrade
   ```

7. **Add a default admin to your app**
   ```bash
   flask create-admin
   ```
   
8.  **Run the Backend Server**
   ```bash
   flask run
   ```
   The backend API will be available at `http://localhost:5000`.

---

## Frontend Setup (React)

1. **Navigate to the Client Directory**
   From the project's root directory:
   ```bash
   cd client
   ```

2. **Install Node Dependencies**
   ```bash
   npm install
   ```

3. **Run the Frontend Development Server**
   ```bash
   npm start
   ```
   The React application will open automatically in your browser at `http://localhost:3000`.
