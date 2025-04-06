class ExerciseCard {
    constructor() {
        this.container = document.getElementById('exercise-cards-container');
        this.exercises = this.getExercises();
        this.render();
    }
    
    getExercises() {
        return [
            {
                id: 1,
                name: 'Running',
                type: 'cardio',
                calories: '300-600/hr',
                difficulty: 'Medium',
                image: 'running.jpg',
                video: 'running.mp4',
                instructions: [
                    'Maintain good posture with head up and back straight',
                    'Land mid-foot, not on your heel',
                    'Keep elbows bent at 90 degrees',
                    'Breathe rhythmically'
                ],
                muscles: ['Quadriceps', 'Hamstrings', 'Calves', 'Core']
            },
            // ... other exercises with similar details
        ];
    }
    
    render() {
        this.container.innerHTML = this.exercises.map(exercise => `
            <div class="exercise-card" data-id="${exercise.id}">
                <div class="exercise-media">
                    <div class="exercise-image" style="background-image: url('assets/images/${exercise.image}')"></div>
                    <video class="exercise-video" loop muted playsinline>
                        <source src="assets/videos/${exercise.video}" type="video/mp4">
                    </video>
                    <button class="play-button">▶</button>
                </div>
                <div class="exercise-content">
                    <h3>${exercise.name}</h3>
                    <p class="exercise-type">${this.capitalizeFirstLetter(exercise.type)}</p>
                    
                    <div class="exercise-details">
                        ${exercise.calories ? `<p><strong>Calories:</strong> ${exercise.calories}</p>` : ''}
                        
                        <div class="muscle-groups">
                            <strong>Muscles Worked:</strong>
                            <div class="muscle-tags">
                                ${exercise.muscles.map(m => `<span class="muscle-tag">${m}</span>`).join('')}
                            </div>
                        </div>
                        
                        <p><strong>Difficulty:</strong> 
                            <span class="difficulty ${exercise.difficulty.toLowerCase()}">
                                ${exercise.difficulty}
                            </span>
                        </p>
                    </div>
                    
                    <div class="exercise-instructions">
                        <h4>Instructions:</h4>
                        <ol>
                            ${exercise.instructions.map(i => `<li>${i}</li>`).join('')}
                        </ol>
                    </div>
                    
                    <div class="exercise-actions">
                        <button class="btn-secondary add-to-workout">
                            Add to Workout
                        </button>
                        <button class="btn-icon share-exercise" title="Share">
                            <svg><!-- Share icon SVG --></svg>
                        </button>
                        <button class="btn-icon favorite-exercise" title="Favorite">
                            <svg><!-- Heart icon SVG --></svg>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Video play/pause
        document.querySelectorAll('.play-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const card = e.target.closest('.exercise-card');
                const video = card.querySelector('.exercise-video');
                const image = card.querySelector('.exercise-image');
                const playButton = card.querySelector('.play-button');
                
                if (video.paused) {
                    video.play();
                    image.style.opacity = '0';
                    playButton.textContent = '❚❚';
                } else {
                    video.pause();
                    image.style.opacity = '1';
                    playButton.textContent = '▶';
                }
            });
        });
        
        // Hover effect for video
        document.querySelectorAll('.exercise-media').forEach(media => {
            media.addEventListener('mouseenter', (e) => {
                const video = e.currentTarget.querySelector('.exercise-video');
                video.currentTime = 0;
                if (!video.paused) return;
                video.play();
                e.currentTarget.querySelector('.exercise-image').style.opacity = '0';
                e.currentTarget.querySelector('.play-button').textContent = '❚❚';
            });
            
            media.addEventListener('mouseleave', (e) => {
                const video = e.currentTarget.querySelector('.exercise-video');
                if (!video.paused) {
                    video.pause();
                    e.currentTarget.querySelector('.exercise-image').style.opacity = '1';
                    e.currentTarget.querySelector('.play-button').textContent = '▶';
                }
            });
        });
        
        // Add other event listeners...
    }
    
    // ... rest of the class implementation
}