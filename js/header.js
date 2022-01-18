const navSlide = () =>{
    const burger = document.querySelector('.burger');  
    const nav = document.querySelectorAll('.nav-ul li');
    const bar = document.querySelector('.nav-ul');
    burger.addEventListener('click',()=>{
        bar.classList.toggle('nav-active');
        nav.forEach((link,index) => {
            if(link.style.animation){
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index/7 + 0.5}s`;
            }
        });
        burger.classList.toggle('toggle');
    });
}
const getCurrentTheme = () => document.body.classList.contains('dark-theme') ? 'dark-theme' : 'light-theme';
const changeTheme = () => {
    const theme = document.querySelector('.theme-btn');
    if(theme.classList.contains('fa-sun')){
        theme.classList.remove('fa-sun');
        theme.classList.add('fa-moon');
    } else {
        theme.classList.remove('fa-moon');
        theme.classList.add('fa-sun');
    }
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('coin-meter-selected-theme', getCurrentTheme());
}
window.addEventListener('scroll',()=>{
    const header = document.querySelector('.header');
    header.classList.toggle('header-scrolled',window.scrollY > 30);
});
document.addEventListener('DOMContentLoaded',()=>{
    const selectedTheme = localStorage.getItem('coin-meter-selected-theme');
    if(selectedTheme && selectedTheme == 'dark-theme'){
        document.body.classList.add(selectedTheme);
        document.querySelector('.theme-btn').classList.remove('fa-sun');
        document.querySelector('.theme-btn').classList.add('fa-moon');
    }
});
navSlide();