import axios from "axios";
import { mainUrl } from "../helpers/helpers";

export const deleteApi = async (endpoint, token, id) => {
  const response = await axios.delete(mainUrl + endpoint, {
    headers: {
      "Content-Type": "application/json",
      id: id,
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};
