import React from "react";
import "../../assets/Style/loginstyle.css";
import { BsSearch, BsJustify } from "react-icons/bs";

function Header({ OpenSidebar }) {
  return (
    <header className="adminheader">
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>
      <div className="header-left">
        <BsSearch className="icon" />
      </div>
    </header>
  );
}

export default Header;
