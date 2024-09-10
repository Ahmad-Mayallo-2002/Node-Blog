import React, { useEffect, useRef, useState } from "react";
import {
  contactDetails,
  items,
  mainUrl,
} from "../../assets/helpers/helpers.jsx";
import me from "../../assets/me.jpg";
import axios from "axios";
import Loading from "../../components/Loading/loading.jsx";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import AOS from "aos";
import emailjs from "@emailjs/browser";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const contactRef = useRef();
  useEffect(() => {
    const getDataFunc = async () => {
      try {
        setLoading(true);
        const get = await axios.get(mainUrl + "get-technologies");
        setData(get.data);
        if (get.status === 200) setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getDataFunc();
    AOS.init();
  }, []);
  const onSubmit = async (data, event) => {
    event.preventDefault();
    try {
      setContactLoading(true);
      emailjs
        .sendForm("service_vjmlo0r", "template_rumtbsv", contactRef.current, {
          publicKey: "ffs-VZ70ppVVZaz1o",
        })
        .then(
          () => {
            toast.success("This Message is Sent Successfully");
            console.log("SUCCESS");
          },
          (error) => {
            console.log(error);
          }
        );
    } catch (error) {
      setContactLoading(false);
      console.log(error);
    } finally {
      setContactLoading(false);
    }
  };

  const onError = (error) => {
    const { firstName, lastName, email, subject } = error;
    const errorsArray = [
      firstName?.message,
      lastName?.message,
      email?.message,
      subject?.message,
    ];
    errorsArray.forEach((value) => value && toast.error(value));
  };
  return (
    <>
      {/* Hero */}
      <div className="hero py-5">
        <div className="container overflow-hidden py-6 flex justify-between flex-wrap gap-y-4 overflow-x-hidden">
          <div
            data-aos="fade-right"
            className="col md:w-1/2 w-full text-center md:text-start flex flex-col justify-center"
          >
            <h1 className="font-bold text-[50px] mb-4">Welcome To My Blog</h1>
            <p className="leading-[2]">
              Hello I'm Ahmad Talaat Ibrahim Mayallo, Full Stack Developer This
              is My Personal Blog You Will Find My Projects on Web Development
              Career and Small Articles about Web Development
            </p>
          </div>
          <div
            data-aos="fade-left"
            data-aos-delay="300"
            className="col md:w-1/2 w-full flex md:justify-end justify-center"
          >
            <div
              id="my-image"
              className="lg:w-[350px] lg:h-[350px] w-[250px] h-[250px] relative"
            >
              <img src={me} alt="" className="rounded-full" />
              <span
                className="block w-full h-full absolute top-0 left-0 outline-dashed outline-4 rounded-full animate-spin"
                style={{ animationDuration: "15s" }}
              ></span>
            </div>
          </div>
        </div>
      </div>
      {/* About Me */}
      <div className="about-me py-5">
        <div className="container">
          <h1 className="font-bold text-center mb-4 text-[45px]">About Me</h1>
          <div className="about flex gap-y-4 flex-wrap overflow-x-hidden">
            <div data-aos="fade-right" className="col md:w-1/2 w-full p-4 list">
              <ul className="grid gap-4" id="about-list">
                {items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div
              data-aos="fade-left"
              data-aos-delay="300"
              className="col md:w-1/2 w-full p-4"
            >
              <ul className="grid gap-4 text-[20px] justify-center md:justify-end">
                {contactDetails.map((value, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 justify-center md:justify-start"
                  >
                    {value.icon} {value.content}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Technologies */}
      <div className="technologies py-5">
        <div className="container">
          <h2 className="text-center mb-4 font-bold text-[45px]">
            My Techonlogies
          </h2>
          <div className="techs grid md:grid-cols-2 lg:grid-cols-4 grid-cols:1">
            {loading ? (
              <div
                className="flex justify-center h-[500px] items-center"
                style={{ gridColumn: "1/ -1" }}
              >
                <Loading />
              </div>
            ) : (
              data.map((value, index) => {
                const { _id, title, icon, bio } = value;
                return (
                  <div
                    className="tech p-4"
                    data-aos="zoom-in"
                    data-aos-delay={`${index * 100}`}
                    key={_id}
                  >
                    <img
                      className="h-[200px] w-[200px] mx-auto"
                      src={icon}
                      alt={title}
                    />
                    <div className="text-center">
                      <h3 className="font-bold text-[30px] my-4">{title}</h3>
                      <p>{bio}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
      {/* Contact Me */}
      <div className="contact-me py-5">
        <div className="container">
          <h1 className="font-bold text-center mb-4 text-[45px]">Contact Me</h1>
          <form
            ref={contactRef}
            action="#"
            id="contact-form"
            onSubmit={handleSubmit(onSubmit, onError)}
          >
            <div>
              <input
                {...register("user_name", {
                  required: {
                    value: true,
                    message: "First Name Field is Required",
                  },
                })}
                type="text"
                placeholder="First Name"
                autoComplete="off"
              />{" "}
              <input
                {...register("user_email", {
                  required: {
                    value: true,
                    message: "Email Field is Required",
                  },
                  pattern: {
                    value: /\w@gmail.com/,
                    message: "Invalid Email Syntax",
                  },
                })}
                type="text"
                placeholder="Email"
                autoComplete="off"
              />
            </div>

            <textarea
              {...register("message", {
                required: {
                  value: true,
                  message: "Subject Field is Required",
                },
              })}
              placeholder="Subject"
              className="h-[200px]"
            ></textarea>
            <button className="p-4 btn-primary-outline">
              {contactLoading ? "Loading..." : "Contact Me"}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer pauseOnFocusLoss={false} pauseOnHover={false} />
    </>
  );
}
