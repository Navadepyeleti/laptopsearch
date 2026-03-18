'use client';

import { useState } from 'react';

const BUDGET_MIN = 300;
const BUDGET_MAX = 900;
const BUDGET_STEP = 50;

/**
 * Input Form Component
 * Collects user preferences for laptop recommendation.
 * Budget is a range slider; no need to restart to change options.
 */
export default function InputForm({ onSubmit, initialBudgetMin = 400, initialBudgetMax = 700 }) {
  const [formData, setFormData] = useState({
    budgetMin: String(initialBudgetMin),
    budgetMax: String(initialBudgetMax),
    usage: '',
    ram: '',
    storage: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const min = Number(formData.budgetMin);
    const max = Number(formData.budgetMax);
    if (min > max) {
      setError('Minimum budget must be less than or equal to maximum budget');
      return;
    }
    if (!formData.usage || !formData.ram || !formData.storage) {
      setError('Please fill in all fields');
      return;
    }
    setError('');
    onSubmit({
      budgetMin: formData.budgetMin,
      budgetMax: formData.budgetMax,
      usage: formData.usage,
      ram: formData.ram,
      storage: formData.storage
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3 text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Budget Range Slider */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Budget range (£)
        </label>
        <div className="space-y-4">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Min: £{formData.budgetMin}</span>
            <span>Max: £{formData.budgetMax}</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="budgetMin" className="sr-only">Minimum budget</label>
              <input
                type="range"
                id="budgetMin"
                name="budgetMin"
                min={BUDGET_MIN}
                max={BUDGET_MAX}
                step={BUDGET_STEP}
                value={formData.budgetMin}
                onChange={handleChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
            <div>
              <label htmlFor="budgetMax" className="sr-only">Maximum budget</label>
              <input
                type="range"
                id="budgetMax"
                name="budgetMax"
                min={BUDGET_MIN}
                max={BUDGET_MAX}
                step={BUDGET_STEP}
                value={formData.budgetMax}
                onChange={handleChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Usage Type */}
      <div>
        <label htmlFor="usage" className="block text-sm font-medium text-gray-700 mb-2">
          Usage Type
        </label>
        <select
          id="usage"
          name="usage"
          value={formData.usage}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select Usage Type</option>
          <option value="Student">Student</option>
          <option value="Office">Office</option>
          <option value="Gaming">Gaming</option>
        </select>
      </div>

      {/* Minimum RAM */}
      <div>
        <label htmlFor="ram" className="block text-sm font-medium text-gray-700 mb-2">
          Minimum RAM
        </label>
        <select
          id="ram"
          name="ram"
          value={formData.ram}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select Minimum RAM</option>
          <option value="8">8 GB</option>
          <option value="16">16 GB</option>
          <option value="32">32 GB</option>
        </select>
      </div>

      {/* Storage Preference */}
      <div>
        <label htmlFor="storage" className="block text-sm font-medium text-gray-700 mb-2">
          Storage Preference
        </label>
        <select
          id="storage"
          name="storage"
          value={formData.storage}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select Storage Preference</option>
          <option value="Any">Any</option>
          <option value="SSD">SSD</option>
          <option value="HDD">HDD</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium transition-colors"
      >
        Get Recommendations
      </button>
    </form>
  );
}
