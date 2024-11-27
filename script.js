document.addEventListener('DOMContentLoaded', () => {
    // Navigation Links and Logo
    const navLinks = document.querySelectorAll('header nav a');
    const logoLink = document.querySelector('.logo');
    const barsBox = document.querySelector('.bars-box');
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('header nav'); // Added navbar

    // Resume Buttons
    const resumeBtns = document.querySelectorAll('.resume-btn');
    const resumeDetails = document.querySelectorAll('.resume-detail');

    // Portfolio Carousel
    const arrowRight = document.querySelector('.portfolio-box .navigation .arrow-right');
    const arrowLeft = document.querySelector('.portfolio-box .navigation .arrow-left');
    const imgSlide = document.querySelector('.portfolio-carousel .img-slide');
    const portfolioDetails = document.querySelectorAll('.portfolio-detail');
    let index = 0;
    const maxIndex = portfolioDetails.length - 1;

    // Sections
    const sections = document.querySelectorAll('section');

    // Function to activate navigation and reset sections
    const activePage = () => {
        navLinks.forEach(link => link.classList.remove('active'));
        sections.forEach(section => section.classList.remove('active'));
        barsBox?.classList.remove('active');
        setTimeout(() => barsBox?.classList.add('active'), 1100);

        // Reset menu icon and navbar state
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    };

    // Handle Menu Icon Click
    menuIcon.addEventListener('click', () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    });

    // Handle Navigation Link Clicks
    navLinks.forEach((link, idx) => {
        link.addEventListener('click', () => {
            if (!link.classList.contains('active')) {
                activePage();
                link.classList.add('active');

                // Activate the corresponding section after a delay
                setTimeout(() => {
                    sections[idx]?.classList.add('active');
                }, 1100);
            }
        });
    });

    // Handle Logo Link Click (activate the first section)
    logoLink?.addEventListener('click', () => {
        if (!navLinks[0].classList.contains('active')) {
            activePage();
            navLinks[0].classList.add('active');

            setTimeout(() => {
                sections[0]?.classList.add('active');
            }, 1100);
        }
    });

    // Handle Resume Button Clicks
    if (resumeBtns.length > 0 && resumeDetails.length > 0) {
        resumeBtns.forEach((btn, idx) => {
            btn.addEventListener('click', () => {
                resumeBtns.forEach(button => button.classList.remove('active'));
                btn.classList.add('active');

                resumeDetails.forEach(detail => detail.classList.remove('active'));
                resumeDetails[idx]?.classList.add('active');
            });
        });
    } else {
        console.error('Resume buttons or details are missing.');
    }

    // Function to Activate Portfolio Carousel
    const activePortfolio = () => {
        if (!imgSlide || portfolioDetails.length === 0) {
            console.error('Portfolio elements are missing.');
            return;
        }

        imgSlide.style.transform = `translateX(calc(${index * -100}%))`;

        portfolioDetails.forEach(detail => detail.classList.remove('active'));
        portfolioDetails[index]?.classList.add('active');

        arrowLeft?.classList.toggle('disabled', index === 0);
        arrowRight?.classList.toggle('disabled', index === maxIndex);
    };

    // Initialize Portfolio Carousel
    activePortfolio();

    // Handle Portfolio Carousel Arrow Clicks
    arrowRight?.addEventListener('click', () => {
        if (index < maxIndex) {
            index++;
            activePortfolio();
        }
    });

    arrowLeft?.addEventListener('click', () => {
        if (index > 0) {
            index--;
            activePortfolio();
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    var typingEffect = new Typed(".typedText", {
        strings: ["Designer", "Coder", "Developer"],
        loop: true,
        typeSpeed: 100,
        backSpeed: 80,
        backDelay: 2000,
    });
});

 
