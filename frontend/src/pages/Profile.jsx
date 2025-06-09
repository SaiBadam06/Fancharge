import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../redux/slices/authSlice'
import { clearCart } from '../redux/slices/cartSlice'
import UserInfo from './UserInfo'
import RecentOrders from './RecentOrders'
import UserSettings from './UserSettings'

const Profile = () => {
    const { user, token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        // Check both user and token
        if (!user || !token) {
            navigate('/login', { 
                state: { from: '/profile' },
                replace: true 
            });
        }
    }, [user, token, navigate]);

    const handleLogout = async () => {
        try {
            await dispatch(clearCart()); // Clear cart first
            await dispatch(logout());
            localStorage.removeItem('userToken'); // Clear token
            navigate('/login', { replace: true });
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    // Show loading state while checking authentication
    if (!user || !token) {
        return (
            <div className='min-h-screen flex flex-col items-center justify-center p-4'>
                <div className='text-center text-gray-600 mb-4'>
                    You must be logged in to view your profile.
                </div>
                <button
                    onClick={() => navigate('/login')}
                    className='bg-[var(--srh-orange)] text-white px-6 py-2 rounded hover:bg-[var(--srh-gold)] transition-colors text-base font-semibold shadow-md'
                >
                    Login
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg">
                    {/* User Info Section */}
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <UserInfo user={user} onLogout={handleLogout} />
                    </div>
                    
                    {/* Orders Section */}
                    <div className="p-6">
                        <RecentOrders userId={user.id} />
                    </div>
                    
                    {/* Settings Section */}
                    <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                        <UserSettings user={user} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
