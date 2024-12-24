import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginPage() {
    const [showLogin, setShowLogin] = useState(true);
    const [login, setLogin] = useState({
        loginUser: '',
        loginPassword: ''
    });
    const [register, setRegister] = useState({
        firstName: '',
        lastName: '',
        username: '',
        mail: '',
        mobileNumber: '',
    });
    const [currentPage, setCurrentPage] = useState('register');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');

    const ApiUrl = import.meta.env.VITE_API_URL;

    const navigate = useNavigate();
   
    const handleClick = () => {
        
      
        let data = {
                firstName: register.firstName,
                lastName: register.lastName,
                username: register.username,
                mail: register.mail,
                mobileNumber: register.mobileNumber
            };
            axios.post(`${ApiUrl}/usersLogin/register`,data)
            .then(response => {
                console.log(response.data);
                toast.success("User Details Registered Successful !", {
                    position: "top-right",
                });
                localStorage.setItem("username", response.data.user.username);
                localStorage.setItem("userRegister", JSON.stringify(response.data.user));
                if (currentPage === 'register') {
                    setTimeout(() =>{
                        setCurrentPage('otp');
                    },1000);   
                }
            }).catch((error)=>{
                console.log("error");
                toast.error("User Registered failed !",{
                    position:"top-right",
                });
            })
        
        
    }

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const InputDataChange = (e) => {
        const { name, value } = e.target;
        setLogin({
            ...login,
            [name]: value
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegister({
            ...register,
            [name]: value
        });
    };

    const loginProcess = () => {
        console.log("Logging in with", login);
        
        let data = {
            username:login.loginUser,
            password:login.loginPassword,
        };
        axios.post(`${ApiUrl}/usersLogin/login`,data)
        .then(response =>{
            console.log("ok",response.data);
            localStorage.setItem("userRegister", JSON.stringify(response.data.user));
            toast.success("login Process Successful !", {
                position: "top-right",
            });

            localStorage.setItem("username",login.loginUser);
            setTimeout(() =>{
                 navigate('/');
            },3000); 
        }).catch((error)=>{
            console.log("error");
            toast.error("login Process failed !",{
                position:"top-right",
            });
        })
    };

    const userRegister = () => {
        console.log("Register a form");
        let data ={
            otp:otp,
            mobileNumber:register.mobileNumber,
            password: password,
        };
        axios.post(`${ApiUrl}/usersLogin/verify-otp`,data)
        .then(response => {
            console.log("Done",response.data);
            toast.success("Otp and Password Set Successful !", {
                position: "top-right",
            });
            setTimeout(() =>{
            navigate('/');
            },3000);
        }) .catch((error) => {
            console.log("error");
            toast.error("Otp and Password failed !",{
                position:"top-right",
            });
        })
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 ">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <ToastContainer />
                {showLogin ? (
                    <>
                        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
                        <div className="mb-4">
                            <input
                                type="text"
                                name="loginUser"
                                value={login.loginUser}
                                onChange={InputDataChange}
                                placeholder="Enter your username"
                                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-6">
                            <input
                                type="password"
                                name="loginPassword"
                                value={login.loginPassword}
                                onChange={InputDataChange}
                                placeholder="Enter your password"
                                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        
                        <button
                            type="button"
                            onClick={loginProcess}
                            className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Login
                        </button>
                        
                        <p className="text-center text-sm mt-4 text-gray-600">
                            Don't have an account?
                            <span
                                onClick={() => setShowLogin(false)}
                                className="text-blue-500 cursor-pointer underline"
                            >
                                Sign Up
                            </span>
                        </p>
                    </>
                ) : currentPage === 'register' ? (
                    <>
                        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
                        <div className="mb-4">
                            <input
                                type="text"
                                name="firstName"
                                value={register.firstName}
                                onChange={handleChange}
                                placeholder="Enter your firstname"
                                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="text"
                                name="lastName"
                                value={register.lastName}
                                onChange={handleChange}
                                placeholder="Enter your lastname"
                                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="text"
                                name="username"
                                value={register.username}
                                onChange={handleChange}
                                placeholder="Enter your username"
                                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="mb-4">
                            <input
                                type="text"
                                name="mail"
                                value={register.mail}
                                onChange={handleChange}
                                placeholder="Enter your mail"
                                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="mb-4">
                            <input
                                type="number"
                                name="mobileNumber"
                                value={register.mobileNumber}
                                onChange={handleChange}
                                placeholder="Enter your mobileNumber"
                                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={handleClick}
                            className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Next
                        </button>


                        <p className="text-center text-sm text-gray-600">
                            Already have an account?
                            <span
                                onClick={() => setShowLogin(true)}
                                className="text-blue-500 cursor-pointer underline"
                            >
                                Login
                            </span>
                        </p>
                    </>
                ) : currentPage === 'otp' ? (
                    <>
                        <h2 className="text-2xl font-semibold text-center mb-6">Otp</h2>
                        <div className="mb-4">
                            <input
                                type="number"
                                name="otp"
                                value={otp}
                                onChange={handleOtpChange}
                                placeholder="Enter a your otp"
                                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <button
                            type="button"
                            className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onClick={() => setCurrentPage('password')}
                        >
                            Next
                        </button>
                    </>
                ) : currentPage === 'password' ? (
                    <>
                        <h2 className="text-2xl font-semibold text-center mb-6">Password</h2>
                        <div className="mb-4">
                            <input
                                type="password"
                                name="password"
                                value={password}
                                required
                                onChange={handlePasswordChange}
                                placeholder="Enter a your password"
                                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <button
                            type="button"
                            className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onClick={userRegister}
                        >
                            Submit
                        </button>
                    </>
                ) : null}
            </div>
        </div>
    );
}

export default LoginPage;
