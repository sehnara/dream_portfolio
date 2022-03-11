'use strict'

// 1. Maek navbar transparent when it is on the top
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', ()=>{    
    let y = window.scrollY
    if(y > navbarHeight){
        navbar.classList.add('navbar--dark')
    }
    else {
        navbar.classList.remove('navbar--dark')
    }
}
)

// 2. scroll to any section
scrollToSection(".navbar__menu")
scrollToSection(".home__contact")

// 3. Make Home section transparent when it be scrolled
const home = document.querySelector("#home")
const homeContainer = document.querySelector(".home__container")
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    const opacity =1 - (window.scrollY/ homeHeight)*1.2
    if (opacity < 0) return   
    homeContainer.style.setProperty('opacity', opacity)  
})





// Utility Function
function scrollToSection(className){
    const target = document.querySelector(className);
    target.addEventListener('click', (e)=>{
        const targetSection = document.querySelector(e.target.dataset.link) 
        if(targetSection==null) return
        targetSection.scrollIntoView({behavior : "smooth"})
    })
}

