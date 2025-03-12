# 🎓 Academic Issue Tracking System

> **A chaotic but structured way for students, lecturers, and registrars to handle academic issues!**  
> *"Because we all love bureaucracy, right?"* 😏

---

## 🚀 About the Project

Ever had an issue in your university and thought, _"Wow, I wish I could officially complain about this with an actual system instead of sending emails into the void?"_  
Well, **here it is!**

The **Academic Issue Tracking System** is built to streamline academic complaints, inquiries, and requests between students, lecturers, and registrars. No more endless email chains! No more mysterious "lost" requests! Just pure, academic-grade accountability. 🎯

![Mockup Screenshot](https://via.placeholder.com/800x400.png?text=Academic+Issue+Tracking+Mockup)

---

## 🔥 Features

### 🎓 For Students:
- Create issues (e.g., missing grades, registration errors, existential academic crises)
- Track issue status & progress
- Receive responses from lecturers & registrars
- Get notified about issue updates (no need to spam your inbox!)

### 👨‍🏫 For Lecturers:
- View student-submitted issues
- Respond to and resolve academic complaints
- Forward issues to registrars if it's "above their pay grade" 😆

### 🏛️ For Registrars:
- View all academic issues in one central hub
- Assign issues to responsible personnel
- Close issues once resolved

---

## 🛠️ Tech Stack

This project is powered by a lovely mix of cutting-edge and battle-tested technologies:

### Backend 🏗️ (Django)
- **Django** (because we love Pythonic efficiency)
- **Django Rest Framework (DRF)** (for REST API goodness)
- **JWT Authentication** (because nobody likes dealing with passwords more than necessary)

### Frontend 🎨 (ReactJS)
- **React.js** (for an interactive and fast UI)
- **Axios** (for smooth API communication)
- **JWT for authentication** (because sessions are so 2010s)
- **React Router** (for seamless navigation)

### DevOps & Other Magic 🎩
- **NPM** (for package management)
- **CORS** (because APIs hate talking to different origins by default)

---

## 🏗️ Installation & Setup

### 1️⃣ Clone the Repo
```bash
   git clone https://github.com/your-username/academic-issue-tracker.git
   cd academic-issue-tracker
```

### 2️⃣ Backend Setup (Django)
```bash
   cd backend
   python -m venv venv  # Create virtual environment
   source venv/bin/activate  # Activate it (Linux/macOS)
   venv\Scripts\activate  # (Windows)
   pip install -r requirements.txt  # Install dependencies
   python manage.py migrate  # Apply migrations
   python manage.py runserver  # Run server
```

### 3️⃣ Frontend Setup (ReactJS)
```bash
   cd frontend
   npm install  # Install dependencies
   npm start  # Start the React app
```

---

## 🔗 API Endpoints & Interactions

### 🔑 Authentication
- **POST** `/api/auth/login/` → Logs in a user, returns JWT token.
- **POST** `/api/auth/register/` → Registers a new user.
- **POST** `/api/auth/logout/` → Logs out the user.

### 📝 Issues Management
- **GET** `/api/issues/` → Fetch all issues (admin/registrars only)
- **POST** `/api/issues/` → Submit a new academic issue
- **GET** `/api/issues/{id}/` → Fetch a specific issue
- **PUT** `/api/issues/{id}/` → Update issue details (lecturers/registrars only)
- **DELETE** `/api/issues/{id}/` → Remove an issue (registrars only)

### 📣 Notifications
- **GET** `/api/notifications/` → Fetch unread notifications
- **POST** `/api/notifications/mark-read/` → Mark notifications as read

---

## 🎭 Mockups & UI Interactions

Here's what the UI looks like (in all its pixel-perfect glory):

| Student Dashboard | Lecturer Dashboard | Registrar Panel |
|------------------|------------------|----------------|
| ![Student Mockup](https://via.placeholder.com/400x250.png?text=Student+Dashboard) | ![Lecturer Mockup](https://via.placeholder.com/400x250.png?text=Lecturer+Dashboard) | ![Registrar Mockup](https://via.placeholder.com/400x250.png?text=Registrar+Panel) |

---

## 📄 File Structure

```
📂 academic-issue-tracker
 ├── 📂 backend
 │   ├── manage.py
 │   ├── 📂 api
 │   │   ├── models.py
 │   │   ├── views.py
 │   │   ├── serializers.py
 │   │   ├── urls.py
 │   ├── 📂 authentication
 │   ├── settings.py
 │   ├── urls.py
 ├── 📂 frontend
 │   ├── src
 │   │   ├── components
 │   │   ├── pages
 │   │   ├── App.js
 │   │   ├── index.js
 │   ├── package.json
 │   ├── .env
```

---

## 🛠️ Contribution Guidelines

Wanna contribute? We love help! (Just don’t break the entire system, please 🙏)

1. Fork the repo 🍴
2. Create your feature branch `git checkout -b feature/amazing-feature`
3. Commit changes `git commit -m "Added an amazing feature"`
4. Push it `git push origin feature/amazing-feature`
5. Open a Pull Request 🚀

---

## 🤝 Acknowledgments

Special thanks to:
- **Stack Overflow** (for answering 98% of our debugging issues)
- **Django & React Devs** (for making web development easier and more fun!)
- **Caffeine** (because without it, this project wouldn’t exist)

---

## 📜 License

This project is licensed under the MIT License - because open-source is love, open-source is life. ❤️

---

## 🎯 Final Words

If you’ve made it this far, you deserve a cookie 🍪.

Happy coding! 🚀

