# 🩺 DocSys Frontend — Doctor–Patient Friendly Application (React)

This is the frontend of **DocSys**, a doctor-friendly web application that simplifies patient management, treatments, medical reports, and follow-up records.  
Built using **React + Vite**, the UI is modern, fast, and fully optimized for doctors.

---

## 🚀 Features

### 🎨 UI & UX
- Modern, clean design using **Bootstrap 5**.
- Responsive layout for desktop & mobile.
- Intuitive doctor-friendly workflow.

### 👨‍⚕️ Patient Management
- Add, edit, delete, and view complete patient profiles.
- View medical history, complaints, diagnosis, treatments, and follow-up data.

### 📄 Reports & Files
- Upload PDFs / images to cloud storage using backend Cloudinary integration.
- Preview uploaded reports inside the UI.

### 🔐 Authentication
- JWT-based login integrated with backend.
- React Context for auth state.
- Protected routes using React Router.

### 📊 Dashboard
- Insights like patient count, recent visits, and quick actions.

---

## 🛠️ Tech Stack

- **React.js**
- **React Router**
- **Bootstrap 5**
- **Axios**
- **Vite**
- **React Context API**

---

## 📁 Project Structure
src/
├── components/
├── layouts/
├── pages/
├── context/
├── hooks/
├── utils/
├── assets/
└── App.jsx

2️⃣ Start Development Server
npm run dev

3️⃣ Build for Production
npm run build
🔧 Environment Variables

Create a .env file:

VITE_BACKEND_URL=https://your-backend-url.com

🌐 API Communication

All API calls use Axios:

axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/patients`);

