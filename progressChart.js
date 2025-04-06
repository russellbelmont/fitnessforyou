class ProgressChart {
    constructor() {
        this.container = document.getElementById('progress-chart');
        this.workouts = this.getWorkouts();
        this.chart = null;
        this.secondaryChart = null;
        this.render();
    }
    
    getWorkouts() {
        // Get workouts from Firebase or localStorage
        const workouts = JSON.parse(localStorage.getItem('fitnessWorkouts')) || [];
        return workouts.filter(w => {
            const workoutDate = new Date(w.date);
            const range = document.getElementById('chart-time-range')?.value || 'month';
            const now = new Date();
            
            switch(range) {
                case 'week':
                    return workoutDate > new Date(now.setDate(now.getDate() - 7));
                case 'month':
                    return workoutDate > new Date(now.setMonth(now.getMonth() - 1));
                default:
                    return true;
            }
        });
    }
    
    render() {
        this.container.innerHTML = `
            <div class="chart-header">
                <h2>Advanced Workout Analytics</h2>
                <select id="chart-time-range" class="chart-control">
                    <option value="week">Last 7 Days</option>
                    <option value="month" selected>Last 30 Days</option>
                    <option value="all">All Time</option>
                </select>
                <select id="chart-metric" class="chart-control">
                    <option value="duration">Duration</option>
                    <option value="calories">Calories</option>
                    <option value="intensity">Intensity</option>
                </select>
            </div>
            
            <div class="chart-row">
                <div class="chart-container">
                    <h3>Workout Distribution</h3>
                    <canvas id="workout-chart"></canvas>
                </div>
                <div class="chart-container">
                    <h3>Performance Trend</h3>
                    <canvas id="trend-chart"></canvas>
                </div>
            </div>
            
            <div class="stats-grid">
                <div class="stat-card">
                    <h4>Total Workouts</h4>
                    <p class="stat-value" id="total-workouts">0</p>
                </div>
                <div class="stat-card">
                    <h4>Avg. Duration</h4>
                    <p class="stat-value" id="avg-duration">0 min</p>
                </div>
                <div class="stat-card">
                    <h4>Calories Burned</h4>
                    <p class="stat-value" id="total-calories">0 kcal</p>
                </div>
                <div class="stat-card">
                    <h4>Favorite Workout</h4>
                    <p class="stat-value" id="favorite-workout">-</p>
                </div>
            </div>
        `;
        
        this.initCharts();
        this.updateStats();
        this.setupEventListeners();
    }
    
    initCharts() {
        // Main chart (distribution)
        const ctx = document.getElementById('workout-chart').getContext('2d');
        this.chart = new Chart(ctx, {
            type: 'doughnut',
            data: this.prepareDistributionData(),
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'right',
                    }
                }
            }
        });
        
        // Secondary chart (trend)
        const trendCtx = document.getElementById('trend-chart').getContext('2d');
        this.secondaryChart = new Chart(trendCtx, {
            type: 'line',
            data: this.prepareTrendData(),
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
    
    prepareDistributionData() {
        const types = ['cardio', 'strength', 'flexibility'];
        const counts = types.map(type => 
            this.workouts.filter(w => w.type === type).length
        );
        
        return {
            labels: types.map(t => t.charAt(0).toUpperCase() + t.slice(1)),
            datasets: [{
                data: counts,
                backgroundColor: [
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(153, 102, 255, 0.7)'
                ],
                borderWidth: 1
            }]
        };
    }
    
    prepareTrendData() {
        // Group by week
        const weeklyData = {};
        this.workouts.forEach(workout => {
            const date = new Date(workout.date);
            const week = `${date.getFullYear()}-W${Math.floor(date.getDate() / 7)}`;
            
            if (!weeklyData[week]) {
                weeklyData[week] = {
                    duration: 0,
                    count: 0
                };
            }
            
            weeklyData[week].duration += parseInt(workout.duration) || 0;
            weeklyData[week].count++;
        });
        
        const weeks = Object.keys(weeklyData).sort();
        const avgDuration = weeks.map(week => 
            weeklyData[week].duration / weeklyData[week].count
        );
        
        return {
            labels: weeks,
            datasets: [{
                label: 'Average Duration (min)',
                data: avgDuration,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: true
            }]
        };
    }
    
    updateStats() {
        // Total workouts
        document.getElementById('total-workouts').textContent = this.workouts.length;
        
        // Average duration
        const totalDuration = this.workouts.reduce((sum, w) => sum + (parseInt(w.duration) || 0), 0);
        const avgDuration = this.workouts.length ? Math.round(totalDuration / this.workouts.length) : 0;
        document.getElementById('avg-duration').textContent = `${avgDuration} min`;
        
        // Estimate calories (very rough estimate)
        const totalCalories = this.workouts.reduce((sum, w) => {
            let calories = 0;
            if (w.type === 'cardio') calories = (parseInt(w.duration) || 0) * 10;
            else if (w.type === 'strength') calories = (parseInt(w.duration) || 0) * 5;
            else calories = (parseInt(w.duration) || 0) * 3;
            return sum + calories;
        }, 0);
        document.getElementById('total-calories').textContent = `${totalCalories} kcal`;
        
        // Favorite workout
        const workoutCounts = {};
        this.workouts.forEach(w => {
            workoutCounts[w.name] = (workoutCounts[w.name] || 0) + 1;
        });
        const favorite = Object.entries(workoutCounts).sort((a, b) => b[1] - a[1])[0];
        document.getElementById('favorite-workout').textContent = favorite ? favorite[0] : '-';
    }
    
    updateCharts() {
        this.workouts = this.getWorkouts();
        
        if (this.chart) {
            this.chart.data = this.prepareDistributionData();
            this.chart.update();
        }
        
        if (this.secondaryChart) {
            this.secondaryChart.data = this.prepareTrendData();
            this.secondaryChart.update();
        }
        
        this.updateStats();
    }
    
    setupEventListeners() {
        document.getElementById('chart-time-range').addEventListener('change', () => {
            this.updateCharts();
        });
        
        document.getElementById('chart-metric').addEventListener('change', () => {
            // Implement switching between different metrics
            console.log("Metric changed");
            // This would require tracking additional workout data
        });
    }
}