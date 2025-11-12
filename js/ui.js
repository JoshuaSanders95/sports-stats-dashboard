/**
 * UI module for DOM manipulation and rendering
 * Demonstrates modern DOM APIs and dynamic content generation
 */

import { calculateWinPercentage, formatDate, sortByProperty } from './utils.js';

// Chart instances
let performanceChart = null;
let scoringChart = null;

/**
 * Show loading state
 */
export const showLoading = () => {
    const loading = document.getElementById('loading');
    const error = document.getElementById('error');
    const mainContent = document.querySelector('.main-content');
    
    if (loading) loading.classList.remove('hidden');
    if (error) error.classList.add('hidden');
    if (mainContent) mainContent.style.opacity = '0.5';
};

/**
 * Hide loading state
 */
export const hideLoading = () => {
    const loading = document.getElementById('loading');
    const mainContent = document.querySelector('.main-content');
    
    if (loading) loading.classList.add('hidden');
    if (mainContent) mainContent.style.opacity = '1';
};

/**
 * Show error message
 * @param {string} message - Error message to display
 */
export const showError = (message) => {
    const error = document.getElementById('error');
    const errorText = document.getElementById('error-text');
    const loading = document.getElementById('loading');
    
    if (errorText) errorText.textContent = message;
    if (error) error.classList.remove('hidden');
    if (loading) loading.classList.add('hidden');
};

/**
 * Hide error message
 */
export const hideError = () => {
    const error = document.getElementById('error');
    if (error) error.classList.add('hidden');
};

/**
 * Update dashboard statistics
 * @param {Object} stats - Statistics data
 */
export const updateDashboardStats = (stats) => {
    const { totalTeams, gamesToday, topScorer, avgScore } = stats;
    
    const totalTeamsEl = document.getElementById('total-teams');
    const gamesTodayEl = document.getElementById('games-today');
    const topScorerEl = document.getElementById('top-scorer');
    const avgScoreEl = document.getElementById('avg-score');
    
    if (totalTeamsEl) totalTeamsEl.textContent = totalTeams;
    if (gamesTodayEl) gamesTodayEl.textContent = gamesToday;
    if (topScorerEl) topScorerEl.textContent = topScorer;
    if (avgScoreEl) avgScoreEl.textContent = avgScore;
};

/**
 * Render team standings table
 * @param {Array} standings - Array of team data
 */
export const renderStandings = (standings) => {
    const tbody = document.getElementById('standings-body');
    if (!tbody) return;
    
    // Sort teams by win percentage
    const sortedStandings = sortByProperty(standings, 'winPct', false);
    
    // Clear existing rows
    tbody.innerHTML = '';
    
    // Create table rows
    sortedStandings.forEach((team, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${team.name}</td>
            <td>${team.wins}</td>
            <td>${team.losses}</td>
            <td>${team.winPct}</td>
            <td>${team.streak}</td>
        `;
        tbody.appendChild(row);
    });
};

/**
 * Render recent games
 * @param {Array} games - Array of game data
 */
export const renderGames = (games) => {
    const gamesList = document.getElementById('games-list');
    if (!gamesList) return;
    
    // Clear existing games
    gamesList.innerHTML = '';
    
    // Create game cards
    games.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card';
        
        const homeWinner = game.homeScore > game.awayScore ? 'winner' : '';
        const awayWinner = game.awayScore > game.homeScore ? 'winner' : '';
        
        gameCard.innerHTML = `
            <div class="game-header">
                <span>${formatDate(game.date)}</span>
                <span class="game-status">${game.status.toUpperCase()}</span>
            </div>
            <div class="game-teams">
                <div class="team">
                    <div class="team-name ${homeWinner}">${game.homeTeam}</div>
                    <div class="team-score ${homeWinner}">${game.homeScore}</div>
                </div>
                <div class="vs-divider">VS</div>
                <div class="team">
                    <div class="team-name ${awayWinner}">${game.awayTeam}</div>
                    <div class="team-score ${awayWinner}">${game.awayScore}</div>
                </div>
            </div>
        `;
        
        gamesList.appendChild(gameCard);
    });
};

/**
 * Create performance chart
 * @param {Array} standings - Team standings data
 */
export const createPerformanceChart = (standings) => {
    const ctx = document.getElementById('performance-chart');
    if (!ctx) return;
    
    // Destroy existing chart
    if (performanceChart) {
        performanceChart.destroy();
    }
    
    // Get top 6 teams
    const topTeams = sortByProperty(standings, 'winPct', false).slice(0, 6);
    
    performanceChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: topTeams.map(t => t.name),
            datasets: [{
                label: 'Wins',
                data: topTeams.map(t => t.wins),
                backgroundColor: 'rgba(37, 99, 235, 0.7)',
                borderColor: 'rgba(37, 99, 235, 1)',
                borderWidth: 2
            }, {
                label: 'Losses',
                data: topTeams.map(t => t.losses),
                backgroundColor: 'rgba(239, 68, 68, 0.7)',
                borderColor: 'rgba(239, 68, 68, 1)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
};

/**
 * Create scoring distribution chart
 * @param {Array} standings - Team standings data
 */
export const createScoringChart = (standings) => {
    const ctx = document.getElementById('scoring-chart');
    if (!ctx) return;
    
    // Destroy existing chart
    if (scoringChart) {
        scoringChart.destroy();
    }
    
    // Get top 6 teams
    const topTeams = sortByProperty(standings, 'points', false).slice(0, 6);
    
    scoringChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: topTeams.map(t => t.name),
            datasets: [{
                label: 'Total Points',
                data: topTeams.map(t => t.points),
                fill: true,
                backgroundColor: 'rgba(124, 58, 237, 0.2)',
                borderColor: 'rgba(124, 58, 237, 1)',
                borderWidth: 3,
                tension: 0.4,
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
};

/**
 * Update all UI components
 * @param {Object} data - All dashboard data
 */
export const updateUI = (data) => {
    const { stats, standings, games } = data;
    
    if (stats) updateDashboardStats(stats);
    if (standings) {
        renderStandings(standings);
        createPerformanceChart(standings);
        createScoringChart(standings);
    }
    if (games) renderGames(games);
};

/**
 * Show notification toast
 * @param {string} message - Message to display
 * @param {string} type - Notification type (success, error, info)
 */
export const showNotification = (message, type = 'info') => {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'error' ? '#ef4444' : type === 'success' ? '#10b981' : '#2563eb'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
};

export default {
    showLoading,
    hideLoading,
    showError,
    hideError,
    updateDashboardStats,
    renderStandings,
    renderGames,
    createPerformanceChart,
    createScoringChart,
    updateUI,
    showNotification
};
