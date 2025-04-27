import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderDetails } from '../redux/slices/orderSlice';


const OrderDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {orderDetails, loading, error} = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchOrderDetails(id));
  }, [dispatch, id]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}...</div>;
  }
  if (!orderDetails) {
    return <div>No Order details found</div>;
  }



  return (
    <div className='max-w-7xl mx-auto p-4 sm:p-6'>
      <h2 className='text-2xl md:text-3xl font-bold mb-6'>Order Details</h2>
      {!orderDetails ? (
        <p>No Order details found</p>
      ) : (
        <div className='p-4 sm:p-6 rounded-lg border'> 
          {/* Order Info */}
          <div className='flex flex-col sm:flex-row justify-between mb-8'>
            <div>
              <h3 className='text-lg md:text-xl font-semibold'>
                Order ID: #{orderDetails._id}
              </h3>
              <p className='text-gray-600'>
                {new Date(orderDetails.createdAt).toLocaleString()}
              </p>
            </div>
            <div className='flex flex-col items-start sm:items-end mt-4 sm:mt-0'>
              <span className={`${orderDetails.isPaid ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"} px-3 py-1 rounded-full text-sm font-medium mb-2`}>
                {orderDetails.isPaid ? "Approved" : "Pending"}
              </span>
              <span className={`${orderDetails.isDelivered ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"} px-3 py-1 rounded-full text-sm font-medium mb-2`}>
                {orderDetails.isDelivered ? "Delivered" : "Pending"}
              </span>
            </div>
          </div>    
          
          {/* Customer, Payment, Shipping Info */}
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8'>
            <div>
              <h4 className='text-lg font-semibold mb-2'>Payment Info</h4>
              <p>Payment Method: {orderDetails.paymentMethod}</p>
              <p>Status: {orderDetails.isPaid ? "Paid" : "Unpaid"}</p>
            </div>
            <div>
              <h4 className='text-lg font-semibold mb-2'>Shipping Info</h4>
              <p>Shipping Method: {orderDetails.shippingMethod}</p>
              <p>Address: {`${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.country}`}</p>
            </div>
          </div>
          
          {/* Product List */}
          <div className='overflow-x-auto'>
            <h4 className='text-lg font-semibold mb-4'>Products</h4>
            <table className='min-w-full text-gray-600 mb-4'>
              <thead>
                <tr>
                  <th className='px-4 py-2 text-left'>Product</th>
                  <th className='px-4 py-2 text-right'>Unit Price</th>
                  <th className='px-4 py-2 text-right'>Quantity</th>
                  <th className='px-4 py-2 text-right'>Total</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.orderItems.map((item) => (
                  <tr key={item.productId} className='border-b'>
                    <td className='px-4 py-2'>
                      <div className='flex items-center'>
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className='w-12 h-12 object-cover rounded-lg mr-4' 
                        />
                        <Link 
                          to={`/product/${item.productId}`} 
                          className='text-blue-500 hover:underline'
                        >
                          {item.name}
                        </Link>
                      </div>
                    </td>
                    <td className='px-4 py-2 text-right'>${item.price.toFixed(2)}</td>
                    <td className='px-4 py-2 text-right'>{item.quantity}</td>
                    <td className='px-4 py-2 text-right'>${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Back To Orders Link */}
          <Link 
            to="/my-orders" 
            className='inline-block mt-4 text-blue-500 hover:underline'
          >
            Back to My Orders
          </Link>
        </div>
      )}
    </div>
  );
}

export default OrderDetailsPage;