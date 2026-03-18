/**
 * Rule-based recommendation logic
 * Uses simple scoring system to rank laptops
 * 
 * Scoring Rules:
 * - +2 points if usage type matches user preference
 * - +1 point if laptop price is within user's budget range
 * - +1 point if laptop RAM meets or exceeds user's minimum RAM requirement
 * - +1 point if storage type matches user preference (or if user selected "Any")
 */

/**
 * Checks if a price falls within user's budget range (min–max from slider)
 * @param {number} price - Laptop price
 * @param {Object} userInput - User's preferences with budgetMin and budgetMax
 * @returns {boolean} - True if price is within budget
 */
function isWithinBudget(price, userInput) {
  const min = Number(userInput.budgetMin);
  const max = Number(userInput.budgetMax);
  if (min == null || max == null || isNaN(min) || isNaN(max)) return false;
  return price >= min && price <= max;
}

/**
 * Calculates recommendation score for a laptop based on user preferences
 * @param {Object} laptop - Laptop object with specifications
 * @param {Object} userInput - User's preferences (budget, usage, ram, storage)
 * @returns {Object} - Object containing score and reasons for recommendation
 */
function calculateScore(laptop, userInput) {
  let score = 0;
  const reasons = [];

  // Rule 1: Usage type match (+2 points)
  if (laptop.usage.toLowerCase() === userInput.usage.toLowerCase()) {
    score += 2;
    reasons.push("Suitable for your usage");
  }

  // Rule 2: Budget match (+1 point)
  if (isWithinBudget(laptop.price, userInput)) {
    score += 1;
    reasons.push("Fits your budget");
  }

  // Rule 3: RAM requirement (+1 point)
  if (laptop.ram >= parseInt(userInput.ram)) {
    score += 1;
    reasons.push("Meets RAM requirement");
  }

  // Rule 4: Storage preference (+1 point)
  if (userInput.storage === "Any" || laptop.storage === userInput.storage) {
    score += 1;
    reasons.push("Has " + laptop.storage + " storage");
  }

  return { score, reasons };
}

/**
 * Gets top laptop recommendations based on user input
 * Uses rule-based scoring to rank laptops
 * 
 * @param {Array} laptops - Array of all available laptops
 * @param {Object} userInput - User preferences object
 * @param {number} userInput.budgetMin - Minimum budget (£)
 * @param {number} userInput.budgetMax - Maximum budget (£)
 * @param {string} userInput.usage - Usage type (Student/Office/Gaming)
 * @param {string} userInput.ram - Minimum RAM requirement
 * @param {string} userInput.storage - Storage preference
 * @returns {Array} - Top 5 laptops sorted by score (highest first)
 */
export function getRecommendations(laptops, userInput) {
  // Calculate score for each laptop
  const laptopsWithScores = laptops.map(laptop => {
    const { score, reasons } = calculateScore(laptop, userInput);
    return {
      ...laptop,
      score,
      reasons
    };
  });

  // Sort by score (highest first), then by price (lowest first) as tiebreaker
  laptopsWithScores.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return a.price - b.price;
  });

  // Return top 5 laptops
  return laptopsWithScores.slice(0, 5);
}
