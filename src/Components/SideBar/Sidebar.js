import React from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaCog,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaLuggageCart,
  FaRegEdit,
  FaRegListAlt,
  FaFolderPlus,
} from "react-icons/fa";
import "./Sidebar.css";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      dispatch(logout());
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <ul className="nav">
          <li>
            <Link to="home" className="nav-link">
              <FaHome /> {isOpen && "Home"}
            </Link>
          </li>
          <li>
            <Link to="profile" className="nav-link">
              <FaUser /> {isOpen && "Profile"}
            </Link>
          </li>
          <li>
            <Link to="settings" className="nav-link">
              <FaCog /> {isOpen && "Settings"}
            </Link>
          </li>
          <li>
            <Link to="CartScreen" className="nav-link">
              <FaLuggageCart /> {isOpen && "Cart"}
            </Link>
          </li>
          <li>
            <Link to="CoursesList" className="nav-link">
              <FaRegListAlt /> {isOpen && "CoursesList"}
            </Link>
          </li>
          <li>
            <Link to="addCourse" className="nav-link">
              <FaFolderPlus /> {isOpen && "addCourse"}
            </Link>
          </li>
          {/* <li>
            <Link to="editCourse" className="nav-link">
              <FaRegEdit /> {isOpen && "editCourse"}
            </Link>
          </li> */}

          <li>
            <button className="nav-link logout-btn" onClick={handleLogout}>
              <FaSignOutAlt /> {isOpen && "Logout"}
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
