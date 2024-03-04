import { useEffect, useState } from "react";
import { axiosPublic } from "@/features/useAxios";

const CSRFToken = () => {
    const [csrfToken, setCsrfToken] = useState("");
    const getCookie = (name: string) => {
        let cookieValue = null;
        if (document.cookie && document.cookie !== "") {
            let cookies = document.cookie.split(";");
            for (let i = 0; i < cookies.length; i++) {
                let cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === name + "=") {
                    cookieValue = decodeURIComponent(
                        cookie.substring(name.length + 1)
                    );
                    break;
                }
            }
        }
        return cookieValue;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                await axiosPublic.get("/csrf_cookie");
            } catch (error) {}
        };
        fetchData();
        setCsrfToken(getCookie("csrftoken") as string);
        console.log(csrfToken);
    }, []);

    return (
        <input type={"hidden"} name={"csrfmiddlewaretoken"} value={csrfToken} />
    );
};
export default CSRFToken;
