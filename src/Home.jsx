import axios from 'axios';
import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import logo from './assets/flipkart.png';
import { setSelectedProductId } from './slices/ProductSlice';

export const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]);
    const sectionRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Search Term:', searchTerm);
    };

    const ApiUrl = import.meta.env.VITE_API_URL;


    useEffect(() => {
        const userRegister = JSON.parse(localStorage.getItem("userRegister"));
        if (userRegister && userRegister.jwtToken) {
            const token = userRegister.jwtToken;
            axios.get('/userLogin/profile', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    productDetails();
                })
                .catch(error => {
                    console.error('Error:', error.response.data);
                });

        } else {
            console.log("JWT Token not found in userRegister.");
        }
    }, []);

    const productDetails = () => {
        axios.get(`${ApiUrl}/purchase/allProduct`)
            .then(response => {
                console.log("<=== API Response ===>", response.data);

                if (response.data && Array.isArray(response.data.allData)) {
                    setProducts(response.data.allData);
                } else {
                    console.error("API response does not contain 'allData' array:", response.data);
                }
            })
            .catch(error => {
                console.log("Failed:", error);
            });
    }

    const handleProduct = (id) => {
        dispatch(setSelectedProductId(id));
        navigate(`/product/${id}`);
    };

    const handleScroll = () => {
        if (sectionRef.current) {
            sectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (
        <>
            <div className="bg-[url('/src/assets/photo.png')] bg-cover bg-center sm:h-[400px] lg:h-[600px] xl:h-[520px] flex items-center justify-center">
                <div className="p-4 text-center">
                    <h1 className="text-white font-sans">Flipkart Shopping</h1>
                    <p className="text-white">Flipkart Private Limited is an Indian e-commerce company.<br></br>Get the best deals and discounts on your favorite items.Enjoy quick and hassle-free delivery to your doorstep.</p>
                    <button onClick={handleScroll} className="bg-red-500 border-2 border-white hover:bg-green-600 rounded-tl-full rounded-br-full text-white text-sm text-center self-center px-4 py-2 m-2">View More</button>
                </div>
            </div>

            <div ref={sectionRef} className="p-4">
                <h2 className="text-center font-bold text-2xl">Smartphones & Electronics</h2>
                <div className="flex items-center mt-3">
                    <div className="border-t border-blue-500 flex-grow"></div>
                    <div className="px-3 text-gray-800 text-sm font-bold flex justify-center">
                        <img src={logo} alt="logo" className="w-10 h-10" />
                    </div>
                    <div className="border-t border-blue-500 flex-grow"></div>
                </div>

                <p className="text-center pt-4 font-medium text-grey">From the latest iPhones to Android devices,
                    Flipkart offers a wide range of smartphones and gadgets. Explore <br></br>smartwatches, wireless earbuds, and other tech essentials.
                    Find your next great read from a  wide selection of books.<br></br> Whether you're into fiction, self-help, or educational books, Flipkart has something for every reader.</p>



                <h4 className=" mt-5 text-center font-bold text-2xl">Best of Electronics</h4>
                <br></br>

                <Swiper
                    spaceBetween={15}
                    className='border-2 border-gray-200 p-4'
                    slidesPerView={4}
                    loop={true}
                    pagination={{ clickable: true }}
                    navigation={true}
                    breakpoints={{
                        320: { slidesPerView: 1 },
                        640: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 4 },
                    }}
                >
                    {products.map((product, index) => (
                        <SwiperSlide key={product._id}>
                            <motion.div initial={{ opacity: 0, x: 100 }}
                                animate={{
                                    opacity: 1,
                                    x: 0,
                                    y: 10,
                                    transition: { delay: index * 1.0, duration: 2 },
                                }} className="className='w-0' cursor-pointer bg-white shadow-lg 
                                rounded-lg overflow-hidden"
                                onClick={() => handleProduct(product._id)}
                            >
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-48 object-contain"
                                />

                                <div className="p-4">
                                    <h3 className="w-64 overflow-hidden text-center text-ellipsis whitespace-nowrap text-xl font-semibold text-gray-800">{product.name}</h3>
                                    <p className="text-gray-600 mt-2 text-center">
                                        <strong>₹{product.rupees}</strong>
                                    </p>
                                </div>

                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>



            </div>

        </>
    )
}