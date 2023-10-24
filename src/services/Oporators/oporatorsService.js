import axios from "axios"
import checkAuth from "../../app/auth";

const oporators_URL = "/Operator"
const token = checkAuth()

export const fetchOporatorsService = async () => {

    const headers = {
        Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(oporators_URL, { headers })
    return response
}

export const addOporatorsService = async (oporator) => {

    console.log(oporator)

    const response = await axios.post(oporators_URL, oporator)
    return response
}

export const deleteOporatorsService = async (id) => {
    const url = `${oporators_URL}/${id}`
    await axios.delete(url)
}

export const editOOporatorsService = async (oporator) => {

    const headers = {
        Authorization: `Bearer ${token}`,
    };
    const url = `${oporators_URL}/${oporator.nationalCode}`
    const response = await axios.put(url, oporator, { headers })
}