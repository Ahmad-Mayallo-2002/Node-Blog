import React, { useEffect, useRef, useState } from "react";
import { defaultUserImage } from "../../assets/helpers/helpers.jsx";
import { useForm } from "react-hook-form";
import { SignUpApi } from "../../assets/api/SignUpApi.js";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Loading from "../../components/Loading/loading.jsx";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const signUpRef = useRef();
  const { register, handleSubmit } = useForm();
  const [image, setImage] = useState(defaultUserImage);
  useEffect(() => {
    signUpRef.current.style.height = `calc(100vh - ${
      document.querySelector("header").clientHeight
    }px)`;
  });
  const handleChange = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
  };
  const onSubmit = async (data, event) => {
    try {
      setLoading(true);
      const response = await SignUpApi(event.target);
      if (response.status === 200) navigate("/sign-in");
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const onError = (error) => {
    const errorsArray = [
      error?.username,
      error?.email,
      error?.password,
      error?.confirmPassword,
    ];
    errorsArray.forEach((value) => {
      if (value) toast.error(value?.message);
    });
  };
  return (
    <>
      <div className="sign-up flex items-center p-[55px]" ref={signUpRef}>
        <div className="container flex flex-wrap">
          <div className="col md:w-2/4 w-full p-4 md:text-start text-center grid place-content-center">
            <h2 className="font-bold text-[50px] bg-gradient-to-r from-indigo-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
              Node Blog
            </h2>
            <p>
              Sign Up to Node Blog by Your Email and Password or With Google
            </p>
          </div>
          <div className="col md:w-2/4 w-full p-4">
            <form
              action="#"
              className="grid gap-4"
              onSubmit={handleSubmit(onSubmit, onError)}
            >
              <label
                htmlFor="image"
                className="cursor-pointer w-fit mx-auto block"
              >
                <img
                  src={image}
                  alt="Default User Image"
                  className="rounded-full max-w-[128px] max-h-[128px]"
                />
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  id="image"
                  {...register("image", { onChange: handleChange })}
                />
              </label>
              <input
                type="text"
                placeholder="Enter Your Username"
                autoComplete="off"
                className="dark:bg-transparent border py-2 px-4 outline-none"
                {...register("username", {
                  required: {
                    value: true,
                    message: "Username Field is Required",
                  },
                  minLength: {
                    value: 4,
                    message: "Minimum Length for Username is 4",
                  },
                  maxLength: {
                    value: 15,
                    message: "Maximum Length for Username is 15",
                  },
                })}
              />
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
              <input
                type="password"
                className="dark:bg-transparent border py-2 px-4 outline-none"
                placeholder="Confirm Your Password"
                {...register("confirmPassword", {
                  required: {
                    value: true,
                    message: "Confirm Password Field is Required",
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
                type="submit"
                className="font-bold duration-200 bg-indigo-500 py-3 px-8 text-white rounded-full border-2 border-indigo-500 hover:bg-transparent hover:text-indigo-500"
              >
                {loading ? (
                  <div className="flex items-center gap-2 justify-center">
                    <Loading width="25px" height="25px" border="5px solid" />
                    Loading...
                  </div>
                ) : (
                  "Sign Up"
                )}
              </button>
              <p className="text-center">
                You Have An Account ?{" "}
                <Link to="/sign-in" className="text-indigo-500 hover:underline">
                  Sign In
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
