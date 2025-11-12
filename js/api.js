/**
 * API module for fetching sports data from MySportsFeeds
 * Demonstrates async/await, Promises, error handling, and real API integration
 */

import { getRandomInt, getRandomElement } from './utils.js';
// Use public config (works on GitHub Pages with mock data)
// For local development with real API, copy config-public.js to config.js and add your API key
import { API_CONFIG } from './config-public.js';

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

// MySportsFeeds API Helper Functions

/**
 * Create authentication headers for MySportsFeeds
 * @returns {Headers} Headers object with authentication
 */
const createAuthHeaders = () => {
    const headers = new Headers();
    // MySportsFeeds uses Basic Auth with API key as username and 'MYSPORTSFEEDS' as password
    const credentials = btoa(`${API_CONFIG.MYSPORTSFEEDS.API_KEY}:MYSPORTSFEEDS`);
    headers.append('Authorization', `Basic ${credentials}`);
    headers.append('Accept', 'application/json');
    return headers;
};

/**
 * Make authenticated request to MySportsFeeds API
 * @param {string} endpoint - API endpoint path
 * @param {string} league - League identifier (nba, nfl, etc.)
 * @returns {Promise<Object>} API response data
 */
const fetchFromMySportsFeeds = async (endpoint, league = 'nba') => {
    const url = `${API_CONFIG.MYSPORTSFEEDS.BASE_URL}/${league}/${API_CONFIG.MYSPORTSFEEDS.SEASON}/${endpoint}.json`;
    
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: createAuthHeaders(),
            timeout: API_CONFIG.SETTINGS.timeout
        });
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('MySportsFeeds API Error:', error);
        throw error;
    }
};

/**
 * Check if we should use real API or fallback to mock data
 * @returns {boolean} True if API key is configured
 */
const isAPIConfigured = () => {
    return API_CONFIG.MYSPORTSFEEDS.API_KEY && 
           API_CONFIG.MYSPORTSFEEDS.API_KEY !== 'YOUR_API_KEY_HERE' &&
           API_CONFIG.MYSPORTSFEEDS.API_KEY !== 'YOUR_MYSPORTSFEEDS_API_KEY_HERE';
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
        // Try to use real API if configured
        if (isAPIConfigured()) {
            try {
                const data = await fetchFromMySportsFeeds('standings', league);
                
                // Transform MySportsFeeds data to our format
                const standings = data.standings.map((standing, index) => {
                    const team = standing.team;
                    const stats = standing.stats;
                    
                    return {
                        id: team.id,
                        name: team.abbreviation || team.city,
                        wins: stats.wins || 0,
                        losses: stats.losses || 0,
                        winPct: parseFloat((stats.wins / (stats.wins + stats.losses)).toFixed(3)) || 0,
                        streak: stats.streak || 'N/A',
                        points: stats.pointsFor || getRandomInt(80, 120),
                        gamesPlayed: stats.gamesPlayed || (stats.wins + stats.losses)
                    };
                });
                
                return {
                    success: true,
                    data: standings,
                    league: league.toUpperCase(),
                    source: 'MySportsFeeds',
                    timestamp: new Date().toISOString()
                };
            } catch (apiError) {
                console.warn('Real API failed, falling back to mock data:', apiError.message);
            }
        }
        
        // Fallback to mock data
        await simulateNetworkDelay();
        
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
            source: 'Mock Data',
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
        // Try to use real API if configured
        if (isAPIConfigured()) {
            try {
                const data = await fetchFromMySportsFeeds('games', league);
                
                // Transform MySportsFeeds data to our format
                const games = data.games.slice(0, 6).map((game, index) => {
                    const schedule = game.schedule;
                    const score = game.score;
                    
                    return {
                        id: schedule.id,
                        homeTeam: schedule.homeTeam.abbreviation || schedule.homeTeam.city,
                        awayTeam: schedule.awayTeam.abbreviation || schedule.awayTeam.city,
                        homeScore: score?.homeScoreTotal || 0,
                        awayScore: score?.awayScoreTotal || 0,
                        date: schedule.startTime,
                        status: schedule.playedStatus === 'COMPLETED' ? 'final' : 'scheduled',
                        winner: score?.homeScoreTotal > score?.awayScoreTotal ? 
                                schedule.homeTeam.abbreviation : schedule.awayTeam.abbreviation
                    };
                });
                
                return {
                    success: true,
                    data: games,
                    league: league.toUpperCase(),
                    source: 'MySportsFeeds',
                    timestamp: new Date().toISOString()
                };
            } catch (apiError) {
                console.warn('Real API failed for games, falling back to mock data:', apiError.message);
            }
        }
        
        // Fallback to mock data
        await simulateNetworkDelay();
        
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
            source: 'Mock Data',
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
