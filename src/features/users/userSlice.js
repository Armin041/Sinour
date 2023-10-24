import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { changeUserStatusService, deleteUserService, editUserService, fetchUsers } from '../../services/Authentication/usersService';



export const getUsersApi = createAsyncThunk('/users/List', async () => {
    const response = await fetchUsers()
    return response.data;
})

export const deleteUserApi = createAsyncThunk('/users/delete', async (id) => {



    await deleteUserService(id)
    return id
})

export const editUserApi = createAsyncThunk('/users/edit', async (user) => {

    console.log("update user slice: ", user)
    const response = await editUserService(user)
    console.log("update user slice 2: ", response.data.data)
    return response.data.data
})

export const ChangeUserStatusApi = createAsyncThunk('/users/changeStatus', async (status) => {

    await changeUserStatusService(status)
    return status
})


export const userSlice = createSlice({
    name: 'users',
    initialState: {
        isLoading: false,
        users: [],
        status: 'idle',
    },
    reducers: {


        addNewUser: (state, action) => {
            let { data } = action.payload
            state.users = [...state.users, data]
        },

        deleteLead: (state, action) => {
            let { index } = action.payload
            state.leads.splice(index, 1)
        }
    },

    extraReducers: {
        [getUsersApi.pending]: state => {
            state.status = "loading"
            state.isLoading = true
        },
        [getUsersApi.fulfilled]: (state, action) => {
            state.status = "successed"
            state.users = action.payload.data
            state.isLoading = false
        },
        [getUsersApi.rejected]: state => {
            state.status = "failed"
            state.isLoading = false
        },
        [deleteUserApi.fulfilled]: (state, action) => {
            state.users = state.users.filter(u => u.id !== action.payload)
        },
        [editUserApi.fulfilled]: (state, action) => {
            const users = state.users
            const index = users.findIndex(u => u.id === action.payload.id)
            if (index !== -1) {
                state.users[index] = action.payload
            }
        },
        [ChangeUserStatusApi.fulfilled]: (state, action) => {
            const users = state.users
            const index = users.findIndex(u => u.id === action.payload.id)
            if (index !== -1) {
                state.users[index].isActive = !state.users[index].isActive
            }

        }
    }
})

export const { addNewUser, deleteLead } = userSlice.actions

export default userSlice.reducer