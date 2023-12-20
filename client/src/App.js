import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Layout from "./components/Layout";
import Profile from "./pages/Profile";
import Logout from "./pages/Logout";
import axios from "axios";
import { useEffect } from "react";
import Appointments from "./pages/Appointments";
import ApplyDoctor from "./pages/ApplyDoctor";
import Doctor from "./pages/Doctor";
import Users from "./pages/Users";
import Doctors from "./pages/Doctors";
import Notifications from "./pages/Notifications";

const App = () => {
  // const [user, setUser] = useState();
  // useEffect(() => {
  //   async function getData() {
  //     await axios
  //       .post("http://localhost:3433/api/user/auth", {
  //         headers: {
  //           Authorization: JSON.parse(localStorage.getItem("token")),
  //         },
  //       })
  //       .then((res) => setUser(res.data.user));
  //   }
  //   getData();
  // }, []);
  // console.log(user);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />
        <Route
          path="/users"
          element={
            <Layout>
              <Users />
            </Layout>
          }
        />

        <Route
          path="/doctor/:id"
          element={
            <Layout>
              <Doctor />
            </Layout>
          }
        />
        <Route
          path="/doctors"
          element={
            <Layout>
              <Doctors />
            </Layout>
          }
        />
        <Route
          path="/notifications"
          element={
            <Layout>
              <Notifications />
            </Layout>
          }
        />
        <Route
          path="/applydoctor"
          element={
            <Layout>
              <ApplyDoctor />
            </Layout>
          }
        />
        <Route
          path="/appointments"
          element={
            <Layout>
              <Appointments />
            </Layout>
          }
        />
        <Route
          path="/logout"
          element={
            <ProtectedRoute>
              <Layout>
                <Logout />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
