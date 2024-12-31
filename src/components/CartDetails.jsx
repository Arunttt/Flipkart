/// ------------------ Card Details -----------------------

import axios from 'axios';
import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function CartDetails() {
    const ApiUrl = import.meta.env.VITE_API_URL;
    const [product, setProduct] = useState([]);
    const [counts, setCounts] = useState({});
    const [selectedProductId, setSelectedProductId] = useState(null);
    const navigate = useNavigate();

    const [totals, setTotals] = useState({
        totalOriginalPrice: 0,
        disCount: 0,
        PaymentFee: 0,
        totalProductAmount: 0,

    });

    useEffect(() => {
        const userRegisterData = localStorage.getItem('userRegister');
        if (userRegisterData) {
            const userIdFormat = JSON.parse(userRegisterData);
            if (userIdFormat && userIdFormat.user_id) {
                let data = {
                    userId: userIdFormat.user_id,
                    disable: true,
                };
                axios.post(`${ApiUrl}/cart/getData`, data)
                    .then(response => {
                        setProduct(response.data.data);

                        const savedCounts = JSON.parse(localStorage.getItem("cartCounts")) || {};
                        setCounts(savedCounts);
                        toast.success('Cart data fetched successfully!');
                    })
                    .catch(error => {
                        console.error("Error fetching products:", error);
                        toast.error('Failed to fetch cart data. Please try again.');
                    });
            } else {
                toast.warning("Invalid session! Redirecting to login.");
                navigate('/login');
            }
        }
        else {
            toast.info("Please log in to access your cart.");
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        }
    }, [navigate]);


    useEffect(() => {
        const newTotals = product.reduce((acc, item) => {
            const quantity = counts[item._id] || 1;
            acc.totalOriginalPrice += item.price * quantity;
            acc.disCount += item.cart_details.price_details.discount * quantity;
            acc.PaymentFee += item.cart_details.price_details.platform_fee * quantity;
            acc.totalProductAmount += item.cart_details.total_amount * quantity;
            return acc;
        }, {
            totalOriginalPrice: 0,
            disCount: 0,
            PaymentFee: 0,
            totalProductAmount: 0,
        });

        setTotals(newTotals);
    }, [product, counts]);

    const updateCounts = (id, newCount) => {
        setCounts(prevCounts => {
            const updatedCounts = { ...prevCounts, [id]: newCount };
            localStorage.setItem("cartCounts", JSON.stringify(updatedCounts));
            return updatedCounts;
        });
    };

    const increase = (id) => {
        updateCounts(id, (counts[id] || 1) + 1);
    };

    const decrease = (id) => {
        updateCounts(id, Math.max((counts[id] || 1) - 1, 1));
    };

    const handleSelectProduct = (id) => {
        console.log(id);
        setSelectedProductId(id);
    };

    // const removeProduct = (id) => {
    //     axios.delete(`${ApiUrl}/cart/productDelete/${id}`)
    //     .then(response => {
    //         console.log("<====>",response.data);
    //     }).catch(error => {
    //         console.log("error");
    //     })

    // }
    const removeProduct = (id,name) => {
        console.log("id is",id);
        console.log("name",name);
        const userRegisterData = localStorage.getItem('userRegister');
        if (userRegisterData) {
            const userIdFormat = JSON.parse(userRegisterData);
            if (userIdFormat && userIdFormat.user_id) {
                console.log("UserId:", userIdFormat.user_id);
    
                const cartKey = `cart_${userIdFormat.user_id}`;
                let cartData = JSON.parse(localStorage.getItem(cartKey));
    
                if (cartData && cartData.length > 0) {
                    console.log("<===> Original Cart Data:", cartData);
    
                    const updatedCart = cartData.filter(product => product.name !== name);
    
                    if (cartData.length === updatedCart.length) {
                        console.log(`No matching product found with ID: ${name}`);
                    } else {
                        console.log("<===> Updated Cart Data After Deletion:", updatedCart);
    
                        localStorage.setItem(cartKey, JSON.stringify(updatedCart));
                        console.log(`Product with ID: ${name} has been removed successfully.`);
                   
        axios.delete(`${ApiUrl}/cart/productDelete/${id}`)
        .then(response => {
            console.log("<====>",response.data);
        }).catch(error => {
            console.log("error");
        })

                    }
                } else {
                    console.log("Cart is empty or not found.");
                }
            } else {
                console.log("User ID not found in userRegisterData.");
            }
        } else {
            console.log("userRegisterData not found in localStorage.");
        }
    };
           
    

    const redirectOrderPage = (id) => {
        const selectedProduct = product.find(item => item._id === id);
        const quantity = counts[id] || 1;

        const productAmount = selectedProduct?.cart_details.total_amount * quantity;

        navigate(`/order_details/${id}`, { state: { totalProductAmount: productAmount } });
    };



    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2  lg:px-[83px] lg:py-[96px]">
                <div className=" ">

                    <ToastContainer />
                    <div className="space-y-6 overflow-y-auto h-[200px]">

                        {product.map((value) => (
                            <div key={value._id} className="flex gap-2 items-center">

                                <input
                                    type="radio"
                                    name="productSelect"
                                    value={value._id}
                                    checked={selectedProductId === value._id}
                                    onChange={() => handleSelectProduct(value._id)}
                                    className="appearance-none w-4 h-4 border border-gray-400 rounded-none checked:bg-blue-500 checked:border-blue-500"
                                />
                            

                                <img
                                    src={value.image}
                                    alt={value.name}
                                    className="w-28 h-28 object-cover rounded-md"
                                />

                                <div>
                                    <h2 className="text-xl font-semibold">{value.name}</h2>
                                    <p className="text-xs text-gray-500">{value.brand}</p>
                                    <p className="text-green-500 font-bold text-sm">
                                        <span className="text-gray-500 text-sm line-through ml-2">
                                            ₹{value.price}
                                        </span>&nbsp;₹{value.discounted_price}
                                    </p>
                                    <p className="text-xs text-green-600">{value.discount_percentage}% Off</p>
                                    <p className="text-gray-700 text-sm">Seller: {value.seller}</p>
                                </div>

                                <div className="flex gap-2 items-center mt-2">
                                    <div>
                                        <button onClick={() => decrease(value._id)}>-</button>
                                        <span>{counts[value._id] || 1}</span>
                                        <button onClick={() => increase(value._id)}>+</button>
                                    </div>
                                </div>
                                {/* <button 
                                    className="text-red-500"
                                    onClick={() => removeProduct(value._id,value.name)}
                                >
                                    Remove
                                </button> */}

                            </div>
                        ))}
                        
                    </div>

                    <div className='border-t mt-4 p-4'>
                        <h3 className='text-lg font-medium mb-4'>Digital Suraksha Group Insurance</h3>
                        <div className='flex justify-between item-center'>
                            <p className="text-gray-600 text-sm">Digital Suraksha for Rs 50,000 by Bajaj Allianz<br />1 Year</p>
                        </div>
                        <p className='text-sm text-gray-500'>
                            Get your financial losses covered for online transaction frauds.
                        </p>
                        <button className="p-4 text-center mt-4 bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600"
                            onClick={() => redirectOrderPage(selectedProductId)}
                        >
                            Place Order
                        </button>
                    </div>
                </div>

                <div className=" bg-gray-100 p-6 shadow-md  sticky top-0">
                    <div className=' border-l p-4 bg-gray-50'>
                        <h3 className="text-lg font-bold mb-4">Price Details</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <p>Price</p>
                                <p>₹{totals.totalOriginalPrice}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Discount</p>
                                <p className='text-green-500'>-₹{totals.disCount}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Platform Fee</p>
                                <p>₹{totals.PaymentFee}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Delivery Charges</p>
                                <p className="text-green-500">Free</p>
                            </div>
                            <hr />
                            <div className="flex justify-between font-bold">
                                <p>Total Amount</p>
                                <p>₹{totals.totalProductAmount}</p>
                            </div>
                            <p className="text-green-600 text-center text-sm mt-2">
                                You will save ₹{totals.disCount} on this order.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CartDetails;
