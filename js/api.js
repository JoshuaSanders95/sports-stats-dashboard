/**
 * API module for fetching sports data
 * Demonstrates async/await, Promises, and error handling
 */

import { getRandomInt, getRandomElement } from './utils.js';

// Mock team names for different sports
const NBA_TEAMS = [
    'Lakers', 'Celtics', 'Warriors', 'Nets', 'Bucks', 'Heat', 
    'Suns', 'Nuggets', 'Mavericks', 'Clippers', '76ers', 'Raptors'
];

const NFL_TEAMS = [
    'Chiefs', 'Bills', '49ers', 'Eagles', 'Cowboys', 'Bengals',
    'Patriots', 'Packers', 'Ravens', 'Steelers', 'Rams', 'Seahawks'
];

const MLB_TEAMS = [
    'Yankees', 'Dodgers', 'Red Sox', 'Astros', 'Braves', 'Cubs',
    'Cardinals', 'Giants', 'Mets', 'Phillies', 'Rays', 'Blue Jays'
];

const EPL_TEAMS = [
    'Man City', 'Arsenal', 'Liverpool', 'Chelsea', 'Man United', 'Tottenham',
    'Newcastle', 'Brighton', 'Aston Villa', 'West Ham', 'Leicester', 'Everton'
];

// API Configuration
const API_CONFIG = {
    baseURL: 'https://api.sports-data.example.com', // Mock API endpoint
    timeout: 5000,
    retries: 3
};

/**
 * Simulates an API delay
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise} Promise that resolves after delay
 */
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Simulate network request with random delay
 * @param {number} minMs - Minimum delay
 * @param {number} maxMs - Maximum delay
 * @returns {Promise} Promise that resolves after random delay
 */
const simulateNetworkDelay = async (minMs = 300, maxMs = 800) => {
    const delayTime = getRandomInt(minMs, maxMs);
    await delay(delayTime);
};

/**
 * Generate mock team data
 * @param {string[]} teams - Array of team names
 * @returns {Array} Array of team objects with stats
 */
const generateMockTeams = (teams) => {
    return teams.map((name, index) => {
        const wins = getRandomInt(5, 45);
        const losses = getRandomInt(5, 45);
        const total = wins + losses;
        const winPct = (wins / total).toFixed(3);
        const streak = getRandomInt(1, 8);
        const streakType = Math.random() > 0.5 ? 'W' : 'L';
        
        return {
            id: index + 1,
            name,
            wins,
            losses,
            winPct: parseFloat(winPct),
            streak: `${streakType}${streak}`,
            points: getRandomInt(80, 120),
            gamesPlayed: total
        };
    });
};

/**
 * Generate mock game data
 * @param {string[]} teams - Array of team names
 * @param {number} count - Number of games to generate
 * @returns {Array} Array of game objects
 */
const generateMockGames = (teams, count = 6) => {
    const games = [];
    const usedPairs = new Set();
    
    for (let i = 0; i < count; i++) {
        let homeTeam, awayTeam;
        let pairKey;
        
        // Ensure unique team matchups
        do {
            homeTeam = getRandomElement(teams);
            awayTeam = getRandomElement(teams.filter(t => t !== homeTeam));
            pairKey = [homeTeam, awayTeam].sort().join('-');
        } while (usedPairs.has(pairKey));
        
        usedPairs.add(pairKey);
        
        const homeScore = getRandomInt(80, 130);
        const awayScore = getRandomInt(80, 130);
        const date = new Date();
        date.setDate(date.getDate() - getRandomInt(0, 7));
        
        games.push({
            id: i + 1,
            homeTeam,
            awayTeam,
            homeScore,
            awayScore,
            date: date.toISOString(),
            status: 'final',
            winner: homeScore > awayScore ? homeTeam : awayTeam
        });
    }
    
    return games;
};

/**
 * Fetch team standings
 * @param {string} league - League identifier
 * @returns {Promise<Object>} Promise resolving to standings data
 */
