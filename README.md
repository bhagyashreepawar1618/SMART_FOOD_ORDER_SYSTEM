# 🍽 Mess Management & Voting System

#Live Links - 
backend :  https://food-management-egpl.onrender.com
---
A Full Stack Mess Meal Management System where:

- 👨‍💼 Admin sets daily menu
- 👩‍🎓 Students vote for their preferred meal
- 📊 Admin can view complete analytics dashboard
- 🫓 System calculates total required rotis automatically

--
#Live Screenshots
Order Summary of students
---
<img width="900" height="600" alt="image" src="https://github.com/user-attachments/assets/bda2fd5e-3f47-485d-81ca-75d4e532b123" />

---
Student Dashboard For Meal Selection
---
<img width="900" height="600" alt="image" src="https://github.com/user-attachments/assets/5645bffa-34c6-415e-80bf-035ffbe0cb17" />

---
Login Page For Admin
---
<img width="900" height="600" alt="image" src="https://github.com/user-attachments/assets/95e1eabe-050f-402c-b75c-1f151dcbd8a9" />

---
Other Options Availabe in Admin Profile
---
<img width="900" height="600" alt="image" src="https://github.com/user-attachments/assets/19954df2-f279-4a9d-aa93-255d51698702" />

---
Total Data Admin Dashboard
---
<img width="900" height="600" alt="image" src="https://github.com/user-attachments/assets/95f80a35-88ce-45bb-bbc1-51cb75a86c6a" />

---

---
## 🛠 Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios
- Context API

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Authentication & Security
- JWT (JSON Web Token)
- Access Token
- bcrypt (Password Hashing)
- Protected Routes
- Middleware Authentication

---

## 🚀 Features

### 👩‍🎓 Student Features

- Register / Login
- Secure JWT Authentication
- View Daily Menu (Date Based)
- Select:
  - Sabji
  - Sweet
  - Number of Rotis
- Vote only once per menu
- Update Profile (Full Name & Email)
- Update Password

---

### 👨‍💼 Admin Features

- Admin Login
- Create Daily Menu
- View All Students List
- View:
  - Selected Sabji
  - Selected Sweet
  - Number of Rotis
- Dashboard Analytics:
  - Total Orders
  - Total Rotis Required
  - Sabji Vote Count
  - Sweet Vote Count
- Update Profile
- Update Password

---

## 📊 Admin Dashboard

- 📋 Full student order table
- 🥘 Sabji vote statistics
- 🍰 Sweet vote statistics
- 🫓 Total rotis calculation
- 📈 MongoDB Aggregation Pipeline



## 🔐 Authentication Flow

1. User logs in
2. JWT Token generated
3. Token stored in frontend
4. Token sent via Authorization Header
5. Middleware verifies token
6. Access granted to protected routes

---
