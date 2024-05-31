import { BACKEND_DOMAIN } from "@/data/types/constants";
import axios from "axios";
import { api } from "@/features/services";

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
        "Content-type": "application/json",
    },
    withCredentials: true,
});

axiosPrivate.interceptors.request.use(
    (config) => {
        config.headers.Authorization = `JWT ${localStorage.getItem("access")}`;
        return config;
    },
    (error) => {
        try {
            return api.refreshToken;
        } catch (error) {
            api.logout();
            if (axios.isAxiosError(error))
                return Promise.reject(error.response?.data);
        }
        return Promise.reject(error);
    }
);

axiosPublic.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (axios.isAxiosError(error))
            return Promise.reject(error.response?.data);
        return Promise.reject(error);
    }
);

axiosPrivate.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (axios.isAxiosError(error))
            return Promise.reject(error.response?.data);
        return Promise.reject(error);
    }
);