export const fetchStandings = async (league = 'nba') => {
    try {
        await simulateNetworkDelay();
        
        // Simulate occasional API errors
        if (Math.random() < 0.05) {
            throw new Error('Network error: Unable to fetch standings');
        }
        
        // Select teams based on league
        let teams;
        switch(league.toLowerCase()) {
            case 'nba':
                teams = NBA_TEAMS;
                break;
            case 'nfl':
                teams = NFL_TEAMS;
                break;
            case 'mlb':
                teams = MLB_TEAMS;
                break;
            case 'epl':
                teams = EPL_TEAMS;
                break;
            default:
                teams = NBA_TEAMS;
        }
        
        const standings = generateMockTeams(teams);
        
        return {
            success: true,
            data: standings,
            league: league.toUpperCase(),
            timestamp: new Date().toISOString()
        };
        
    } catch (error) {
        console.error('Error fetching standings:', error);
        throw error;
    }
};

/**
 * Fetch recent games
 * @param {string} league - League identifier
 * @returns {Promise<Object>} Promise resolving to games data
 */
export const fetchRecentGames = async (league = 'nba') => {
    try {
        await simulateNetworkDelay();
        
        // Simulate occasional API errors
        if (Math.random() < 0.05) {
            throw new Error('Network error: Unable to fetch games');
        }
        
        let teams;
        switch(league.toLowerCase()) {
            case 'nba':
                teams = NBA_TEAMS;
                break;
            case 'nfl':
                teams = NFL_TEAMS;
                break;
            case 'mlb':
                teams = MLB_TEAMS;
                break;
            case 'epl':
                teams = EPL_TEAMS;
                break;
            default:
                teams = NBA_TEAMS;
        }
        
        const games = generateMockGames(teams);
        
        return {
            success: true,
            data: games,
            league: league.toUpperCase(),
            timestamp: new Date().toISOString()
        };
        
    } catch (error) {
        console.error('Error fetching games:', error);
        throw error;
    }
};

/**
 * Fetch dashboard statistics
 * @param {string} league - League identifier
 * @returns {Promise<Object>} Promise resolving to stats data
 */
export const fetchDashboardStats = async (league = 'nba') => {
    try {
        await simulateNetworkDelay(200, 500);
        
        const totalTeams = 12;
        const gamesToday = getRandomInt(3, 8);
        const topScorer = getRandomElement(['LeBron James', 'Stephen Curry', 'Kevin Durant', 'Giannis Antetokounmpo']);
        const avgScore = getRandomInt(105, 115);
        
        return {
            success: true,
            data: {
                totalTeams,
                gamesToday,
                topScorer,
                avgScore
            },
            league: league.toUpperCase(),
            timestamp: new Date().toISOString()
        };
        
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        throw error;
    }
};

/**
 * Search for teams or players
 * @param {string} query - Search query
 * @param {string} league - League identifier
 * @returns {Promise<Object>} Promise resolving to search results
 */
export const searchData = async (query, league = 'nba') => {
    try {
        await simulateNetworkDelay(100, 300);
        
        if (!query || query.trim().length === 0) {
            return {
                success: true,
                data: [],
                message: 'Empty search query'
            };
        }
        
        // Mock search results
        const results = [
            { type: 'team', name: query, league },
            { type: 'player', name: `${query} Player`, team: 'Team Name', league }
        ];
        
        return {
            success: true,
            data: results,
            query,
            league: league.toUpperCase()
        };
        
    } catch (error) {
        console.error('Error searching:', error);
        throw error;
    }
};

/**
 * Fetch all data in parallel
 * @param {string} league - League identifier
 * @returns {Promise<Object>} Promise resolving to all data
 */
export const fetchAllData = async (league = 'nba') => {
    try {
        // Fetch all data concurrently using Promise.all
        const [standings, games, stats] = await Promise.all([
            fetchStandings(league),
            fetchRecentGames(league),
            fetchDashboardStats(league)
        ]);
        
        return {
            success: true,
            standings: standings.data,
            games: games.data,
            stats: stats.data,
            league: league.toUpperCase(),
            timestamp: new Date().toISOString()
        };
        
    } catch (error) {
        console.error('Error fetching all data:', error);
        throw error;
    }
};

export default {
    fetchStandings,
    fetchRecentGames,
    fetchDashboardStats,
    searchData,
    fetchAllData
};
