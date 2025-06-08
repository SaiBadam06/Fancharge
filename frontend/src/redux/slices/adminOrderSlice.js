import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

//Fetch all orders (admin only)
export const fetchAllOrders = createAsyncThunk(
    "adminOrder/fetchAllOrders",
    async (_, { rejectWithValue }) => {
        try {            const response = await api.get('/api/admin/orders');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

//Update order delivery status (admin only)
export const updateOrderStatus = createAsyncThunk(
    "adminOrder/updateOrderStatus",
    async ({id, status}, { rejectWithValue }) => {
        try {            const response = await api.put(`/api/admin/orders/${id}`, { status });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

//Delete an order (admin only)
export const deleteOrder = createAsyncThunk(
    "adminOrder/deleteOrder",
    async (id, { rejectWithValue }) => {
        try {            await api.delete(`/api/admin/orders/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const adminOrderSlice = createSlice({
    name: "adminOrder",
    initialState: {
        orders: [],
        totalOrders: 0,
        totalSales: 0,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
                state.totalOrders = action.payload.length;

                // calculate total sales
                const totalSales = action.payload.reduce((acc, order) => {
                    return acc + order.totalPrice;
                }, 0);
            })
            .addCase(fetchAllOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            //update order status
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                const updatedOrder = action.payload;
                const orderIndex = state.orders.findIndex(
                    (order) => order._id === updatedOrder._id
                );
                if(orderIndex !== -1) {
                    state.orders[orderIndex] = updatedOrder;
                }
            })
            //delete order
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.orders = state.orders.filter(
                    (order) => order._id !== action.payload
                );
            });
    },
    
});

export default adminOrderSlice.reducer;