import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RazorpayButton from './RazorpayButton'
import { useDispatch, useSelector } from 'react-redux'
import { createCheckout } from '../../redux/slices/checkoutSlice'
import { clearCart } from '../../redux/slices/cartSlice'
import { FiAlertTriangle } from 'react-icons/fi'
import api from '../../utils/api'

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {cart, loading, error: cartError} = useSelector((state) => state.cart);
  const {user} = useSelector((state) => state.auth);
  const [checkoutId, setCheckoutId] = useState(null);
  const [paymentError, setPaymentError] = useState(null);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: ""
  });

  useEffect(() => {
    if(!cart || !cart.products || cart.products.length === 0) {
      navigate("/");
    }
  }, [cart, navigate]);

  const handleCreateCheckout = async (e) => {
    e.preventDefault();
    if(cart && cart.products.length > 0) {
      const res = await dispatch(
        createCheckout({
          checkoutItems: cart.products,
          shippingAddress,
          paymentMethod: "Razorpay",
          totalPrice: cart.totalPrice
        })
      );
      if(res.payload && res.payload._id) {
        setCheckoutId(res.payload._id);
      }
    }
  };

  const handlePaymentSucess = async (details) => {
    try {
      // Call /pay endpoint with properly formatted payment details
      const res = await api.put(
        `/api/checkout/${checkoutId}/pay`,
        { 
          paymentStatus: "paid",
          paymentDetails: {
            id: details.paymentId,
            status: "paid",
            type: "Razorpay",
            details: details
          }
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      
      // Clear the cart after successful payment
      await dispatch(clearCart());
      
      // Redirect to order confirmation with the new order ID
      if (res.data && res.data.order && res.data.order._id) {
        navigate(`/order-confirmation/${res.data.order._id}`);
      } else {
        setPaymentError('Order creation failed. Please contact support.');
      }
    } catch (error) {
      console.error('Payment failed:', error.response?.data || error);
      setPaymentError(error.response?.data?.message || error.message || 'Payment failed. Please try again.');
    }
  };

  const handlePaymentError = (err) => {
    console.error('Payment failed:', err);
    setPaymentError(err.message || 'Payment failed. Please try again.');
  };

  if (paymentError) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
        <div className="flex items-center gap-2 text-red-600">
          <FiAlertTriangle className="w-5 h-5" />
          <p>{paymentError}</p>
        </div>
      </div>
    );
  }

  if(loading) return <div>Loading Cart ...</div>;
  if(cartError) return <div>Error: {cartError}</div>;
  if(!cart || !cart.products || cart.products.length === 0) {
    return <div>Your cart is empty</div>;
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter'>
      {/* Left section*/}
      <div className='bg-white p-6 rounded-lg shadow-lg'>
        <h2 className='text-2xl uppercase mb-6'>Checkout</h2>
        <form onSubmit={handleCreateCheckout}>
          <h3 className='text-lg mb-4'>Contact Details</h3>
          <div className='mb-4'>
            <label className='block text-gray-700'>Email</label>
            <input 
              type="email" 
              value={user? user.email : ""}
              className='w-full p-2 border rounded'
              disabled 
            />
          </div>
          <h3 className='text-lg mb-4'>Delivery</h3>
          <div className='mb-4 grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-gray-700'>First Name</label>
              <input 
                type="text"
                value={shippingAddress.firstName}
                onChange={(e) => 
                  setShippingAddress({...shippingAddress, firstName: e.target.value})}
                className='w-full p-2 border rounded'
                required 
              />
            </div>
            <div>
              <label className='block text-gray-700'>Last Name</label>
              <input 
                type="text"
                value={shippingAddress.lastName}
                onChange={(e) => 
                  setShippingAddress({...shippingAddress, lastName: e.target.value})}
                className='w-full p-2 border rounded'
                required 
              />
            </div>
          </div>

          <div className='mb-4'>
            <label className='block text-gray-700'>Address</label>
            <input 
              type="text" 
              value={shippingAddress.address}
              onChange={(e) =>
                setShippingAddress({...shippingAddress, address: e.target.value})}
              className='w-full p-2 border rounded'
              required
            />
          </div>
          
          <div className='mb-4 grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-gray-700'>City</label>
              <input 
                type="text"
                value={shippingAddress.city}
                onChange={(e) => 
                  setShippingAddress({...shippingAddress, city: e.target.value})}
                className='w-full p-2 border rounded'
                required 
              />
            </div>
            <div>
              <label className='block text-gray-700'>Postal Code</label>
              <input 
                type="text"
                value={shippingAddress.postalCode}
                onChange={(e) => 
                  setShippingAddress({...shippingAddress, postalCode: e.target.value})}
                className='w-full p-2 border rounded'
                required 
              />
            </div>
          </div>

          <div className='mb-4'>
            <label className='block text-gray-700'>Country</label>
            <input 
              type="text" 
              value={shippingAddress.country}
              onChange={(e) =>
                setShippingAddress({...shippingAddress, country: e.target.value})}
              className='w-full p-2 border rounded'
              required
            />
          </div>

          <div className='mb-4'>
            <label className='block text-gray-700'>Phone</label>
            <input 
              type="text" 
              value={shippingAddress.phone}
              onChange={(e) =>
                setShippingAddress({...shippingAddress, phone: e.target.value})}
              className='w-full p-2 border rounded'
              required
            />
          </div>

          <div className='mt-6'>
            {!checkoutId ? (
              <button
                type='submit'
                className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'
              >
                Continue to Payment
              </button>
            ) : (
              <div>
                <h3 className='text-lg mb-4'>Pay With Razorpay</h3>
                <RazorpayButton 
                  amount={cart.totalPrice}
                  onSuccess={handlePaymentSucess} 
                  onError={handlePaymentError}
                />
              </div>
            )}
          </div>
        </form>
      </div>

      <div className='bg-gray-50 p-6 rounded-lg'>
        <h3 className='text-lg mb-4'>Order Summary</h3>
        <div className='border-t py-4 mb-4'>
          {cart.products.map((product, index) => (
            <div key={index} className='flex items-start justify-between py-2 border-2 mb-2 min-w-0'>
              <div className='flex items-start min-w-0'>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className='w-20 h-25 object-cover mr-4 rounded' 
                />
                <div className='min-w-0'>
                  <h3 className='text-md truncate max-w-[120px]' title={product.name}>{product.name}</h3>
                  <p className='text-gray-600 text-xs sm:text-sm'>Size: {product.size}</p>
                  <p className='text-gray-600 text-xs sm:text-sm'>Color: {product.color}</p>
                </div>
              </div>
              <p className='text-base sm:text-xl font-semibold truncate max-w-[70px]' title={`₹${product.price}`}>₹{product.price.toLocaleString()}</p>
            </div>
          ))}
        </div>

        <div className='flex items-center justify-between text-lg mb-4'>
          <p>Subtotal</p>
          <p>${cart.totalPrice.toLocaleString()}</p>
        </div>
        <div className='flex items-center justify-between text-lg mb-4'>
          <p>Shipping</p>
          <p>free</p>
        </div>
        <div className='flex items-center justify-between text-lg mt-4 border-t pt-4'>
          <p>Total</p>
          <p>${cart.totalPrice.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
