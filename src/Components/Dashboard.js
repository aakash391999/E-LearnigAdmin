import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { Outlet } from "react-router-dom";
import Sidebar from "./SideBar/Sidebar";
import "../App.css"; // Ensure you have the correct CSS for styling

const Dashboard = () => {
  const dispatch = useDispatch();
  const logoutButton = () => {
    dispatch(logout());
  };
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="dashboard-container">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={handleSidebarToggle} />
      <div
        className={`content ${
          isSidebarOpen ? "content-expanded" : "content-collapsed"
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
