import axios from 'axios';
import Cookies from 'js-cookie';
import { React, useEffect, useState } from 'react';
import { FaCheckCircle, FaDollarSign, FaShoppingCart } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
const SearchProduct = () => {
  const { id } = useParams();
  const [items, setItems] = useState([]);
  const [isDisable, setDisabled] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const ApiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (id) {
      axios.get(`${ApiUrl}/purchase/watches/${id}`)
        .then(response => {
          setItems(response.data.result);
          if (response.data.result.disable === true) {
            setDisabled(true);
          }
        })
        .catch(error => {
          console.log("Failed:", error);
        });
    }
  }, [id]);


  const handleAddToCart = () => {
    let data = {
      disable: true,
    };
    axios.put(`${ApiUrl}/purchase/updated/${id}`, data)
      .then(response => {
        console.log("===Data===", response.data);
        setBtnDisabled(response.data.updatedWatch);

        console.log("===Res===", response.status);

        if (response.status === 200) {
          let currentCount = parseInt(Cookies.get('count')) || 0;

          let newCount = currentCount + 1;

          // Update the cookie with the new count
          Cookies.set('count', newCount, { expires: 7 });  // Cookie expires in 7 days

          window.dispatchEvent(new Event('cookieChange'));

          setDisabled(true);
        }

      })
      .catch(error => {
        console.log("Failed:", error);
      });
  };

  return (
    <>
      <div className="grid grid-cols-12  gap-4 p-4">
        <div className="col-span-6 p-4 flex items-center justify-center border-2 border-grove">
          {Object.keys(items).length > 0 ? (
            <div>
              <img
                src={items.image}
                alt={items.name}
                className="w-[20em] transform transition-all duration-300 ease-in-out hover:scale-110"
              />
              {/* <br /> */}
              <div className="fixed bottom-0 left-0 right-0 flex justify-center space-x-4 mt-4">
                <button
                  onClick={handleAddToCart}
                  disabled={isDisable}  // Disable button if item is added
                  className={`flex items-center px-4 py-2 ${isDisable ? 'bg-gray-400' : 'bg-orange-500'
                    } border border-gray-300 font-medium rounded-md shadow`}
                >
                  <FaShoppingCart className="mr-2" />
                  {isDisable ? 'Added to Cart' : 'Add to Cart'}
                </button>
                <button className="flex items-center px-4 py-2 bg-green-500 border border-gray-300 text-white-500 font-medium rounded-md shadow hover:bg-blue-50 focus:outline-none">
                  <FaDollarSign className="mr-2" />
                  Buy Now
                </button>
              </div>
            </div>
          ) : (
            <p>No product details available.</p>
          )}
        </div>


        <div className="col-span-6 bg-green-200 p-4">
          {Object.keys(items).length > 0 ? (
            <div>
              <p className='font-bold text-2xl'>{items.name}</p>
              <div>
                <span className="text-sm text-white bg-green-500 px-2 py-1 rounded-full">
                  {items.rating} ★
                </span>&nbsp;
                <span className='text-gray-500 font-semibold text-xs'>11,62,478 Ratings & 74,770 Reviews</span>
              </div>
              <p className='text-lg font-bold pt-4'>₹{items.rupees}</p>

              <p className='text-sm font-medium text-gray-500 '><FaCheckCircle />{items.warranty} Warranty from the Date of Purchase</p>

              <h6>Highlights</h6>

              <ul className='list-disc pl-5 text-sm text-gray-500'>
                {items.highLights.map((highlight, index) =>
                  <li key={index}>{highlight}</li>)}
              </ul>

              <h6>Seller</h6>
              <p className='text-gray-500 text-sm'>
                {items.seller}
              </p>
              <p className='text-sm font-bold text-center mt-5 text-gray-500'>Safe and Secure Payments.Easy returns.100% Authentic products.</p>
            </div>

          ) : (
            <p>No product details available.</p>
          )}
        </div>
      </div>

    </>
  );
};

export default SearchProduct;
