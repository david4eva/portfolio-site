// Cache DOM elements to avoid repeated queries
const introLeftCol = document.querySelector('.intro-left-col');
const introRightCol = document.querySelector('.intro-right-col');
const aboutLeftCol = document.querySelector('.about-section-left-col');
const aboutRightCol = document.querySelector('.about-section-right-col');
const certLeftCol = document.querySelector('.cert-left-col');
const certRightCol = document.querySelector('.cert-right-col');
const skillsColContent = document.querySelector('.skills-col-content');
const skillsColImg = document.querySelector('.skills-col-img');

// Handle media query change for 900px
function handleMediaChange900px(e) {
    const isMobile = e.matches;

    // Intro Section changes
    introLeftCol.classList.toggle('col-6', !isMobile);
    introLeftCol.classList.toggle('col-12', isMobile);
    introRightCol.classList.toggle('col-6', !isMobile);
    introRightCol.classList.toggle('text-end', !isMobile);
    introRightCol.classList.toggle('col-12', isMobile);

    // Cert Section changes
    certLeftCol.classList.toggle('col-6', !isMobile);
    certLeftCol.classList.toggle('col-12', isMobile);
    certRightCol.classList.toggle('col-6', !isMobile);
    certRightCol.classList.toggle('col-12', isMobile);
    skillsColContent.classList.toggle('col-6', !isMobile);
    skillsColContent.classList.toggle('col-12', isMobile);
    skillsColImg.classList.toggle('col-6', !isMobile);
    skillsColImg.classList.toggle('text-end', !isMobile);
    skillsColImg.classList.toggle('col-12', isMobile);

    // About Section changes
    aboutLeftCol.classList.toggle('col-6', !isMobile);
    aboutRightCol.classList.toggle('col-6', !isMobile);
    aboutLeftCol.classList.toggle('col-12', isMobile);
    aboutRightCol.classList.toggle('col-12', isMobile);
}

// Set up media query and add event listeners
const mQuery_900px = window.matchMedia('(max-width: 900px)');
mQuery_900px.addEventListener('change', handleMediaChange900px);
handleMediaChange900px(mQuery_900px); // Initial check

// Toggling the navbar menu visibility
document.getElementById('menuToggler').addEventListener('click', function () {
    const menu = document.getElementById('navbarMenu');
    menu.classList.toggle('show');
});

// Dynamically set the current year in the footer copyright
const thisYear = new Date().getFullYear().toString();
const copyrightYear = document.getElementById('copyright-year');
if (copyrightYear) copyrightYear.innerText = thisYear;
