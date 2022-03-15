'use strict'

// 1. Maek navbar transparent when it is on the top
const navbar = document.querySelector("#navbar");
const navbarMenu = document.querySelector(".navbar__menu");
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', ()=>{    
    let y = window.scrollY
    if(y > navbarHeight){
        navbar.classList.add('navbar--dark')
        navbarMenu.classList.remove('visible')
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

// 4. scroll into top when arrow up button is clicked
const arrowButton = document.querySelector(".arrow-button__up");
arrowButton.addEventListener('click', ()=>{
    const target = document.querySelector('#home');
    target.scrollIntoView({behavior:"smooth"})
    navMenuActivate(navMenus[sectionIds.indexOf('#home')])
})
document.addEventListener('scroll', ()=>{
    if (window.scrollY > homeHeight/2){
        arrowButton.classList.add('visible')
    }
    else {
        arrowButton.classList.remove('visible')
    }
})

// 5. filtering projects
const categoryButtons = document.querySelector(".work__categories");
const projectsContainer = document.querySelector(".work__projects")
const projects = document.querySelectorAll('.project');

categoryButtons.addEventListener('click', (e) => {
    const category = e.target.dataset.category || e.target.parentNode.dataset.category  
    if (category == null){
        return
    }     
    
    projectsContainer.classList.add('anim-out')
    setTimeout(()=>{
        projects.forEach(item => {
            if(item.dataset.category === category || category === 'all'){
                item.classList.remove('invisible')
            }
            else {
                item.classList.add('invisible')
            }
        });
        projectsContainer.classList.remove('anim-out')},300)
})

// 6. make button active State
const categoryButton = document.querySelectorAll('.category__btn')
categoryButtons.addEventListener('click', (e)=>{
    const selected = e.target.nodeName === 'BUTTON' ?  e.target.dataset.category : e.target.parentNode.dataset.category ;
    if (selected===undefined){return}
    categoryButton.forEach(m => {
        if(m.dataset.category === selected){
            m.classList.add('active')
        }
        else {
            m.classList.remove('active')
        }
    });
})

// 7. (responsive) navbar is expressed when toggle button is clicked
const navbarToggle = document.querySelector(".navbar__toggle-btn");
// navbarMenu는 1번에 있다
navbarToggle.addEventListener('click', ()=> {
    navbarMenu.classList.toggle('visible')
})

// 8. menu activating when it is scrolled
const sectionIds = ['#home','#about','#skills','#work','#testimonials','#contact',]
const sections = sectionIds.map(id => document.querySelector(id))
const navMenus = sectionIds.map(id => document.querySelector(`[data-link="${id}"]`))

let selectedIndex = 0;
let selectedNavItem = navMenus[0]

const option = {
    root : null,
    rootMargin : '0px',
    threshold : 0.3
}
function navMenuActivate(selected){
    selectedNavItem.classList.remove('active')
    selectedNavItem = selected
    selectedNavItem.classList.add('active')
}
const observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
      if(!entry.isIntersecting && entry.intersectionRatio > 0){
         const index = sectionIds.indexOf(`#${entry.target.id}`);     
        //  스크롤링이 아래로 되어서 페이지가 올라옴
         if(entry.boundingClientRect.y < 0) {
            selectedIndex = index + 1;
         }else {
             selectedIndex = index - 1
         }
      }
    })   
},option)

sections.forEach((section)=>observer.observe(section))
window.addEventListener('wheel',()=>{
    if(window.scrollY === 0){
        selectedIndex = 0
    }
    else if(Math.round(window.scrollY + window.innerHeight) === document.body.clientHeight){
        selectedIndex = navMenus.length-1   
    }
    navMenuActivate(navMenus[selectedIndex])
})

// Utility Function
function scrollToSection(className){
    const target = document.querySelector(className);
    target.addEventListener('click', (e)=>{
        const targetSection = document.querySelector(e.target.dataset.link) 
        if(targetSection==null) return
        targetSection.scrollIntoView({behavior : "smooth"});
        if(className === '.home__contact'){
        navMenuActivate(navMenus[sectionIds.indexOf('#contact')]);}
    })
}

