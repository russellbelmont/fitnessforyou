class ProgressChart {
    constructor() {
        this.container = document.getElementById('progress-chart');
        this.workouts = JSON.parse(localStorage.getItem('fitnessWorkouts')) || [];
        this.chart = null;
        this.render();
    }
    
    render() {
        this.container.innerHTML = `
            <div class="chart-header">
                <h2>Workout Progress</h2>
                <select id="chart-time-range">
                    <option value="week">Last 7 Days</option>
                    <option value="month">Last 30 Days</option>
                    <option value="all">All Time</option>
                </select>
            </div>
            <canvas id="workout-chart"></canvas>
        `;
        
        this.initChart();
        this.setupEventListeners();
    }
    
    initChart() {
        const ctx = document.getElementById('workout-chart').getContext('2d');
        const data = this.prepareChartData();
        
        this.chart = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Workout Duration (min)'
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
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.raw} min`;
                            }
                        }
                    }
                }
            }
        });
    }
    
    prepareChartData() {
        // Group workouts by date and type
        const workoutData = {};
        
        this.workouts.forEach(workout => {
            const date = new Date(workout.date).toLocaleDateString();
            if (!workoutData[date]) {
                workoutData[date] = {
                    cardio: 0,
                    strength: 0,
                    flexibility: 0
                };
            }
            
            const duration = parseInt(workout.duration) || 0;
            workoutData[date][workout.type] += duration;
        });
        
        const dates = Object.keys(workoutData).sort();
        const cardioData = dates.map(date => workoutData[date].cardio);
        const strengthData = dates.map(date => workoutData[date].strength);
        const flexibilityData = dates.map(date => workoutData[date].flexibility);
        
        return {
            labels: dates,
            datasets: [
                {
                    label: 'Cardio',
                    data: cardioData,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Strength',
                    data: strengthData,
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Flexibility',
                    data: flexibilityData,
                    backgroundColor: 'rgba(153, 102, 255, 0.6)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1
                }
            ]
        };
    }
    
    updateChart(workouts) {
        this.workouts = workouts;
        if (this.chart) {
            const newData = this.prepareChartData();
            this.chart.data = newData;
            this.chart.update();
        } else {
            this.initChart();
        }
    }
    
    setupEventListeners() {
        document.getElementById('chart-time-range').addEventListener('change', (e) => {
            // Implement filtering by time range
            // This would require storing the original workouts and filtering them
            console.log('Time range changed:', e.target.value);
            // You would update the chart with filtered data here
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.progressChart = new ProgressChart();
});