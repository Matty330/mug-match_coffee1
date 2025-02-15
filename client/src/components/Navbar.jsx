import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-gradient-to-b from-gradientStart to-gradientEnd p-4 flex justify-between items-center text-white shadow-lg">
            <h1 className="text-2xl font-elegant">Mug Match Coffee</h1>
            <div className="space-x-6">
                <Link to="/landingpage" className="hover:underline">Home</Link>
                <Link to="/quiz" className="hover:underline">Quiz</Link>
                <Link to="/shops" className="hover:underline">Coffee Shops</Link>
                <Link to="/favorites" className="hover:underline">Favorites</Link>
                <Link to="/settings" className="hover:underline">Profile settings</Link>
            </div>
        </nav>
    );
};

export default Navbar;
