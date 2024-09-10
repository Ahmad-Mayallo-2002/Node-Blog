import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { SignInApi } from "../../assets/api/SignInApi.js";
import Loading from "../../components/Loading/loading.jsx";
import { useDispatch } from "react-redux";
import { isLoggedAction } from "../../redux/userSlice.js";

export default function SignIn() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const signInRef = useRef();
  useEffect(() => {
    signInRef.current.style.height = `calc(100vh - ${
      document.querySelector("header").clientHeight
    }px)`;
  });
  const [asd, setData] = useState({ msg: "" });
  const onSubmit = async (data, event) => {
    try {
      setLoading(true);
      const response = await SignInApi(data);
      if (response.status === 200) {
        localStorage.setItem("userData", JSON.stringify(response.data));
        navigate("/");
      }
    } catch (error) {
      if (error.response.status === 400 || error.response.status === 404) {
        toast.error(error.response.data.msg);
      } else {
        console.error(error);
      }
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const onError = (error) => {
    const errorsArray = [error?.email, error?.password];
    errorsArray.forEach((value) => {
      if (value) toast.error(value?.message);
    });
  };
  return (
    <>
      <div className="sign-in flex items-center" ref={signInRef}>
        <div className="container flex flex-wrap pt-[55px]">
          <div className="col md:w-2/4 w-full p-4 md:text-start text-center grid place-content-center">
            <h2 className="font-bold text-[50px] bg-gradient-to-r from-indigo-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
              Node Blog
            </h2>
            <p>
              Sign In to Node Blog by Your Email and Password or With Google
            </p>
          </div>
          <div className="col md:w-2/4 w-full p-4">
            <form
              action="#"
              className="grid gap-4"
              onSubmit={handleSubmit(onSubmit, onError)}
            >
              <input
                type="text"
                placeholder="Enter Your Email"
                autoComplete="off"
                className="dark:bg-transparent border py-2 px-4 outline-none"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email Field is Required",
                  },
                  pattern: {
                    value: /[a-zA-Z0-9]@(gmail|nodeblog).com/,
                    message: "Invalid Email Syntax",
                  },
                })}
              />
              <input
                type="password"
                name="password"
                className="dark:bg-transparent border py-2 px-4 outline-none"
                placeholder="Enter Your Password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password Field is Required",
                  },
                  minLength: {
                    value: 8,
                    message: "Minimum Length for Password is 8",
                  },
                  maxLength: {
                    value: 15,
                    message: "Maximum Length for Password is 15",
                  },
                })}
              />
              <button
                onClick={() => dispatch(isLoggedAction())}
                type="submit"
                className="font-bold duration-200 bg-indigo-500 py-3 px-8 text-white rounded-full border-2 border-indigo-500 hover:bg-transparent hover:text-indigo-500"
              >
                {loading ? (
                  <div className="flex items-center gap-2 justify-center">
                    <Loading width="25px" height="25px" borderWidth="5px" />
                    Loading...
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>
              <p className="text-center">
                Don't Have An Account ?{" "}
                <Link to="/sign-up" className="text-indigo-500 hover:underline">
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer pauseOnFocusLoss={false} pauseOnHover={false} />
    </>
  );
}
