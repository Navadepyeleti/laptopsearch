
import Link from 'next/link';

export default function LaptopCard({ laptop }) {
  // Determine usage badge color
  const getUsageBadgeColor = (usage) => {
    switch (usage) {
      case 'Student':
        return 'bg-green-100 text-green-800';
      case 'Office':
        return 'bg-blue-100 text-blue-800';
      case 'Gaming':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Link href={`/laptop/${laptop.id}`} className="block group">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
        {/* Image (free-license from data) */}
        {laptop.image && (
          <div className="relative w-full aspect-video bg-gray-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={laptop.image}
              alt={laptop.name}
              className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
            />
          </div>
        )}
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4 pb-4 border-b border-gray-200">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{laptop.name}</h3>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getUsageBadgeColor(laptop.usage)}`}>
                  {laptop.usage}
                </span>
              </div>
              <p className="text-sm text-gray-600">{laptop.brand}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">£{laptop.price.toLocaleString()}</p>
            </div>
          </div>

          {/* Specifications */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">RAM</p>
              <p className="text-lg font-semibold text-gray-900">{laptop.ram} GB</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Storage</p>
              <p className="text-lg font-semibold text-gray-900">{laptop.storage}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Processor</p>
              <p className="text-lg font-semibold text-gray-900">{laptop.processor}</p>
            </div>
          </div>

          {/* Score */}
          <div className="mb-4 pb-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-700">Match Score</p>
              <span className="text-sm font-bold text-blue-600">{laptop.score ? `${laptop.score}/5` : 'N/A'}</span>
            </div>
            {laptop.score && (
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${(laptop.score / 5) * 100}%` }}
                ></div>
              </div>
            )}
          </div>

          {/* Why Recommended */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Why Recommended:</p>
            <ul className="space-y-1">
              {laptop.reasons && laptop.reasons.length > 0 ? (
                laptop.reasons.map((reason, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    {reason}
                  </li>
                ))
              ) : (
                <li className="text-sm text-gray-500">Click to view details</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </Link>
  );
}
