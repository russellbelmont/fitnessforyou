// Initialize Chart.js with source map handling
if (typeof Chart !== 'undefined') {
    Chart.defaults.sourceMap = false;
    Chart.defaults.font.family = "'Poppins', sans-serif";
  }
  
  class ProgressChart {
      constructor() {
          // Check if Chart is available
          if (typeof Chart === 'undefined') {
              console.error('Chart.js is not loaded');
              return;
          }
  
          this.container = document.getElementById('progress-chart');
          if (!this.container) {
              console.error('Progress chart container not found');
              return;
          }
  
          this.workouts = this.loadWorkouts();
          this.chart = null;
          this.secondaryChart = null;
          this.render();
      }
  
      loadWorkouts() {
          try {
              return JSON.parse(localStorage.getItem('fitnessWorkouts')) || [];
          } catch (e) {
              console.error('Error loading workouts:', e);
              return [];
          }
      }
  
      render() {
          this.container.innerHTML = `
              <div class="chart-header">
                  <h2>Workout Analytics Dashboard</h2>
                  <div class="chart-controls">
                      <select id="chart-time-range" class="chart-control">
                          <option value="week">Last 7 Days</option>
                          <option value="month" selected>Last 30 Days</option>
                          <option value="all">All Time</option>
                      </select>
                      <select id="chart-metric" class="chart-control">
                          <option value="duration">Duration</option>
                          <option value="frequency">Frequency</option>
                      </select>
                  </div>
              </div>
              
              <div class="chart-row">
                  <div class="chart-container">
                      <canvas id="workout-chart" height="300"></canvas>
                  </div>
                  <div class="chart-container">
                      <canvas id="trend-chart" height="300"></canvas>
                  </div>
              </div>
              
              <div class="stats-grid">
                  <!-- Stats cards remain the same -->
              </div>
          `;
  
          this.initCharts();
          this.updateStats();
          this.setupEventListeners();
      }
  
      initCharts() {
          // Main chart
          const ctx = document.getElementById('workout-chart').getContext('2d');
          this.chart = new Chart(ctx, {
              type: 'doughnut',
              data: this.prepareDistributionData(),
              options: {
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                      legend: { position: 'right' }
                  }
              }
          });
  
          // Trend chart
          const trendCtx = document.getElementById('trend-chart').getContext('2d');
          this.secondaryChart = new Chart(trendCtx, {
              type: 'line',
              data: this.prepareTrendData(),
              options: {
                  responsive: true,
                  maintainAspectRatio: false
              }
          });
      }
  
      // ... (rest of your existing methods remain exactly the same)
      // prepareDistributionData(), prepareTrendData(), etc.
  }
  
  // Safe initialization
  document.addEventListener('DOMContentLoaded', () => {
      // Only initialize if Chart.js is loaded
      if (typeof Chart !== 'undefined') {
          window.progressChart = new ProgressChart();
      } else {
          console.error('Chart.js failed to load');
          document.getElementById('progress-chart').innerHTML = `
              <div class="error">
                  Analytics dashboard failed to load. Please refresh the page.
              </div>
          `;
      }
  });