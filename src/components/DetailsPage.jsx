import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaDollarSign } from "react-icons/fa";
import { useLocation, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function DetailsPage() {
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [state, setState] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [productDetails, setProductDetails] = useState({});
  const [watchesProductDetails, setWatchesProductDetails] = useState({});
  const [storedUserId, setStoredUserId] = useState(null);

  const APiUrl = import.meta.env.VITE_API_URL;

  const { id } = useParams();
  const location = useLocation();

  const { totalProductAmount } = location.state || {};


  useEffect(() => {
    const storedUserRegister = localStorage.getItem('userRegister');

    if (storedUserRegister) {
      const storeData = JSON.parse(storedUserRegister);
      setStoredUserId(storeData);
    }

    axios
      .get(`${APiUrl}/cart/product/${id}`)
      .then((response) => {
        console.log("Product Details:", response.data);
        setProductDetails(response.data.result);
      })
      .catch((error) => {
        console.log("Failed to fetch product details:", error);
      });

    axios
      .get(`${APiUrl}/purchase/watches/${id}`)
      .then((response) => {
        console.log("Watches Product Details:", response.data);
        setWatchesProductDetails(response.data.result);
      })
      .catch((error) => {
        console.log("Failed to fetch watches product details:", error);
      });

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => console.log("Razorpay script loaded");
    script.onerror = () => console.error("Failed to load Razorpay script");
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();


    const userRegister = localStorage.getItem("userRegister");
    console.log("<===>", userRegister);

    if (userRegister) {
      const userIdFormat = JSON.parse(userRegister);
      if (userIdFormat && userIdFormat.user_id) {
        const data = {
          name: `${storedUserId.firstName} ${storedUserId.lastName}`,
          mobileNumber: storedUserId.mobileNumber,
          deliveryAddress,
          state,
          total_amount: totalProductAmount || watchesProductDetails.final_price,
        };

        try {
          const response = await axios.post(`${APiUrl}/order/created`, data);
          console.log("== Order Created ==", response.data);

          const amount = (watchesProductDetails?.final_price ?? totalProductAmount ?? 0) * 100;

          const options = {
            key: "rzp_test_AEDCvwqVCMwKP1",
            amount: amount,
            currency: "INR",
            name: name,
            description: `Payment for your order`,
            prefill: {
              name: name,
              email: "example@gmail.com",
              contact: storedUserId.mobileNumber,
            },
            notes: {
              address: deliveryAddress,
            },
            theme: {
              color: "#3399cc",
            },
            handler: function (response) {
              alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
              console.log(response);
              toast.success("Payment Created Successfully!", {
                position: "top-right",
              });
              setPaymentLoading(true);
            },
            modal: {
              ondismiss: function () {
                setPaymentLoading(false);
              },
            },
          };

          const payment = new window.Razorpay(options);
          payment.open();
        } catch (error) {
          console.error("Error creating order:", error.response?.data || error.message);
          alert("Error creating order. Please try again.");
          setPaymentLoading(false);
        }
      } else {
        toast.warning("UserId Not found, please Login!", {
          position: "top-right",
        });
      }
    } else {
      toast.error("No user data found, please Login!", {
        position: "top-right",
      });
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    }


  };


  return (
    <>
      <div className="relative bg-cover bg-center lg:h-[500px]">
        <div className="absolute inset-0 bg-[url('/src/assets/money.jpg')] bg-cover bg-center filter blur-1"></div>
        <div className="relative max-w-lg mx-auto p-4 border border-gray-300 bg-custom-gradient text-white  rounded-md shadow-md  ">
          <ToastContainer />
          <h2 className="text-bold text-2xl text-center">Create Details</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm  font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={storedUserId ? `${storedUserId.firstName} ${storedUserId.lastName}` : ''}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="mobileNumber" className="block text-sm font-medium">
                Mobile Number
              </label>
              <input
                type="text"
                id="mobileNumber"
                value={storedUserId ? `${storedUserId.mobileNumber}` : ''}
                onChange={(e) => setMobileNumber(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
              />
            </div>


            <div>
              <label htmlFor="deliveryAddress" className="block text-sm font-medium">
                Delivery Address
              </label>
              <input
                type="text"
                id="deliveryAddress"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="state" className="block text-sm font-medium">
                State
              </label>
              <input
                type="text"
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="totalAmount" className="block text-sm font-medium">
                Total Amount
              </label>
              <input
                type="number"
                id="totalAmount"
                value={totalProductAmount || watchesProductDetails.final_price}
                onChange={(e) => setTotalAmount(e.target.value)}
                required
                className="w-full px-4 py-2 border text-black border-gray-300 font-bold rounded-md focus:outline-none focus:ring-blue-500"
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                // disabled={paymentLoading}
                className={`flex items-center px-4 py-2 ${paymentLoading ? "bg-gray-400" : "bg-green-500"
                  } border border-gray-300 text-white font-medium rounded-md shadow`}
              >
                <FaDollarSign className="mr-2" />
                {/* {paymentLoading ? "Processing..." : "Buy Now"} */}
                Buy Now
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* </div> */}
    </>
  );
}

export default DetailsPage;
