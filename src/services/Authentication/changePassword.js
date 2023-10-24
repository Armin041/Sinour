import axios from "axios"
import checkAuth from "../../app/auth";

const URL = "/Authentication/current/change-password"
const token = checkAuth()


export const changePasswordService = async (pass) => {

    const headers = {
        Authorization: `Bearer ${token}`,
    };

    const response = axios.post(URL, pass, { headers })
    return response
}