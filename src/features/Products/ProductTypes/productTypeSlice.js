import { createSlice } from "@reduxjs/toolkit";




const productTypeSlice = createSlice({
    name: 'productsType',
    initialState: {
        status: "idle",
        ProductsType: [],
        isLoading: false
    },
    reducers: {},
    extraReducers(builder) {


    }
})