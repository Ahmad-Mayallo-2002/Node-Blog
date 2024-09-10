import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { patchApi } from "../../assets/api/patchRequests.js";
import { userData } from "../../components/Header/header.jsx";
import { toast, ToastContainer } from "react-toastify";

export default function DashboardUpdatePost() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data, event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await patchApi(
        `update-post/${id}`,
        userData?.token,
        userData?.id,
        event.target
      );
      if (response.status === 200) {
        toast.success(response.data?.msg);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <>
        <h1 className="font-bold text-5xl text-center md:text-start mb-8">
          Update Post
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div>
            <input
              name="file"
              type="file"
              className="p-4 border-4 w-full cursor-pointer file:bg-red-500 file:text-white file:font-bold file:py-3 file:w-36 file:cursor-pointer file:border-0 file:rounded-full"
              {...register("file")}
            />
          </div>
          <div>
            <textarea
              name="content"
              type="text"
              placeholder="Write Your Post"
              className="w-full p-4 border-4 h-64 outline-0 resize-none bg-transparent"
              {...register("content")}
            ></textarea>
          </div>
          <button
            type="submit"
            className="btn-primary-outline py-3 px-4 rounded-full mt-4 sm:w-[150px] w-full"
          >
            {loading ? "Loading..." : "Publish"}
          </button>
        </form>
        <ToastContainer pauseOnFocusLoss={false} pauseOnHover={false} />
      </>
    </>
  );
}
