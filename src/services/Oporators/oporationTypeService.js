import axios from "axios"
import checkAuth from "../../app/auth";

const oporationType_URL = "/OperationType"
const token = checkAuth()

export const fetchOporationTypes = async () => {

    const headers = {
        Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(oporationType_URL, { headers })
    return response
}

export const addOporationTypeService = async (type) => {

    console.log(type)
    const response = await axios.post(oporationType_URL, type)
    return response
}

export const deleteOporationTypeService = async (id) => {
    const url = `${oporationType_URL}/${id}`
    await axios.delete(url)
}

export const editOporationTypeService = async (role) => {

    const headers = {
        Authorization: `Bearer ${token}`,
    };
    const url = `${oporationType_URL}/${role.id}`
    const response = await axios.put(url, role, { headers })
}