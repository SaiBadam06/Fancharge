import React, { useState, useEffect } from 'react'
import { IoLogoInstagram } from 'react-icons/io5';
import { RiTwitterXFill } from 'react-icons/ri';
import { TbBrandMeta } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import {FiPhoneCall } from 'react-icons/fi';

const IPL_TEAMS = [
  { name: 'CSK', display: 'Chennai Super Kings', color: '#f9cd05', logo: 'https://upload.wikimedia.org/wikipedia/en/9/9a/Chennai_Super_Kings_Logo.png' },
  { name: 'MI', display: 'Mumbai Indians', color: '#004ba0', logo: 'https://upload.wikimedia.org/wikipedia/en/2/2d/Mumbai_Indians_Logo.png' },
  { name: 'RCB', display: 'Royal Challengers Bangalore', color: '#d50032', logo: 'https://upload.wikimedia.org/wikipedia/en/0/09/Royal_Challengers_Bangalore_Logo.png' },
        <div>
            <h3 className='text-lg mb-4 font-medium text-gray-800'>News</h3>
            <p className='text-sm mb-4 text-gray-500'>Be the first to hear about new Products, exclusive events and online offers.</p>
            <p className=' font-medium text-gray-500 text-sm mb-6'>
                Sign up and get 10% off on you first order.
            </p>
            {/* newsletter form*/}
            

        </div>
        {/* shop links */}
        <div>
            <h3 className='text-lg mb-4 font-medium text-gray-800'>Shop</h3>
            <ul className='space-y-2 text-gray-600'>
                <li><Link to="#" className='hover:text-gray-300 transition-colors'>Men's top wear</Link></li>
                <li><Link to="#" className='hover:text-gray-300 transition-colors'>Womens's top wear</Link></li>
                <li><Link to="#" className='hover:text-gray-300 transition-colors'>Men's Bottom wear</Link></li>
                <li><Link to="#" className='hover:text-gray-300 transition-colors'>Women Bottom wear</Link></li>
            </ul>
        </div>
        {/* support links */}
        <div>
            <h3 className='text-lg mb-4 font-medium text-gray-800'>Shop</h3>
            <ul className='space-y-2 text-gray-600'>
                <li><Link to="#" className='hover:text-gray-300 transition-colors'>Contact US</Link></li>
                <li><Link to="#" className='hover:text-gray-300 transition-colors'>FAQ's</Link></li>
                <li><Link to="#" className='hover:text-gray-300 transition-colors'>About Us</Link></li>
                <li><Link to="#" className='hover:text-gray-300 transition-colors'>Features</Link></li>
            </ul>
        </div>
        {/* Follow us */}
        <div>
            <h3 className='text-lg  font-medium mb-4 text-gray-800'>Follow Us</h3>
            <div className='flex items-center space-x-4 mb-6'>
                <a href="https://www.facebook.com" target="_blank" rel="noopener" className='hover:text-gray-300'>
                    <TbBrandMeta  className='h-6 w-6' />
                </a>
                <a href="https://www.facebook.com" target="_blank" rel="noopener" className='hover:text-gray-300'>
                    <IoLogoInstagram  className='h-6 w-6' />
                </a>
                <a href="https://www.facebook.com" target="_blank" rel="noopener" className='hover:text-gray-300'>
                    <RiTwitterXFill className='h-5 w-6' />
                </a>
            </div>
            <p className='text-gray-500'>
                <FiPhoneCall className='inline-block mr-2' />
                +91 9059223500
            </p>            
        </div>
      </div>
      {/* Footer Bottom */}
      <div className='container mx-auto lp:px=-0 border-t border-gray-200 pt-6 py-6 mt-12'>
        <p className='text-sm tracking-tighter text-center text-gray-500'>
            © 2025,  E-commerce. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
