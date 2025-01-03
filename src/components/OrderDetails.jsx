import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const OrderDetails = () => {
    const [orders, setOrders] = useState([]);
    const ApiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        axios
            .get(`${ApiUrl}/order/allOrder`)
            .then((response) => {
                console.log("<=== Raw Order Response ===>", response.data);
                setOrders(response.data.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    return (
        <>
            <div className="container mx-auto p-5 rounded-lg">
                {orders.length > 0 ? (
                    <div className="overflow-x-auto"> 
                        <table className="min-w-full bg-white rounded-lg overflow-hidden ">
                            <thead className="bg-blue-500 text-white text-center">
                                <tr>
                                    <th className="px-6 py-4">Name</th>
                                    <th className="px-6 py-4">Product Name</th>
                                    <th className="px-6 py-4">Mobile Number</th>
                                    <th className="px-6 py-4">Delivery Address</th>
                                    <th className="px-6 py-4">State</th>
                                    <th className="px-6 py-4">Total Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order, index) => (
                                    <tr key={index} className="border-b hover:bg-gray-50 text-center">
                                        <td className="px-6 py-4">{order.name}</td>
                                        <td className="px-6 py-4">
                                        <span className="border-2 border-pink-300 text-pink-300 p-2 rounded">{order.productName}</span>
                                        </td>
                                        <td className="px-6 py-4">{order.mobileNumber}</td>
                                        <td className="px-6 py-4">{order.deliveryAddress}</td>
                                        <td className="px-6 py-4">{order.state}</td>
                                        <td className="px-6 py-4">
                                            <span className="rounded bg-green-500 p-2 text-white">
                                                ₹{order.total_amount}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-center text-xl font-bold text-gray-700">No orders found</p>
                )}
            </div>
        </>
    );
};
