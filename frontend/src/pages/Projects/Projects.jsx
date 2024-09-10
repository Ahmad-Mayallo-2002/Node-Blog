import React, { useEffect, useState } from "react";
import { bufferToBase64, mainUrl } from "../../assets/helpers/helpers.jsx";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/Loading/loading.jsx";
import { deleteApi } from "../../assets/api/deleteRequests.js";
import { toast, ToastContainer } from "react-toastify";
import { userData } from "../../components/Header/header.jsx";
import { useSelector } from "react-redux";
import AOS from "aos";
export default function Projects() {
  const { isAdmin } = useSelector((state) => state?.userSlice);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const asyncFunction = async () => {
    try {
      setLoading(true);
      const getData = await axios.get(mainUrl + "get-project");
      setData(getData.data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleDelteProject = async (_id) => {
    try {
      const response = await deleteApi(
        `delete-project/${_id}`,
        userData?.token,
        userData?.id
      );
      if (response.status === 200) {
        toast.success(response.data?.msg);
        asyncFunction();
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    AOS.init();
    asyncFunction();
  }, []);
  return (
    <>
      <div className="projects py-[50px]">
        <div className="container">
          <h2 className="font-bold text-[50px] text-center mb-4">
            My Projects
          </h2>
          <div className="my-projects grid gap-4 grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
            {loading ? (
              <div
                className="flex items-center justify-center"
                style={{ gridColumn: "1/-1" }}
              >
                <Loading />
              </div>
            ) : data.length === 0 ? (
              <h4
                className="font-bold text-center text-[30px]"
                style={{ gridColumn: "1/-1" }}
              >
                There are No Projects
              </h4>
            ) : (
              data.map((value, index) => {
                const { _id, title, link, bio, image } = value;
                return (
                  <div
                    className="project"
                    data-aos="zoom-in"
                    data-aos-delay={`${index * 100}`}
                    key={_id}
                  >
                    <img
                      className={`h-[400px] w-full ${
                        index === 0 && "bg-black dark:bg-transparent"
                      }`}
                      src={`data:image/png;base64,${bufferToBase64(
                        image?.data
                      )}`}
                      alt={title}
                    />
                    <div className="text-center">
                      <h3 className="font-bold text-[30px] my-4 text-[24px]">
                        {title}
                      </h3>
                      <p>{bio}</p>
                      <Link
                        to={link}
                        target="_blank"
                        className="block w-fit mx-auto text-center text-[24px] btn-success-outline block p-3 my-4 w-full"
                      >
                        Visit Here
                      </Link>
                    </div>
                    {isAdmin && (
                      <>
                        <Link
                          to={`/dashboard/updateProject/${_id}`}
                          className="btn-primary-outline w-full p-3 block my-4 text-center"
                        >
                          Update
                        </Link>
                        <button
                          className="btn-error-outline w-full p-3"
                          onClick={() => handleDelteProject(_id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
      <ToastContainer pauseOnFocusLoss={false} pauseOnHover={false} />
    </>
  );
}
