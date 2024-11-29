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

        // Contact Button
    const contactBtn = document.querySelector('.btn-sci .btn:nth-child(2)'); // Gets the Contact Me button
    contactBtn?.addEventListener('click', () => {
        // Find the contact section index (assuming it's the last nav link)
        const contactIndex = navLinks.length - 1;
        
        if (!navLinks[contactIndex].classList.contains('active')) {
            activePage();
            navLinks[contactIndex].classList.add('active');

            setTimeout(() => {
                sections[contactIndex]?.classList.add('active');
            }, 1100);
        }
    });

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

 
// Add this function to handle form submission
async function handleContactFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    
    // Disable the submit button and show loading state
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    const formData = {
        name: form.querySelector('[name="name"]').value,
        email: form.querySelector('[name="email"]').value,
        phone: form.querySelector('[name="phone"]').value,
        subject: form.querySelector('[name="subject"]').value,
        message: form.querySelector('[name="message"]').value
    };

    // Debug log
    console.log('Sending form data:', formData);

    try {
        console.log('Making fetch request to:', 'https://portfolio-contact-form-bdzb.onrender.com/send-email');
        
        const response = await fetch('https://portfolio-contact-form-bdzb.onrender.com/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        console.log('Response status:', response.status);
        const result = await response.json();
        console.log('Response data:', result);
        
        if (response.ok) {
            alert('Message sent successfully!');
            form.reset();
        } else {
            throw new Error(result.error || 'Failed to send message');
        }
    } catch (error) {
        console.error('Error details:', error);
        alert('Error sending message: ' + error.message);
    } finally {
        // Re-enable the submit button and restore original text
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
    }
}

// Add this event listener to your contact form
document.querySelector('#contact form').addEventListener('submit', handleContactFormSubmit);