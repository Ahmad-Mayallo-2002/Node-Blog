import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { patchApi } from "../../assets/api/patchRequests.js";
import { userData } from "../../components/Header/header.jsx";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";

export default function DashboardUpdateComment() {
  const { handleSubmit, register } = useForm();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data, event) => {
    try {
      setLoading(true);
      const response = await patchApi(
        `update-comment/${id}`,
        userData?.token,
        userData?.id,
        event.target
      );
      if (response.status === 200) toast.success(response.data?.msg);
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data?.msg);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <h1 className="font-bold text-5xl">Update Comment</h1>
      <p className="my-4">(You Can Update One Field Minimum)</p>
      <form action="" className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex">
          <input
            type="file"
            className="border-2 bg-transparent p-3 outline-none w-full"
            {...register("file")}
          />
        </div>
        <div className="flex">
          <textarea
            placeholder="Write Content of New Comment"
            {...register("content")}
            className="border-2  bg-transparent p-3 outline-none w-full resize-none h-[200px]"
          ></textarea>
        </div>
        <button type="submit" className="btn-primary-outline p-3 w-[200px]">
          {loading ? "Loading..." : "Update Comment"}
        </button>
      </form>
      <ToastContainer pauseOnFocusLoss={false} pauseOnHover={false} />
    </>
  );
}
