import axios from "axios";
import { mainUrl } from "../helpers/helpers";

export const SignInApi = async (data) => {
  const response = axios.post(mainUrl + "sign-in", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};
