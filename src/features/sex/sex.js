import { createSlice } from "@reduxjs/toolkit";


const sexSlice = createSlice({
    name: 'sex',
    initialState: [
        { name: 'مذکر', value: 1 },
        { name: 'مونث', value: 2 },

    ],
    reducers: {}
})

export default sexSlice.reducer