class WorkoutForm {
    constructor() {
        this.formContainer = document.getElementById('workout-form');
        this.workouts = [];
        this.render();
        this.setupEventListeners();
    }
    
    render() {
        this.formContainer.innerHTML = `
            <h2>Add New Workout</h2>
            <form id="workout-form-input">
                <div class="form-group">
                    <label for="workout-type">Workout Type</label>
                    <select id="workout-type" required>
                        <option value="">Select workout type</option>
                        <option value="cardio">Cardio</option>
                        <option value="strength">Strength Training</option>
                        <option value="flexibility">Flexibility</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="exercise-name">Exercise Name</label>
                    <input type="text" id="exercise-name" placeholder="e.g., Running, Bench Press" required>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="duration">Duration (min)</label>
                        <input type="number" id="duration" placeholder="30">
                    </div>
                    <div class="form-group">
                        <label for="sets">Sets</label>
                        <input type="number" id="sets" placeholder="3">
                    </div>
                    <div class="form-group">
                        <label for="reps">Reps</label>
                        <input type="number" id="reps" placeholder="10">
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="notes">Notes</label>
                    <textarea id="notes" placeholder="Any additional notes..."></textarea>
                </div>
                
                <button type="submit" class="btn-primary">Add Workout</button>
            </form>
        `;
    }
    
    setupEventListeners() {
        document.getElementById('workout-form-input').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addWorkout();
        });
    }
    
    addWorkout() {
        const workout = {
            type: document.getElementById('workout-type').value,
            name: document.getElementById('exercise-name').value,
            duration: document.getElementById('duration').value,
            sets: document.getElementById('sets').value,
            reps: document.getElementById('reps').value,
            notes: document.getElementById('notes').value,
            date: new Date().toISOString()
        };
        
        this.workouts.push(workout);
        this.saveWorkouts();
        this.resetForm();
        
        // Update workout list
        if (window.workoutList) {
            window.workoutList.updateWorkouts(this.workouts);
        }
        
        // Update progress chart
        if (window.progressChart) {
            window.progressChart.updateChart(this.workouts);
        }
    }
    
    saveWorkouts() {
        localStorage.setItem('fitnessWorkouts', JSON.stringify(this.workouts));
    }
    
    resetForm() {
        document.getElementById('workout-form-input').reset();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.workoutForm = new WorkoutForm();
});