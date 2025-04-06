class Navbar {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.render();
    }
    
    render() {
        this.navbar.innerHTML = `
            <div class="logo">
                <h1>FitForYou</h1>
            </div>
            <div class="nav-links">
                <a href="#" class="nav-link active">Dashboard</a>
                <a href="#" class="nav-link">Workouts</a>
                <a href="#" class="nav-link">Progress</a>
                <a href="#" class="nav-link">Profile</a>
            </div>
            <div class="user-profile">
                <span class="username">Welcome, User</span>
                <div class="avatar"></div>
            </div>
        `;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Navbar();
});