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

