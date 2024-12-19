import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export const Footer = () => {

    return (
        <>
            <div className="bg-blue-700 mt-3">
                <div className="max-w-screen-xl mx-auto px-4 sm:px-6  text-gray-800 flex flex-wrap justify-center flex justify-between">
                    <div className="p-5">
                        <div className="text-xs uppercase text-white font-bold ">About</div>
                        <a className="my-3 block text-white" href="/#" >Home <span className="text-teal-600 text-xs p-1"></span>
                        </a>
                        <a className="my-3 block text-white" href="/#" >Contact Us <span className="text-teal-600 text-xs p-1"></span>
                        </a>
                        <a className="my-3 block text-white" href="/#" >About Us <span className="text-teal-600 text-xs p-1"></span>
                        </a>
                        <a className="my-3 block text-white" href="/#">Flipkart Stories <span className="text-teal-600 text-xs p-1"></span>
                        </a>


                    </div>
                    <div className="p-5 ">
                        <div className="text-xs uppercase font-bold text-white ">Resources</div>

                        <a className="my-3 block text-white" href="/#">Documentation <span className=" text-xs p-1"></span>
                        </a>
                        <a className="my-3 block text-white" href="/#">Tutorials <span className=" text-xs p-1"></span>
                        </a>
                        <a className="my-3 block text-white" href="/#">Support <span className="text-xs p-1">New</span>
                        </a>
                    </div>
                    <div className="p-5">
                        <div className="text-xs uppercase font-bold text-white ">Support</div>

                        <a className="my-3 block text-white" href="/#">Help Center <span className="text-teal-600 text-xs p-1"></span>
                        </a>
                        <a className="my-3 block text-white" href="/#">Privacy Policy <span className="text-teal-600 text-xs p-1"></span>
                        </a>
                        <a className="my-3 block text-white" href="/#">Conditions <span className="text-teal-600 text-xs p-1"></span>
                        </a>
                    </div>
                    <div className="p-5">
                        <div className="text-xs uppercase font-bold text-white ">Contact us</div>
                        <div className="flex space-x-4 bg-white p-1 rounded mt-3">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                <FaFacebook className="text-blue-600 text-2xl" />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                <FaInstagram className="text-pink-500 text-2xl" />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                <FaTwitter className="text-blue-400 text-2xl" />
                            </a>
                        </div>
                        <p className="text-white mt-3 ">
                            Filpkart@gmail.com
                        </p>
                    </div>
                </div>
            </div>
            <p class="text-center mt-2">&copy;  2024 - All rights reserved.</p>
        </>
    )
}