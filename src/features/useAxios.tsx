import { BACKEND_DOMAIN } from "@/data/types/constants";
import axios from "axios";
import Cookie from "js-cookie";

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
        // Accept: "application/json",
        "Content-type": "multipart/form-data",
    },
    withCredentials: true,
    xsrfHeaderName: "X-CSRFToken",
    xsrfCookieName: "csrftoken",
    withXSRFToken: true,
});

axiosPrivate.interceptors.request.use(
    (config) => {
        config.headers["X-CSRFToken"] = Cookie.get("csrftoken");
        return config;
    },
    (error) => {
        try {
            axiosPublic.get("/csrf_cookie");
        } catch (error) {
            return Promise.reject(error);
        }
        return Promise.reject(error);
    }
);
