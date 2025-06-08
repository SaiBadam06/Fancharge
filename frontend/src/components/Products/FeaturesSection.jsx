import React from 'react';
import { HiShoppingBag, HiOutlineCreditCard } from 'react-icons/hi';
import { HiArrowPathRoundedSquare } from 'react-icons/hi2';

const FeaturesSection = () => {
  return (
    <section className='py-16 px-4 bg-white'>
      <div className='container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center'>
        {/* Feature 1 */}
        <div className='flex flex-col items-center'>
          <div className='p-4 bg-gray-100 rounded-full mb-4'>
            <HiShoppingBag className="text-2xl text-gray-800" />
          </div>
          <h4 className='font-medium tracking-tight mb-2'>
            Free International Shipping
          </h4>
          <p className='text-gray-600 text-sm'>
            On all orders above ₹1000.00
          </p>
        </div>
        
        {/* Feature 2 */}
        <div className='flex flex-col items-center'>
          <div className='p-4 bg-gray-100 rounded-full mb-4'>
            <HiArrowPathRoundedSquare className="text-2xl text-gray-800" />
          </div>
          <h4 className='font-medium tracking-tight mb-2'>
            45 Days Return
          </h4>
          <p className='text-gray-600 text-sm'>
            Money back guarantee
          </p>
        </div>
        
        {/* Feature 3 */}
        <div className='flex flex-col items-center'>
          <div className='p-4 bg-gray-100 rounded-full mb-4'>
            <HiOutlineCreditCard className="text-2xl text-gray-800" />
          </div>
          <h4 className='font-medium tracking-tight mb-2'>
            Secure Checkout
          </h4>
          <p className='text-gray-600 text-sm'>
            100% secure checkout process
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
