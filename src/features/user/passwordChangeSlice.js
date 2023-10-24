import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { changePasswordService } from "../../services/Authentication/changePassword";


export const changePasswordApi = createAsyncThunk('/password/change', async (pass) => {

    const response = await changePasswordService(pass)
    console.log(pass)
    console.log(response)
    console.log(response.data.data.errors)
    return response.data.data.errors
})


const PasswordChangeSlice = createSlice({
    name: 'passwordChange',
    initialState: {
        isChangingPassword: false,
        errors: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(changePasswordApi.pending, (state) => {
            state.isChangingPassword = true
        }).addCase(changePasswordApi.fulfilled, (state) => {
            state.isChangingPassword = false
        }).addCase(changePasswordApi.rejected, (state, action) => {
            state.isChangingPassword = false
            state.errors = action.payload;
        })
    }
})


export default PasswordChangeSlice.reducer