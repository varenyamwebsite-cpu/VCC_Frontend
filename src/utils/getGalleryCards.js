import axios from "axios";
import { STRAPI_URL } from "../../config";

export async function getGalleryCards() {
  const res = await axios.get(`${STRAPI_URL}/galleries`);

  const data = res.data.data;

  return data.map((item) => ({
    src: item.image,
    title: item.title || "",
    description: item.description || "",
    tags: item.tags
      ? item.tags
        .split("\n")
        .map((tag) => tag.trim())
        .filter(Boolean)
      : [],
  }));
}
