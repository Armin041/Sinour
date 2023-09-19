import axios from "axios"

const URL = "Authentication/login";

export const loginUserService = (user) => {
    const headers = {
        "Content-Type": "application/json",
    };
    const response = axios.post(URL, user, { headers });

    return response;
}