import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
    return (
        <nav className="navbar bg-base-200">
            <div className="container mx-auto flex justify-between items-center">
                <div className="navbar-start">
                    <span className="text-xl font-bold">Calendar Dashboard</span>
                </div>
                <div className="navbar-end hidden md:flex space-x-2">
                    <Link href="/" className="btn btn-ghost">Home</Link>
                    <Link href="/dashboard" className="btn btn-ghost">Dashboard</Link>
                </div>
                {/* Responsive menu for mobile */}
                <div className="navbar-end md:hidden">
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-40">
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="/dashboard">Dashboard</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;