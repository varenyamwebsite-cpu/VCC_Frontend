import axios from "axios";
import { STRAPI_URL } from "../../config";

export async function getEventCards() {
  const res = await axios.get(`${STRAPI_URL}/events`);

  return res.data.data;
}
