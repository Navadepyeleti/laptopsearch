# 🚀 LaptopFinder - MVP Product

> **Smart Laptop Recommendation System** | Find your perfect laptop in seconds, not hours.

![MVP Status](https://img.shields.io/badge/Status-MVP-green)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![React](https://img.shields.io/badge/React-18-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-blue)

## 📋 Overview

**LaptopFinder** is an intelligent recommendation system that helps users find the perfect laptop based on their specific needs, budget, and usage patterns. Built as an MVP (Minimum Viable Product) to demonstrate core functionality and user value.

### 🎯 Key Features

- **Smart Matching Algorithm** - Rule-based scoring system that analyzes multiple criteria
- **Instant Results** - Get personalized recommendations in seconds
- **Transparent Scoring** - See exactly why each laptop is recommended
- **User-Friendly Interface** - Clean, modern design optimized for conversion
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Architecture

### Technology Stack

- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 18
- **Styling**: Tailwind CSS 3.3
- **Language**: JavaScript (ES6+)

### Project Structure

```
├── app/
│   ├── page.js          # Main landing page
│   ├── layout.js        # Root layout with metadata
│   └── globals.css      # Global styles
├── components/
│   ├── InputForm.js     # User preference form
│   └── LaptopCard.js    # Laptop display card
├── data/
│   └── laptops.js       # Hard-coded laptop database
└── utils/
    └── recommendation.js # Rule-based scoring algorithm
```

## 🧠 How It Works

### Recommendation Algorithm

The system uses a transparent, rule-based scoring mechanism:

1. **Usage Match** (+2 points) - Matches laptop category to user's primary use case
2. **Budget Match** (+1 point) - Verifies laptop price falls within selected budget range
3. **RAM Requirement** (+1 point) - Ensures laptop meets or exceeds minimum RAM requirement
4. **Storage Preference** (+1 point) - Matches storage type (SSD/HDD) to user preference

**Total Score**: 0-5 points (5 = Perfect Match)

Laptops are ranked by score (highest first), with price as a tiebreaker (lower price preferred).

### Budget Ranges

- **Under $500** (< ₹40,000)
- **$500 - $850** (₹40,000 - ₹70,000)
- **Above $850** (> ₹70,000)

## 🎨 Design Philosophy

- **Clean & Modern** - Professional aesthetic suitable for MVP presentation
- **User-Centric** - Focus on clarity and ease of use
- **Performance** - Fast load times and smooth interactions
- **Accessible** - Semantic HTML and proper contrast ratios

## 📊 MVP Features

### ✅ Implemented

- [x] User preference form (Budget, Usage, RAM, Storage)
- [x] Rule-based recommendation engine
- [x] Top 5 laptop recommendations
- [x] Detailed scoring and explanations
- [x] Responsive design
- [x] Professional UI/UX
- [x] Hero section with value proposition
- [x] Features showcase
- [x] How it works section

### 🔮 Future Enhancements

- [ ] User authentication
- [ ] Save favorite laptops
- [ ] Comparison tool (side-by-side)
- [ ] Price tracking and alerts
- [ ] User reviews and ratings
- [ ] Integration with e-commerce APIs
- [ ] Advanced filtering options
- [ ] Export recommendations (PDF/Email)

## 🧪 Testing

```bash
# Run linter
npm run lint

# Type checking (if using TypeScript)
npm run type-check
```

## 📝 License

This project is built as an MVP demonstration. All rights reserved.

## 👥 Contributing

This is an MVP product. For questions or feedback, please open an issue.

## 📧 Contact

**LaptopFinder** - Smart Laptop Recommendations

Built with ❤️ using Next.js & React

---

**Status**: MVP Product | **Version**: 1.0.0 | **Last Updated**: 2024
