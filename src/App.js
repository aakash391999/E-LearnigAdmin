import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProtectedRoute from "./Components/ProtectedRoute";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import DashboardHome from "./Components/DashboardHome/DashboardHome.js";
import Profile from "./Components/Profile";
import Settings from "./Components/Settings";
import CartScreen from "./Components/CartScreen";
import Charts from "./Components/Charts";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import AddCourse from "./Components/AddCourseScreen";
import EditCourse from "./Components/EditCourseScreen";
import CoursesList from "./Components/CoursesScreen/CoursesScreen.js";
import Lessions from "./Components/Lessions/Lessions.js";
import ChatBot from "./Components/ChatBot/ChatBot.js";
import LessonDetails from "./Components/LessonDetails/LessonDetails.js";

const App = () => {
  const client = new ApolloClient({
    uri: "http://localhost:4000/",
    cache: new InMemoryCache(),
  });

  const isAuth = useSelector((state) => state?.auth?.userData?.token);

  return (
    <ApolloProvider client={client}>
      <Routes>
        <Route
          path="/login"
          element={isAuth ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<Dashboard />} />}
        >
          <Route index element={<Navigate to="home" />} />
          <Route path="home" element={<DashboardHome />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route
            loader={() => console.log("hkeee")}
            path="CartScreen"
            element={<CartScreen />}
          />
          <Route path="Chart" element={<Charts />} />
          <Route path="addCourse" element={<AddCourse />} />
          <Route path="editCourse/:id" element={<EditCourse />} />
          <Route path="CoursesList" element={<CoursesList />} />
          <Route path="Lessions/:id" element={<Lessions />} />
          <Route path="ChatBot" element={<ChatBot />} />
          <Route path="LessonDetails/:name" element={<LessonDetails />} />
        </Route>
        <Route
          path="/"
          element={<Navigate to={isAuth ? "/dashboard" : "/login"} />}
        />
      </Routes>
    </ApolloProvider>
  );
};

export default App;
