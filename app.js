class FitnessApp {
    constructor() {
        this.initComponents();
        this.setupServiceWorker();
    }
    
    initComponents() {
        // Components are initialized automatically via their individual files
        // We just need to ensure they're loaded in the correct order
    }
    
    setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js').then(registration => {
                    console.log('ServiceWorker registration successful');
                }).catch(err => {
                    console.log('ServiceWorker registration failed: ', err);
                });
            });
        }
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    window.fitnessApp = new FitnessApp();
});