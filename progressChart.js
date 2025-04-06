class ProgressChart {
    constructor() {
        this.container = document.getElementById('progress-chart');
        this.workouts = this.loadWorkouts();
        this.chart = null;
        this.secondaryChart = null;
        this.render();
    }

    loadWorkouts() {
        // Load from localStorage or initialize empty array
        return JSON.parse(localStorage.getItem('fitnessWorkouts')) || [];
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
                        <option value="intensity">Intensity</option>
                    </select>
                </div>
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
                    <p class="stat-change" id="workout-change"></p>
                </div>
                <div class="stat-card">
                    <h4>Avg. Duration</h4>
                    <p class="stat-value" id="avg-duration">0 min</p>
                    <p class="stat-change" id="duration-change"></p>
                </div>
                <div class="stat-card">
                    <h4>Calories Burned</h4>
                    <p class="stat-value" id="total-calories">0 kcal</p>
                    <p class="stat-change" id="calories-change"></p>
                </div>
                <div class="stat-card">
                    <h4>Consistency</h4>
                    <p class="stat-value" id="consistency">0%</p>
                    <p class="stat-change" id="consistency-change"></p>
                </div>
            </div>
        `;

        this.initCharts();
        this.updateStats();
        this.setupEventListeners();
    }

    initCharts() {
        // Destroy existing charts if they exist
        if (this.chart) this.chart.destroy();
        if (this.secondaryChart) this.secondaryChart.destroy();

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
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                const label = context.label || '';
                                const value = context.raw || 0;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = Math.round((value / total) * 100);
                                return `${label}: ${value} (${percentage}%)`;
                            }
                        }
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
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Duration (minutes)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Date'
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                return `${context.dataset.label}: ${context.raw} min`;
                            }
                        }
                    }
                }
            }
        });
    }

    prepareDistributionData() {
        const filteredWorkouts = this.getFilteredWorkouts();
        const types = ['cardio', 'strength', 'flexibility'];
        
        const counts = types.map(type => 
            filteredWorkouts.filter(w => w.type === type).length
        );

        const durations = types.map(type => 
            filteredWorkouts.filter(w => w.type === type)
                           .reduce((sum, w) => sum + (parseInt(w.duration) || 0), 0)
        );

        const metric = document.getElementById('chart-metric').value;
        const data = metric === 'frequency' ? counts : durations;

        return {
            labels: types.map(t => this.capitalizeFirstLetter(t)),
            datasets: [{
                data: data,
                backgroundColor: [
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(153, 102, 255, 0.7)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        };
    }

    prepareTrendData() {
        const filteredWorkouts = this.getFilteredWorkouts();
        const range = document.getElementById('chart-time-range').value;
        
        // Group by appropriate time period
        const groupedData = {};
        filteredWorkouts.forEach(workout => {
            const date = new Date(workout.date);
            let key;
            
            if (range === 'week') {
                key = date.toLocaleDateString();
            } else if (range === 'month') {
                key = `Week ${Math.floor(date.getDate() / 7) + 1}`;
            } else {
                key = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
            }
            
            if (!groupedData[key]) {
                groupedData[key] = {
                    duration: 0,
                    count: 0
                };
            }
            
            groupedData[key].duration += parseInt(workout.duration) || 0;
            groupedData[key].count++;
        });

        const labels = Object.keys(groupedData);
        const avgDuration = labels.map(label => 
            Math.round(groupedData[label].duration / groupedData[label].count)
        );

        return {
            labels: labels,
            datasets: [{
                label: 'Average Duration',
                data: avgDuration,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: true,
                tension: 0.4
            }]
        };
    }

    getFilteredWorkouts() {
        const range = document.getElementById('chart-time-range').value;
        const now = new Date();
        const comparisonDate = new Date();

        switch(range) {
            case 'week':
                comparisonDate.setDate(now.getDate() - 7);
                break;
            case 'month':
                comparisonDate.setMonth(now.getMonth() - 1);
                break;
            default:
                return this.workouts; // All time
        }

        return this.workouts.filter(w => {
            const workoutDate = new Date(w.date);
            return workoutDate >= comparisonDate;
        });
    }

    getComparisonData(range) {
        // Get data for previous period to compare trends
        const now = new Date();
        const endDate = new Date();
        const startDate = new Date();

        switch(range) {
            case 'week':
                startDate.setDate(now.getDate() - 14);
                endDate.setDate(now.getDate() - 7);
                break;
            case 'month':
                startDate.setMonth(now.getMonth() - 2);
                endDate.setMonth(now.getMonth() - 1);
                break;
            default:
                return null;
        }

        return this.workouts.filter(w => {
            const workoutDate = new Date(w.date);
            return workoutDate >= startDate && workoutDate < endDate;
        });
    }

    updateStats() {
        const filteredWorkouts = this.getFilteredWorkouts();
        const comparisonWorkouts = this.getComparisonData(
            document.getElementById('chart-time-range').value
        );

        // Total workouts
        const totalWorkouts = filteredWorkouts.length;
        document.getElementById('total-workouts').textContent = totalWorkouts;
        
        // Calculate comparison for total workouts
        if (comparisonWorkouts) {
            const comparisonTotal = comparisonWorkouts.length;
            const diff = totalWorkouts - comparisonTotal;
            const percentage = comparisonTotal > 0 ? 
                Math.round((diff / comparisonTotal) * 100) : 100;
            
            this.updateComparisonElement(
                'workout-change', 
                diff, 
                percentage,
                'workouts'
            );
        }

        // Average duration
        const totalDuration = filteredWorkouts.reduce(
            (sum, w) => sum + (parseInt(w.duration) || 0), 0
        );
        const avgDuration = totalWorkouts > 0 ? 
            Math.round(totalDuration / totalWorkouts) : 0;
        document.getElementById('avg-duration').textContent = `${avgDuration} min`;
        
        // Calculate comparison for duration
        if (comparisonWorkouts && comparisonWorkouts.length > 0) {
            const comparisonDuration = comparisonWorkouts.reduce(
                (sum, w) => sum + (parseInt(w.duration) || 0), 0
            );
            const comparisonAvg = Math.round(comparisonDuration / comparisonWorkouts.length);
            const diff = avgDuration - comparisonAvg;
            const percentage = comparisonAvg > 0 ? 
                Math.round((diff / comparisonAvg) * 100) : 100;
            
            this.updateComparisonElement(
                'duration-change', 
                diff, 
                percentage,
                'minutes'
            );
        }

        // Total calories (estimated)
        const totalCalories = filteredWorkouts.reduce((sum, w) => {
            let calories = 0;
            if (w.type === 'cardio') calories = (parseInt(w.duration) || 0) * 10;
            else if (w.type === 'strength') calories = (parseInt(w.duration) || 0) * 5;
            else calories = (parseInt(w.duration) || 0) * 3;
            return sum + calories;
        }, 0);
        document.getElementById('total-calories').textContent = `${totalCalories} kcal`;
        
        // Calculate comparison for calories
        if (comparisonWorkouts) {
            const comparisonCalories = comparisonWorkouts.reduce((sum, w) => {
                let calories = 0;
                if (w.type === 'cardio') calories = (parseInt(w.duration) || 0) * 10;
                else if (w.type === 'strength') calories = (parseInt(w.duration) || 0) * 5;
                else calories = (parseInt(w.duration) || 0) * 3;
                return sum + calories;
            }, 0);
            
            const diff = totalCalories - comparisonCalories;
            const percentage = comparisonCalories > 0 ? 
                Math.round((diff / comparisonCalories) * 100) : 100;
            
            this.updateComparisonElement(
                'calories-change', 
                diff, 
                percentage,
                'calories'
            );
        }

        // Consistency (workouts per week)
        const weeks = this.getWeekCount(filteredWorkouts);
        const workoutsPerWeek = weeks > 0 ? 
            Math.round((totalWorkouts / weeks) * 10) / 10 : 0;
        document.getElementById('consistency').textContent = `${workoutsPerWeek}/wk`;
        
        // Calculate comparison for consistency
        if (comparisonWorkouts) {
            const comparisonWeeks = this.getWeekCount(comparisonWorkouts);
            const comparisonRate = comparisonWeeks > 0 ? 
                Math.round((comparisonWorkouts.length / comparisonWeeks) * 10) / 10 : 0;
            const diff = workoutsPerWeek - comparisonRate;
            const percentage = comparisonRate > 0 ? 
                Math.round((diff / comparisonRate) * 100) : 100;
            
            this.updateComparisonElement(
                'consistency-change', 
                diff, 
                percentage,
                'per week'
            );
        }
    }

    getWeekCount(workouts) {
        if (workouts.length === 0) return 0;
        
        const dates = workouts.map(w => new Date(w.date).getTime());
        const minDate = new Date(Math.min(...dates));
        const maxDate = new Date(Math.max(...dates));
        
        return Math.ceil((maxDate - minDate) / (7 * 24 * 60 * 60 * 1000)) || 1;
    }

    updateComparisonElement(elementId, diff, percentage, unit) {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        if (diff === 0) {
            element.textContent = 'No change';
            element.className = 'stat-change neutral';
        } else {
            const absDiff = Math.abs(diff);
            const absPercentage = Math.abs(percentage);
            const isPositive = diff > 0;
            
            element.textContent = isPositive ?
                `↑ ${absDiff} ${unit} (${absPercentage}%)` :
                `↓ ${absDiff} ${unit} (${absPercentage}%)`;
            
            element.className = isPositive ? 
                'stat-change positive' : 'stat-change negative';
        }
    }

    updateCharts() {
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
            this.updateCharts();
        });
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Public method to update when new workouts are added
    updateWorkouts(workouts) {
        this.workouts = workouts;
        this.updateCharts();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.progressChart = new ProgressChart();
});