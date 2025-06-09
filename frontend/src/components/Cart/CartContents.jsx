import React from 'react'
import { RiDeleteBin3Line } from 'react-icons/ri'
import { useDispatch } from 'react-redux'
import { removeFromCart, updateCartItemQuantity } from '../../redux/slices/cartSlice'

const CartContents = ({cart, userId, guestId}) => {
  const dispatch = useDispatch();

  const handleAddToCart = (productId, delta, quantity, size, color) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1) {
      dispatch(
        updateCartItemQuantity({
          productId,
          quantity: newQuantity,
          guestId,
          userId,
          size,
          color,
        })
      );
    }
  };

  const handleRemoveFromCart = (productId, size, color) => {
    dispatch(
      removeFromCart({
        productId,
        guestId,
        userId,
        size,
        color,
      })
    );
  };
    
  return (
    <div className="space-y-4">
      {cart.products.map((product, index) => (
        <div 
          key={`${product.productId}-${product.size}-${product.color}`} 
          className="flex items-start justify-between py-4 border-b"
        >
          <div className="flex items-start">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-20 h-24 object-cover mr-4 rounded" 
            />
            <div>
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-sm text-gray-500">
                Size: {product.size} | Color: {product.color}
              </p>
              <div className="flex items-center mt-2">
                <button 
                  onClick={() => handleAddToCart(
                    product.productId, 
                    -1, 
                    product.quantity, 
                    product.size, 
                    product.color
                  )}
                  className="border rounded px-2 py-1 text-xl font-medium hover:bg-gray-100"
                >
                  -
                </button>
                <span className="mx-4">{product.quantity}</span>
                <button 
                  onClick={() => handleAddToCart(
                    product.productId, 
                    1, 
                    product.quantity, 
                    product.size, 
                    product.color
                  )}
                  className="border rounded px-2 py-1 text-xl font-medium hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-start space-x-4 min-w-0">
            <p className="font-medium text-base sm:text-lg truncate max-w-[80px]" title={`₹${product.price}`}>₹{product.price.toLocaleString()}</p>
            <button 
              onClick={() => handleRemoveFromCart(
                product.productId,
                product.size,
                product.color
              )}
              className="hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-[var(--srh-orange)] rounded"
            >
              <RiDeleteBin3Line className="h-6 w-6 text-red-600" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CartContents
