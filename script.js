// Event Tracking System for Personal Website
(function() {
    // Store the current date and user info for tracking
    const currentUser = 'DivyG007';
    
    // Function to get formatted timestamp in UTC
    function getFormattedTimestamp() {
        const now = new Date();
        
        // Format: YYYY-MM-DD HH:MM:SS
        const year = now.getUTCFullYear();
        const month = String(now.getUTCMonth() + 1).padStart(2, '0');
        const day = String(now.getUTCDate()).padStart(2, '0');
        const hours = String(now.getUTCHours()).padStart(2, '0');
        const minutes = String(now.getUTCMinutes()).padStart(2, '0');
        const seconds = String(now.getUTCSeconds()).padStart(2, '0');
        
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
    
    // Function to determine the type of element that was clicked
    function getElementType(element) {
        if (!element) return 'unknown';
        
        // Check for common element types
        if (element.tagName === 'A') return 'link';
        if (element.tagName === 'BUTTON') return 'button';
        if (element.tagName === 'IMG') return 'image';
        if (element.tagName === 'INPUT') {
            if (element.type === 'submit' || element.type === 'button') return 'button';
            if (element.type === 'checkbox') return 'checkbox';
            if (element.type === 'radio') return 'radio button';
            if (element.type === 'text' || element.type === 'email' || element.type === 'password') return 'text input';
            return `input-${element.type}`;
        }
        if (element.tagName === 'SELECT') return 'dropdown';
        if (element.tagName === 'TEXTAREA') return 'text area';
        
        // Check for header elements
        if (['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(element.tagName)) return 'heading';
        
        // Check for list items
        if (element.tagName === 'LI') return 'list item';
        
        // Check if the element has specific classes that might identify its purpose
        if (element.classList.contains('nav-link')) return 'navigation link';
        if (element.classList.contains('btn')) return 'button';
        if (element.classList.contains('profile-image')) return 'profile image';
        if (element.classList.contains('gallery-item')) return 'gallery item';
        if (element.classList.contains('skill-category')) return 'skill category';
        if (element.classList.contains('social-link')) return 'social media link';
        
        // If we can't determine a specific type, use the tag name
        return element.tagName.toLowerCase();
    }
    
    // Record page view when the page loads
    function recordPageView() {
        const timestamp = getFormattedTimestamp();
        console.log(`${timestamp}, view, page load`);
    }
    
    // Record click events
    function recordClickEvent(event) {
        const timestamp = getFormattedTimestamp();
        const elementType = getElementType(event.target);
        
        // If possible, get more specific info about the element (like text or src)
        let elementInfo = elementType;
        
        // Add details for certain element types
        if (event.target.textContent && elementType !== 'button' && 
            !['image', 'input-text', 'input-email', 'input-password'].includes(elementType)) {
            // Trim and limit length of text content
            const textContent = event.target.textContent.trim();
            if (textContent.length > 0) {
                const shortText = textContent.length > 20 
                    ? textContent.substring(0, 20) + '...' 
                    : textContent;
                elementInfo += ` "${shortText}"`;
            }
        }
        
        // For images, add the alt text or filename
        if (elementType === 'image') {
            if (event.target.alt) {
                elementInfo += ` (${event.target.alt})`;
            } else if (event.target.src) {
                // Extract filename from src
                const srcParts = event.target.src.split('/');
                const filename = srcParts[srcParts.length - 1];
                elementInfo += ` (${filename})`;
            }
        }
        
        console.log(`${timestamp}, click, ${elementInfo}`);
    }
    
    // Track tab/window visibility changes (additional page view tracking)
    function handleVisibilityChange() {
        if (document.visibilityState === 'visible') {
            const timestamp = getFormattedTimestamp();
            console.log(`${timestamp}, view, tab focus`);
        }
    }
    
    // Initialize event tracking
    function initEventTracking() {
        // Record initial page load
        window.addEventListener('load', recordPageView);
        
        // Track all clicks on the document
        document.addEventListener('click', recordClickEvent);
        
        // Track when the user returns to this tab/window
        document.addEventListener('visibilitychange', handleVisibilityChange);
        
        // Track navigation between pages
        window.addEventListener('beforeunload', function() {
            const timestamp = getFormattedTimestamp();
            console.log(`${timestamp}, view, page exit`);
        });
        
        // Log initialization (for debugging)
        console.log(`Event tracking initialized for user: ${currentUser}`);
    }
    
    // Start tracking when the DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initEventTracking);
    } else {
        initEventTracking();
    }
})();