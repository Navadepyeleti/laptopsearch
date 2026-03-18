'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import InputForm from '../components/InputForm';
import LaptopCard from '../components/LaptopCard';
import LaptopCarousel from '../components/LaptopCarousel';
import { laptops } from '../data/laptops';
import { getRecommendations } from '../utils/recommendation';
import { useAuth } from '../context/AuthContext';

/**
 * Main Page Component
 * Landing page with carousel, search (slider for budget), and results.
 * User can change search options and get new results without restarting.
 */
export default function Home() {
  const [recommendations, setRecommendations] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [lastInput, setLastInput] = useState({ budgetMin: 400, budgetMax: 700 });
  const { saveSearch } = useAuth();
  const searchParams = useSearchParams();

  // Handle URL params for "Run Search" from history
  useEffect(() => {
    const budgetMin = searchParams.get('budgetMin');
    const budgetMax = searchParams.get('budgetMax');
    const usage = searchParams.get('usage');
    const minRam = searchParams.get('minRam');
    const minStorage = searchParams.get('minStorage');

    if (budgetMin && budgetMax && usage) {
      const input = {
        budgetMin: parseInt(budgetMin),
        budgetMax: parseInt(budgetMax),
        usage,
        minRam: parseInt(minRam || '8'),
        minStorage
      };
      setLastInput(input);
      const results = getRecommendations(laptops, input);
      setRecommendations(results);
      setHasSearched(true);
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [searchParams]);

  const handleFormSubmit = (userInput) => {
    const results = getRecommendations(laptops, userInput);
    setRecommendations(results);
    setLastInput(userInput);
    setHasSearched(true);
    saveSearch(userInput);

    // Scroll to results
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
            Laptop Recommendation System
          </h1>
          <p className="text-gray-600 text-center">
            Find the best laptop based on your needs
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10">
        {/* Carousel of laptops */}
        <LaptopCarousel laptops={laptops} />

        {/* Explain new search */}
        <section className="bg-white rounded-lg border border-gray-200 p-6 my-10">
          <h2 className="text-xl font-bold text-gray-900 mb-3">How the search works</h2>
          <p className="text-gray-600 mb-4">
            Use the form below to set your preferences. You can change any option at any time
            and click &quot;Get Recommendations&quot; again—no need to restart or refresh the page.
            Results update instantly with your new criteria.
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm">
            <li><strong>Budget:</strong> Use the sliders to set min and max budget in £.</li>
            <li><strong>Usage:</strong> Student, Office, or Gaming—we match laptops to your use.</li>
            <li><strong>RAM & storage:</strong> We only show laptops that meet or exceed your choices.</li>
          </ul>
        </section>

        {/* Search form – always visible so user can change options without restart */}
        <section className="mb-10">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-lg font-bold text-gray-900 mb-6">
              {hasSearched ? 'Change options and search again' : 'Set your preferences'}
            </h2>
            <InputForm
              onSubmit={handleFormSubmit}
              initialBudgetMin={lastInput.budgetMin ?? 400}
              initialBudgetMax={lastInput.budgetMax ?? 700}
            />
          </div>
        </section>

        {/* Results – show when user has searched; updates when they search again */}
        {hasSearched && (
          <section id="results" className="scroll-mt-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Recommended Laptops
            </h2>


            {recommendations.length > 0 ? (
              <div className="space-y-4">
                {recommendations.map((laptop) => (
                  <LaptopCard key={laptop.id} laptop={laptop} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                <p className="text-gray-600 mb-4">
                  No laptops found in your budget range with these options.
                </p>
                <p className="text-sm text-gray-500">
                  Try widening your budget (sliders) or changing usage / RAM / storage above, then click Get Recommendations again.
                </p>
              </div>
            )}
          </section>
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-4xl mx-auto px-6 py-6 text-center text-sm text-gray-500">
          <p>Academic Project - Rule-Based Laptop Recommendation System</p>
          <p className="mt-1 text-xs">Laptop images: Unsplash (free license)</p>
        </div>
      </footer>
    </div>
  );
}
