# Task Management Application

## 📘 Overview
The **Task Management Application** is a feature-rich platform designed to help users create, track, and manage tasks with ease. Built using modern web technologies, it supports task creation, prioritization, status updates, and deadline tracking — all with a sleek and responsive UI.

## 🚀 Features
- **Task Creation**: Add tasks with a title, description, priority, status, and deadline.
- **Task Status Tracking**: Manage tasks through different stages like "To Do," "On Progress," and "Done."
- **Deadline Management**: Set deadlines and automatically detect expired tasks.
- **Success Notifications**: Show a success message on successful task creation.
- **Error Handling**: Properly handle API errors with user-friendly feedback.
- **Responsive Design**: Fully responsive UI for a seamless experience on any device.

## 🛠️ Tech Stack
- **Frontend**: React, TypeScript, Tailwind CSS, Lucide Icons
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose for schema handling)
- **HTTP Requests**: Axios

## 📂 Project Structure
```
├── components
│   ├── AddTaskForm.tsx
│   ├── TaskCard.tsx
│   └── TaskSuccessMessage.tsx
├── config
│   └── index.ts
├── pages
│   └── App.tsx
├── server
│   └── routes.ts
├── models
│   └── Task.ts
└── utils
    └── dateHelpers.ts
```

## 🚚 API Endpoints
- `POST /addTask`: Add a new task
- `GET /getAllTask`: Fetch all tasks
- `PUT /updateTask/:id`: Update a task by ID
- `DELETE /deleteTask/:id`: Delete a task by ID

## 🏁 Getting Started

1. **Clone the repository:**
```bash
git clone https://github.com/Sawan-Kushwah/task-management.git
```

2. **Install dependencies:**
```bash
cd task-management
npm install
```

3. **Set up environment variables:**
Create a `.env` file in the root directory and add your MongoDB connection string and server configuration.

4. **Run the development server:**
```bash
npm run dev
```

5. **Start the backend server:**
```bash
cd server
npm start
```

## ✅ Usage
1. **Add Tasks:** Fill out the task form and submit to create a new task.
2. **View Tasks:** See a list of all tasks, including their status and deadlines.
3. **Update/Delete Tasks:** Edit task details or remove them as needed.
4. **Manage Task Status:** Easily switch tasks between "To Do," "On Progress," and "Done."

## 🧩 Future Improvements
- ✅ Drag-and-drop task management
- ✅ User authentication and role-based access
- ✅ Task categories and tags
- ✅ Real-time updates with WebSockets

## 🧑‍💻 Author
Created by **Sawan Kushwah** — [GitHub](https://github.com/Sawan-Kushwah)

---

If you have any feedback or suggestions, feel free to reach out! 🚀

