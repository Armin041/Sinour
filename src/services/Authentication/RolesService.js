import axios from "axios"
import checkAuth from "../../app/auth"

const token = checkAuth()

const getRolesURL = "/UserType"


export const newRoleService = async (role) => {

    const response = await axios.post(getRolesURL, role)
    return response
}

export const deleteRoleService = async (id) => {

    const url = `${getRolesURL}/${id}`
    return axios.delete(url)
}

export const updateRoleService = async (role, id) => {

    const headers = {
        Authorization: `Bearer ${token}`,
    };

    const url = `${getRolesURL}/${id}`
    const response = await axios.put(url, role, { headers })
    return response
}