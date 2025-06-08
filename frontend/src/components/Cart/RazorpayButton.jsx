import React from 'react';
import api from '../../utils/api';

const RazorpayButton = ({ amount, onSuccess, onError }) => {
  const handlePayment = async () => {
    try {
      if (!import.meta.env.VITE_RAZORPAY_KEY_ID) {
        throw new Error('Razorpay key not configured');
      }

      // Create order on the backend
      const { data: order } = await api.post('/api/payment/create-order', { 
        amount: parseFloat(amount) 
      }).catch(error => {
        console.error('Order creation failed:', error.response?.data || error);
        throw new Error(error.response?.data?.message || error.message || 'Failed to create order');
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "Fancharge Store",
        description: "Purchase from Rabbit Store",
        order_id: order.id,
        handler: async function (response) {
          try {
            // Verify payment on backend
            const { data } = await api.post('/api/payment/verify-payment', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            }).catch(error => {
              console.error('Payment verification failed:', error.response?.data || error);
              throw new Error(error.response?.data?.message || 'Payment verification failed');
            });
            
            if (data.verified) {
              onSuccess({ 
                orderId: data.order_id,
                paymentId: data.payment_id,
                ...response 
              });
            } else {
              throw new Error('Payment verification failed');
            }
          } catch (err) {
            console.error('Payment processing error:', err);
            onError(err);
          }
        },
        prefill: {
          name: "",
          email: "",
          contact: ""
        },
        theme: {
          color: "#3399cc"
        },
        modal: {
          ondismiss: function () {
            onError(new Error('Payment cancelled by user'));
          }
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.error('Payment initialization error:', err);
      onError(err);
    }
  };

  return (
    <button
      onClick={handlePayment}
      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
    >
      Pay with Razorpay
    </button>
  );
};

export default RazorpayButton;
