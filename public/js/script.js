"use strict";
const screenWidth = window.innerWidth;
var Main;
(function (Main) {
    Main.initMain = () => {
        /* Scrolling Header Background */
        const headerElement = document.querySelector('header');
        const toggleHeaderBkgd = () => {
            window.addEventListener('scroll', () => {
                if (screenWidth >= 768) {
                    if (window.scrollY >= 30)
                        headerElement?.classList.add('js-header-bkgd');
                    else
                        headerElement?.classList.remove('js-header-bkgd');
                }
            });
        };
        if (screenWidth >= 768)
            toggleHeaderBkgd(); // Initial state
        window.addEventListener('resize', toggleHeaderBkgd);
        /* Responsive Nav */
        const burgerBtnElement = document.querySelector('.burger-btn');
        const navElement = document.querySelector('nav');
        const anchorTags = navElement?.querySelectorAll('a');
        let showMenu = false;
        const toggleMenu = () => {
            if (!showMenu) {
                navElement?.classList.add('js-burger-nav');
                showNav();
                showMenu = true;
            }
            else {
                navElement?.classList.remove('js-burger-nav');
                hideNav();
                showMenu = false;
            }
        };
        const hideNav = () => {
            anchorTags.forEach((anchor) => {
                anchor.style.display = 'none';
            });
        };
        const showNav = () => {
            anchorTags.forEach((anchor) => {
                anchor.style.display = 'flex';
            });
        };
        if (screenWidth <= 767)
            hideNav(); // Initial state   
        burgerBtnElement.addEventListener('click', (e) => {
            // Stops `resize` event listener when burger button is clicked 
            e.stopPropagation();
            toggleMenu();
        });
        document.body.addEventListener('click', () => {
            if (showMenu)
                toggleMenu();
        });
        window.addEventListener('resize', () => {
            if (screenWidth >= 768) {
                navElement?.classList.remove('js-burger-nav');
                showNav();
                showMenu = false;
            }
        });
        /* Nav Jump Links */
        document.querySelector('.js-about')?.addEventListener('click', (e) => {
            // Removes HTML anchor tag effect 
            e.preventDefault();
            window.scrollTo({ top: 0 });
        });
        document.querySelector('.js-projects')?.addEventListener('click', (e) => {
            // Recalculating for each event listened for responsiveness 
            const screenWidth = window.innerWidth;
            e.preventDefault();
            if (screenWidth <= 414)
                window.scrollTo(0, 675);
            else if (415 <= screenWidth && screenWidth <= 595)
                window.scrollTo(0, 725);
            else if (596 <= screenWidth && screenWidth <= 767)
                window.scrollTo(0, 875);
            else if (768 <= screenWidth && screenWidth <= 1023)
                window.scrollTo(0, 1000);
            else if (1024 <= screenWidth && screenWidth <= 1439)
                window.scrollTo(0, 1150);
            else if (screenWidth >= 1440)
                window.scrollTo(0, 1300);
        });
        document.querySelector('.js-contact')?.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: document.body.scrollHeight });
        });
        /* Footer Date Auto-Update */
        const yearElement = document.querySelector('.js-current-year');
        const currentYear = new Date().getFullYear();
        yearElement.innerText = currentYear.toString();
    };
})(Main || (Main = {}));
var About;
(function (About) {
    About.initAbout = () => {
        /* Accordion and Dropdown Behaviour */
        const accordionSections = document.querySelectorAll('.js-accordion');
        const dropdownSections = document.querySelectorAll('.js-dropdown');
        const toggleSection = (section, sections, classToToggle) => {
            // Closes other sections (if open)
            sections.forEach((otherSection) => {
                if (otherSection !== section) {
                    otherSection.classList.remove(classToToggle);
                    const chevronIcon = otherSection.querySelector('.js-chevron');
                    if (chevronIcon) {
                        chevronIcon.classList.remove('fa-chevron-down');
                        chevronIcon.classList.add('fa-chevron-right');
                    }
                }
            });
            // Toggles current section
            section.classList.toggle(classToToggle);
            const chevronIcon = section.querySelector('.js-chevron');
            if (chevronIcon) {
                chevronIcon.classList.toggle('fa-chevron-right');
                chevronIcon.classList.toggle('fa-chevron-down');
            }
        };
        accordionSections.forEach((section) => {
            section.addEventListener('click', () => {
                toggleSection(section, accordionSections, 'js-open-accordion');
            });
        });
        dropdownSections.forEach((section) => {
            section.addEventListener('click', () => {
                toggleSection(section, dropdownSections, 'js-open-dropdown');
            });
        });
    };
})(About || (About = {}));
var Projects;
(function (Projects) {
    Projects.initProjects = () => {
        const carouselElements = [
            '#carouselExampleCaptions1',
            '#carouselExampleCaptions2',
            '#carouselExampleCaptions3',
            '#carouselExampleCaptions4',
            '#carouselExampleCaptions5'
        ];
        const initCarousel = (carouselElement) => {
            const carousel = document.querySelector(carouselElement);
            const carouselInnerElement = carousel?.querySelector('.js-carousel-inner');
            const h5Elements = carousel?.querySelectorAll('.js-h5');
            const pElements = carousel?.querySelectorAll('.js-p');
            let activeSlide = 0;
            carouselInnerElement.style.overflow = 'visible'; // Initial state
            // `slide.bs.carousel` fires immediately after `slide` instance is invoked (Bootstrap 5)
            carousel?.addEventListener('slide.bs.carousel', () => {
                const carouselEvent = event;
                if (carouselEvent) {
                    if (carouselEvent.direction === 'right')
                        activeSlide = carouselEvent.from;
                    else if (carouselEvent.direction === 'left')
                        activeSlide = carouselEvent.to;
                }
                if (activeSlide === 0)
                    activeSlide = 4; // Edge case 
                const activeH5 = h5Elements[activeSlide];
                const activeP = pElements[activeSlide];
                carouselInnerElement.style.overflow = 'hidden';
                activeH5.style.visibility = 'hidden';
                activeP.style.visibility = 'hidden';
                // `slid.bs.carousel` fires when slide transition is completed (Bootstrap 5)
                carousel?.addEventListener('slid.bs.carousel', () => {
                    if (screenWidth >= 1024) {
                        carouselInnerElement.style.overflow = 'visible';
                        activeH5.style.visibility = 'visible';
                        activeP.style.visibility = 'visible';
                    }
                });
            });
        };
        carouselElements.forEach((carouselElement) => {
            initCarousel(carouselElement);
        });
    };
})(Projects || (Projects = {}));
document.addEventListener('DOMContentLoaded', () => {
    Main.initMain();
    About.initAbout();
    Projects.initProjects();
});
//# sourceMappingURL=script.js.map