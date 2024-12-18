import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import Carousel from './Carousel';
import { setSelectedProductId } from './slices/ProductSlice';

function Purchase() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]);


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Search Term:', searchTerm);
    };

    const ApiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
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
    }, []);

    const handleProduct = (id) => {
        dispatch(setSelectedProductId(id));
        navigate(`/product/${id}`);
    };
    return (
        <>

            <Carousel />

            <div className="container-fluid mt-5">
                <h4 href="#home" className="">Best of Electronics</h4>
                <br></br>

                <Swiper
                    spaceBetween={15}
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
                    {products.map((product) => (
                        <SwiperSlide key={product._id}>
                            {/* <Link to="/product" key={product._id} 
                            className="block cursor-pointer"
                            onClick={()=> handleProduct(product._id)}> */}
                            <div className="className='w-0' cursor-pointer bg-white shadow-lg 
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
                                    {/* <p className="text-sm text-gray-500 mt-1">{product.highLights[0]}</p> */}
                                </div>
                                {/* <div className="bg-gray-100 py-2 px-4 text-center">
                                    <span className="text-sm text-gray-600">
                                    Rating: {product.rating} ★
                                    </span>
                                </div> */}
                            </div>
                            {/* </Link> */}
                        </SwiperSlide>
                    ))}
                </Swiper>

            </div>

        </>
    );
}

export default Purchase;