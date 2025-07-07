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
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/features/authSlice";

function Login() {
    const navigate = useNavigate();
    const [passwordShown, setPasswordShown] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const dispatch = useDispatch();

    const { loading } = useSelector((state) => state.auth)

    const togglePasswordVisibility = () => setPasswordShown((cur) => !cur);

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log("form:", formData);
            const result = await dispatch(login(formData)).unwrap();
            console.log("Login successful:", result);
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
            <section className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 px-8 py-10">
                {/* Logo and Welcome */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <img src={logo} alt="Punjabi Pages" className="w-12 h-12 rounded-xl object-cover shadow-sm border-2 border-white" />
                        <Typography variant="h4" className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Punjabi Pages Admin
                        </Typography>
                    </div>
                    <Typography variant="paragraph" className="text-gray-600">
                        Welcome back! Please sign in to your account
                    </Typography>
                </div>

                {/* Login Form */}
                <CardBody className="p-0">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email */}
                        <div>
                            <Typography variant="small" className="mb-2 text-gray-700 font-medium">
                                Email Address
                            </Typography>
                            <Input
                                type="email"
                                variant="outlined"
                                placeholder="name@mail.com"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                crossOrigin={undefined}
                                className="p-3 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <Typography variant="small" className="mb-2 text-gray-700 font-medium">
                                Password
                            </Typography>
                            <div className="relative">
                                <Input
                                    type={passwordShown ? "text" : "password"}
                                    name="password"
                                    placeholder="********"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    crossOrigin={undefined}
                                    className="p-3 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 pr-12"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                >
                                    {passwordShown ? (
                                        <EyeIcon className="h-5 w-5" />
                                    ) : (
                                        <EyeSlashIcon className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Forgot Password */}
                        <div className="flex justify-end">
                            <Link
                                to="/"
                                className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        {/* Sign In Button */}
                        <Button
                            type="submit"
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 flex items-center justify-center py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                            fullWidth
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <div className="spinner"></div>
                                    <span>Signing in...</span>
                                </span>
                            ) : (
                                "Sign In"
                            )}
                        </Button>

                        {/* Divider */}
                        <div className="flex items-center gap-4 my-6">
                            <div className="flex-1 h-px bg-gray-200"></div>
                            <Typography variant="small" color="gray" className="px-2">
                                OR
                            </Typography>
                            <div className="flex-1 h-px bg-gray-200"></div>
                        </div>

                        {/* Sign Up Link */}
                        <Typography color="gray" className="text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <Link to="/" className="font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200">
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
