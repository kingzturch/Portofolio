/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Menu show */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/* Menu hidden */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];

class Particle {
    constructor(x, y, size, color, velocityX, velocityY) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
        this.opacity = 0; // Start with invisible particles
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
    }

    update(mouse) {
        // Gradually increase opacity
        if (this.opacity < 0.8) {
            this.opacity += 0.01;
        }

        // Calculate distance from cursor
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // If the particle is within 150px of the cursor, move it away
        if (distance < 150) {
            const angle = Math.atan2(dy, dx); // Angle between particle and cursor
            const force = (150 - distance) / 150; // Strength of the repulsion
            const forceX = Math.cos(angle) * force * 5; // X direction
            const forceY = Math.sin(angle) * force * 5; // Y direction

            this.x -= forceX; // Move particle away in X direction
            this.y -= forceY; // Move particle away in Y direction
        }

        // Update position
        this.x += this.velocityX;
        this.y += this.velocityY;

        // Keep particles within canvas bounds
        if (this.x + this.size > canvas.width || this.x - this.size < 0) {
            this.velocityX *= -1;
        }
        if (this.y + this.size > canvas.height || this.y - this.size < 0) {
            this.velocityY *= -1;
        }

        this.draw();
    }
}

const mouse = {
    x: null,
    y: null
};

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

function initParticles() {
    particlesArray.length = 0;

    // Determine the number of particles dynamically based on screen width
    let numParticles;
    if (canvas.width <= 1080) { // Approximate screen width of Realme C55
        numParticles = 30;
    } else {
        numParticles = 80; // Default for larger screens
    }

    for (let i = 0; i < numParticles; i++) {
        const size = Math.random() * 5 + 1;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const color = 'rgba(255, 255, 255, 0.8)';
        const velocityX = (Math.random() - 0.5) * 1;
        const velocityY = (Math.random() - 0.5) * 1;

        particlesArray.push(new Particle(x, y, size, color, velocityX, velocityY));
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesArray.forEach(particle => {
        particle.update(mouse);
    });

    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();


/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== ADD BLUR HEADER ===============*/
const blurHeader = () =>{
    const header = document.getElementById('header')
    // Add a class if the bottom offset is greater than 50 of the viewport
    this.scrollY >= 50 ? header.classList.add('blur-header') 
                       : header.classList.remove('blur-header')
}
window.addEventListener('scroll', blurHeader)

// ========== EMAIL JS ==========
const contactForm = document.getElementById('contact-form');
const contactMessage = document.getElementById('contact-message');

const sendEmail = (e) => {
    e.preventDefault();
    console.log("Sending email...");

    // serviceID - templateID - #form - publicKey
    emailjs.sendForm('service_rncr8ze', 'template_otrvdnc', '#contact-form', 'HuYJzuFK0v_1FskrJ')
     .then(() => {
        console.log("Email sent successfully");
        // show sent message
        contactMessage.textContent = 'Message sent successfully✅';

        // remove message after five seconds
        setTimeout(() => {
            contactMessage.textContent = '';
        }, 2000);

        // Clear input fields
        contactForm.reset();
     }, (error) => {
        console.error("Email sending failed", error);
        // Show error message
        contactMessage.textContent = 'Message not sent. Please try again later❌';
        
        // remove message after five seconds
        setTimeout(() => {
            contactMessage.textContent = '';
        }, 2000);
     });
}

// Attach event listener to the form
contactForm.addEventListener('submit', sendEmail);

// show scroll up
const scrollup = () =>{
    const scrollUp = document.getElementById('scroll-up')
    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
                       : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollup)

// scroll section active link
const sections = document.querySelectorAll('section[id]');
const scrollActive = () => {
  const scrollDown = window.scrollY;
  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 58;
    const sectionId = current.getAttribute('id');
    const sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']');
    if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
      sectionsClass.classList.add('active-link');
    } else {
      sectionsClass.classList.remove('active-link');
    }
  });
};

window.addEventListener('scroll', scrollActive);

// scroll reveal
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
    // reset: true // Animations repeat
  });
  
  sr.reveal('.home__data, experience, skills, contact__container')
  sr.reveal('.home__img', {delay: 600})
  sr.reveal('.home__scroll', {delay: 800})
  sr.reveal('.work__card, .service__card', {interval: 100})
  sr.reveal('.about__content', {origin: 'right'})
  sr.reveal('.about__img', {origin:'left'})

/*=============== SMOOTH SCROLL ===============*/

