// Responsive scaling for the flipbook
(function() {
    'use strict';
    
    console.log('Responsive scale script loaded');
    
    // Function to calculate and apply responsive scaling
    function applyResponsiveScale() {
        const centeredContainer = document.querySelector('.centered-container');
        if (!centeredContainer) {
            console.error('Centered container not found');
            return;
        }
        
        // Get the actual width of the centered container
        const containerWidth = centeredContainer.getBoundingClientRect().width;
        
        // Reference width where scale should be 1.0 (no scaling)
        // This should be the width where the book looks perfect on desktop
        const referenceWidth = 1200; // Adjust this value based on your design
        
        // Calculate scale factor
        const scaleFactor = Math.max(0.3, Math.min(1, containerWidth / referenceWidth));
        
        // Apply transform scale to the entire centered container
        centeredContainer.style.transform = `scale(${scaleFactor})`;
        centeredContainer.style.transformOrigin = 'center center';
        
        console.log(`Container width: ${containerWidth}px, Scale factor: ${scaleFactor}`);
    }
    
    // Debounce function to limit resize calculations
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Initialize scaling when DOM is ready
    function initializeScaling() {
        // Wait a bit for flipbook to be fully initialized
        setTimeout(() => {
            applyResponsiveScale();
            
            // Set up resize listener with debouncing
            const debouncedResize = debounce(applyResponsiveScale, 250);
            window.addEventListener('resize', debouncedResize);
            
            console.log('Responsive scaling initialized');
        }, 100);
    }
    
    // Wait for DOM and flipbook to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeScaling);
    } else {
        initializeScaling();
    }
})();