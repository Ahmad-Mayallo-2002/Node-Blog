import axios from "axios";
import { mainUrl } from "../helpers/helpers";
export const SignUpApi = async (form) => {
  const formData = new FormData(form);
  const response = await axios.post(mainUrl + "sign-up", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};
