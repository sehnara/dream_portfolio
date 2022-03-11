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
function scrollToSection(className){
    const target = document.querySelector(className);
    target.addEventListener('click', (e)=>{
        const targetSection = document.querySelector(e.target.dataset.link) 
        if(targetSection==null) return
        targetSection.scrollIntoView({behavior : "smooth"})
    })
}

scrollToSection(".navbar__menu")
scrollToSection(".home__contact")






