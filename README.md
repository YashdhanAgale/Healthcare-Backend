# Healthcare-Backend

This is a full-stack **backend application** developed using **Node.js**, **Express.js**, **Sequelize**, and **PostgreSQL**.

The system handles:
- User authentication
- Patient & Doctor management
- Many-to-many doctor-patient mapping
- JWT-based secure route access

---

## 🚀 Features

- ✅ Register/Login with secure password hashing
- ✅ JWT Authentication (Stored in HTTP-only cookies)
- ✅ Protected routes via middleware
- ✅ CRUD for Patients (user-specific)
- ✅ CRUD for Doctors
- ✅ Assigning & removing doctors from patients (Many-to-Many)
- ✅ Sequelize ORM with Associations
- ✅ PostgreSQL DB integration

---

## 📁 Folder Structure

.
├── config/
│ └── db.js
├── controllers/
│ ├── authController.js
│ ├── patientController.js
│ ├── doctorController.js
│ └── mappingController.js
├── middleware/
│ └── authMiddleware.js
├── models/
│ ├── User.js
│ ├── Patient.js
│ ├── Doctor.js
│ ├── Mapping.js
│ └── index.js
├── routes/
│ ├── authRoutes.js
│ ├── patientRoutes.js
│ ├── doctorRoutes.js
│ └── mappingRoutes.js
├── .env
├── server.js


---

## ⚙️ Tech Stack

- **Node.js**
- **Express.js**
- **Sequelize (ORM)**
- **PostgreSQL**
- **JWT (jsonwebtoken)**
- **bcryptjs**
- **cookie-parser**
- **dotenv**

---

🛡️ Authentication
JWT is created during login and stored in a cookie

authenticateUser middleware protects sensitive routes

Users can register/login/logout via auth routes



# http://localhost:5000/

# 📬 API Routes
# Auth
POST /api/auth/register – Register new user

POST /api/auth/login – Login user

GET /api/auth/logout – Logout user

# Patients
POST /api/patients/ – Create patient (auth required)

GET /api/patients/ – Get all patients of user

GET /api/patients/:id – Get single patient

PUT /api/patients/:id – Update patient

DELETE /api/patients/:id – Delete patient

# Doctors
POST /api/doctors/ – Add doctor (auth required)

GET /api/doctors/ – Get all doctors

GET /api/doctors/:id – Get single doctor

PUT /api/doctors/:id – Update doctor

DELETE /api/doctors/:id – Delete doctor

# Mappings
POST /api/mappings/ – Assign doctor to patient

GET /api/mappings/ – Get all mappings

GET /api/mappings/:patientId – Get mappings for patient

DELETE /api/mappings/:id – Remove doctor from patient

🧑‍💻 Developer
Yashodhan Agale
📧 yash007agale@gmail.com
📱 +91 92848 64414
