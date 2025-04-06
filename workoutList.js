class WorkoutList {
    constructor() {
        this.container = document.getElementById('workout-list');
        this.workouts = JSON.parse(localStorage.getItem('fitnessWorkouts')) || [];
        this.render();
    }
    
    render() {
        this.container.innerHTML = `
            <div class="workout-list-header">
                <h2>Recent Workouts</h2>
                <button id="clear-workouts" class="btn-warning">Clear All</button>
            </div>
            <div id="workouts-container">
                ${this.workouts.length ? this.renderWorkouts() : '<p>No workouts recorded yet.</p>'}
            </div>
        `;
        
        this.setupEventListeners();
    }
    
    renderWorkouts() {
        return this.workouts.slice(0, 5).map(workout => `
            <div class="workout-item">
                <div class="workout-info">
                    <h3>${workout.name}</h3>
                    <p>${workout.type} • ${workout.date ? new Date(workout.date).toLocaleDateString() : ''}</p>
                </div>
                <div class="workout-stats">
                    ${workout.duration ? `<span>${workout.duration} min</span>` : ''}
                    ${workout.sets ? `<span>${workout.sets} sets</span>` : ''}
                    ${workout.reps ? `<span>${workout.reps} reps</span>` : ''}
                </div>
            </div>
        `).join('');
    }
    
    setupEventListeners() {
        document.getElementById('clear-workouts')?.addEventListener('click', () => {
            if (confirm('Are you sure you want to clear all workouts?')) {
                this.clearWorkouts();
            }
        });
    }
    
    updateWorkouts(workouts) {
        this.workouts = workouts;
        this.render();
    }
    
    clearWorkouts() {
        localStorage.removeItem('fitnessWorkouts');
        this.workouts = [];
        this.render();
        
        if (window.progressChart) {
            window.progressChart.updateChart([]);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.workoutList = new WorkoutList();
});