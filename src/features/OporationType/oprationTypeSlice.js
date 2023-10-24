import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addOporationTypeService, deleteOporationTypeService, editOporationTypeService, fetchOporationTypes } from "../../services/Oporators/oporationTypeService";


export const fetchOporationTypeApi = createAsyncThunk('/OporationType/fetch', async () => {
    const response = await fetchOporationTypes()
    return response.data.data
})

export const addOporationTypeApi = createAsyncThunk('/OporationType/add', async (type) => {
    const response = await addOporationTypeService(type)
    return response.data.data
})

export const deleteOporationTypeApi = createAsyncThunk('/OporationType/delete', async (id) => {
    await deleteOporationTypeService(id)
    return id
})


export const editOporationTypeApi = createAsyncThunk('/OporationType/edit', async (type) => {
    const response = await editOporationTypeService(type)
    return response.data.data
})

const OporationTypeSlice = createSlice({
    name: 'oporationType',
    initialState: {
        status: "idle",
        OporationType: [],
        isLoading: false
    },
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchOporationTypeApi.pending, state => {
            state.status = "loading"
            state.isLoading = true
        }).addCase(fetchOporationTypeApi.fulfilled, (state, action) => {
            state.status = 'successed'
            state.OporationType = action.payload
            state.isLoading = false
        }).addCase(fetchOporationTypeApi.rejected, state => {
            state.status = "failed"
            state.isLoading = false
        }).addCase(addOporationTypeApi.fulfilled, (state, action) => {
            state.OporationType.push(action.payload)
        }).addCase(deleteOporationTypeApi.fulfilled, (state, action) => {
            state.OporationType = state.OporationType.filter(o => o.id !== action.payload)
        }).addCase(editOporationTypeApi.fulfilled, (state, action) => {

            const types = state.OporationType
            const index = types.findIndex(i => i.id === action.payload.id)

            if (index !== -1) {
                state.OporationType[index] = action.payload
            }
        })
    }
})

export default OporationTypeSlice.reducer