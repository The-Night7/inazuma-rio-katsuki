// === DOM Elements ===
const navLinks = document.querySelector('.nav-links');
const burger = document.querySelector('.burger');
const navLinksItems = document.querySelectorAll('.nav-links li');
const thumbnails = document.querySelectorAll('.thumbnail');
const mainCharacterImg = document.getElementById('main-character-img');
const header = document.querySelector('header');

// === Navigation Menu Toggle ===
burger.addEventListener('click', () => {
    // Toggle Nav
    navLinks.classList.toggle('active');
    
    // Animate Links
    navLinksItems.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `fadeIn 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Burger Animation
    burger.classList.toggle('toggle');
});

// === Scroll Header Effect ===
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(26, 26, 26, 0.95)';
        header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.backgroundColor = 'rgba(26, 26, 26, 0.9)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// === Character Gallery ===
thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', () => {
        // Update main image
        mainCharacterImg.src = thumbnail.getAttribute('data-img');
        
        // Update active state
        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        thumbnail.classList.add('active');
        
        // Add animation
        mainCharacterImg.style.animation = 'fadeIn 0.3s ease-out';
        setTimeout(() => {
            mainCharacterImg.style.animation = '';
        }, 300);
    });
});

// === Intersection Observer for Animations ===
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.story-card, .chapter, .info-card, .team-card, .match-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
};

// === Stats Animation ===
const animateStats = () => {
    const statCircles = document.querySelectorAll('.stat-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transition = 'stroke-dashoffset 1.5s ease-out';
                
                // Get the value from the class name
                if (entry.target.classList.contains('defense')) {
                    entry.target.style.strokeDashoffset = 'calc(377 - (377 * 95) / 100)';
                } else if (entry.target.classList.contains('technique')) {
                    entry.target.style.strokeDashoffset = 'calc(377 - (377 * 85) / 100)';
                } else if (entry.target.classList.contains('power')) {
                    entry.target.style.strokeDashoffset = 'calc(377 - (377 * 88) / 100)';
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    statCircles.forEach(circle => {
        // Initialize with full circle
        circle.style.strokeDashoffset = '377';
        observer.observe(circle);
    });
};

// === Lightning Effect ===
const triggerLightning = () => {
    const lightningOverlay = document.querySelector('.lightning-overlay');
    
    // Random lightning effect
    setInterval(() => {
        const random = Math.random();
        if (random < 0.2) { // 20% chance of lightning
            lightningOverlay.style.animation = 'lightning 2s';
            setTimeout(() => {
                lightningOverlay.style.animation = '';
            }, 2000);
        }
    }, 8000);
};

// === Smooth Scrolling ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Update active nav link
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// === Update Active Nav Link on Scroll ===
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksItems.forEach(li => {
        li.querySelector('a').classList.remove('active');
        if (li.querySelector(`a[href="#${current}"]`)) {
            li.querySelector(`a[href="#${current}"]`).classList.add('active');
        }
    });
});

// === Character Frame Tilt Effect ===
const characterFrame = document.querySelector('.character-frame');
if (characterFrame) {
    characterFrame.addEventListener('mousemove', (e) => {
        const rect = characterFrame.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const angleX = (y - centerY) / 20;
        const angleY = (centerX - x) / 20;
        
        characterFrame.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
    });
    
    characterFrame.addEventListener('mouseleave', () => {
        characterFrame.style.transform = 'perspective(1000px) rotateY(-15deg)';
    });
}

// === Initialize ===
document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
    animateStats();
    triggerLightning();
    
    // Add toggle class for burger animation
    burger.classList.add('toggle-ready');
    
    // Add animation classes
    document.querySelectorAll('.story-card, .chapter, .info-card, .team-card, .match-card').forEach(element => {
        element.classList.add('fade-in-element');
    });
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.innerHTML = `
        .toggle-ready div {
            transition: all 0.3s ease;
        }
        
        .toggle .line1 {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .toggle .line2 {
            opacity: 0;
        }
        
        .toggle .line3 {
            transform: rotate(45deg) translate(-5px, -6px);
        }
        
        .fade-in-element {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .fade-in-element.animate {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
});