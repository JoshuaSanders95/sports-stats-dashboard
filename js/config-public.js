/**
 * Public API Configuration for GitHub Pages Demo
 * This version uses mock data only - no API key required
 */

export const API_CONFIG = {
    // MySportsFeeds API Configuration (Demo Mode - No API Key)
    MYSPORTSFEEDS: {
        API_KEY: null, // No API key - will use mock data
        BASE_URL: 'https://api.mysportsfeeds.com/v2.1/pull',
        SEASON: '2024-2025-regular',
        LEAGUES: {
            NBA: 'nba',
            NFL: 'nfl', 
            MLB: 'mlb',
            NHL: 'nhl'
        }
    },
    
    // API request settings
    SETTINGS: {
        timeout: 10000,
        retries: 3,
        format: 'json'
    }
};

export default API_CONFIG;
