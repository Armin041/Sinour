import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addProductNameService, deleteProductNameService, editProductNameService, fetchProductNameService } from "../../../services/Products/productsNameService";


export const fetchProductNameApi = createAsyncThunk('/ProductName/list', async () => {
    const response = await fetchProductNameService()
    return response.data.data
})

export const addProductNameApi = createAsyncThunk('/ProductName/add', async (brand) => {

    const response = await addProductNameService(brand)
    return response.data.data
})

export const deleteProductNameApi = createAsyncThunk('/ProductName/delete', async (id) => {
    await deleteProductNameService(id)
    return id
})

export const updateProductNameApi = createAsyncThunk('/ProductName/edit', async (brand) => {
    const response = await editProductNameService(brand, brand.id)
    return response.data.data
})

const productNameSlice = createSlice({
    name: 'productName',
    initialState: {
        status: "idle",
        ProductName: [],
        isLoading: false
    },
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchProductNameApi.pending, state => {
            state.status = "loading"
            state.isLoading = true
        }).addCase(fetchProductNameApi.fulfilled, (state, action) => {
            state.status = "successed"
            state.ProductName = action.payload
            state.isLoading = false
        }).addCase(fetchProductNameApi.rejected, state => {
            state.status = "failed"
            state.isLoading = false
        }).addCase(addProductNameApi.fulfilled, (state, action) => {
            state.ProductName.push(action.payload)
        }).addCase(deleteProductNameApi.fulfilled, (state, action) => {

            state.ProductName = state.ProductName.filter(r => r.id !== action.payload)

        }).addCase(updateProductNameApi.fulfilled, (state, action) => {

            const ProductNames = state.ProductName

            const index = ProductNames.findIndex(r => r.id === action.payload.id)
            if (index !== -1) {
                state.ProductName[index] = action.payload
            }
        })
    }
})


export default productNameSlice.reducer