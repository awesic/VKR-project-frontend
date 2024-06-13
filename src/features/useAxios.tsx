import { BACKEND_DOMAIN } from "@/data/types/constants";
import axios from "axios";
import { jwtDecode } from "jwt-decode"
import { api } from "@/features/services";
// import { getCookie } from "@/data/helpers";

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

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
        let token = localStorage.getItem("access");
        if (token) {
            const tokenExpiration = jwtDecode(token).exp;
            const now = Date.now() / 1000;

            if (tokenExpiration && tokenExpiration < now) {
                api.refreshToken();
                token = localStorage.getItem("access");
            }
            config.headers.Authorization = `JWT ${token}`;
        }
        // config.headers['X-CSRFToken'] = getCookie("csrftoken");
        console.log(config);
        return config;
    },
    (error) => {
        // try {
        //     return api.refreshToken;
        // } catch (error) {
        //     api.logout();
        //     if (axios.isAxiosError(error))
        //         return Promise.reject(error.response?.data);
        // }
        // return Promise.reject(error);
        if (axios.isAxiosError(error))
            return Promise.reject(error.response?.data);
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
