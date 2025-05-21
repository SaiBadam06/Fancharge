import React from 'react';
import { Link } from 'react-router-dom';

const ProductGrid = ({ products, loading, error }) => {
  // Loading state with fixed height boxes
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md h-[400px]">
            <div className="aspect-square mb-4 bg-gray-200 rounded-lg"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  // Error and empty states remain the same
  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 font-medium">Error: {error.message}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 font-medium">No products found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Link 
          key={product._id} 
          to={`/product/${product._id}`}
          className="block group h-full"
        >
          <div className="bg-white p-4 rounded-lg shadow-md transition-all duration-300 group-hover:shadow-lg h-[330px] w-auto flex flex-col">
            <div className="aspect-square mb-4 overflow-hidden rounded-lg flex-shrink-0">
              <img 
                src={product.images[0].url} 
                alt={product.images[0].altText || product.name} 
                className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105" 
                loading="lazy"
              />
            </div>
            <div className="flex flex-col flex-grow justify-between">
              <h3 className="text-sm font-medium mb-2 line-clamp-2 text-gray-800">
                {product.name}
              </h3>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex flex-col">
                  <p className="text-gray-900 font-semibold">
                    ₹{product.discountPrice.toFixed(2)}
                  </p>
                  {product.discountPrice && (
                    <p className="text-sm text-gray-500 line-through">
                      ₹{product.price.toFixed(2)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;
