import axios from "axios"
import checkAuth from "../../app/auth";


const URL = "/User/users"
const deleteURL = "/User/delete-user"
const editURL = "/User/edit-user"
const getRolesURL = "/UserType"
const changeStatusURL = "/User/activate-deactivate"
const token = checkAuth()

export const fetchUsers = async () => {
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(URL, { headers })
    return response
}

export const deleteUserService = async (id) => {


    const url = `${deleteURL}/${id}`
    return axios.delete(url)

}

export const editUserService = async (user) => {
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    const url = `${editURL}/${user.id}`
    const response = await axios.put(url, user, { headers })
    return response

}

export const fetchUserRolesService = async () => {
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(getRolesURL, { headers })
    return response
}


export const changeUserStatusService = async (status) => {

    const headers = {
        Authorization: `Bearer ${token}`,
    };

    console.log(status)

    const response = await axios.post(changeStatusURL, status, { headers })
    return response

}