"use client"

import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/actions/authActions';
import { setUser } from '../store/actions/userActions';
import "../style/login/login.scss"
import axiosInstance from '../api/axiosInstance'
import { io } from "socket.io-client";
const Login = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();




    const handleLogout = () => {
        localStorage.removeItem('user');
        router.push('/login');
    };

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const res = await axiosInstance.post('https://serenity-adventures-demo.onrender.com//api/v1/auth/login', {
                email,
                password,
            }, {
                withCredentials: true,
            });
            const userData = res.data.user;
            const role = userData.role;

            localStorage.setItem('user', JSON.stringify(userData));
            const jwtToken = res.data.jwtToken;
            localStorage.setItem('token', jwtToken);
            dispatch(loginSuccess(res.data));
            dispatch(setUser(userData));

            if (role === true) {
                console.log("check", userData)
                router.push('/dashboard');
            } else {
                handleLogout();
            }
        } catch (error) {
            console.error('Lỗi:', error);
        }
    };


    return (
        <div className="d1 w-100%">
            <form className="container">
                <div className="form" id="form">
                    <div className="content">
                        <h1>Log In</h1>
                        <div className="group">
                            <input
                                type="text"
                                className="inputText"
                                value={email}
                                onChange={handleEmailChange}
                                autoComplete="email"
                                placeholder=""
                                required
                            />
                            <label>Email</label>
                        </div>
                        <div className="group">
                            <input
                                type="password"
                                className="inputText"
                                value={password}
                                onChange={handlePasswordChange}
                                autoComplete="current-password"
                                placeholder=""
                                required
                            />
                            <label>Password</label>
                        </div>
                        <div className="group">
                            <input type="checkbox" />
                            <label>Save</label>
                        </div>
                        <button type="submit" onClick={handleSubmit}>LogIn</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;
