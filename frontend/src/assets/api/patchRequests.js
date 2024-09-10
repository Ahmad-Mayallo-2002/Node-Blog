import axios from "axios";
import { mainUrl } from "../helpers/helpers";

export const patchApi = async (endpoint, token, id, form) => {
  const formData = new FormData(form);
  const response = await axios.patch(mainUrl + endpoint, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
      id: id,
    },
  });
  return response;
};
