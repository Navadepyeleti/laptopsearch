'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { laptops } from '../../../data/laptops';
import Image from 'next/image';
import Link from 'next/link';

export default function LaptopDetails({ params }) {
    const router = useRouter();
    const { id } = params;
    const laptop = laptops.find((l) => l.id === parseInt(id));

    if (!laptop) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900">Laptop not found</h2>
                    <Link href="/" className="text-indigo-600 hover:text-indigo-500 mt-4 block">
                        Return to Home
                    </Link>
                </div>
            </div>
        );
    }

    const [emailLink, setEmailLink] = useState('');

    useEffect(() => {
        const subject = `Check out this ${laptop.brand} ${laptop.name}`;
        const url = window.location.href; // Use window.location.href to get the full current URL
        const body = `I found this laptop on the Laptop Recommendation System:\n\n${laptop.brand} ${laptop.name}\nPrice: £${laptop.price}\nProcessor: ${laptop.processor}\nRAM: ${laptop.ram}GB\nStorage: ${laptop.storage}\n\nCheck it out here: ${url}`;

        // Gmail compose URL
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        setEmailLink(gmailUrl);
    }, [laptop]);

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="md:flex">
                    <div className="md:flex-shrink-0">
                        <div className="h-64 w-full md:w-96 relative">
                            <Image
                                src={laptop.image}
                                alt={laptop.name}
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                    </div>
                    <div className="p-8 w-full">
                        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                            {laptop.brand} • {laptop.usage}
                        </div>
                        <h1 className="block mt-1 text-2xl leading-tight font-bold text-gray-900">
                            {laptop.name}
                        </h1>
                        <p className="mt-2 text-3xl text-gray-900 font-bold">£{laptop.price}</p>

                        <div className="mt-6 grid grid-cols-2 gap-4">
                            <div className="border-t border-gray-200 pt-4">
                                <dt className="font-medium text-gray-500">Processor</dt>
                                <dd className="mt-1 text-gray-900">{laptop.processor}</dd>
                            </div>
                            <div className="border-t border-gray-200 pt-4">
                                <dt className="font-medium text-gray-500">RAM</dt>
                                <dd className="mt-1 text-gray-900">{laptop.ram}GB</dd>
                            </div>
                            <div className="border-t border-gray-200 pt-4">
                                <dt className="font-medium text-gray-500">Storage</dt>
                                <dd className="mt-1 text-gray-900">{laptop.storage}</dd>
                            </div>
                            <div className="border-t border-gray-200 pt-4">
                                <dt className="font-medium text-gray-500">Usage</dt>
                                <dd className="mt-1 text-gray-900">{laptop.usage}</dd>
                            </div>
                            <div className="border-t border-gray-200 pt-4">
                                <dt className="font-medium text-gray-500">Description</dt>
                                <dd className="mt-1 text-gray-900">
                                    A powerful {laptop.usage.toLowerCase()} laptop from {laptop.brand} featuring a {laptop.processor} processor.
                                    Perfect for {laptop.usage.toLowerCase()} tasks with its {laptop.ram}GB of RAM and fast {laptop.storage} storage.
                                </dd>
                            </div>
                        </div>

                        <div className="mt-8 flex space-x-4">
                            <a
                                href={emailLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 text-center block leading-10"
                            >
                                Share via Gmail
                            </a>
                            <Link href="/" className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 text-center">
                                Back to Search
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
