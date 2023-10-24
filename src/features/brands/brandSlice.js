import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUserRolesService } from "../../services/Authentication/usersService";
import { deleteRoleService, newRoleService, updateRoleService } from "../../services/Authentication/RolesService";
import { addBrandsService, deleteBrandsService, editBrandsService, fetchBrandsService } from "../../services/Brands/brandsService";

export const fetchBrandsApi = createAsyncThunk('/Brands/Brands', async () => {
    const response = await fetchBrandsService()
    return response.data.data
})

export const addBrandsApi = createAsyncThunk('/Brands/add', async (brand) => {

    const response = await addBrandsService(brand)
    return response.data.data
})

export const deleteBrandsApi = createAsyncThunk('/Brands/delete', async (id) => {
    await deleteBrandsService(id)
    return id
})

export const updateBrandsApi = createAsyncThunk('/Brands/edit', async (brand) => {
    const response = await editBrandsService(brand, brand.id)
    return response.data.data
})

const brandSlice = createSlice({
    name: 'brands',
    initialState: {
        status: "idle",
        Brands: [],
        isLoading: false
    },
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchBrandsApi.pending, state => {
            state.status = "loading"
            state.isLoading = true
        }).addCase(fetchBrandsApi.fulfilled, (state, action) => {
            state.status = "successed"
            state.Brands = action.payload
            state.isLoading = false
        }).addCase(fetchBrandsApi.rejected, state => {
            state.status = "failed"
            state.isLoading = false
        }).addCase(addBrandsApi.fulfilled, (state, action) => {
            state.Brands.push(action.payload)
        }).addCase(deleteBrandsApi.fulfilled, (state, action) => {

            state.Brands = state.Brands.filter(r => r.id !== action.payload)

        }).addCase(updateBrandsApi.fulfilled, (state, action) => {

            const Brands = state.Brands

            const index = Brands.findIndex(r => r.id === action.payload.id)
            if (index !== -1) {
                state.Brands[index] = action.payload
            }
        })
    }
})

export default brandSlice.reducer