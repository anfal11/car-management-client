import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.svg";
import { AiOutlineSearch } from "react-icons/ai";
import { BsCart } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";
import toast from "react-hot-toast";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    if (user) {
      setUserProfile({
        displayName: user.displayName,
        photoURL: user.photoURL,
      });
    }
  }, [user]);

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("User logged out successfully");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const navItems = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "border-b-2  text-[#FF3811] border-b-blue-500 font-bold"
              : ""
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="about"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "border-b-2  text-[#FF3811] border-b-blue-500 font-bold"
              : ""
          }
        >
          About
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/services"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "border-b-2  text-[#FF3811] border-b-blue-500 font-bold"
              : ""
          }
        >
          Services
        </NavLink>
      </li>

      {user?.email ? (
        <>
          <li>
            <NavLink to="/bookings" className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "border-b-2  text-[#FF3811] border-b-blue-500 font-bold"
              : ""}>My Bookings</NavLink>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </>
      ) : (
        <li>
          <NavLink to="/login" className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "border-b-2  text-[#FF3811] border-b-blue-500 font-bold"
              : ""}>
            Login
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    // <div className="sticky top-0">
    <div>
      <div className="navbar h-28 mb-8">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navItems}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost normal-case text-xl">
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>
        <div className="navbar-end gap-4">
          {user?.email && userProfile && userProfile.photoURL && (
            <img
              className="rounded-full mr-3"
              src={userProfile.photoURL}
              alt="Profile"
            />
          )}
          <BsCart className="text-2xl"></BsCart>
          <AiOutlineSearch className="text-2xl"></AiOutlineSearch>
          <Link
            to=""
            className="btn btn-outline text-[#FF3811] hover:bg-[#FF3811] hover:border-[#FF3811]"
          >
            Appointment
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
