class ExerciseCard {
    constructor() {
        this.container = document.getElementById('exercise-cards-container');
        this.exercises = [
            {
                id: 1,
                name: 'Running',
                type: 'cardio',
                calories: '300-600/hr',
                difficulty: 'Medium',
                image: 'running.jpg'
            },
            {
                id: 2,
                name: 'Bench Press',
                type: 'strength',
                muscles: 'Chest, Triceps',
                difficulty: 'Hard',
                image: 'bench-press.jpg'
            },
            {
                id: 3,
                name: 'Yoga',
                type: 'flexibility',
                benefits: 'Flexibility, Balance',
                difficulty: 'Easy',
                image: 'yoga.jpg'
            },
            {
                id: 4,
                name: 'Squats',
                type: 'strength',
                muscles: 'Legs, Glutes',
                difficulty: 'Medium',
                image: 'squats.jpg'
            }
        ];
        
        this.render();
    }
    
    render() {
        this.container.innerHTML = this.exercises.map(exercise => `
            <div class="exercise-card">
                <div class="exercise-image" style="background-image: url('assets/images/${exercise.image}')"></div>
                <div class="exercise-content">
                    <h3>${exercise.name}</h3>
                    <p class="exercise-type">${this.capitalizeFirstLetter(exercise.type)}</p>
                    
                    ${exercise.calories ? `<p><strong>Calories:</strong> ${exercise.calories}</p>` : ''}
                    ${exercise.muscles ? `<p><strong>Muscles:</strong> ${exercise.muscles}</p>` : ''}
                    ${exercise.benefits ? `<p><strong>Benefits:</strong> ${exercise.benefits}</p>` : ''}
                    
                    <p><strong>Difficulty:</strong> 
                        <span class="difficulty ${exercise.difficulty.toLowerCase()}">
                            ${exercise.difficulty}
                        </span>
                    </p>
                    
                    <button class="btn-secondary add-to-workout" data-id="${exercise.id}">
                        Add to Workout
                    </button>
                </div>
            </div>
        `).join('');
        
        this.setupEventListeners();
    }
    
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    setupEventListeners() {
        document.querySelectorAll('.add-to-workout').forEach(button => {
            button.addEventListener('click', (e) => {
                const exerciseId = parseInt(e.target.getAttribute('data-id'));
                this.addToWorkoutForm(exerciseId);
            });
        });
    }
    
    addToWorkoutForm(exerciseId) {
        const exercise = this.exercises.find(ex => ex.id === exerciseId);
        if (!exercise) return;
        
        const form = document.getElementById('workout-form-input');
        if (!form) return;
        
        document.getElementById('workout-type').value = exercise.type;
        document.getElementById('exercise-name').value = exercise.name;
        
        // Scroll to form
        document.getElementById('workout-form-section').scrollIntoView({
            behavior: 'smooth'
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.exerciseCard = new ExerciseCard();
});