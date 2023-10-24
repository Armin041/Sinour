import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUserRolesService } from "../../services/Authentication/usersService";
import { deleteRoleService, newRoleService, updateRoleService } from "../../services/Authentication/RolesService";

export const fetchUserRolesApi = createAsyncThunk('/users/roles', async () => {
    const response = await fetchUserRolesService()
    return response.data.data
})

export const addRoleApi = createAsyncThunk('/Roles/add', async (role) => {

    const response = await newRoleService(role)
    return response.data.data
})

export const deleteRoleApi = createAsyncThunk('/Roles/delete', async (id) => {
    await deleteRoleService(id)
    return id
})

export const updateRoleApi = createAsyncThunk('/Roles/edit', async (role) => {
    const response = await updateRoleService(role, role.id)
    return response.data.data
})

const rolesSlice = createSlice({
    name: 'roles',
    initialState: {
        status: "idle",
        Roles: [],
        isLoading: false
    },
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchUserRolesApi.pending, state => {
            state.status = "loading"
            state.isLoading = true
        }).addCase(fetchUserRolesApi.fulfilled, (state, action) => {
            state.status = "successed"
            state.Roles = action.payload
            state.isLoading = false
        }).addCase(fetchUserRolesApi.rejected, state => {
            state.status = "failed"
            state.isLoading = false
        }).addCase(addRoleApi.fulfilled, (state, action) => {
            state.Roles.push(action.payload)
        }).addCase(deleteRoleApi.fulfilled, (state, action) => {

            state.Roles = state.Roles.filter(r => r.id !== action.payload)

        }).addCase(updateRoleApi.fulfilled, (state, action) => {

            const roles = state.Roles

            const index = roles.findIndex(r => r.id === action.payload.id)
            if (index !== -1) {
                state.Roles[index] = action.payload
            }
        })
    }
})

export default rolesSlice.reducer