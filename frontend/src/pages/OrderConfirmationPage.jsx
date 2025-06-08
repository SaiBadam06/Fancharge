import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderDetails } from '../redux/slices/orderSlice';
import { FiCheck, FiLoader } from 'react-icons/fi';

const OrderConfirmationPage = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const { orderDetails: currentOrder, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    if (orderId) {
      dispatch(fetchOrderDetails(orderId));
    }
  }, [dispatch, orderId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <FiLoader className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!currentOrder) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-green-50 border border-green-200 rounded-md p-6 mb-8">
          <div className="flex items-center gap-3">
            <FiCheck className="w-6 h-6 text-green-600" />
            <h1 className="text-2xl font-bold text-green-600">Order Confirmed!</h1>
          </div>
          <p className="mt-2 text-gray-600">
            Thank you for your order. Your order number is #{currentOrder._id}
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Order Details</h2>
          <div className="space-y-4">
            {currentOrder.orderItems.map((item) => (
              <div key={item._id} className="flex items-center gap-4">
                <img
                  src={item.images[0]?.url}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-gray-600">
                    Quantity: {item.quantity} × ₹{item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>₹{currentOrder.totalPrice}</span>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
          <div className="space-y-2">
            <p>
              {currentOrder.shippingAddress.firstName}{' '}
              {currentOrder.shippingAddress.lastName}
            </p>
            <p>{currentOrder.shippingAddress.address}</p>
            <p>
              {currentOrder.shippingAddress.city},{' '}
              {currentOrder.shippingAddress.postalCode}
            </p>
            <p>{currentOrder.shippingAddress.country}</p>
            <p>Phone: {currentOrder.shippingAddress.phone}</p>
          </div>
        </div>

        <div className="mt-8 text-center">          <Link
            to="/my-orders"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            View All Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;