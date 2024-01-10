import React from "react";
import { Link } from "react-router-dom";
import "../../assets/Style/loginstyle.css";
import {
  BsFillLungsFill,
  BsGrid1X2Fill,
  BsCapsule,
  BsPeopleFill,
  BsFillGrid3X3GapFill,
  BsListCheck,
  BsMenuButtonWideFill,
  BsFillGearFill,
} from "react-icons/bs";
import { MdLogout } from "react-icons/md";

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <BsFillLungsFill className="icon_header" /> MediBook
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <Link to="/admin">
            <BsGrid1X2Fill className="icon" /> Dashboard
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/admin/doctors">
            <BsCapsule className="icon" /> Doctors Management
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/admin/users">
            <BsPeopleFill className="icon" /> Patient Management
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/admin/services">
            <BsMenuButtonWideFill className="icon" /> Get Services
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/admin/bookings">
            <BsListCheck className="icon" /> Booking
          </Link>
        </li>

        <li className="sidebar-list-item">
          <Link to="">
            <MdLogout className="icon" /> Logout
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
