# Lead Manager -

## Project Overview

Lead Manager is a Mini CRM (Customer Relationship Management) application developed as a full-stack developer assignment.

This application helps users manage leads efficiently. Users can add, view, edit, delete, search, and update the status of leads.

## Features

- Add new leads with name, email, phone, company, source, and status.
- View all leads in a table.
- Edit existing lead details.
- Update lead status.
- Delete leads.
- Search leads by name.
- Filter leads by status.
- Form validation on the frontend and backend.
- Store lead information in MongoDB.

 Technologies Used

### Frontend

- React.js
- Vite
- Tailwind CSS
- Axios
- Lucide React

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

### Tools

- Visual Studio Code
- Postman
- MongoDB Compass
- Git & GitHub

## Project Structure

```text
Lead-manager/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   └── package.json
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── README.md
```

## Installation and Setup

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the project folder

```bash
cd Lead-manager
```

### 3. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/lead_manager
```

Start the backend server:

```bash
npm run dev
```

Backend runs at:

```text
http://localhost:5000
```

### 4. Setup Frontend

Open a new terminal:

```bash
cd frontend
npm install
```

Create a `.env` file inside the frontend folder:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

## API Endpoints

| Method | Endpoint         | Description       |
| ------ | ---------------- | ----------------- |
| GET    | `/api/leads`     | Get all leads     |
| POST   | `/api/leads`     | Create a new lead |
| PUT    | `/api/leads/:id` | Update a lead     |
| DELETE | `/api/leads/:id` | Delete a lead     |

## Lead Status

- New
- Contacted
- Qualified
- Lost

## Database

MongoDB is used to store lead information. Mongoose is used for database schema definition and CRUD operations.

## Author

Developed as a full-stack developer assignment.

**Technologies:** React.js, Node.js, Express.js, MongoDB, Tailwind CSS

## Future Improvements

- User authentication and authorization.
- Dashboard with lead statistics.
- Pagination and sorting.
- Improved search and filtering.
- Unit and integration testing.
