//change the navbar to hamburger menu on mobile
var menu = document.getElementById('menu');
menu.addEventListener('click', function() {
    if(menu.firstElementChild.classList.contains("fa-bars")) {
        console.log(menu.firstElementChild.src);
        menu.firstElementChild.classList.add("fa-x");
        menu.firstElementChild.classList.remove("fa-bars");
        menu.nextElementSibling.classList.remove("hidden");
    }
    else {
        menu.firstElementChild.classList.add("fa-bars");
        menu.firstElementChild.classList.remove("fa-x");
        menu.nextElementSibling.classList.add('hidden');
        menu.nextElementSibling.classList.remove('flex-col');
    }
});
var search = document.querySelector('fa-search');
search.addEventListener('keyup', function() {
    
});