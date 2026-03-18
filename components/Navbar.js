'use client';

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    return (
        <nav className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/" className="text-xl font-bold text-indigo-600">
                                Laptops
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        {user ? (
                            <>
                                <Link href="/history" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                                    Search History
                                </Link>
                                <div className="text-sm text-gray-500">Welcome, {user.name}</div>
                                <button
                                    onClick={handleLogout}
                                    className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                                    Login
                                </Link>
                                <Link href="/signup" className="bg-indigo-600 text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium">
                                    Sign up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
