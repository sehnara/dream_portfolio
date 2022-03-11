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
const navbarMenu = document.querySelector(".navbar__menu")
navbarMenu.addEventListener('click',(event)=>{
    const e = document.querySelector(event.target.dataset.link);
    if (e == null) {return}
    e.scrollIntoView({behavior : 'smooth'});
}) 




