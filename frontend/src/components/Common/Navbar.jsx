import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineUser, HiOutlineShoppingBag, HiBars3BottomRight, HiXMark } from 'react-icons/hi2';
import SearchBar from './SearchBar';
import CartDrawer from '../Layout/CartDrawer';
import { IoMdClose } from 'react-icons/io';
import { useSelector } from 'react-redux';
import ThemeToggle from '../Layout/ThemeToggle';
import { useTheme } from '../../contexts/ThemeContext';

// IPL teams config (can be moved to a separate file if needed)
const IPL_TEAMS = [
  {
    name: 'CSK',
    display: 'Chennai Super Kings',
    color: '#f9cd05',
    logo: 'https://upload.wikimedia.org/wikipedia/en/9/9a/Chennai_Super_Kings_Logo.png',
  },
  {
    name: 'MI',
    display: 'Mumbai Indians',
    color: '#004ba0',
    logo: 'https://upload.wikimedia.org/wikipedia/en/2/2d/Mumbai_Indians_Logo.png',
  },
  {
    name: 'RCB',
    display: 'Royal Challengers Bangalore',
    color: '#d50032',
    logo: 'https://upload.wikimedia.org/wikipedia/en/0/09/Royal_Challengers_Bangalore_Logo.png',
  },
  {
    name: 'SRH',
    display: 'Sunrisers Hyderabad',
    color: '#ff822a',
    logo: 'https://upload.wikimedia.org/wikipedia/en/8/81/Sunrisers_Hyderabad.png',
  },
  {
    name: 'KKR',
    display: 'Kolkata Knight Riders',
    color: '#3a225d',
    logo: 'https://upload.wikimedia.org/wikipedia/en/4/4c/Kolkata_Knight_Riders_Logo.png',
  },
  {
    name: 'RR',
    display: 'Rajasthan Royals',
    color: '#254aa5',
    logo: 'https://upload.wikimedia.org/wikipedia/en/6/60/Rajasthan_Royals_Logo.png',
  },
  {
    name: 'DC',
    display: 'Delhi Capitals',
    color: '#17479e',
    logo: 'https://upload.wikimedia.org/wikipedia/en/5/5d/Delhi_Capitals_Logo.png',
  },
  {
    name: 'PBKS',
    display: 'Punjab Kings',
    color: '#d71920',
    logo: 'https://upload.wikimedia.org/wikipedia/en/d/d4/Punjab_Kings_Logo.png',
  },
  {
    name: 'GT',
    display: 'Gujarat Titans',
    color: '#1c2343',
    logo: 'https://upload.wikimedia.org/wikipedia/en/0/09/Gujarat_Titans_Logo.png',
  },
  {
    name: 'LSG',
    display: 'Lucknow Super Giants',
    color: '#005fa2',
    logo: 'https://upload.wikimedia.org/wikipedia/en/6/6e/Lucknow_Super_Giants_Logo.png',
  },
];

function getInitialTeam() {
  return (
    JSON.parse(localStorage.getItem('selectedIPLTeam')) || IPL_TEAMS[3] // Default SRH
  );
}

