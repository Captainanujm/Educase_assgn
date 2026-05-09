# Node.js School Management API

A backend API service built with Node.js and Express to manage school data. This system allows users to securely add new schools to a MySQL database and fetch a list of schools sorted by proximity to a given set of geographical coordinates.

## 🚀 Features

- **Add School API**: Add a new school with its name, address, latitude, and longitude. Includes basic validation to ensure all fields are provided.
- **List Schools API**: Fetch all schools from the database and sort them based on their distance from the user's location.
- **Distance Calculation**: Uses the mathematical **Haversine formula** to accurately calculate the distance (in kilometers) between the user's location and the school's location.
- **Custom Sorting**: Implements a manual sorting algorithm (bubble sort) to order the schools from nearest to farthest.

## 🛠️ Tech Stack

- **Runtime Environment:** Node.js
- **Web Framework:** Express.js
- **Database:** MySQL (Cloud-hosted via Aiven)
- **Database Driver:** `mysql2` (using Promise-based connections)
- **Environment Variables:** `dotenv`
- **Cross-Origin Resource Sharing:** `cors`

## 📁 Project Structure

```text
├── db.js                     # Database connection pool and configuration
├── server.js                 # Main application file, contains API routes and logic
├── schema.sql                # SQL query to create the database table
├── postman_collection.json   # Postman collection for API testing
├── package.json              # Project metadata and dependencies
├── .env.example              # Example environment variables
└── README.md                 # Project documentation
```

## ⚙️ Setup and Installation

### 1. Prerequisites
- Node.js installed on your machine.
- A MySQL database (local or cloud-hosted).

### 2. Clone the Repository
```bash
git clone https://github.com/Captainanujm/Educase_assgn.git
cd Educase_assgn
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Database Configuration
1. Run the query found in `schema.sql` in your MySQL database to create the `schools` table.
2. Create a `.env` file in the root directory based on `.env.example`.
3. Fill in your MySQL connection details:

```env
PORT=3000
DB_HOST=your_database_host
DB_PORT=your_database_port
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
```
*(Note: If you are using a cloud provider like Aiven, `db.js` is already configured to accept self-signed certificates with `rejectUnauthorized: false`)*

### 5. Run the Application
```bash
node server.js
```
The server will start running on `http://localhost:3000`.

---

## 📡 API Documentation

### 1. Check Server Status
- **URL:** `/`
- **Method:** `GET`
- **Description:** A simple test route to check if the server is running.
- **Response:** `"server is running fine"`

### 2. Add a School
- **URL:** `/addSchool`
- **Method:** `POST`
- **Description:** Validates input data and inserts a new school into the database.
- **Headers:** `Content-Type: application/json`
- **Request Body:**
```json
{
    "name": "Delhi Public School",
    "address": "Sector 24, Mathura Road, New Delhi",
    "latitude": 28.5244,
    "longitude": 77.1855
}
```
- **Success Response (201 Created):**
```json
{
    "message": "school added successfully",
    "schoolId": 1
}
```

### 3. List Schools (Sorted by Proximity)
- **URL:** `/listSchools`
- **Method:** `GET`
- **Description:** Fetches all schools, calculates the distance from the provided coordinates, and returns a sorted list (nearest first).
- **Query Parameters:**
  - `latitude` (required)
  - `longitude` (required)
- **Example Request:** `GET /listSchools?latitude=28.6139&longitude=77.2090`
- **Success Response (200 OK):**
```json
{
    "data": [
        {
            "id": 1,
            "name": "Delhi Public School",
            "address": "Sector 24, Mathura Road, New Delhi",
            "latitude": 28.5244,
            "longitude": 77.1855,
            "distance": 10.213121673398515
        },
        {
            "id": 2,
            "name": "St. Xaviers School",
            "address": "Raj Nagar, Ghaziabad, Uttar Pradesh",
            "latitude": 28.6692,
            "longitude": 77.4538,
            "distance": 24.668369639902522
        }
    ]
}
```

## 🧪 Testing with Postman
A `postman_collection.json` file is included in the repository. You can import this file directly into Postman to easily test all the available API endpoints without setting up manual requests.
