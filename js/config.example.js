/**
 * API Configuration Template
 * 
 * Copy this file to 'config.js' and add your actual API credentials.
 * The config.js file is gitignored to protect your API key.
 */

export const API_CONFIG = {
    // MySportsFeeds API Configuration
    MYSPORTSFEEDS: {
        // Get your API key from: https://www.mysportsfeeds.com/
        API_KEY: 'YOUR_MYSPORTSFEEDS_API_KEY_HERE',
        
        // Base URL for MySportsFeeds API v2.1
        BASE_URL: 'https://api.mysportsfeeds.com/v2.1/pull',
        
        // Current season (update as needed)
        // Format: YYYY-YYYY-regular or YYYY-YYYY-playoff
        SEASON: '2024-2025-regular',
        
        // Available leagues
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
        format: 'json' // json, xml, or csv
    }
};

export default API_CONFIG;
