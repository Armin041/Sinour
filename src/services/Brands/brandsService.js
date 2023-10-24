import axios from "axios"
import checkAuth from "../../app/auth";

const Brands_URL = "/Brand"
const token = checkAuth()

export const fetchBrandsService = async () => {

    const headers = {
        Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(Brands_URL, { headers })
    return response
}

export const addBrandsService = async (brand) => {

    console.log(brand)

    const response = await axios.post(Brands_URL, brand)
    return response
}

export const deleteBrandsService = async (id) => {
    const url = `${Brands_URL}/${id}`
    await axios.delete(url)
}

export const editBrandsService = async (brand) => {

    const headers = {
        Authorization: `Bearer ${token}`,
    };
    const url = `${Brands_URL}/${brand.id}`
    const response = await axios.put(url, brand, { headers })
    return response
}