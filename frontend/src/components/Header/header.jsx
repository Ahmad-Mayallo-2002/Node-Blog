import { MdDarkMode, MdSunny } from "react-icons/md";
import { FaBars } from "react-icons/fa6";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getData, links } from "../../assets/helpers/helpers.jsx";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "../../redux/themeSlice.js";
import Loading from "../Loading/loading.jsx";
import { isLoggedAction, setIsAdmin } from "../../redux/userSlice.js";

export const userData = JSON.parse(localStorage.getItem("userData"));

export default function Header() {
  const { pathname } = useLocation();
  const { theme } = useSelector((state) => state?.themeSlice);
  const { isLogged, isAdmin } = useSelector((state) => state?.userSlice);
  const dispatch = useDispatch();
  const barRef = useRef();
  const infoListRef = useRef();
  const listRef = useRef();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const handleClick = () => {
    listRef.current.classList.toggle("h-0");
    listRef.current.classList.toggle("hidden");
  };
  const handleClickList = () => {
    infoListRef.current.classList.toggle("scale-0");
  };
  const handleLogout = () => {
    dispatch(isLoggedAction());
    localStorage.removeItem("userData");
  };
  const handleTheme = () => {
    dispatch(changeTheme());
  };

  useEffect(() => {
    const asyncFunction = async () => {
      try {
        setLoading(true);
        const response = await getData(
          "single-user",
          userData?.id,
          userData?.token
        );
        if (/^https/.test(response.data?.image)) {
          setImage(response.data?.image);
        } else {
          setImage(`/${response.data?.image}`);
        }
        setData(response.data);
        if (response.data?.role === "admin") {
          dispatch(setIsAdmin(true));
        } else {
          dispatch(setIsAdmin(false));
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    asyncFunction();
  }, [dispatch]);

  return (
    <header className="dark:!bg-[rgb(24,31,54)] p-4 shadow-lg bg-white">
      <div className="container relative flex items-center justify-between lg:flex-nowrap flex-wrap gap-y-4">
        <div className="logo">
          <Link
            className="font-bold text-[35px] bg-gradient-to-r from-indigo-500 via-red-500 to-pink-500 bg-clip-text text-transparent"
            to="/"
          >
            Node Blog
          </Link>
        </div>
        <button
          ref={barRef}
          onClick={handleClick}
          className="bars-button border-2 p-2 rounded-md lg:hidden block"
        >
          <FaBars className="text-[30px]" />
        </button>
        <ul
          ref={listRef}
          className="pe-4 links-list duration-400 flex items-center flex-col gap-4 w-full h-0 overflow-y-hidden hidden lg:flex-row lg:flex lg:w-fit lg:h-full lg:flex"
        >
          {links.map((value) => {
            const { name, path } = value;

            return (
              <li key={name}>
                <Link
                  className={`font-semibold hover:text-violet-500 dark:hover:text-violet-500  ${
                    pathname === path
                      ? "text-violet-500 dark:text-violet-500"
                      : "dark:text-white"
                  }`}
                  to={path}
                >
                  {name}
                </Link>
              </li>
            );
          })}
          <li>
            <button
              onClick={handleTheme}
              className="dark-mode-button rounded-full p-2 border-2"
            >
              {theme === "dark" ? (
                <MdSunny className="text-[30px] dark:text-white" />
              ) : (
                <MdDarkMode className="text-[30px]" />
              )}
            </button>
          </li>
          {isLogged ? (
            <li>
              <button onClick={handleClickList}>
                {loading ? (
                  <Loading width="64px" height="64px" borderWidth="5px" />
                ) : (
                  <img
                    src={image}
                    width={64}
                    height={64}
                    className="rounded-full"
                    alt="User Image"
                  />
                )}
              </button>
              <ul
                ref={infoListRef}
                className="z-50 dark:bg-[#212529] absolute bg-white w-[250px] bg-white scale-0 duration-300 lg:translate-x-0 lg:origin-top-right lg:right-[15px] origin-[50%_0%] right-[50%] translate-x-[100px]"
              >
                <li className="p-4">{data?.username}</li>
                <li className="p-4">{data?.email}</li>
                <li>
                  <Link
                    to="/dashboard/profile"
                    className="hover:text-violet-500 block p-4 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/sign-in"
                    onClick={handleLogout}
                    className="hover:text-violet-500 block p-4 hover:bg-gray-100"
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </li>
          ) : (
            <>
              <li>
                <Link
                  to="/sign-up"
                  className="block duration text-white py-2 px-6 rounded-full w-fit bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-pink-500 hover:to-indigo-500"
                >
                  SignUp
                </Link>
              </li>
              <li>
                <Link
                  to="/sign-in"
                  className="block duration text-white py-2 px-6 rounded-full w-fit bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-pink-500 hover:to-indigo-500"
                >
                  SignIn
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
}
