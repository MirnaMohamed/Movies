
var myHttp = new XMLHttpRequest();
var list = [];
var category = document.getElementById("dropdown");
var smCategory = document.getElementById("dropdown2");
var cards;
var selectedCategory = category.value;
var pageNumbersContainer = document.getElementById("pageNumbers"); 
var prevButton = document.getElementById("prevPage"); 
var nextButton = document.getElementById("nextPage"); 
let currentPage = 1;
let totalPages = 1;
function fetchMovies(category, page = 1) {
    myHttp.open("GET", `https://api.themoviedb.org/3/trending/${category}/day?api_key=c351dc60ae06df185a2561cc33061389&page=${page}`);
    myHttp.send();

    myHttp.addEventListener('readystatechange', function () {
        if (myHttp.readyState == 4 && myHttp.status == 200) {
            var response = JSON.parse(myHttp.response);
            list = response.results;
            totalPages = response.total_pages; 
            currentPage = page;
            console.log(list);
            display();
           updateButtonState();
            renderPageNumbers();
        }
    });
}

category.addEventListener('change', () => {
    selectedCategory = category.value;
    currentPage = 1; 
    fetchMovies(selectedCategory, currentPage);
    
});



smCategory.addEventListener('change', function () {
    selectedCategory = smCategory.value;
    currentPage = 1; 
    fetchMovies(selectedCategory, currentPage);
   
});
function display() {
    var cartona = ``;
    for (var i = 0; i < list.length; i++) {
        if (!list[i].poster_path && !list[i].profile_path) {
            continue; 
        }
        cartona += `<div data-index="${list[i].id}" data-category="${list[i].media_type}" class="text-center">
            <img class="w-full object-cover rounded-lg" src="https://image.tmdb.org/t/p/w500/${list[i].poster_path ? list[i].poster_path : list[i].profile_path}" alt="Card Image">
            <h2 class="mt-4 text-lg font-bold text-white">${list[i].original_title ? list[i].original_title : list[i].original_name}</h2>
        </div>`
    }
    document.getElementById("content").innerHTML = cartona;
    getCards();
}
function renderPageNumbers() {
    pageNumbersContainer.innerHTML = ""; 
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement("button");
        pageButton.innerText = i;
        pageButton.className = `px-3 py-1 rounded-md ${
            i === currentPage ? "bg-indigo-600 text-white" : "bg-white text-gray-600"
        } border hover:bg-indigo-200`;
        pageButton.addEventListener("click", () => fetchMovies(selectedCategory, i)); 
        pageNumbersContainer.appendChild(pageButton);
    }
}
prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
        fetchMovies(selectedCategory, currentPage - 1);
    }
});

nextButton.addEventListener("click", () => {
    if (currentPage < totalPages) {
        fetchMovies(selectedCategory, currentPage + 1);
    }
});

fetchMovies("all");
var menu = document.getElementById("menu");
var section = document.getElementById("section2");
menu.addEventListener('click', function () {
    section.classList.toggle("hidden");
})
function getCards() {
    cards = document.querySelectorAll("div[data-index]");
    console.log(cards);
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', (e) => {            
            var movieId = cards[i].getAttribute('data-index');
            var movieCategory = cards[i].getAttribute('data-category');
            console.log(movieId);
            console.log(movieCategory);
            window.location.href = `details.html?id=${movieId}&category=${movieCategory}`;

        });
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const username = localStorage.getItem("username");
    if (username) {
        const alog = document.getElementById("alog");
        const areg = document.getElementById("areg");
        const userr = document.getElementById("user-name");
        userr.classList.add("md:inline-block","hidden")
        alog.classList.add("hidden");
        areg.classList.add("hidden");
        userr.classList.remove("hidden");
        userr.innerText = username;
        const alogg = document.getElementById("alogg");
        const aregg = document.getElementById("aregg");
        const userrr = document.getElementById("user-namee");
        userrr.classList.add("md:hidden","inline-block");
        
        alogg.classList.add("hidden");
        aregg.classList.add("hidden");
        userrr.classList.remove("hidden");
        userrr.innerText = username;
        
    }
});