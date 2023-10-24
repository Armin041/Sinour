import axios from "axios"
import checkAuth from "../../app/auth";

const productName_URL = "/ProductName"
const token = checkAuth()

export const fetchProductNameService = async () => {

    const headers = {
        Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(productName_URL, { headers })
    return response
}

export const addProductNameService = async (Product) => {

    console.log(Product)

    const response = await axios.post(productName_URL, Product)
    return response
}

export const deleteProductNameService = async (id) => {
    const url = `${productName_URL}/${id}`
    await axios.delete(url)
}

export const editProductNameService = async (Product) => {

    const headers = {
        Authorization: `Bearer ${token}`,
    };
    const url = `${productName_URL}/${Product.id}`
    const response = await axios.put(url, Product, { headers })
    return response
}