import axios from "axios"

const URL = "Authentication/register";

export const registerUserService = (user) => {
    const headers = {
        "Content-Type": "application/json",
    };
    const response = axios.post(URL, user, { headers });

    return response;
}