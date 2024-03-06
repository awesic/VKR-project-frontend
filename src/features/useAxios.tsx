import { BACKEND_DOMAIN } from "@/data/types/constants";
import axios from "axios";
import { api } from "@/features/services";
// import Cookie from "js-cookie";

export const axiosPublic = axios.create({
    baseURL: BACKEND_DOMAIN,
    headers: {
        Accept: "application/json",
        "Content-type": "application/json",
    },
    withCredentials: true,
});

export const axiosPrivate = axios.create({
    baseURL: BACKEND_DOMAIN,
    headers: {
        Accept: "application/json",
        "Content-type": "multipart/form-data",
    },
    withCredentials: true,
});

axiosPrivate.interceptors.request.use(
    (config) => {
        config.headers.Authorization = `Bearer ${localStorage.getItem(
            "access"
        )}`;
        return config;
    },
    (error) => {
        try {
            api.refreshToken;
        } catch (error) {
            return Promise.reject(error);
        }
        return Promise.reject(error);
    }
);
