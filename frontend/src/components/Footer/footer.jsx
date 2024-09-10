import React from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import { FaLinkedinIn, FaGithub, FaGoogle } from "react-icons/fa";
export default function Footer() {
  AOS.init();
  return (
    <footer className="dark:bg-[rgb(24,31,54)] pt-4">
      <div className="container overflow-y-hidden">
        <div className="flex flex-wrap">
          <div
            data-aos="fade-down"
            className="col text-center md:text-start p-3 lg:w-1/4 md:w-2/4 w-full"
          >
            <h2 className="font-bold text-[40px] bg-gradient-to-r from-indigo-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
              Node Blog
            </h2>
          </div>
          <div
            data-aos="fade-up"
            data-aos-delay="300"
            className="col text-center md:text-start p-3 grid gap-y-4 lg:w-1/4 md:w-2/4 w-full"
          >
            <h3 className="dark:text-white text-2xl font-bold capitalize text-gray-700">
              About
            </h3>
            <Link
              to="/projects"
              className="uppercase w-fit mx-auto md:mx-0 text-gray-400 hover:text-blue-500"
            >
              My Projects
            </Link>
            <Link
              to="/"
              className="uppercase w-fit mx-auto md:mx-0 text-gray-400 hover:text-blue-500"
            >
              Node Blog
            </Link>
          </div>
          <div
            data-aos="fade-down"
            data-aos-delay="600"
            className="col text-center md:text-start p-3 grid gap-y-4 lg:w-1/4 md:w-2/4 w-full"
          >
            <h3 className="dark:text-white text-2xl font-bold capitalize text-gray-700">
              Follow Us
            </h3>
            <Link
              to="https://github.com/Ahmad-Mayallo-2002"
              className="uppercase w-fit mx-auto md:mx-0 text-gray-400 hover:text-blue-500"
            >
              GitHub
            </Link>
            <Link
              to="https://www.linkedin.com/in/ahmad-mayallo-86944b21b"
              className="uppercase w-fit mx-auto md:mx-0 text-gray-400 hover:text-blue-500"
            >
              LinkedIn
            </Link>
          </div>
          <div
            data-aos="fade-up"
            data-aos-delay="900"
            className="col text-center md:text-start p-3 grid gap-y-4 lg:w-1/4 md:w-2/4 w-full"
          >
            <h3 className="dark:text-white text-2xl font-bold capitalize text-gray-700">
              Legal
            </h3>
            <Link
              to="/"
              className="uppercase w-fit mx-auto md:mx-0 text-gray-400 hover:text-blue-500"
            >
              Privacy Policy
            </Link>
            <Link
              to="/"
              className="uppercase w-fit mx-auto md:mx-0 text-gray-400 hover:text-blue-500"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
        <div className="p-4 flex gap-y-4 items-center flex-col md:flex-row justify-between">
          <p className="font-bold text-blue-500 text-[30px]">
            &copy; 2024 Node Blog
          </p>
          <div className="icons flex gap-4 text-[30px]">
            <Link
              className="duration-300 p-3 border-2 border-blue-500 text-blue-500 rounded-full hover:text-white hover:bg-blue-500"
              to="https://www.linkedin.com/in/ahmad-mayallo-86944b21b/"
            >
              <FaLinkedinIn />
            </Link>
            <Link
              className="duration-300 p-3 border-2 border-black rounded-full hover:bg-black hover:text-white"
              to="https://github.com/Ahmad-Mayallo-2002"
            >
              <FaGithub />
            </Link>
            <Link
              className="duration-300 p-3 border-2  rounded-full border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
              to="https://mail.google.com"
            >
              <FaGoogle />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
