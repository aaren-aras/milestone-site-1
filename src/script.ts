document.addEventListener('DOMContentLoaded', () => {
  const screenWidth = window.innerWidth;

  /* Scrolling Header Background */
  const headerElement = document.querySelector('header');

  if (screenWidth >= 768) toggleHeaderBkgd(); // Initial state
  window.addEventListener('resize', toggleHeaderBkgd);
  
  function toggleHeaderBkgd() {
    window.addEventListener('scroll', () => {
      if (screenWidth >= 768) {
        if (window.scrollY >= 30) headerElement.classList.add('js-header-bkgd');
        else headerElement.classList.remove('js-header-bkgd');
      }
    });    
  } 

  /* Responsive Nav */ 
  const burgerBtnElement = document.querySelector('.burger-btn');
  const navElement = document.querySelector('nav');
  const anchorTags = navElement.querySelectorAll('a');
  let showMenu = false;

  if (screenWidth <= 767) hideNav(); // Initial state 

  burgerBtnElement.addEventListener('click', (e) => {
    // Stops `resize` event listener when burger button is clicked 
    e.stopPropagation();
    toggleMenu();
  });

  document.body.addEventListener('click', () => {
    if (showMenu) toggleMenu();
  });

  window.addEventListener('resize', () => {
      if (screenWidth >= 768) {
        navElement.classList.remove('js-open-nav');
        showMenu = false;
      }
  });

  function toggleMenu() {
    if (!showMenu) {
      navElement.classList.add('js-open-nav');
      showNav();
      showMenu = true;
    } 
    else {
      navElement.classList.remove('js-open-nav');
      hideNav();
      showMenu = false;
    }
  }

  function hideNav() {
    anchorTags.forEach((anchor) => {
      anchor.style.display = 'none';
    });
  }

  function showNav() {
    anchorTags.forEach((anchor) => {
      anchor.style.display = 'flex';
    });
  }

  /* Nav Jump Links */
  document.querySelector('.js-about').addEventListener('click', (e) => {
      // Removes HTML anchor tag effect 
      e.preventDefault();
      window.scrollTo({top: 0});
  });

  document.querySelector('.js-projects').addEventListener('click', (e) => {
      e.preventDefault();
      if (screenWidth <= 425) window.scrollTo(0, 1550);
      else if (426 <= screenWidth && screenWidth <= 767) window.scrollTo(0, 1650);
      else if (768 <= screenWidth && screenWidth <= 1023) window.scrollTo(0, 1750);
      else if (1024 <= screenWidth && screenWidth <= 1439) window.scrollTo(0, 1850);
      else if (screenWidth >= 1440) window.scrollTo(0, 1950);
  });

  document.querySelector('.js-contact').addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({top: document.body.scrollHeight});
  });

  /* Accordion and Dropdown Behaviour */
  const accordionSections = document.querySelectorAll('.js-accordion');
  const dropdownSections = document.querySelectorAll('.js-dropdown');

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

  function toggleSection(section, sections, classToToggle) { 
    // Closes other sections (if open)
    sections.forEach((otherSection) => {
      if (otherSection !== section) { 
        otherSection.classList.remove(classToToggle);
        const icon = otherSection.querySelector('i.fa-solid');
        if (icon) {
          icon.classList.remove('fa-chevron-down');
          icon.classList.add('fa-chevron-right');
        }
      }
    });

    // Toggles current section
    section.classList.toggle(classToToggle);
    const icon = section.querySelector('i.fa-solid');
    if (icon) {
      icon.classList.toggle('fa-chevron-right');
      icon.classList.toggle('fa-chevron-down');
    }
  }

  /* Footer Date Auto-Update */ 
  const yearElement = document.querySelector('.js-current-year') as HTMLElement;
  const currentYear = new Date().getFullYear(); 
  yearElement.innerText = currentYear.toString();
});
