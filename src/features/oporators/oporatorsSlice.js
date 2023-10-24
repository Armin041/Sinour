import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addOporatorsService, deleteOporatorsService, editOOporatorsService, fetchOporatorsService } from "../../services/Oporators/oporatorsService";

export const fetchOporatorsApi = createAsyncThunk('/Oporators/fetch', async () => {
    const response = await fetchOporatorsService()
    return response.data.data
})

export const addOporatorsApi = createAsyncThunk('/Oporators/add', async (oporators) => {
    const response = await addOporatorsService(oporators)
    return response.data.data
})

export const deleteOporatorsApi = createAsyncThunk('/Oporators/delete', async (nationalCode) => {
    await deleteOporatorsService(nationalCode)
    return nationalCode
})


export const editOporatorsApi = createAsyncThunk('/Oporators/edit', async (oporators) => {
    const response = await editOOporatorsService(oporators)
    return response.data.data
})


const oporatorsSlice = createSlice({

    name: 'oporators',
    initialState: {
        status: "idle",
        oporators: [],
        isLoading: false
    },
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchOporatorsApi.pending, state => {
            state.status = "loading"
            state.isLoading = true
        }).addCase(fetchOporatorsApi.fulfilled, (state, action) => {
            state.status = 'successed'
            state.oporators = action.payload
            state.isLoading = false
        }).addCase(fetchOporatorsApi.rejected, state => {
            state.status = "failed"
            state.isLoading = false
        }).addCase(addOporatorsApi.fulfilled, (state, action) => {
            state.oporators.push(action.payload)
        }).addCase(deleteOporatorsApi.fulfilled, (state, action) => {
            state.oporators = state.oporators.filter(o => o.nationalCode !== action.payload)
        }).addCase(editOporatorsApi.fulfilled, (state, action) => {

            const oporators = state.oporators
            const index = oporators.findIndex(i => i.nationalCode === action.payload.nationalCode)

            if (index !== -1) {
                state.oporators[index] = action.payload
            }
        })
    }
})

export default oporatorsSlice.reducer