'use client';

import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function HistoryPage() {
    const { user, getHistory, loading } = useAuth();
    const router = useRouter();
    const [history, setHistory] = useState([]);

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
        if (user) {
            setHistory(getHistory());
        }
    }, [user, loading, router, getHistory]);

    if (loading) return <div>Loading...</div>;
    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Search History</h1>

                {history.length === 0 ? (
                    <div className="bg-white rounded-lg shadow p-6 text-center">
                        <p className="text-gray-500">No search history found.</p>
                        <Link href="/" className="text-indigo-600 hover:text-indigo-500 mt-4 block">
                            Start Searching
                        </Link>
                    </div>
                ) : (
                    <div className="bg-white shadow overflow-hidden sm:rounded-md">
                        <ul className="divide-y divide-gray-200">
                            {history.map((item) => (
                                <li key={item.id}>
                                    <Link
                                        href={`/?budgetMin=${item.budgetMin}&budgetMax=${item.budgetMax}&usage=${item.usage}&minRam=${item.minRam}&minStorage=${item.minStorage}`}
                                        className="block hover:bg-gray-50"
                                    >
                                        <div className="px-4 py-4 sm:px-6">
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm font-medium text-indigo-600 truncate">
                                                    Min: £{item.budgetMin} - Max: £{item.budgetMax} • {item.usage}
                                                </p>
                                                <div className="ml-2 flex-shrink-0 flex">
                                                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                        {new Date(item.timestamp).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="mt-2 sm:flex sm:justify-between">
                                                <div className="sm:flex">
                                                    <p className="flex items-center text-sm text-gray-500">
                                                        Min RAM: {item.minRam}GB • Min Storage: {item.minStorage}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
