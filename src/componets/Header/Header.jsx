import { useEffect, useRef, useContext } from "react";
import React from "react";
import logo from "../../assets/images/logo.png";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { FiBell, FiUser } from "react-icons/fi"; // Import the notification and profile icons
import { authContext } from "../../context/AuthContext.jsx";

const navLinks = [
  {
    path: "/",
    display: "Home",
  },
  {
    path: "/doctors",
    display: "Find a Doctor",
  },
  {
    path: "/services",
    display: "Services",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];

const Header = () => {
  const navigate = useNavigate();
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const { user, role, token } = useContext(authContext);
  const notificationCount = user?.notification?.length || 0;
  const handlestickyheader = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  useEffect(() => {
    handlestickyheader();
    return () => window.removeEventListener("scroll", handlestickyheader);
  });

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");

  return (
    <header className="header flex items-center" ref={headerRef}>
      <div className="container">
        <div className="flex items-center justify-between">
          {/* ======= log ======== */}
          <div>
            <img src={logo} alt="" />
          </div>
          {/* ======= menu ======== */}
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
          <ul className="menu flex item-center gap-[2.7rem]">
              {navLinks.map(
                (link, index) =>
                  // Conditionally render the 'Find a Doctor' and 'Services' links based on user's role
                  !(link.path === "/doctors" && role === "doctor") &&
                  !(link.path === "/services" && role === "doctor") && (
                    <li key={index}>
                      <NavLink
                        to={link.path}
                        className={(navClass) =>
                          navClass.isActive
                            ? "text-primaryColor text-[16px] leading-7 font-[600]"
                            : "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor"
                        }
                      >
                        {link.display}
                      </NavLink>
                    </li>
                  )
              )}
            </ul>
          </div>

          {/* ======= nav right ======== */}
          <div className="flex items-center gap-4">
            {token && user ? (
              <div>
                <Link
                  to={`${
                    role === "doctor"
                      ? "/doctors/profile/me"
                      : "users/profile/me"
                  }`}
                >
                  <span className="text-primaryColor text-2xl cursor-pointer">
                    <FiUser />
                  </span>
                </Link>
              </div>
            ) : (
              <Link to="/login">
                <button className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]">
                  Login
                </button>
              </Link>
            )}

            <span className="md:hidden" onClick={toggleMenu}>
              <BiMenu className="w-6 h-6 cursor-pointer" />
            </span>

            {/* Notification Icon */}

            <span
              className="text-primaryColor text-2xl cursor-pointer"
              count={notificationCount} // Use the notificationCount variable here
              onClick={() => {
                navigate("/notification");
              }}
              style={{ cursor: "pointer" }}
            >
              <FiBell />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
