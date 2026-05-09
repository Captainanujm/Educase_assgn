# School Management API

A simple Node.js API for managing school data. Users can add schools and find schools sorted by proximity to their location.

## Tech Stack

- **Node.js** - Runtime
- **Express.js** - Web framework
- **MySQL** - Database
- **mysql2** - MySQL driver

## Setup Instructions

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd school-management-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup MySQL Database

- Make sure MySQL is running on your machine.
- Run the SQL script to create the database and table:

```bash
mysql -u root -p < schema.sql
```

Or manually run these commands in MySQL:

```sql
CREATE DATABASE IF NOT EXISTS school_management;
USE school_management;

CREATE TABLE IF NOT EXISTS schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL
);
```

### 4. Configure Environment Variables

- Copy `.env.example` to `.env`
- Update the values with your MySQL credentials:

```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=school_management
```

### 5. Start the server

```bash
# Development mode
npm run dev

# Production mode
npm start
```

The server will start at `http://localhost:3000`

---

## API Endpoints

### 1. Add School

**POST** `/addSchool`

**Request Body (JSON):**
```json
{
    "name": "Delhi Public School",
    "address": "Sector 24, Mathura Road, New Delhi",
    "latitude": 28.5244,
    "longitude": 77.1855
}
```

**Success Response (201):**
```json
{
    "success": true,
    "message": "School added successfully",
    "data": {
        "id": 1,
        "name": "Delhi Public School",
        "address": "Sector 24, Mathura Road, New Delhi",
        "latitude": 28.5244,
        "longitude": 77.1855
    }
}
```

**Error Response (400):**
```json
{
    "success": false,
    "message": "All fields are required: name, address, latitude, longitude"
}
```

---

### 2. List Schools (sorted by proximity)

**GET** `/listSchools?latitude=28.6139&longitude=77.2090`

**Success Response (200):**
```json
{
    "success": true,
    "message": "Schools fetched successfully",
    "count": 3,
    "data": [
        {
            "id": 1,
            "name": "Delhi Public School",
            "address": "Sector 24, Mathura Road, New Delhi",
            "latitude": 28.5244,
            "longitude": 77.1855,
            "distance": 10.23
        },
        {
            "id": 2,
            "name": "St. Xavier's School",
            "address": "Raj Nagar, Ghaziabad",
            "latitude": 28.6692,
            "longitude": 77.4538,
            "distance": 25.67
        }
    ]
}
```

> **Note:** `distance` is in kilometers, calculated using the Haversine formula.

---

## Postman Collection

Import the `postman_collection.json` file into Postman to test the APIs.

## Deployment

This API can be deployed on platforms like:
- **Render** (recommended - free tier)
- Railway
- Heroku

For Render:
1. Push code to GitHub
2. Create a new Web Service on Render
3. Connect your GitHub repo
4. Set Build Command: `npm install`
5. Set Start Command: `npm start`
6. Add environment variables in Render dashboard
