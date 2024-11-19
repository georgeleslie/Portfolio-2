const navLinks = document.querySelectorAll('.header nav a');
const logoLink = document.querySelector('.logo');
const sections  = document.querySelectorAll('section');
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('header nav');

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
});

const activePage = () => {
    const header = document.querySelector('header');
    const barsBox = document.querySelector('.bars-box');

    header.classList.remove('active');
    setTimeout(() => {
        header.classList.add('active');
    }, 1100);

    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    barsBox.classList.remove('active');
    setTimeout(() => {
        barsBox.classList.add('active');
    }, 1100);

    sections.forEach(section => {
        section.classList.remove('active');

        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    });
    
}

navLinks.forEach((link, idx) => {
    link.addEventListener('click', () => {
        if (!link.classList.contains('active')) {
            activePage();

            link.classList.add('active');

            setTimeout(() => {
                sections[idx].classList.add('active');
            },1100);
        }
    });
});

logoLink.addEventListener('click', () => {
    if (!navLinks[0].classList.contains('active')) {
        activePage();

        navLinks[0].classList.add('active');

        setTimeout(() => {
            sections[0].classList.add('active');
        },1100);
    }
});

const arrowRight = document.querySelector('.portfolio-box .navigation .arrow-right');
const arrowLeft = document.querySelector('.portfolio-box .navigation .arrow-left');

let index = 0; // Starting index
const maxIndex = 5; // Set this to the last image index

const activePortfolio = () => {
    const imgSlide = document.querySelector('.portfolio-carousel .img-slide');
    const portfolioDetails = document.querySelectorAll('.portfolio-detail');
    
    // Correct usage of style.transform
    imgSlide.style.transform = `translateX(calc(${index * -100}% - ${index * 2}rem))`;

    portfolioDetails.forEach(detail => {
        detail.classList.remove('active');
    });
    portfolioDetails[index].classList.add('active');

    // Disable or enable navigation buttons based on index
    if (index === 0) {
        arrowLeft.classList.add('disabled'); // Disable left arrow
    } else {
        arrowLeft.classList.remove('disabled'); // Enable left arrow
    }

    if (index === maxIndex) {
        arrowRight.classList.add('disabled'); // Disable right arrow
    } else {
        arrowRight.classList.remove('disabled'); // Enable right arrow
    }
};

// Initialize the carousel with proper button states
activePortfolio();

arrowRight.addEventListener('click', () => {
    if (index < maxIndex) {
        index++; // Increment index if not at the last image
    }
    activePortfolio();
});

arrowLeft.addEventListener('click', () => {
    if (index > 0) {
        index--; // Decrement index if not at the first image
    }
    activePortfolio();
});
