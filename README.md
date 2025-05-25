# 🎓 ACADEMIC ISSUE TRACKING SYSTEM

> **A chaotic but structured way for students, lecturers, and registrars to handle academic issues!**  
> *"Because we all love bureaucracy, right?"* 😏

---

## 🚀 About the Project

Ever had an issue in your university and thought, _"Wow, I wish I could officially complain about this with an actual system instead of sending emails into the void?"_  
Well, **here it is!**

The **Academic Issue Tracking System** is built to streamline academic complaints, inquiries, and requests between students, lecturers, and registrars. No more endless email chains! No more mysterious "lost" requests! Just pure, academic-grade accountability. 🎯

![Mockup Screenshot](https://accademic-issue-tracking-system-j4tjyhz0d.vercel.app)

---

## 🔥 Features

### 🎓 For Students:
- Create issues (e.g., missing grades, registration errors, existential academic crises)
- Track issue status & progress
- Receive notifications from lecturers & registrars
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
   git clone https://github.com/mawande-johnpaul/Academic-Issue-Tracking-System.git
```

### 2️⃣ Backend Setup (Django)
```bash
   pipenv shell #Start venv
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

## 📄 File Structure

```
📂 academic-issue-tracker
 ├── 📂 backend
 │   ├── manage.py
 │   ├── 📂 logbook
 │   │   ├── models.py
 │   │   ├── views.py
 │   │   ├── serializers.py
 │   │   ├── urls.py
 │   ├── 📂 AITS
 │   ├── settings.py
 │   ├── urls.py
 ├── 📂 frontend
 │   ├── src
 │   │   ├── components
 │   │   ├── css
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

