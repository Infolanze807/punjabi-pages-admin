import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectIsAuthenticated } from '../redux/features/authSlice';

const PublicLayout = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated);

    if (isAuthenticated) {
        return <Navigate to="/business" replace />;
    }


    return (
        <>
            <main>
                <Outlet />
            </main>
        </>
    )
}

export default PublicLayout