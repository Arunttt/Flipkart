import axios from 'axios';
import { React, useEffect, useState } from 'react';
import { FaCheckCircle, FaDollarSign, FaShoppingCart } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const ViewProduct = () => {
  const [items, setItems] = useState([]);
  const [isDisable, setDisabled] = useState(false);
  const ApiUrl = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    console.log(`id check with name ${id}`);
    axios
      .get(`${ApiUrl}/purchase/watches/${id}`)
      .then((response) => {
        setItems(response.data.result);
        if (response.data.result.disable === true) {
          setDisabled(true);
        }
      })
      .catch((error) => {
        console.log('Failed:', error);
      });
  }, [id]);

  const handleAddToCart = () => {
    const userRegisterData = localStorage.getItem('userRegister');
    if (userRegisterData) {
      const userIdFormat = JSON.parse(userRegisterData);
      if (userIdFormat && userIdFormat.user_id) {
        console.log("UserId", userIdFormat.user_id);

        const userCartKey = `cart_${userIdFormat.user_id}`;
        const cartData = JSON.parse(localStorage.getItem(userCartKey)) || [];

        localStorage.setItem(`cartCount_${userIdFormat.user_id}`, cartData.length);
        console.log(`Cart Count for User ID ${userIdFormat.user_id}: ${cartData.length}`);

        const isProductInCart = cartData.some(item => item._id === items._id);

        if (isProductInCart) {
          toast.warning("This product is already in your cart!", {
            position: "top-right",
          });
          return;
        }


        // const data = {
        //   ...items,
        //   userId: userIdFormat.user_id,
        //   disable: true,
        //   cart_details: {
        //     quantity: 1,
        //     total_amount: items.price,
        //   },
        // };
        let data = {
          _id: items._id,
          name: items.name,
          brand: items.brand,
          image: items.image,
          rupees: items.rupees,
          userId: userIdFormat.user_id,
          rating: items.rating,
          warranty: items.warranty,
          inch: items.inch,
          highLights: items.highLights,
          seller: items.seller,
          disable: true,
          price: items.price,
          discounted_price: items.discounted_price,
          discount_percentage: items.discount_percentage,
          delivery: {
            date: items.delivery?.date,
            charges: items.delivery?.charges,
            free_delivery: items.delivery?.free_delivery,
          },
          offers: items.offers,
          cart_details: {
            quantity: items.cart_details?.quantity || 1,
            total_amount: items.cart_details?.total_amount,
            price_details: {
              original_price: items.cart_details?.price_details?.original_price,
              discount: items.cart_details?.price_details?.discount,
              platform_fee: items.cart_details?.price_details?.platform_fee,
              delivery_charges: items.cart_details?.price_details?.delivery_charges,
            },
          },
          final_price: items.final_price,
        };


        axios
          .post(`${ApiUrl}/cart/created`, data)
          .then((response) => {
            if (response.status === 201) {
              cartData.push(data);
              localStorage.setItem(userCartKey, JSON.stringify(cartData));
              const newCartCount = cartData.length;
              localStorage.setItem(`cartCount_${userIdFormat.user_id}`, newCartCount);
              toast.success('Product added to cart!', { position: 'top-right' });
            }
          })
          .catch((error) => {
            console.log('Failed to add product to cart:', error);
          });
      }
    } else {
      toast.error('No user data found, please Login!', { position: 'top-right' });
      setTimeout(() => navigate('/login'), 1500);
    }
  };

  const paymentFunction = () => {
    const storedUserRegister = localStorage.getItem('userRegister');
    if (storedUserRegister) {
      const storedUserId = JSON.parse(storedUserRegister);
      if (storedUserId.user_id) {
        navigate(`/order_details/${id}`);
      } else {
        toast.warning('UserId Not found, please Login!', { position: 'top-right' });
        setTimeout(() => navigate('/login'), 1500);
      }
    } else {
      toast.error('No user data found, please Login!', { position: 'top-right' });
      setTimeout(() => navigate('/login'), 1500);
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 py-6">
        <ToastContainer />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          <div className="flex items-center justify-center border border-gray-300 rounded-md p-4">
            {Object.keys(items).length > 0 ? (
              <div>
                <img
                  src={items.image}
                  alt={items.name}
                  className="w-[20em] transform transition-transform duration-300 ease-in-out hover:scale-110"
                />
                <div className="flex justify-center space-x-4 mt-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={isDisable}
                    className={`flex items-center px-4 py-2 ${isDisable ? 'bg-gray-400' : 'bg-orange-500'
                      } text-white font-medium rounded-md shadow`}
                  >
                    <FaShoppingCart className="mr-2" />
                    {isDisable ? 'Added to Cart' : 'Add to Cart'}
                  </button>
                  <button
                    onClick={paymentFunction}
                    className="flex items-center px-4 py-2 bg-green-500 text-white font-medium rounded-md shadow hover:bg-green-600"
                  >
                    <FaDollarSign className="mr-2" />
                    Buy Now
                  </button>
                </div>
              </div>
            ) : (
              <p>No product details available.</p>
            )}
          </div>


          <div className="bg-gray-100 p-4 rounded-md shadow">
            {Object.keys(items).length > 0 ? (
              <div>
                <p className="font-bold text-2xl">{items.name}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="text-sm text-white bg-green-500 px-2 py-1 rounded-full">
                    {items.rating} ★
                  </span>
                  <span className="text-gray-500 text-sm">
                    11,62,478 Ratings & 74,770 Reviews
                  </span>
                </div>
                <p className="text-xl font-bold text-red-600 mt-4">₹{items.rupees}</p>
                <p className="text-sm font-medium text-gray-500 mt-2 flex items-center">
                  <FaCheckCircle className="mr-1" />
                  {items.warranty} Warranty from the Date of Purchase
                </p>

                <h6 className="mt-4 font-bold">Highlights</h6>
                <ul className="list-disc pl-5 text-sm text-gray-500">
                  {items.highLights.map((highlight, index) => (
                    <li key={index}>{highlight}</li>
                  ))}
                </ul>

                <h6 className="mt-4 font-bold">Seller</h6>
                <p className="text-gray-500 text-sm">{items.seller}</p>
                <p className="text-sm font-bold text-center mt-5 text-gray-500">
                  Safe and Secure Payments. Easy returns. 100% Authentic products.
                </p>
              </div>
            ) : (
              <p>No product details available.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewProduct;
