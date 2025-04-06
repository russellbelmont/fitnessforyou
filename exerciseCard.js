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
                muscles: ['Quadriceps', 'Hamstrings', 'Calves', 'Core'],
                equipment: ['Running shoes']
            },
            {
                id: 2,
                name: 'Bench Press',
                type: 'strength',
                muscles: ['Chest', 'Triceps', 'Shoulders'],
                difficulty: 'Hard',
                image: 'bench-press.jpg',
                video: 'bench-press.mp4',
                instructions: [
                    'Lie flat on bench with feet on floor',
                    'Grip bar slightly wider than shoulder-width',
                    'Lower bar to chest with control',
                    'Press bar upward until arms are extended'
                ],
                equipment: ['Barbell', 'Bench', 'Spotter']
            },
            {
                id: 3,
                name: 'Yoga',
                type: 'flexibility',
                benefits: ['Flexibility', 'Balance', 'Stress relief'],
                difficulty: 'Easy',
                image: 'yoga.jpg',
                video: 'yoga.mp4',
                instructions: [
                    'Start in a comfortable seated position',
                    'Focus on deep, controlled breathing',
                    'Move slowly between poses',
                    'Listen to your body and don\'t force positions'
                ],
                equipment: ['Yoga mat']
            },
            {
                id: 4,
                name: 'Squats',
                type: 'strength',
                muscles: ['Quadriceps', 'Hamstrings', 'Glutes'],
                difficulty: 'Medium',
                image: 'squats.jpg',
                video: 'squats.mp4',
                instructions: [
                    'Stand with feet shoulder-width apart',
                    'Lower hips back and down as if sitting in a chair',
                    'Keep chest up and knees behind toes',
                    'Drive through heels to return to standing'
                ],
                equipment: ['Bodyweight', 'Dumbbells (optional)']
            }
        ];
    }
    
    render() {
        this.container.innerHTML = this.exercises.map(exercise => `
            <div class="exercise-card" data-id="${exercise.id}">
                <div class="exercise-media">
                    <div class="exercise-image" style="background-image: url('assets/images/${exercise.image}')"></div>
                    <video class="exercise-video" loop muted playsinline>
                        <source src="assets/videos/${exercise.video}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                    <button class="play-button">▶</button>
                </div>
                
                <div class="exercise-content">
                    <div class="exercise-header">
                        <h3>${exercise.name}</h3>
                        <span class="exercise-type ${exercise.type}">${this.capitalizeFirstLetter(exercise.type)}</span>
                    </div>
                    
                    <div class="exercise-details">
                        <div class="detail-row">
                            ${exercise.calories ? `
                            <div class="detail-item">
                                <svg class="icon" viewBox="0 0 24 24">
                                    <path d="M12,21C15.5,17.4 19,14.7 19,10C19,6 15.9,3 12,3C8.1,3 5,6 5,10C5,14.7 8.5,17.4 12,21Z" />
                                </svg>
                                <span>${exercise.calories}</span>
                            </div>
                            ` : ''}
                            
                            <div class="detail-item">
                                <svg class="icon" viewBox="0 0 24 24">
                                    <path d="M12,3C7,3 3,7 3,12C3,17 7,21 12,21C17,21 21,17 21,12C21,7 17,3 12,3Z" />
                                </svg>
                                <span class="difficulty ${exercise.difficulty.toLowerCase()}">
                                    ${exercise.difficulty}
                                </span>
                            </div>
                        </div>
                        
                        ${exercise.muscles ? `
                        <div class="muscle-groups">
                            <h4>Muscles Worked</h4>
                            <div class="muscle-tags">
                                ${exercise.muscles.map(m => `<span class="muscle-tag">${m}</span>`).join('')}
                            </div>
                        </div>
                        ` : ''}
                        
                        ${exercise.equipment ? `
                        <div class="equipment">
                            <h4>Equipment</h4>
                            <div class="equipment-tags">
                                ${exercise.equipment.map(e => `<span class="equipment-tag">${e}</span>`).join('')}
                            </div>
                        </div>
                        ` : ''}
                    </div>
                    
                    <div class="exercise-instructions">
                        <h4>Instructions</h4>
                        <ol>
                            ${exercise.instructions.map(i => `<li>${i}</li>`).join('')}
                        </ol>
                    </div>
                    
                    <div class="exercise-actions">
                        <button class="btn-primary add-to-workout">
                            <svg class="icon" viewBox="0 0 24 24">
                                <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                            </svg>
                            Add to Workout
                        </button>
                        <button class="btn-icon share-exercise" title="Share">
                            <svg class="icon" viewBox="0 0 24 24">
                                <path d="M18,16.08C17.24,16.08 16.56,16.38 16.04,16.85L8.91,12.7C8.96,12.47 9,12.24 9,12C9,11.76 8.96,11.53 8.91,11.3L15.96,7.19C16.5,7.69 17.21,8 18,8A3,3 0 0,0 21,5A3,3 0 0,0 18,2A3,3 0 0,0 15,5C15,5.24 15.04,5.47 15.09,5.7L8.04,9.81C7.5,9.31 6.79,9 6,9A3,3 0 0,0 3,12A3,3 0 0,0 6,15C6.79,15 7.5,14.69 8.04,14.19L15.16,18.34C15.11,18.55 15.08,18.77 15.08,19C15.08,20.61 16.39,21.91 18,21.91C19.61,21.91 20.92,20.61 20.92,19A2.92,2.92 0 0,0 18,16.08Z" />
                            </svg>
                        </button>
                        <button class="btn-icon favorite-exercise" title="Favorite">
                            <svg class="icon" viewBox="0 0 24 24">
                                <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
        
        this.setupEventListeners();
    }
    
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    setupEventListeners() {
        // Video play/pause toggle
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
        
        // Hover effect for video preview
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
        
        // Add to workout button
        document.querySelectorAll('.add-to-workout').forEach(button => {
            button.addEventListener('click', (e) => {
                const card = e.target.closest('.exercise-card');
                const exerciseId = parseInt(card.getAttribute('data-id'));
                this.addToWorkoutForm(exerciseId);
            });
        });
        
        // Share exercise
        document.querySelectorAll('.share-exercise').forEach(button => {
            button.addEventListener('click', (e) => {
                const card = e.target.closest('.exercise-card');
                const exerciseId = parseInt(card.getAttribute('data-id'));
                this.shareExercise(exerciseId);
            });
        });
        
        // Favorite exercise
        document.querySelectorAll('.favorite-exercise').forEach(button => {
            button.addEventListener('click', (e) => {
                const card = e.target.closest('.exercise-card');
                const exerciseId = parseInt(card.getAttribute('data-id'));
                this.toggleFavorite(exerciseId, e.currentTarget);
            });
        });
    }
    
    addToWorkoutForm(exerciseId) {
        const exercise = this.exercises.find(ex => ex.id === exerciseId);
        if (!exercise) return;
        
        // Set form values
        document.getElementById('workout-type').value = exercise.type;
        document.getElementById('exercise-name').value = exercise.name;
        
        // Set default duration based on exercise type
        if (exercise.type === 'cardio') {
            document.getElementById('duration').value = '30';
        } else if (exercise.type === 'strength') {
            document.getElementById('sets').value = '3';
            document.getElementById('reps').value = '10';
        }
        
        // Scroll to form
        document.getElementById('workout-form-section').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Show success message
        this.showToast(`${exercise.name} added to workout form!`);
    }
    
    shareExercise(exerciseId) {
        const exercise = this.exercises.find(ex => ex.id === exerciseId);
        if (!exercise) return;
        
        if (navigator.share) {
            // Use Web Share API if available
            navigator.share({
                title: `Check out this exercise: ${exercise.name}`,
                text: `I found this great ${exercise.type} exercise on FitForYou!`,
                url: `${window.location.origin}/exercises.html#${exercise.id}`
            }).catch(err => {
                console.log('Error sharing:', err);
                this.showShareFallback(exercise);
            });
        } else {
            // Fallback for browsers without Web Share API
            this.showShareFallback(exercise);
        }
    }
    
    showShareFallback(exercise) {
        const shareModal = document.createElement('div');
        shareModal.className = 'share-modal';
        shareModal.innerHTML = `
            <div class="share-modal-content">
                <h3>Share "${exercise.name}"</h3>
                <div class="share-options">
                    <button class="share-option" data-method="copy">
                        <svg viewBox="0 0 24 24">
                            <path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" />
                        </svg>
                        Copy Link
                    </button>
                    <a class="share-option" href="https://twitter.com/intent/tweet?text=Check out ${encodeURIComponent(exercise.name)} on FitForYou!&url=${encodeURIComponent(window.location.origin + '/exercises.html#' + exercise.id)}" target="_blank">
                        <svg viewBox="0 0 24 24">
                            <path d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z" />
                        </svg>
                        Twitter
                    </a>
                    <a class="share-option" href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin + '/exercises.html#' + exercise.id)}" target="_blank">
                        <svg viewBox="0 0 24 24">
                            <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
                        </svg>
                        Facebook
                    </a>
                    <a class="share-option" href="mailto:?subject=Check out this exercise&body=I found this great exercise on FitForYou: ${exercise.name} - ${window.location.origin + '/exercises.html#' + exercise.id}">
                        <svg viewBox="0 0 24 24">
                            <path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6M20 6L12 11L4 6H20M20 18H4V8L12 13L20 8V18Z" />
                        </svg>
                        Email
                    </a>
                </div>
                <button class="btn-secondary close-share-modal">Close</button>
            </div>
        `;
        
        document.body.appendChild(shareModal);
        
        // Copy link functionality
        shareModal.querySelector('[data-method="copy"]').addEventListener('click', () => {
            navigator.clipboard.writeText(`${window.location.origin}/exercises.html#${exercise.id}`);
            this.showToast('Link copied to clipboard!');
        });
        
        // Close modal
        shareModal.querySelector('.close-share-modal').addEventListener('click', () => {
            document.body.removeChild(shareModal);
        });
        
        // Click outside to close
        shareModal.addEventListener('click', (e) => {
            if (e.target === shareModal) {
                document.body.removeChild(shareModal);
            }
        });
    }
    
    toggleFavorite(exerciseId, button) {
        const favorites = JSON.parse(localStorage.getItem('favoriteExercises')) || [];
        const index = favorites.indexOf(exerciseId);
        
        if (index === -1) {
            favorites.push(exerciseId);
            button.classList.add('favorited');
            this.showToast('Added to favorites!');
        } else {
            favorites.splice(index, 1);
            button.classList.remove('favorited');
            this.showToast('Removed from favorites');
        }
        
        localStorage.setItem('favoriteExercises', JSON.stringify(favorites));
    }
    
    showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.exerciseCard = new ExerciseCard();
});