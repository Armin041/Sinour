import { createSlice } from "@reduxjs/toolkit";


const rolesSlice = createSlice({
    name: 'roles',
    initialState: [
        { name: 'مدیر', value: "3fa85f64-5717-4562-b3fc-2c963f66afa6" },
        { name: 'ناظم ', value: "3fa85f64-5717-4562-b3fc-2c963f66afb6" },

    ],
    reducers: {}
})

export default rolesSlice.reducer