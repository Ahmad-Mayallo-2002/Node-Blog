import axios from "axios";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { FaGithub, FaLinkedinIn, FaPhoneAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
const links = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Dashboard",
    path: "/dashboard/profile",
  },
  {
    name: "Projects",
    path: "/projects",
  },
];

const contactDetails = [
  {
    icon: <FaLocationDot />,
    content: <span>Egypt Damietta Ezbet Elborg</span>,
  },
  {
    content: (
      <Link
        className="underline flex items-center gap-2"
        to="https://www.gmail.com"
      >
        <IoMdMail />
        <span>ahmadmayallo02@gmail.com</span>
      </Link>
    ),
  },
  {
    icon: <FaPhoneAlt />,
    content: <span>01208943693</span>,
  },
  {
    content: (
      <Link
        to="https://github.com/Ahmad-Mayallo-2002"
        className="underline flex items-center gap-2"
      >
        <FaGithub /> My GitHub
      </Link>
    ),
  },
  {
    content: (
      <Link
        to="www.linkedin.com/in/ahmad-mayallo-86944b21b"
        className="underline flex items-center gap-2"
      >
        <FaLinkedinIn /> My Linkedin
      </Link>
    ),
  },
];

const items = [
  "I'm Junior Full Stack Developer (MERN Stack)",
  "I Can make CRUD Operations and Authentication and Authorization Operations",
  "I have a Good Knowledge with API and RESTFUL API",
  "I have a Good Knowledge in Front End and Back End Technologies to Build an Interactive, Responsive, and User Friendly Web Pages",
  "I Studied at Faculty of Computer Science at Damietta University",
  "I have a Passion to Learn More About My Field and Gain Experience in My Field",
];

const defaultUserImage =
  "https://cdn-icons-png.flaticon.com/128/3177/3177440.png";

const mainUrl = "https://nodeblog-api.vercel.app/api/";

if (localStorage.getItem("theme") == null) {
  localStorage.setItem("theme", "light");
}

const getData = async (endpoint, id, token) => {
  const response = await axios.get(mainUrl + endpoint, {
    headers: {
      "Content-Type": "application/json",
      id: id,
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

function bufferToBase64(buffer) {
  const binaryString = buffer.reduce(
    (acc, byte) => acc + String.fromCharCode(byte),
    ""
  );
  return btoa(binaryString);
}

export {
  links,
  defaultUserImage,
  mainUrl,
  contactDetails,
  items,
  getData,
  bufferToBase64,
};
