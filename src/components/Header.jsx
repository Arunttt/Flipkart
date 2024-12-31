import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { FaBars, FaSearch, FaShoppingCart, FaTimes, FaUser } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Header() {
    const [searchTerm, setSearchTerm] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const [count, setCount] = useState(parseInt(Cookies.get('count')) || 0);
    const productId = useSelector((state) => state.product.selectedProductId);


    const ApiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const handleCookieChange = () => {
            const userRegisterData = localStorage.getItem('userRegister');

            if (userRegisterData) {
                const userIdFormat = JSON.parse(userRegisterData);
                if (userIdFormat && userIdFormat.user_id) {
                    const cartCount = parseInt(localStorage.getItem(`cartCount_${userIdFormat.user_id}`)) || 0;

                    setCount(cartCount);

                } else {
                    setCount(0);
                }
            } else {
                setCount(0);
            }
        };

        const interval = setInterval(handleCookieChange, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleSearch = async (e) => {
        const query = e.target.value;
        setQuery(query);

        if (query.trim() === '') {
            setSearchTerm([]);
            return;
        }

        try {
            let data = {
                query: query
            };
            const response = await axios.post(`${ApiUrl}/purchase/fieldSearch`, data);
            setSearchTerm(response.data);
        } catch (error) {
            console.log("error", error);
        }
    };

    const handleProductClick = (id) => {
        // navigate(`./view/${id}`);
        console.log(`id Chec ${id}`);
        navigate(`./product/${id}`);
        setQuery('');
        setSearchTerm([]);
    }

    const redirectTOhome = () => {
        navigate('/');
    };

    const redirectTologin = () => {
        navigate('/login');
    };

    const logoutFunction = () => {
        localStorage.removeItem('userRegister');
        localStorage.removeItem('username');
        toast.error("Logout Sucessfully !", {
            position: "top-right",
        });
        setTimeout(() => {
            navigate('/');
        }, 3000);
    };

    return (
        <header className="w-full bg-white shadow-md">
            <div className="flex items-center justify-between px-4 py-3 lg:px-8">
                {/* Logo */}
                <h4
                    onClick={redirectTOhome}
                    className="text-xl font-bold text-blue-500 cursor-pointer"
                >
                    FlipKart
                </h4>

                {/* Hamburger Icon for Mobile */}
                <div className="lg:hidden">
                    {menuOpen ? (
                        <FaTimes
                            size={24}
                            className="text-gray-800 cursor-pointer"
                            onClick={() => setMenuOpen(false)}
                        />
                    ) : (
                        <FaBars
                            size={24}
                            className="text-gray-800 cursor-pointer"
                            onClick={() => setMenuOpen(true)}
                        />
                    )}
                </div>

                {/* Desktop Menu */}
                <nav className="hidden lg:flex items-center space-x-4">

                    <div className="relative left-[-10%]">
                        <input
                            type="text"
                            placeholder="Search for products"
                            value={query}
                            onChange={handleSearch}
                            className="w-96 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                        />
                        <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        {searchTerm.length > 0 && (
                            <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md shadow-md max-h-48 overflow-y-auto z-10">
                                {searchTerm.map((product) => (
                                    <li
                                        key={product.id}
                                        className=" py-2 hover:bg-red-100 cursor-pointer"
                                        onClick={() => handleProductClick(product._id)}
                                    >
                                        {product.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {localStorage.getItem('username') && localStorage.getItem('username').trim() !== '' ?
                        <button className="flex items-center px-4 py-2 text-sm bg-blue-500 text-white rounded-md">
                            <FaUser className="mr-2" />
                            {localStorage.getItem('username')}
                        </button>
                        :
                        <button
                            onClick={redirectTologin}
                            className="flex items-center px-4 py-2 text-sm bg-blue-500 text-white rounded-md"
                        >
                            <FaUser className="mr-2" />
                            Login
                        </button>
                    }

                    <button
                        className="flex items-center px-4 py-2 text-sm bg-yellow-500 text-white rounded-md"
                        onClick={() => navigate('/details')}
                    >
                        <FaShoppingCart className="mr-2" />
                        Cart {count}
                    </button>
                    {localStorage.getItem('username') && localStorage.getItem('username').trim() !== '' ?
                        <button
                            onClick={logoutFunction}
                            className="flex items-center px-4 py-2 text-sm bg-red-500 text-white rounded-md"
                        >
                            <FaUser className="mr-2" />
                            Logout
                        </button>
                        : null
                    }
                </nav>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <nav className="lg:hidden bg-white border-t border-gray-300">

                    <div className="relative px-4 py-2">
                        <input
                            type="text"
                            placeholder="Search for products"
                            value={query}
                            onChange={handleSearch}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                        />
                        <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />

                        {searchTerm.length > 0 && (
                            <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md shadow-md max-h-48 overflow-y-auto z-50">
                                {searchTerm.map((product) => (
                                    <li
                                        key={product.id}
                                        className="py-2 px-4 hover:bg-red-100 cursor-pointer"
                                        onClick={() => handleProductClick(product._id)}
                                    >
                                        {product.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>


                    <div className="flex flex-col items-start space-y-2 px-4 py-4">


                        {localStorage.getItem('username') && localStorage.getItem('username').trim() !== '' ?
                            <button className="flex items-center px-4 py-2 text-sm bg-blue-500 text-white rounded-md">
                                <FaUser className="mr-2" />
                                {localStorage.getItem('username')}
                            </button>
                            : <button
                                onClick={redirectTologin}
                                className="flex items-center w-full px-4 py-2 text-sm bg-blue-500 text-white rounded-md"
                            >
                                <FaUser className="mr-2" />
                                Login
                            </button>
                        }
                        <button
                            className="flex items-center w-full px-4 py-2 text-sm bg-yellow-500 text-white rounded-md"
                            onClick={() => navigate('/details')}
                        >
                            <FaShoppingCart className="mr-2" />
                            Cart {count}
                        </button>
                        {localStorage.getItem('username') && localStorage.getItem('username').trim() !== '' ?
                            <button
                                onClick={logoutFunction}
                                className="flex items-center px-4 py-2 text-sm bg-red-500 text-white rounded-md"
                            >
                                <FaUser className="mr-2" />
                                Logout
                            </button>
                            : null
                        }
                    </div>
                </nav>
            )}
        </header>
    );
}

export default Header;
