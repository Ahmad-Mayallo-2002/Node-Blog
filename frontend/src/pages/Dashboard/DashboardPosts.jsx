import React, { Fragment, useEffect, useState } from "react";
import {
  bufferToBase64,
  getData,
  mainUrl,
} from "../../assets/helpers/helpers.jsx";
import { Link } from "react-router-dom";
import { userData } from "../../components/Header/header.jsx";
import Loading from "../../components/Loading/loading.jsx";
import { IoIosSettings } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { deleteApi } from "../../assets/api/deleteRequests.js";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

export default function DashboardPosts() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const getAgain = async () => {
    try {
      const getDataVar = await getData(
        "get-post",
        userData?.id,
        userData?.token
      );
      setData(getDataVar.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeletePost = async (_id) => {
    try {
      const response = await deleteApi(
        `delete-post/${_id}`,
        userData?.token,
        userData?.id
      );
      if (response.status === 200) {
        toast.success(response.data?.msg);
        getAgain();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteComment = async (_id) => {
    try {
      const deleteRequest = await deleteApi(
        `delete-comment/${_id}`,
        userData?.token,
        userData?.id
      );
      if (deleteRequest.status === 200) {
        toast.success(deleteRequest.data?.msg);
        getAgain();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (event, postId) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
      const response = await axios.post(
        mainUrl + `add-comment/${postId}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            id: userData?.id,
            Authorization: `Bearer ${userData?.token}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data?.msg);
        getAgain();
      }
    } catch (error) {
      toast.info(error?.response?.data?.msg);
    }
  };
  useEffect(() => {
    const getPosts = async () => {
      try {
        setLoading(true);
        const getDataVar = await getData(
          "get-post",
          userData?.id,
          userData?.token
        );
        setData(getDataVar.data);
      } catch (error) {
        setLoading(false);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getPosts();
  }, []);
  return (
    <>
      <h1 className="font-bold text-5xl text-center md:text-start mb-4">
        Posts
      </h1>
      {loading ? (
        <div className="flex justify-center">
          <Loading />
        </div>
      ) : (
        <div className="posts grid gap-4">
          {data.length === 0 ? (
            <div className="flex flex-col justify-center h-72">
              <h4 className="text-center font-bold text-[30px]">
                There are No Posts
              </h4>
              <Link
                to="/dashboard/createPost"
                className="hover:text-violet-500 text-[24px] w-fit mx-auto"
              >
                Create Post
              </Link>
            </div>
          ) : (
            // Start Posts
            data?.map((post, postIndex) => {
              const {
                _id: postId,
                content,
                file,
                createdAt,
                user: { _id: userId, username, image },
                comments,
              } = post;
              return (
                <Fragment key={postId}>
                  {/* Post Structure */}
                  <div
                    className="post border-2 rounded-md"
                    style={{ wordBreak: "break-word" }}
                  >
                    {/* Post Head */}
                    <div className="head p-4 flex items-center justify-between">
                      <div className="col flex items-center gap-3">
                        <div className="image">
                          <img
                            className="rounded-full"
                            src={/^\d/.test(image) ? `/${image}` : image}
                            width={56}
                            alt="User Image"
                          />
                        </div>
                        <div className="info">
                          <h4>{username}</h4>
                          <small>
                            {`Date of Post: ${createdAt.split("T")[0]}`}
                          </small>
                        </div>
                      </div>
                      <div className="col">
                        {/* Post Settings List */}
                        {userData?.id === userId && (
                          <div className="relative">
                            <button
                              onClick={() => {
                                const post = Array.from(
                                  document.querySelectorAll(".post-settings")
                                );
                                post[postIndex].classList.toggle("scale-0");
                              }}
                            >
                              <BsThreeDotsVertical fontSize={35} />
                            </button>
                            <ul className="post-settings scale-0 origin-top-right duration-200 absolute w-[250px] right-0 bg-white dark:bg-[#212529]">
                              <li>
                                <Link
                                  to={`/dashboard/updatePost/${postId}`}
                                  className="flex w-full items-center gap-2 p-4 hover:bg-gray-200 dark:hover:bg-gray-900"
                                >
                                  <IoIosSettings fontSize={30} /> Update
                                </Link>
                              </li>
                              <li>
                                <button
                                  onClick={() => handleDeletePost(postId)}
                                  className="flex w-full items-center gap-2 p-4 hover:bg-gray-200 dark:hover:bg-gray-900"
                                >
                                  <MdDelete fontSize={30} /> Delete
                                </button>
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                    {/* Post Body */}
                    <div className="body p-4 border-t-2">
                      <p style={{ whiteSpace: "pre-line" }}>{content}</p>
                      {file && (
                        <img
                          src={`data:image/png;base64,${bufferToBase64(
                            file?.data
                          )}`}
                          width={100}
                          height={200}
                          alt="Post Image"
                        />
                      )}
                    </div>
                    {/* Add Comment */}
                    <div className="comment-form border-t-2 p-4">
                      <form
                        action="#"
                        className="flex gap-4"
                        onSubmit={(event) => handleSubmit(event, postId)}
                      >
                        <textarea
                          type="text"
                          placeholder="Write Comment"
                          className="resize-none h-[52px] dark:bg-transparent outline-none p-3 grow border-2 rounded-md"
                          name="content"
                        ></textarea>
                        <button
                          type="submit"
                          className="py-3 px-8 btn-error-outline duration-200 rounded-md"
                        >
                          Comment
                        </button>
                      </form>
                    </div>
                    {/* Start Comments */}
                    {comments.map((comment, commentIndex) => {
                      const {
                        _id: commentId,
                        content: commentContent,
                        file: commentFile,
                        createdAt: commentDate,
                        user: { _id: userId, image, username },
                      } = comment;
                      return (
                        <Fragment key={commentId}>
                          {/* Comment Structure */}
                          <div className="comment border-t-2">
                            {/* Comment Head */}
                            <div className="head p-4 flex items-center justify-between">
                              <div className="col flex items-center gap-2">
                                <div className="image">
                                  <img
                                    src={
                                      /^\d/.test(image) ? `/${image}` : image
                                    }
                                    width={56}
                                    className="rounded-full"
                                    alt="User Image"
                                  />
                                </div>
                                <div className="info">
                                  <h4>{username}</h4>
                                  <small>
                                    Date of Comment: {commentDate.split("T")[0]}
                                  </small>
                                </div>
                              </div>
                              <div className="col">
                                {/* Comment Setting */}
                                {userData?.id === userId && (
                                  <div className="relative">
                                    <button
                                      onClick={async () => {
                                        const commentSettingList =
                                          document.getElementById(
                                            `${commentId}`
                                          );
                                        commentSettingList.classList.toggle(
                                          "scale-0"
                                        );
                                      }}
                                    >
                                      <BsThreeDotsVertical fontSize={35} />
                                    </button>
                                    <ul
                                      id={commentId}
                                      className="comment-settings scale-0 origin-top-right duration-200 absolute w-[250px] right-0 bg-white dark:bg-[#212529]"
                                    >
                                      <li>
                                        <Link
                                          to={`/dashboard/updateComment/${commentId}`}
                                          className="flex w-full items-center gap-2 p-4 hover:bg-gray-200 dark:hover:bg-gray-900"
                                        >
                                          <IoIosSettings fontSize={30} /> Update
                                        </Link>
                                      </li>
                                      <li>
                                        <button
                                          onClick={() =>
                                            handleDeleteComment(commentId)
                                          }
                                          className="flex w-full items-center gap-2 p-4 hover:bg-gray-200 dark:hover:bg-gray-900"
                                        >
                                          <MdDelete fontSize={30} /> Delete
                                        </button>
                                      </li>
                                    </ul>
                                  </div>
                                )}
                              </div>
                            </div>
                            {/* Comment Body */}
                            <div className="body p-4 pt-0">
                              <p
                                className="mt-4"
                                style={{ whiteSpace: "pre-line" }}
                              >
                                {commentContent}
                              </p>
                              {commentFile && (
                                <img
                                  src={`data:image/png;base64,${bufferToBase64(
                                    file?.data
                                  )}`}
                                  width={100}
                                  height={100}
                                  alt="Comment Image"
                                />
                              )}
                            </div>
                          </div>
                        </Fragment>
                      );
                    })}
                  </div>
                </Fragment>
              );
            })
          )}
        </div>
      )}
      <ToastContainer pauseOnFocusLoss={false} pauseOnHover={false} />
    </>
  );
}
