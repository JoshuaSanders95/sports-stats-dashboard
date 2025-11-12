/**
 * Main application file
 * Coordinates all modules and handles user interactions
 * Demonstrates event handling, state management, and async operations
 */

import { fetchAllData, searchData } from './api.js';
import { showLoading, hideLoading, showError, hideError, updateUI, showNotification } from './ui.js';
import { debounce, filterBySearch } from './utils.js';

// Application state
const state = {
    currentLeague: 'nba',
    allData: null,
    isLoading: false,
    autoRefreshInterval: null
};

/**
 * Load data for current league
 */
const loadData = async () => {
    if (state.isLoading) return;
    
    state.isLoading = true;
    showLoading();
    hideError();
    
    try {
        const data = await fetchAllData(state.currentLeague);
        state.allData = data;
        updateUI(data);
        hideLoading();
        
        console.log('Data loaded successfully:', data);
        
    } catch (error) {
        hideLoading();
        showError(`Failed to load data: ${error.message}`);
        console.error('Error loading data:', error);
    } finally {
        state.isLoading = false;
    }
};

/**
 * Handle league selection change
 * @param {Event} event - Change event
 */
const handleLeagueChange = async (event) => {
    const newLeague = event.target.value;
    
    if (newLeague === state.currentLeague) return;
    
    state.currentLeague = newLeague;
    showNotification(`Switching to ${newLeague.toUpperCase()}...`, 'info');
    
    await loadData();
};

/**
 * Handle search input
 * @param {Event} event - Input event
 */
const handleSearch = async (event) => {
    const query = event.target.value.trim();
    
    if (!query || !state.allData) {
        // If empty, restore original data
        if (state.allData) {
            updateUI(state.allData);
        }
        return;
    }
    
    try {
        // Filter local data
        const { standings, games } = state.allData;
        
        const filteredStandings = filterBySearch(
            standings, 
            query, 
            ['name']
        );
        
        const filteredGames = filterBySearch(
            games, 
            query, 
            ['homeTeam', 'awayTeam']
        );
        
        updateUI({
            stats: state.allData.stats,
            standings: filteredStandings,
            games: filteredGames
        });
        
        if (filteredStandings.length === 0 && filteredGames.length === 0) {
            showNotification('No results found', 'error');
        }
        
    } catch (error) {
        console.error('Search error:', error);
        showNotification('Search failed', 'error');
    }
};

/**
 * Handle refresh button click
 */
const handleRefresh = async () => {
    showNotification('Refreshing data...', 'info');
    await loadData();
    showNotification('Data refreshed successfully!', 'success');
};

/**
 * Handle retry button click
 */
const handleRetry = async () => {
    hideError();
    await loadData();
};

/**
 * Setup auto-refresh
 * @param {number} intervalMs - Interval in milliseconds
 */
const setupAutoRefresh = (intervalMs = 60000) => {
    // Clear existing interval
    if (state.autoRefreshInterval) {
        clearInterval(state.autoRefreshInterval);
    }
    
    // Setup new interval
    state.autoRefreshInterval = setInterval(async () => {
        console.log('Auto-refreshing data...');
        await loadData();
    }, intervalMs);
};

/**
 * Setup event listeners
 */
const setupEventListeners = () => {
    // League selection
    const leagueSelect = document.getElementById('league-select');
    if (leagueSelect) {
        leagueSelect.addEventListener('change', handleLeagueChange);
    }
    
    // Sport selection
    const sportSelect = document.getElementById('sport-select');
    if (sportSelect) {
        sportSelect.addEventListener('change', async (e) => {
            showNotification(`Sport changed to ${e.target.value}`, 'info');
        });
    }
    
    // Search input with debounce
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        const debouncedSearch = debounce(handleSearch, 300);
        searchInput.addEventListener('input', debouncedSearch);
    }
    
    // Search button
    const searchBtn = document.getElementById('search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            const searchInput = document.getElementById('search-input');
            if (searchInput) {
                handleSearch({ target: searchInput });
            }
        });
    }
    
    // Refresh button
    const refreshBtn = document.getElementById('refresh-btn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', handleRefresh);
    }
    
    // Retry button
    const retryBtn = document.getElementById('retry-btn');
    if (retryBtn) {
        retryBtn.addEventListener('click', handleRetry);
    }
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + R to refresh
        if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
            e.preventDefault();
            handleRefresh();
        }
        
        // Ctrl/Cmd + F to focus search
        if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
            e.preventDefault();
            const searchInput = document.getElementById('search-input');
            if (searchInput) searchInput.focus();
        }
    });
};

/**
 * Initialize application
 */
const init = async () => {
    console.log('Initializing Sports Stats Dashboard...');
    
    // Setup event listeners
    setupEventListeners();
    
    // Load initial data
    await loadData();
    
    // Setup auto-refresh (every 60 seconds)
    setupAutoRefresh(60000);
    
    console.log('Application initialized successfully!');
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (state.autoRefreshInterval) {
        clearInterval(state.autoRefreshInterval);
    }
});

// Export for testing or external use
export default {
    loadData,
    handleLeagueChange,
    handleSearch,
    handleRefresh,
    state
};
