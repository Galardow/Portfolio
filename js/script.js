const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

let currentSlide = 0;
const totalSlides = 5; 

function moveSlide(direction) {
    currentSlide += direction;

    if (currentSlide < 0) {
        currentSlide = totalSlides - 1; 
    } 
    else if (currentSlide >= totalSlides) {
        currentSlide = 0; 
    }

    const track = document.getElementById('track');
    track.style.transform = `translateX(-${currentSlide * 20}%)`;
}

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const overlay = document.getElementById('overlay');
const navItems = document.querySelectorAll('.nav-links a');

const toggleMenu = () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('toggle');
    overlay.classList.toggle('active');
};

hamburger.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);

navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
});

const sections = document.querySelectorAll('.section-target');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

const textToType = "Galardo";
const typeWriterElement = document.getElementById('typewriter');
let typeIndex = 0;

function typeWriter() {
    if (typeIndex < textToType.length) {
        typeWriterElement.innerHTML += textToType.charAt(typeIndex);
        typeIndex++;
        setTimeout(typeWriter, 150); 
    }
}

window.addEventListener('load', () => {
    setTimeout(typeWriter, 500); 
});

const skillsWrapper = document.querySelector('.skills-carousel-wrapper');
let isDown = false;
let startX;
let scrollLeft;
let autoScrollSpeed = 1; 
let autoScrollTimer;

function autoScroll() {
    if (!isDown) {
        skillsWrapper.scrollLeft += autoScrollSpeed;
        
        if (skillsWrapper.scrollLeft >= (skillsWrapper.scrollWidth / 2)) {
            skillsWrapper.scrollLeft = 0;
        }
    }
    autoScrollTimer = requestAnimationFrame(autoScroll);
}

startAutoScroll();

function startAutoScroll() {
    cancelAnimationFrame(autoScrollTimer);
    autoScrollTimer = requestAnimationFrame(autoScroll);
}

skillsWrapper.addEventListener('mousedown', (e) => {
    isDown = true;
    skillsWrapper.classList.add('active');
    startX = e.pageX - skillsWrapper.offsetLeft;
    scrollLeft = skillsWrapper.scrollLeft;
    cancelAnimationFrame(autoScrollTimer); 
});

skillsWrapper.addEventListener('mouseleave', () => {
    isDown = false;
    skillsWrapper.classList.remove('active');
    startAutoScroll();
});

skillsWrapper.addEventListener('mouseup', () => {
    isDown = false;
    skillsWrapper.classList.remove('active');
    startAutoScroll(); 
});

skillsWrapper.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - skillsWrapper.offsetLeft;
    const walk = (x - startX) * 2; 
    skillsWrapper.scrollLeft = scrollLeft - walk;
});

skillsWrapper.addEventListener('touchstart', () => {
    cancelAnimationFrame(autoScrollTimer);
});

skillsWrapper.addEventListener('touchend', () => {
    startAutoScroll();
});