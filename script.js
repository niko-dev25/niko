document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Switcher ---
    const themeToggleButton = document.getElementById('theme-toggle');
    const moonIcon = themeToggleButton.querySelector('.moon');

    // Function to set theme
    const applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        if (theme === 'dark') {
            themeToggleButton.classList.remove('day');
            moonIcon.classList.remove('sun');
            themeToggleButton.setAttribute('title', 'Switch to light mode');
        } else {
            themeToggleButton.classList.add('day');
            moonIcon.classList.add('sun');
            themeToggleButton.setAttribute('title', 'Switch to dark mode');
        }
        localStorage.setItem('theme', theme);
    };

    // Check for saved theme in localStorage or user's system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme ? savedTheme : (prefersDark ? 'dark' : 'light');
    
    applyTheme(initialTheme);
    
    // Add event listener to the toggle button
    themeToggleButton.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    });
    
    // --- Scroll Animations ---
    const fadeElems = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null, // observes intersections relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once it's visible
            }
        });
    }, observerOptions);

    fadeElems.forEach(elem => {
        observer.observe(elem);
    });
});