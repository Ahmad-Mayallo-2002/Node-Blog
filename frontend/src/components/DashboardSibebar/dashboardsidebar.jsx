import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { CgNotes } from "react-icons/cg";
import { MdCreate } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedAction } from "../../redux/userSlice.js";
import { MdPostAdd } from "react-icons/md";
export default function DashboardSidebar() {
  const { isAdmin } = useSelector((state) => state?.userSlice);
  const dispatch = useDispatch();
  const location = useLocation().pathname;
  return (
    <aside className="dark:bg-[rgb(24,31,54)] md:w-[250px] w-full p-4">
      <ul className="grid gap-4 md:grid-cols-1 sm:grid-cols-2">
        <li>
          <Link
            className={`${
              location === "/dashboard/profile" &&
              "dark:bg-[#2a3658] bg-gray-200"
            } flex dark:hover:bg-[#2a3658] hover:bg-gray-200 p-3 items-center gap-x-3`}
            to="/dashboard/profile"
          >
            <FaUser fontSize={35} /> Profile
          </Link>
        </li>
        <li>
          <Link
            onClick={() => dispatch(isLoggedAction())}
            className={`${
              location === "/" && "dark:bg-[#2a3658] bg-gray-200"
            } flex dark:hover:bg-[#2a3658] hover:bg-gray-200 p-3 items-center gap-x-3`}
            to="/"
          >
            <FaSignOutAlt fontSize={35} /> Sign Out
          </Link>
        </li>
        <li>
          <Link
            className={`${
              location === "/dashboard/createPost" &&
              "dark:bg-[#2a3658] bg-gray-200"
            } flex dark:hover:bg-[#2a3658] hover:bg-gray-200 p-3 items-center gap-x-3`}
            to="/dashboard/createPost"
          >
            <MdCreate fontSize={35} /> Create Post
          </Link>
        </li>
        <li>
          <Link
            className={`${
              location === "/dashboard/posts" && "dark:bg-[#2a3658] bg-gray-200"
            } flex dark:hover:bg-[#2a3658] hover:bg-gray-200 p-3 items-center gap-x-3`}
            to="/dashboard/posts"
          >
            <CgNotes fontSize={35} /> Posts
          </Link>
        </li>
        {isAdmin && (
          <li>
            <Link
              className={`${
                location === "/dashboard/addProject" &&
                "dark:bg-[#2a3658] bg-gray-200"
              } flex dark:hover:bg-[#2a3658] hover:bg-gray-200 p-3 items-center gap-x-3`}
              to="/dashboard/addProject"
            >
              <MdPostAdd fontSize={35} /> Add Project
            </Link>
          </li>
        )}
      </ul>
    </aside>
  );
}
