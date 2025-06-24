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
                    <form onSubmit={handleSubmit} className="space-y-6">
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
                                value={formData.email}
                                onChange={handleInputChange}
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
                                    name="password"
                                    placeholder="********"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    crossOrigin={undefined}
                                    className="p-2 rounded-md"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-3 top-2/4 -translate-y-1/2"
                                >
                                    {passwordShown ? (
                                        <EyeIcon className="h-5 w-5 text-gray-600" />
                                    ) : (
                                        <EyeSlashIcon className="h-5 w-5 text-gray-600" />
                                    )}
                                </button>
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
                        <Button
                            type="submit"
                            className="bg-orange-500 hover:bg-orange-600 flex items-center justify-center"
                            fullWidth
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <svg
                                        className="animate-spin h-4 w-4 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                        ></path>
                                    </svg>
                                </span>
                            ) : (
                                "Sign In"
                            )}
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
