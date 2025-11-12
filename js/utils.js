/**
 * Utility functions for the Sports Stats Dashboard
 * Demonstrates JavaScript ES6+ features and functional programming
 */

/**
 * Calculate win percentage
 * @param {number} wins - Number of wins
 * @param {number} losses - Number of losses
 * @returns {string} Win percentage formatted to 3 decimal places
 */
export const calculateWinPercentage = (wins, losses) => {
    const total = wins + losses;
    if (total === 0) return '0.000';
    return (wins / total).toFixed(3);
};

/**
 * Format large numbers with commas
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
export const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * Calculate average from array of numbers
 * @param {number[]} numbers - Array of numbers
 * @returns {number} Average value
 */
export const calculateAverage = (numbers) => {
    if (!numbers || numbers.length === 0) return 0;
    const sum = numbers.reduce((acc, val) => acc + val, 0);
    return (sum / numbers.length).toFixed(1);
};

/**
 * Sort array of objects by property
 * @param {Array} array - Array to sort
 * @param {string} property - Property to sort by
 * @param {boolean} ascending - Sort direction
 * @returns {Array} Sorted array
 */
export const sortByProperty = (array, property, ascending = true) => {
    return [...array].sort((a, b) => {
        const aVal = a[property];
        const bVal = b[property];
        
        if (ascending) {
            return aVal > bVal ? 1 : -1;
        } else {
            return aVal < bVal ? 1 : -1;
        }
    });
};

/**
 * Filter array by search term
 * @param {Array} array - Array to filter
 * @param {string} searchTerm - Term to search for
 * @param {string[]} properties - Properties to search in
 * @returns {Array} Filtered array
 */
export const filterBySearch = (array, searchTerm, properties) => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return array;
    
    return array.filter(item => 
        properties.some(prop => 
            String(item[prop]).toLowerCase().includes(term)
        )
    );
};

/**
 * Debounce function to limit rapid function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait = 300) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

/**
 * Get random integer between min and max (inclusive)
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random integer
 */
export const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Get random element from array
 * @param {Array} array - Array to pick from
 * @returns {*} Random element
 */
export const getRandomElement = (array) => {
    return array[Math.floor(Math.random() * array.length)];
};

/**
 * Format date to readable string
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
    });
};

/**
 * Check if value is valid number
 * @param {*} value - Value to check
 * @returns {boolean} True if valid number
 */
export const isValidNumber = (value) => {
    return typeof value === 'number' && !isNaN(value) && isFinite(value);
};

/**
 * Truncate string to specified length
 * @param {string} str - String to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated string
 */
export const truncateString = (str, maxLength = 50) => {
    if (str.length <= maxLength) return str;
    return str.slice(0, maxLength - 3) + '...';
};

/**
 * Deep clone an object
 * @param {Object} obj - Object to clone
 * @returns {Object} Cloned object
 */
export const deepClone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
};

/**
 * Generate unique ID
 * @returns {string} Unique ID
 */
export const generateId = () => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export default {
    calculateWinPercentage,
    formatNumber,
    calculateAverage,
    sortByProperty,
    filterBySearch,
    debounce,
    getRandomInt,
    getRandomElement,
    formatDate,
    isValidNumber,
    truncateString,
    deepClone,
    generateId
};
