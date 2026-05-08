// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Review carousel scroll function
let currentReviewScroll = 0;
function scrollReviews(direction) {
    const carousel = document.querySelector('.reviews-carousel');
    const scrollAmount = 320; // Width of one review card + gap
    currentReviewScroll += direction * scrollAmount;
    
    // Prevent scrolling too far
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    currentReviewScroll = Math.max(0, Math.min(currentReviewScroll, maxScroll));
    
    carousel.scrollTo({
        left: currentReviewScroll,
        behavior: 'smooth'
    });
}

// Form submission handler
function handleSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const name = form.elements[0].value;
    const email = form.elements[1].value;
    const phone = form.elements[2].value;
    const message = form.elements[3].value;
    
    // Simple validation
    if (!name || !email || !phone || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    // Show success message
    alert(`Thank you, ${name}! We've received your message. We'll contact you at ${email} or ${phone} soon.`);
    
    // Reset form
    form.reset();
}

// Scroll animation for elements on page load
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe service cards and portfolio items
document.querySelectorAll('.service-card, .portfolio-item, .review-card').forEach(el => {
    observer.observe(el);
});

// Add CSS animation dynamically if not already in stylesheet
const style = document.createElement('style');
style.textContent = `
    .service-card, .portfolio-item, .review-card {
        opacity: 0;
    }
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Mobile menu toggle (if needed in future)
function toggleMobileMenu() {
    const menu = document.querySelector('.nav-menu');
    menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
}

// Highlight active navigation link based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add active link styling
const activeStyle = document.createElement('style');
activeStyle.textContent = `
    .nav-menu a.active {
        color: var(--primary-color);
        border-bottom: 2px solid var(--primary-color);
        padding-bottom: 5px;
    }
`;
document.head.appendChild(activeStyle);

console.log('XYZ Construction website loaded successfully!');
