import React, { useState } from "react";
import logo from "../assets/logo.jpeg";
import {
    Button,
    CardBody,
    IconButton,
    Input,
    Typography,
} from "@material-tailwind/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisibility = () => setPasswordShown((cur) => !cur);

    const handleLogin = (e) => {
        e.preventDefault();
        navigate("/business");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <section className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-md px-6 py-8">
                {/* Logo and Welcome */}
                <div className="text-center mb-6">
                    <div className="flex items-center justify-center gap-3 mb-2">
                        <img src={logo} alt="Punjabi Pages" className="w-12 h-12" />
                        <Typography variant="h4" className="font-bold text-orange-500">
                            Punjabi Pages
                        </Typography>
                    </div>
                    <Typography variant="paragraph" className="text-gray-600">
                        Welcome back! Please sign in to your account
                    </Typography>
                </div>

                {/* Login Form */}
                <CardBody className="p-0">
                    <form className="space-y-6">
                        {/* Email */}
                        <div>
                            <Typography variant="small" className="mb-1 text-gray-700 font-medium">
                                Email Address
                            </Typography>
                            <Input
                                type="email"
                                variant="outlined"
                                placeholder="name@mail.com"
                                name="email"
                                crossOrigin={undefined}
                                className="p-2 rounded-md"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <Typography variant="small" className="mb-1 text-gray-700 font-medium">
                                Password
                            </Typography>
                            <div className="relative">
                                <Input
                                    type={passwordShown ? "text" : "password"}
                                    placeholder="********"
                                    name="password"
                                    crossOrigin={undefined}
                                    className="p-2 rounded-md"
                                />
                                <IconButton
                                    variant="text"
                                    size="sm"
                                    onClick={togglePasswordVisibility}
                                    className="!absolute right-8 top-5"
                                >
                                    {passwordShown ? (
                                        <EyeIcon className="h-5 w-5 text-gray-600" />
                                    ) : (
                                        <EyeSlashIcon className="h-5 w-5 text-gray-600" />
                                    )}
                                </IconButton>
                            </div>
                        </div>

                        {/* Forgot Password */}
                        <div className="flex justify-end">
                            <Link
                                to="/"
                                className="text-sm text-blue-500 hover:text-blue-700 font-medium"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        {/* Sign In Button */}
                        <Button onClick={handleLogin} type="submit" className="bg-orange-500 hover:bg-orange-600" fullWidth>
                            Sign In
                        </Button>

                        {/* Divider */}
                        <div className="flex items-center gap-4 my-4">
                            <div className="flex-1 h-px bg-gray-300"></div>
                            <Typography variant="small" color="gray">
                                OR
                            </Typography>
                            <div className="flex-1 h-px bg-gray-300"></div>
                        </div>

                        {/* Sign Up Link */}
                        <Typography color="gray" className="text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <Link to="/" className="font-medium text-orange-500 hover:text-orange-600">
                                Sign Up
                            </Link>
                        </Typography>
                    </form>
                </CardBody>
            </section>
        </div>
    );
}

export default Login;
