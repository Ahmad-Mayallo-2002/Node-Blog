import axios from "axios";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { mainUrl } from "../../assets/helpers/helpers.jsx";
import { userData } from "../../components/Header/header.jsx";
export default function SetProject({
  title,
  url,
  requestType,
  required = true,
}) {
  const imageRef = useRef();
  const spanRef = useRef();
  const { register, handleSubmit } = useForm();
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data, event) => {
    try {
      setLoading(true);
      const formData = new FormData(event.target);
      const response = await axios({
        method: requestType,
        url: `${mainUrl + url}`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userData?.token}`,
          id: userData?.id,
        },
      });
      console.log(response);
      if (response.status === 200) toast.success(response.data?.msg);
      if (response.status === 400) toast.warn(response.data?.msg);
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const onError = (error) => {
    console.log(error);
  };
  const handleChange = (event) => {
    const file = event.target.files[0];
    const result = URL.createObjectURL(file);
    imageRef.current.classList.remove("hidden");
    spanRef.current.classList.add("hidden");
    setImage(result);
  };
  return (
    <>
      <div className="">
        <h2 className="font-bold text-[40px] mb-6">{title}</h2>
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          action=""
          className="grid gap-4"
          id="projectForm"
        >
          <div>
            <label
              htmlFor="image"
              className="cursor-pointer dark:bg-[#2b3457] bg-[#f0f0f0] flex items-center justify-center h-[350px]"
            >
              <img
                ref={imageRef}
                src={image}
                alt="Image Project"
                className="hidden w-full h-full max-w-full"
              />
              <span
                ref={spanRef}
                className="dark:bg-[#1e263d] bg-[#e0e0e0] p-4 block w-[150px] text-center"
              >
                Select Image
              </span>
              <input
                id="image"
                type="file"
                hidden
                {...register("image", {
                  required: {
                    value: required,
                    message: "Image Field is Required",
                  },
                  onChange: handleChange,
                })}
              />
            </label>
          </div>
          <div>
            <input
              type="text"
              placeholder="Write Title For Project"
              {...register("title", {
                required: {
                  value: required,
                  message: "Title Field is Required",
                },
              })}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Write Link Of Project"
              {...register("link", {
                required: {
                  value: required,
                  message: "Link Field is Required",
                },
              })}
            />
          </div>
          <div>
            <textarea
              placeholder="Write Bio For Project"
              {...register("bio", {
                required: {
                  value: required,
                  message: "Bio Field is Required",
                },
              })}
              className="resize-none h-[200px] p-4 pb-0 outline-0 w-full border-2 border-black dark:border-white bg-transparent"
            ></textarea>
          </div>
          <button
            className="btn-primary-outline p-4 sm:w-[150px] rounded-full w-full"
            type="submit"
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
      <ToastContainer pauseOnFocusLoss={false} pauseOnHover={false} />
    </>
  );
}
