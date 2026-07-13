import axios from "axios";

export const API_URL = import.meta.env.VITE_PUBLIC_API_BASE_URL || "";
export const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "";

export const client = axios.create({
    baseURL: API_URL
})

export const strapi = axios.create({
    baseURL: STRAPI_URL
})