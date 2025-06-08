import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

//Async Thunk to fetch user Orders
export const fetchUserOrders = createAsyncThunk(
    "orders/fetchUserOrders",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/api/orders/my-orders');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

//Async Thunk to fetch order details by ID
export const fetchOrderDetails = createAsyncThunk(
    "orders/fetchOrderDetails",
    async (orderId, { rejectWithValue }) => {
        try {
            const response = await api.get(`/api/orders/${orderId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const orderSlice = createSlice({
    name: "order",
    initialState: {
        orders: [],
        totalOrders: 0,
        orderDetails: null,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        
        builder
        // Fetch user orders
        .addCase(fetchUserOrders.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchUserOrders.fulfilled, (state, action) => {
            state.loading = false;
            state.orders = action.payload;
        })
        .addCase(fetchUserOrders.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        })
        // Fetch order details
        .addCase(fetchOrderDetails.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchOrderDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.orderDetails = action.payload;
        })
        .addCase(fetchOrderDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        });
    }
});

export default orderSlice.reducer;