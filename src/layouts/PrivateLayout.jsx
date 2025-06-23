import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectIsAuthenticated } from '../redux/features/authSlice';

const PrivateLayout = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }


    return (
        <>
            <main className="">
                <Outlet />
            </main>
        </>
    )
}

export default PrivateLayout