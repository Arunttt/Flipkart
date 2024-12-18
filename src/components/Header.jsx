import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function Header() {
    const [searchTerm, setSearchTerm] = useState([]);
    const navigate = useNavigate();
    const [query, setQuery] = useState('');

    const [count, setCount] = useState(parseInt(Cookies.get('count')) || 0);
    // const cartCount = useSelector((state) => state.product.cart.cartCount);
    const productId = useSelector((state) => state.product.selectedProductId);
    // const [isOpen, setIsOpen] = useState(false);

    const ApiUrl = import.meta.env.VITE_API_URL;

    // useEffect((count) => {
    //     const handleCookieChange = () => {
    //         const updatedCount = parseInt(Cookies.get('count')) || 0;
    //         setCount(updatedCount);

    //     };


    //     const interval = setInterval(handleCookieChange, 1000);

    //     return () => clearInterval(interval);
    // }, [count]);
    useEffect(() => {
        const handleCookieChange = () => {
            const userRegisterData = localStorage.getItem('userRegister');
            if (userRegisterData) {
                const userIdFormat = JSON.parse(userRegisterData);
                if (userIdFormat && userIdFormat.user_id) {
                    const cartCount = parseInt(localStorage.getItem(`cartCount_${userIdFormat.user_id}`)) || 0;
                    setCount(cartCount);
                } else {
                    setCount(0); // Default count if userId is not available
                }
            } else {
                setCount(0); // Default count if no user data
            }
        };
    
        const interval = setInterval(handleCookieChange, 1000);
    
        return () => clearInterval(interval);
    }, []);
    
    const redirectToNextPage = () => {
        navigate('/details');
        // let data = {
        //     disable: true
        // };
        // axios.post(`${ApiUrl}/purchase/disableProduct`,data)
        // .then(response => {
        //     console.log(response.data);
        // })
        // .catch(error => {
        //     console.log("error",error);
        // })
    };

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
        navigate(`./product/${id}`);
        setQuery('');
        setSearchTerm([]);
    }
    const redirectTOhome = () => {
        navigate('/');
    }
    const redirectTologin = () => {
        // if (localStorage.getItem('username')) {
        //     setIsOpen(false);
        // } else {
        navigate('/login');
        // }
    };
    const logoutFunction = () => {
        localStorage.removeItem('userRegister');
        localStorage.removeItem('username');
        setCount(0);
        navigate('/');
    };
    
    return (
        <>
            <Navbar bg="white" className="border-gray-300 border border-l-0 rounded-r-md hover:bg-blue-50 focus:outline-none" >
                <Container>
                    <h4 href="#home" className="font-bold text-sky-500 cursor-pointer" onClick={() => redirectTOhome()}>FlipKart</h4>
                    <div className="relative w-full max-w-md mx-auto">
                        <input
                            type="text"
                            placeholder="Search for products"
                            value={query}
                            onChange={handleSearch}
                            className="w-full p-2 border rounded-md"
                        />
                        <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />

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

                    <button onClick={redirectTologin} className="flex items-center px-3 py-1 text-sm border border-gray-300 text-blue-500 rounded-md shadow bg-blue-500 text-white focus:outline-none">
                        <FaUser className="mr-2" /> &nbsp;
                        {localStorage.getItem('username') ? localStorage.getItem('username') : 'Login'}
                    </button>

                    &nbsp;
                    <button className="flex items-center text-sm
                     px-3 py-1 bg-yellow-500 border border-gray-300 
                      rounded-md 
                     shadow  text-white
                     focus:outline-none" onClick={redirectToNextPage}>
                        <FaShoppingCart className="mr-2" />
                        Cart ({count})
                        {/* cartCount || */}
                    </button>
                    &nbsp;

                    <button onClick={logoutFunction} className="text-sm flex items-center px-3 py-1  border border-gray-300  rounded-md shadow bg-red-500 text-white focus:outline-none">
                        <FaUser className="mr-2" /> &nbsp;
                        Logout
                    </button>
                </Container>
            </Navbar>
        </>
    );
}

// Cart ({cartCount || count})
export default Header;
