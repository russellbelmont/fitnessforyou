// Initialize Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Auth state observer
auth.onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        console.log("User signed in:", user.email);
        document.body.classList.add('authenticated');
        if (window.navbar) window.navbar.updateAuthState(true, user.email);
    } else {
        // User is signed out
        console.log("User signed out");
        document.body.classList.remove('authenticated');
        if (window.navbar) window.navbar.updateAuthState(false);
        // Show auth modal if not on auth pages
        if (!window.location.pathname.includes('auth.html')) {
            showAuthModal();
        }
    }
});

function showAuthModal() {
    // Implement a modal or redirect to auth page
    window.location.href = 'auth.html';
}

// Export auth functions
window.firebaseAuth = {
    signUp: (email, password) => auth.createUserWithEmailAndPassword(email, password),
    signIn: (email, password) => auth.signInWithEmailAndPassword(email, password),
    signOut: () => auth.signOut(),
    sendPasswordReset: (email) => auth.sendPasswordResetEmail(email),
    getCurrentUser: () => auth.currentUser
};