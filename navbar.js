class Navbar {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.render();
    }
    
    updateAuthState(isAuthenticated, email = '') {
        const userSection = this.navbar.querySelector('.user-profile');
        if (userSection) {
            if (isAuthenticated) {
                userSection.innerHTML = `
                    <span class="username">Welcome, ${email.split('@')[0]}</span>
                    <div class="avatar">${email.charAt(0).toUpperCase()}</div>
                    <button id="sign-out" class="btn-auth">Sign Out</button>
                `;
                document.getElementById('sign-out').addEventListener('click', () => {
                    window.firebaseAuth.signOut();
                });
            } else {
                userSection.innerHTML = `
                    <button id="sign-in" class="btn-auth">Sign In</button>
                    <button id="sign-up" class="btn-auth">Sign Up</button>
                `;
                document.getElementById('sign-in').addEventListener('click', () => {
                    window.location.href = 'auth.html?mode=signin';
                });
                document.getElementById('sign-up').addEventListener('click', () => {
                    window.location.href = 'auth.html?mode=signup';
                });
            }
        }
    }
    
    render() {
        this.navbar.innerHTML = `
            <div class="logo">
                <h1>FitForYou</h1>
            </div>
            <div class="nav-links">
                <a href="index.html" class="nav-link">Dashboard</a>
                <a href="workouts.html" class="nav-link">Workouts</a>
                <a href="progress.html" class="nav-link">Progress</a>
                <a href="exercises.html" class="nav-link">Exercises</a>
            </div>
            <div class="user-profile">
                <!-- Auth state will be updated dynamically -->
            </div>
        `;
        
        // Highlight current page link
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        this.navbar.querySelectorAll('.nav-link').forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });
    }
}