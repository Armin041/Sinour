import axios from "axios"
import checkAuth from "../../app/auth";


const URL = "Authentication/users"
const token = checkAuth()

export const fetchUsers = () => {
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    const response = axios.get(URL, { headers })
    return response
}