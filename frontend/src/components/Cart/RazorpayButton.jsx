import React, { useEffect, useState } from 'react';
import api from '../../utils/api';

const RazorpayButton = ({ amount, onSuccess, onError }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    if (!document.getElementById('razorpay-js')) {
      const script = document.createElement('script');
      script.id = 'razorpay-js';
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => setIsScriptLoaded(true);
      document.body.appendChild(script);
    } else {
      setIsScriptLoaded(true);
    }
  }, []);
  const handlePayment = async () => {
    if (!isScriptLoaded) {
      onError(new Error('Razorpay SDK is still loading'));
      return;
    }

    try {
      setIsLoading(true);

      if (!import.meta.env.VITE_RAZORPAY_KEY_ID) {
        throw new Error('Razorpay key not configured');
      }

      // Create order on backend
      const orderResponse = await api.post('/api/payment/create-order', {
        amount: parseFloat(amount)
      });

      if (!orderResponse?.data) {
        throw new Error('Failed to create order');
      }      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderResponse.data.amount,
        currency: 'INR',
        name: 'Fancharge Store',
        description: 'Purchase from Fancharge Store',
        order_id: orderResponse.data.id,
        retry: {
          enabled: false
        },
        notes: {
          address: 'Fancharge Store Note'
        },
        handler: async function (response) {
          try {
            // Verify payment on backend
            const { data } = await api.post('/api/payment/verify-payment', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
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
        },        modal: {
          confirm_close: true,
          escape: true,
          handleback: false,
          ondismiss: function () {
            onError(new Error('Payment cancelled by user'));
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on('payment.failed', function (response) {
        onError(new Error(response.error.description));
      });
      razorpay.open();
    } catch (err) {
      console.error('Payment initialization error:', err);
      onError(err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <button
      onClick={handlePayment}
      disabled={isLoading || !isScriptLoaded}
      className={`w-full ${
        isLoading || !isScriptLoaded
          ? 'bg-blue-400 cursor-not-allowed'
          : 'bg-blue-600 hover:bg-blue-700'
      } text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center`}
    >
      {isLoading ? (
        <span className="inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-white mr-2" />
      ) : null}
      {isLoading ? 'Processing...' : isScriptLoaded ? 'Pay with Razorpay' : 'Loading...'}
    </button>
  );
};

export default RazorpayButton;
