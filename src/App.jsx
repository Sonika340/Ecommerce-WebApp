import { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";

// Layout
import Navbar from "./components/layouts/Navbar";

// Auth
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import ActivationCode from "./components/auth/ActivationCode";

// User Profile
import ProfileDashboard from "./components/profile/ProfileDashboard";
import ProfileIndexPage from "./components/profile/ProfileIndexPage";
import UpdateProfileInfo from "./components/profile/UpdateProfileInfo";
import UpdataProfilePicture from "./components/profile/UpdataProfilePicture";

// User Dashboard
import UserDashboard from "./components/profile/UserDashboard";
import UserDashboardHome from "./components/profile/UserDashboardHome";

// Routes
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";
import DashboardRedirect from "./routes/DashboardRedirect";

// Admin
import AdminDashboard from "./components/Admin/AdminDashboard";
import GetAllUsers from "./components/Admin/GetAllUsers";
import SingleUser from "./components/Admin/SingleUser";

// Courses
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import CreateCourse from "./pages/CreateCourse";
import EditCourse from "./pages/EditCourse";
import DeleteCourse from "./pages/DeleteCourse";

//notification
import Notifications from "./components/Admin/Notifications";

// Home
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <Fragment>
      <Router>
        <section id="navbar">
          <article className="container">
            {/* Navbar */}
            <aside className="top_header">
              <Navbar />
            </aside>

            {/* Main Content */}
            <main className="main">
              <Routes>
                {/* =========================
                    PUBLIC ROUTES
                ========================== */}

                <Route path="/" element={<HomePage />} />

                <Route path="/courses" element={<Courses />} />

                <Route path="/courses/:id" element={<CourseDetails />} />

                {/* Auth */}
                <Route path="/auth/register" element={<Register />} />

                <Route path="/auth/activate" element={<ActivationCode />} />

                <Route path="/auth/login" element={<Login />} />

                {/* =========================
                    AUTHENTICATED USER ROUTES
                ========================== */}

                <Route element={<ProtectedRoute />}>
                  {/* Common Dashboard URL */}
                  <Route path="/dashboard" element={<DashboardRedirect />} />

                  {/* User Dashboard */}
                  <Route path="/user/dashboard" element={<UserDashboard />}>
                    <Route index element={<UserDashboardHome />} />
                  </Route>

                  {/* User Profile */}
                  <Route path="/user/profile" element={<ProfileDashboard />}>
                    <Route index element={<ProfileIndexPage />} />

                    <Route
                      path="update-user-info"
                      element={<UpdateProfileInfo />}
                    />

                    <Route
                      path="update-profile-picture"
                      element={<UpdataProfilePicture />}
                    />
                  </Route>
                </Route>

                {/* =========================
                    ADMIN ROUTES
                ========================== */}

                <Route element={<AdminRoute />}>
                  <Route
                    path="/admin/admin-dashboard"
                    element={<AdminDashboard />}
                  >
                    <Route index element={<GetAllUsers />} />

                    <Route path="user/:id" element={<SingleUser />} />

                    <Route path="create-course" element={<CreateCourse />} />

                    <Route path="edit-course/:id" element={<EditCourse />} />
                    <Route path="delete-course" element={<DeleteCourse />} />

                     // Notification
                    <Route path="notifications" element={<Notifications />} /> 
                  </Route>
                </Route>
              </Routes>
            </main>
          </article>
        </section>
      </Router>
    </Fragment>
  );
};

export default App;
