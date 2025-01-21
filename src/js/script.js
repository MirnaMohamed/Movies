//change the navbar to hamburger menu on mobile
var menu = document.getElementById('menu');
menu.addEventListener('click', function () {
    if (menu.firstElementChild.classList.contains("fa-bars")) {
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
var search = document.getElementById('searchBar');
var resultMovies = document.getElementById("results");
let url = new URL("https://api.themoviedb.org/3/search/movie");
let xhr = new XMLHttpRequest();
search.addEventListener('keyup', function () {
    if (search.value !== null) {
        url.searchParams.append("query", search.value);
        xhr.open("GET", url);
        xhr.setRequestHeader("Authorization", 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNDY2YjZmNDY0OTNhMDYxN2Q0ODMxYzU1ZTIwN2EzMiIsIm5iZiI6MTczNzM3MDUxNS42NTQsInN1YiI6IjY3OGUyYjkzZGNiNmU4MzlmMzQzMTY5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ULXL5dwBE5GTNYcCWOJADvApqUpfP7mEq3X7_SN0dTI');
        xhr.send();
        console.log(xhr);
        var response;
        if (xhr.status == xhr.DONE){
            response = xhr.response;
        }
    }
    console.log(response);
});