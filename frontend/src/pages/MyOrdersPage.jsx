import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserOrders } from '../redux/slices/orderSlice';
import { motion } from 'framer-motion';

const MyOrdersPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { orders, loading, error } = useSelector((state) => state.order);
    const { user, token } = useSelector((state) => state.auth);

    useEffect(() => {
        // Check authentication before fetching orders
        if (!user || !token) {
            navigate('/login', { 
                state: { from: '/profile' },
                replace: true 
            });
            return;
        }

        dispatch(fetchUserOrders());
    }, [dispatch, navigate, user, token]);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    };

    const getStatusBadge = (order) => {
        if (!order.isPaid) return {
            label: 'Payment Pending',
            classes: 'bg-yellow-100 text-yellow-700 border border-yellow-200'
        };
        
        if (order.isDelivered) return {
            label: 'Delivered',
            classes: 'bg-green-100 text-green-700 border border-green-200'
        };
        
        if (order.status === 'shipped') return {
            label: 'Shipped',
            classes: 'bg-blue-100 text-blue-700 border border-blue-200'
        };
        
        return {
            label: 'Processing',
            classes: 'bg-purple-100 text-purple-700 border border-purple-200'
        };
    };

    const handleRowClick = (orderId) => {
        navigate(`/order/${orderId}`);
    }

    // Show loading state
    if (loading) {
        return (
            <div className='min-h-[400px] flex items-center justify-center'>
                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className='text-center text-gray-600'
                >
                    Loading orders...
                </motion.div>
            </div>
        );
    }

    // Show error state with login redirect
    if (error) {
        return (
            <div className='min-h-[400px] flex items-center justify-center'>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='text-center'
                >
                    <p className='text-red-500 mb-4'>{error}</p>
                    {(!user || !token) && (
                        <button 
                            onClick={() => navigate('/login')}
                            className='text-[var(--srh-orange)] hover:underline'
                        >
                            Click here to login
                        </button>
                    )}
                </motion.div>
            </div>
        );
    }

    return (
        <div className='max-w-7xl mx-auto p-4 sm:p-6'>
            <motion.h2 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className='text-xl sm:text-2xl font-bold mb-6'
            >
                My Orders
            </motion.h2>
            <div className='relative shadow-md sm:rounded-lg overflow-hidden bg-white'>
                <div className='overflow-x-auto'>
                    <table className='w-full text-left text-gray-700'>
                        <thead className='bg-gradient-to-r from-blue-100 to-blue-200 text-xs uppercase text-blue-800'>
                            <tr>
                                <th className='px-3 sm:px-6 py-3 whitespace-nowrap'>Product</th>
                                <th className='px-3 sm:px-6 py-3 whitespace-nowrap'>Order ID</th>
                                <th className='px-3 sm:px-6 py-3 whitespace-nowrap'>Date</th>
                                <th className='px-3 sm:px-6 py-3 whitespace-nowrap'>Address</th>
                                <th className='px-3 sm:px-6 py-3 whitespace-nowrap'>Items</th>
                                <th className='px-3 sm:px-6 py-3 whitespace-nowrap'>Price</th>
                                <th className='px-3 sm:px-6 py-3 whitespace-nowrap'>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length > 0 ? (
                                orders.map((order, index) => (
                                    <motion.tr 
                                        key={order._id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        onClick={() => handleRowClick(order._id)}
                                        className='border-b hover:bg-blue-50 transition-all duration-300 cursor-pointer'
                                    >
                                        <td className='px-3 sm:px-6 py-4'>
                                            <div className="relative group">
                                                <img 
                                                    src={order.orderItems[0]?.images?.[0]?.url || order.orderItems[0]?.image || "/vite.svg"}
                                                    alt={order.orderItems[0]?.name || "Product"} 
                                                    className='w-12 h-12 object-cover rounded-lg border shadow-sm transition-transform duration-300 group-hover:scale-110' 
                                                />
                                            </div>
                                        </td>
                                        <td className='px-3 sm:px-6 py-4 font-medium text-gray-900'>
                                            <span className='text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-300'>
                                                #{order._id}
                                            </span>
                                        </td>
                                        <td className='px-3 sm:px-6 py-4 whitespace-nowrap'>
                                            <div className="flex flex-col">
                                                <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                                                <span className='text-xs text-gray-400'>{new Date(order.createdAt).toLocaleTimeString()}</span>
                                            </div>
                                        </td>
                                        <td className='px-3 sm:px-6 py-4 whitespace-nowrap'>
                                            {order.shippingAddress ? `${order.shippingAddress.city}, ${order.shippingAddress.country}` : "N/A"}
                                        </td>
                                        <td className='px-3 sm:px-6 py-4 whitespace-nowrap'>
                                            {order.orderItems.length}
                                        </td>
                                        <td className='px-3 sm:px-6 py-4 whitespace-nowrap'>
                                            <span className='font-semibold text-blue-700'>{formatPrice(order.totalPrice)}</span>
                                        </td>
                                        <td className='px-3 sm:px-6 py-4 whitespace-nowrap'>
                                            {(() => {
                                                const status = getStatusBadge(order);
                                                return (
                                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${status.classes} transition-all duration-300 hover:scale-105`}> 
                                                        {status.label}
                                                    </span>
                                                );
                                            })()}
                                        </td>
                                    </motion.tr>
                                ))
                            ) : (
                                <motion.tr
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <td colSpan={7} className='px-6 py-12 text-center text-gray-500 bg-gradient-to-r from-blue-50 to-blue-100'>
                                        <motion.div 
                                            className="flex flex-col items-center gap-2"
                                            initial={{ scale: 0.9 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", stiffness: 200 }}
                                        >
                                            <img src="/vite.svg" alt="No orders" className="w-16 h-16 opacity-60" />
                                            <p className='text-lg font-semibold text-blue-700'>No orders found</p>
                                            <p className='text-gray-500'>You have not placed any orders yet. Start shopping now!</p>
                                            <motion.button 
                                                onClick={() => navigate("/")} 
                                                className='mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all duration-300 hover:shadow-lg'
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                Go to Home
                                            </motion.button>
                                        </motion.div>
                                    </td>
                                </motion.tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default MyOrdersPage;