const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [navDrawerOpen, setNavDrawerOpen] = useState(false);
    const { cart } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);
    const [selectedTeam, setSelectedTeam] = React.useState(getInitialTeam());
    const { isDarkMode, toggleDarkMode } = useTheme();
    
    const cartItemCount = cart?.products?.reduce((total, product) => total + product.quantity, 0) || 0;

    const toggleCartDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const toggleNavDrawer = () => {
        setNavDrawerOpen(!navDrawerOpen);
    };

    React.useEffect(() => {
      localStorage.setItem('selectedIPLTeam', JSON.stringify(selectedTeam));
      // Optionally, update CSS vars for theme color
      document.documentElement.style.setProperty('--ipl-primary', selectedTeam.color);
    }, [selectedTeam]);

    return (
        <>
            <nav className="sticky top-0 z-50" style={{ backgroundColor: selectedTeam.color || '#000' }}>
                <div className="container mx-auto flex items-center justify-between py-4 px-6">
                    {/* Left - Logo */}
                    <div className="flex items-center space-x-2">
                      <img src={selectedTeam.logo} alt={selectedTeam.display} className="w-8 h-8 rounded-full border bg-white" />
                      <Link to="/" className="text-2xl font-bold" style={{ color: selectedTeam.color }}>
                        {selectedTeam.display} Store
                      </Link>
                    </div>

                    {/* Center - Navigation (Desktop) */}
                    <div className='hidden md:flex space-x-6'>
                        <Link 
                            to="/collection/all?category=Jerseys" 
                            className='text-white hover:text-[var(--srh-orange)] text-sm font-medium uppercase transition-colors duration-200'
                        >
                            Jerseys
                        </Link>
                        <Link 
                            to="/collection/all?category=Training Wear" 
                            className='text-white hover:text-[var(--srh-orange)] text-sm font-medium uppercase transition-colors duration-200'
                        >
                            Training Wear
                        </Link>
                        <Link 
                            to="/collection/all?category=Accessories" 
                            className='text-white hover:text-[var(--srh-orange)] text-sm font-medium uppercase transition-colors duration-200'
                        >
                            Accessories
                        </Link>
                        <Link 
                            to="/collection/all?category=Collectibles" 
                            className='text-white hover:text-[var(--srh-orange)] text-sm font-medium uppercase transition-colors duration-200'
                        >
                            Collectibles
                        </Link>
                    </div>

                    {/* Right - Icons */}
                    <div className='flex items-center space-x-4'>
                        {/* IPL Team Selector (desktop) */}
                        <div className="hidden md:flex items-center space-x-2 mr-2">
                            <img src={selectedTeam.logo} alt={selectedTeam.display} className="w-8 h-8 rounded-full border" />
                            <select
                              value={selectedTeam.name}
                              onChange={e => setSelectedTeam(IPL_TEAMS.find(t => t.name === e.target.value))}
                              className="bg-white text-black px-2 py-1 rounded text-xs font-semibold border focus:outline-none focus:ring-2 focus:ring-[var(--ipl-primary)]"
                              style={{ minWidth: 90 }}
                              aria-label="Select IPL Team"
                            >
                              {IPL_TEAMS.map(team => (
                                <option key={team.name} value={team.name}>{team.display}</option>
                              ))}
                            </select>
                        </div>
                        
                        {user && user.role === 'admin' && (
                            <Link to="/admin" className='block bg-[var(--srh-orange)] px-3 py-1 rounded text-sm text-white hover:bg-[var(--srh-gold)] transition-colors duration-200'>
                                Admin
                            </Link>
                        )}
                        
                        {/* Theme Toggle */}
                        <ThemeToggle isDarkMode={isDarkMode} onToggle={toggleDarkMode} />
                        
                        <Link to="/profile" className='hover:text-[var(--srh-orange)] transition-colors duration-200'>
                            <HiOutlineUser className='h-5 w-5 text-white' />
                        </Link>
                        
                        <button 
                            onClick={toggleCartDrawer} 
                            className='relative hover:text-[var(--srh-orange)] transition-colors duration-200'
                            aria-label="Shopping cart"
                        >
                            <HiOutlineShoppingBag className='h-5 w-5 text-white' />
                            {cartItemCount > 0 && (
                                <span className='absolute -top-2 -right-2 bg-[var(--srh-orange)] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>
                                    {cartItemCount}
                                </span>
                            )}
                        </button>
                        
                        {/* Search - Hidden on mobile */}
                        <div className='hidden md:block overflow-hidden'>
                            <SearchBar />
                        </div> 
                        
                        {/* Mobile menu button */}
                        <button onClick={toggleNavDrawer} className='md:hidden text-white'>
                            {navDrawerOpen ? (
                                <HiXMark className='h-6 w-6' />
                            ) : (
                                <HiBars3BottomRight className='h-6 w-6' />
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

            {/* Mobile nav drawer */}
            {navDrawerOpen && (
                <>
                    {/* Overlay */}
                    <div 
                        className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" 
                        onClick={toggleNavDrawer}
                    />
                    
                    {/* Mobile nav drawer */}
                    <div className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-black shadow-lg transform transition-transform duration-300 z-50 ${navDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}>
                        <div className='flex justify-end p-4'>
                            <button onClick={toggleNavDrawer} className="text-white hover:text-[var(--ipl-primary)]">
                                <IoMdClose className='h-6 w-6' />   
                            </button>
                        </div>
                        <div className='p-6'>
                          <div className="flex items-center space-x-2 mb-4">
                            <img src={selectedTeam.logo} alt={selectedTeam.display} className="w-8 h-8 rounded-full border bg-white" />
                            <select
                              value={selectedTeam.name}
                              onChange={e => setSelectedTeam(IPL_TEAMS.find(t => t.name === e.target.value))}
                              className="bg-white text-black px-2 py-1 rounded text-xs font-semibold border focus:outline-none focus:ring-2 focus:ring-[var(--ipl-primary)]"
                              style={{ minWidth: 90 }}
                              aria-label="Select IPL Team"
                            >
                              {IPL_TEAMS.map(team => (
                                <option key={team.name} value={team.name}>{team.display}</option>
                              ))}
                            </select>
                          </div>
                            <h2 className='text-xl font-bold mb-6 text-[var(--srh-orange)]'>SRH Store</h2>
                            <nav className="space-y-4">
                                <Link 
                                    to="/collection/all?collection=Match Day" 
                                    className='block text-white hover:text-[var(--srh-orange)] text-sm font-medium uppercase mb-3' 
                                    onClick={toggleNavDrawer}
                                >
                                    Match Day Collection
                                </Link>
                                <Link 
                                    to="/collection/all?collection=Practice" 
                                    className='block text-white hover:text-[var(--srh-orange)] text-sm font-medium uppercase mb-3' 
                                    onClick={toggleNavDrawer}
                                >
                                    Practice Collection
                                </Link>
                                <Link 
                                    to="/collection/all?collection=Limited Edition" 
                                    className='block text-white hover:text-[var(--srh-orange)] text-sm font-medium uppercase mb-3' 
                                    onClick={toggleNavDrawer}
                                >
                                    Limited Edition
                                </Link>
                                <Link 
                                    to="/collection/all?collection=Casual" 
                                    className='block text-white hover:text-[var(--srh-orange)] text-sm font-medium uppercase mb-3' 
                                    onClick={toggleNavDrawer}
                                >
                                    Casual Wear
                                </Link>
                            </nav>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Navbar;