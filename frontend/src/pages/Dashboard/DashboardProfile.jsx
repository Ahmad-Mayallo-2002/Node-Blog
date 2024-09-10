import { getData } from "../../assets/helpers/helpers.jsx";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { patchApi } from "../../assets/api/patchRequests.js";
import React, { useEffect, useState } from "react";
import { deleteApi } from "../../assets/api/deleteRequests.js";
import { useNavigate } from "react-router-dom";

export default function DashboardProfile() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [defaultUserData, setDefaultUserData] = useState({});
  const [image, setImage] = useState();
  const userData =
    localStorage.getItem("userData") &&
    JSON.parse(localStorage.getItem("userData"));

  const handleChange = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
  };

  const handleDeleteAccount = async () => {
    const response = await deleteApi(
      "delete-user",
      userData?.token,
      userData?.id
    );
    if (response.status === 200) {
      navigate("/");
      localStorage.removeItem("userData");
    }
  };

  const onSubmit = async (data, event) => {
    try {
      const response = await patchApi(
        "update-user",
        userData?.token,
        userData?.id,
        event.target
      );
      if (response.status === 200) toast.success(response.data?.msg);
    } catch (error) {
      console.log(error);
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
  useEffect(() => {
    const getDefaultUserData = async () => {
      try {
        const data = await getData(
          "single-user",
          userData?.id,
          userData?.token
        );
        setDefaultUserData(data.data);
        setImage(
          /^\d/.test(data.data?.image)
            ? `/${data.data?.image}`
            : data.data?.image
        ); // Update userImage when defaultUserData is fetched
      } catch (error) {
        console.log(error);
      }
    };
    getDefaultUserData();
  }, []);

  return (
    <>
      <h1 className="font-bold text-5xl text-center md:text-start mb-4">
        Profile
      </h1>
      <form
        action="#"
        className="update-user-datat-form"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <div>
          <label htmlFor="image" className="block cursor-pointer w-fit mx-auto">
            <img
              src={image} // Use userImage directly
              width={128}
              height={128}
              className="rounded-full"
              alt="User Image"
            />
            <input
              {...register("image", { onChange: handleChange })}
              type="file"
              id="image"
              hidden
            />
          </label>
        </div>
        <div>
          <input
            type="text"
            autoComplete="off"
            placeholder="Write New Username"
            defaultValue={defaultUserData?.username}
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
        </div>
        <div>
          <input
            type="text"
            autoComplete="off"
            placeholder="Write New Email"
            defaultValue={defaultUserData?.email}
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
        </div>
        <div>
          <input
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
            type="password"
            placeholder="Write New Password"
          />
        </div>
        <div>
          <input
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
            type="password"
            placeholder="Confirm New Password"
          />
        </div>
        <div className="buttons flex justify-between sm:flex-row items-center flex-col sm:gap-0 gap-4">
          <button
            type="submit"
            className="btn-primary-outline p-2 sm:w-[140px] w-full rounded-md duration-200"
          >
            Update
          </button>
          <button
            onClick={handleDeleteAccount}
            className="btn-error-outline p-2 sm:w-[140px] w-full rounded-md duration-200"
          >
            Delete Account
          </button>
        </div>
      </form>
      <ToastContainer pauseOnFocusLoss={false} pauseOnHover={false} />
    </>
  );
}
