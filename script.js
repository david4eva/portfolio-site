/**
 * Portfolio page interactions
 * Handles responsive behavior and UI interactions
 */
(function () {
    'use strict';

    // Constants
    const BREAKPOINTS = {
        MOBILE: 900
    };

    const SELECTORS = {
        introLeftCol: '.intro-left-col',
        introRightCol: '.intro-right-col',
        aboutLeftCol: '.about-section-left-col',
        aboutRightCol: '.about-section-right-col',
        certLeftCol: '.cert-left-col',
        certRightCol: '.cert-right-col',
        skillsColContent: '.skills-col-content',
        skillsColImg: '.skills-col-img',
        menuToggler: '#menuToggler',
        navbarMenu: '#navbarMenu',
        copyrightYear: '#copyright-year'
    };

    // State
    let mediaQueryList = null;

    /**
     * Safely query and cache DOM elements
     * @returns {Object} Cached DOM elements
     */
    function cacheDOMElements() {
        const elements = {};
        
        Object.entries(SELECTORS).forEach(([key, selector]) => {
            const element = document.querySelector(selector);
            if (element) {
                elements[key] = element;
            } else {
                console.warn(`Element not found: ${selector}`);
            }
        });

        return elements;
    }

    /**
     * Toggle responsive classes for a column
     * @param {HTMLElement} element - The element to toggle classes on
     * @param {boolean} isMobile - Whether mobile layout should be applied
     * @param {boolean} hasTextEnd - Whether element has text-end class
     */
    function toggleColumnClasses(element, isMobile, hasTextEnd = false) {
        if (!element) return;

        // Batch DOM updates
        element.classList.toggle('col-6', !isMobile);
        element.classList.toggle('col-12', isMobile);
        
        if (hasTextEnd) {
            element.classList.toggle('text-end', !isMobile);
        }
    }

    /**
     * Handle responsive layout changes
     * @param {MediaQueryListEvent|MediaQueryList} e - Media query event
     */
    function handleResponsiveLayout(e) {
        const isMobile = e.matches;
        const elements = window.portfolioElements;

        if (!elements) return;

        // Use requestAnimationFrame to batch DOM changes
        requestAnimationFrame(() => {
            // Intro Section
            toggleColumnClasses(elements.introLeftCol, isMobile);
            toggleColumnClasses(elements.introRightCol, isMobile, true);

            // About Section
            toggleColumnClasses(elements.aboutLeftCol, isMobile);
            toggleColumnClasses(elements.aboutRightCol, isMobile);

            // Certifications Section
            toggleColumnClasses(elements.certLeftCol, isMobile);
            toggleColumnClasses(elements.certRightCol, isMobile);

            // Skills Section
            toggleColumnClasses(elements.skillsColContent, isMobile);
            toggleColumnClasses(elements.skillsColImg, isMobile, true);
        });
    }

    /**
     * Initialize mobile menu toggle
     */
    function initMobileMenu() {
        const menuToggler = document.querySelector(SELECTORS.menuToggler);
        const navbarMenu = document.querySelector(SELECTORS.navbarMenu);

        if (!menuToggler || !navbarMenu) {
            console.warn('Mobile menu elements not found');
            return;
        }

        menuToggler.addEventListener('click', () => {
            const isExpanded = navbarMenu.classList.toggle('show');
            
            // Update ARIA for accessibility
            menuToggler.setAttribute('aria-expanded', isExpanded);
            
            // Trap focus if menu is open
            if (isExpanded) {
                navbarMenu.focus();
            }
        });

        // Close menu on outside click
        document.addEventListener('click', (e) => {
            if (!menuToggler.contains(e.target) && !navbarMenu.contains(e.target)) {
                navbarMenu.classList.remove('show');
                menuToggler.setAttribute('aria-expanded', 'false');
            }
        });

        // Close menu on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navbarMenu.classList.contains('show')) {
                navbarMenu.classList.remove('show');
                menuToggler.setAttribute('aria-expanded', 'false');
                menuToggler.focus();
            }
        });
    }

    /**
     * Initialize responsive layout handler
     */
    function initResponsiveLayout() {
        mediaQueryList = window.matchMedia(`(max-width: ${BREAKPOINTS.MOBILE}px)`);
        
        // Modern API (with fallback for older browsers)
        if (mediaQueryList.addEventListener) {
            mediaQueryList.addEventListener('change', handleResponsiveLayout);
        } else {
            // Fallback for older browsers
            mediaQueryList.addListener(handleResponsiveLayout);
        }

        // Initial check
        handleResponsiveLayout(mediaQueryList);
    }

    /**
     * Set copyright year
     */
    function initCopyright() {
        const copyrightElement = document.querySelector(SELECTORS.copyrightYear);
        
        if (copyrightElement) {
            const currentYear = new Date().getFullYear();
            copyrightElement.textContent = currentYear;
        }
    }

    /**
     * Cleanup function (useful for SPAs)
     */
    function cleanup() {
        if (mediaQueryList) {
            if (mediaQueryList.removeEventListener) {
                mediaQueryList.removeEventListener('change', handleResponsiveLayout);
            } else {
                mediaQueryList.removeListener(handleResponsiveLayout);
            }
        }
    }

    /**
     * Initialize all portfolio interactions
     */
    function init() {
        try {
            // Cache elements globally (for access in other functions)
            window.portfolioElements = cacheDOMElements();

            // Initialize features
            initResponsiveLayout();
            initMobileMenu();
            initCopyright();

            // Store cleanup function for potential later use
            window.portfolioCleanup = cleanup;

        } catch (error) {
            console.error('Error initializing p
