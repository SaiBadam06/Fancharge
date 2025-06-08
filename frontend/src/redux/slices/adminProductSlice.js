import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

// Async Thunk to fetch admin products (admin only)
export const fetchAdminProducts = createAsyncThunk(
    "adminProduct/fetchProducts",
    async () => {        const response = await api.get('/api/admin/products');
        return response.data;
    }
);

// Async Thunk to add a new product (admin only)
export const createProduct = createAsyncThunk(
    "adminProduct/createProduct",
    async (productData) => {        const response = await api.post('/api/admin/products', productData);
        return response.data;
    }
);

//Async Thunk to update a product (admin only)
export const updateProduct = createAsyncThunk(
    "adminProduct/updateProduct",
    async ({ id, productData }) => {        const response = await api.put(`/api/admin/products/${id}`, productData);
        return response.data;
    }
);

// Async Thunk to delete a product (admin only)
export const deleteProduct = createAsyncThunk(
    "adminProduct/deleteProduct",
    async (id) => {        const response = await api.delete(`/api/admin/products/${id}`);
        return response.data;
    }
);

const adminProductSlice = createSlice({
    name: "adminProduct",
    initialState: {
        products: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdminProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAdminProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchAdminProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //create product
            .addCase(createProduct.fulfilled, (state, action) => {
                state.products.push(action.payload);
            })
            //update product
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.products.findIndex(
                    (product) => product._id === action.payload._id
                );
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
            })

            //delete product
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(
                    (product) => product._id !== action.payload
                );
            });
    },
    
});

export default adminProductSlice.reducer;