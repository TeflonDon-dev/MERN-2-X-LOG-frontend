import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { BsFillCartFill, BsSun, BsMoonStars } from "react-icons/bs";
import { RxAvatar } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../features/authSlice";
import { toast } from "react-hot-toast";
import { calculateTotals } from "../features/cartSlice";
import { RiAdminFill } from "react-icons/ri";

const Nav = ({ isDark, setIsDark }) => {
  const auth = useSelector((state) => state.auth);

  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  let Links = [
    { name: "Home", link: "/" },
    { name: "Store", link: "/store" },
    { name: "About", link: "/about" },
  ];

  const location = useLocation();

  const pathMatchRoute = (route) => {
    if (location.pathname === route) {
      return true;
    }
  };

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cart]);

  const [showLogin, setShowLogin] = useState(false);

  const [open, setOpen] = useState(false);
  return (
    <nav className="w-full fixed top-0 left-0 z-50">
      <div
        className={` ${
          isDark
            ? "bg-black text-white drop-shadow-md flex items-center justify-between p-4 md:p-5"
            : "drop-shadow-md flex items-center justify-between p-4 md:p-5 bg-white"
        } `}
      >
        <div className="cursor-pointer text-2xl md:text-3xl font-medium flex items-center gap-3">
          <div>
            <Link to={"/"}> X-LOG</Link>
          </div>
          <div
            className=" md:hidden text-2xl flex cursor-pointer"
            onClick={() => setIsDark(!isDark)}
          >
            {isDark ? <BsMoonStars /> : <BsSun />}
          </div>
        </div>

        <div className=" flex items-center justify-center gap-4 duration-500 text-3xl absolute right-8 top-3 cursor-pointer md:hidden">
          <div className=" relative">
            <Link
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              to={"/cart"}
            >
              <BsFillCartFill />
              <span className=" absolute rounded-full -right-1 -top-1  text-sm h-5 w-5 text-center bg-black text-white border border-white">
                {cart.cartItemQuantity}
              </span>
            </Link>
          </div>
          <div onClick={() => setOpen(!open)}>
            {" "}
            {open ? <AiOutlineClose /> : <AiOutlineMenu />}
          </div>
        </div>
        <ul
          onClick={() => setOpen(false)}
          className={` pl-9 md:flex transition-all ease-in duration-500 md:items-center md:pb-0 pb-12 md:w-auto md:pl-0 md:z-auto z-[-1] left-0 w-full  absolute md:static ${
            open
              ? "top-5 text-white opacity-100 bg-black h-screen  flex flex-col justify-start mt-10 items-start"
              : " top-[-490px] opacity-0 "
          } md:opacity-100 `}
        >
          <li className=" mt-6 flex items-center gap-2">
            <span className="md:hidden flex  text-3xl">
              {auth.image ? (
                <img
                  className=" h-8 w-8 rounded-full overflow-hidden"
                  src={auth.image}
                  alt=""
                />
              ) : (
                <RxAvatar />
              )}
            </span>
            <span className=" md:hidden flex">
              {auth._id ? (
                <p
                  className=" cursor-pointer"
                  onClick={() => {
                    dispatch(logOutUser());
                    toast.success("logged out successfully");
                  }}
                >
                  Logout
                </p>
              ) : (
                <Link to={"/login"}>Login</Link>
              )}
            </span>
          </li>
          {Links.map((link) => (
            <li
              key={link.name}
              className=" md:ml-8 text-xl md:my-0 my-6"
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            >
              <Link
                to={link.link}
                className={` hover:text-blue-500 duration-500 ${
                  pathMatchRoute(link.link) &&
                  " text-blue-500 border-b-2 border-b-blue-500"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
          <li className="">
            {auth.email === import.meta.env.VITE_ADMIN_EMAIL && (
              <Link to={"/uploadproduct"}>
                <RiAdminFill className=" text-3xl md:ml-6 my-5 md:my-0 " />
              </Link>
            )}
          </li>
        </ul>
        <div className=" gap-6 flex items-center justify-center">
          <div
            className=" hidden text-3xl md:flex cursor-pointer"
            onClick={() => setIsDark(!isDark)}
          >
            {isDark ? <BsMoonStars /> : <BsSun />}
          </div>
          <div className=" relative hidden md:flex text-3xl">
            <Link
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              to={"/cart"}
            >
              <BsFillCartFill />
              <span className=" absolute rounded-full -right-1 -top-1  text-sm h-5 w-5 text-center bg-black text-white border border-white">
                {cart.cartItemQuantity}
              </span>
            </Link>
          </div>
          <div
            onClick={() => setShowLogin((prevstate) => !prevstate)}
            className="relative"
          >
            <button className=" hidden md:flex text-3xl">
              {auth.image ? (
                <img
                  className=" h-8 w-8 rounded-full overflow-hidden"
                  src={auth.image}
                  alt=""
                />
              ) : (
                <RxAvatar />
              )}
            </button>
            {showLogin && (
              <div className="hidden md:flex text-black p-1 absolute border -left-3 top-8 bg-white text-sm cursor-pointer whitespace-nowrap">
                {auth._id ? (
                  <p
                    onClick={() => {
                      dispatch(logOutUser());
                      toast.success("logged out successfully");
                      navigate("/");
                    }}
                  >
                    Log Out
                  </p>
                ) : (
                  <Link to={"/login"}>Log in</Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
