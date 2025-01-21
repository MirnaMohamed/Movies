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
let url = new URL("https://api.themoviedb.org/3/search/movie");
let xhr = new XMLHttpRequest();
search.addEventListener('keyup', function () {
    if (search.value !== null) {
        var results = [];
        var currentPage = 1;
        var total_pages;
        url.searchParams.append("query", search.value);
        xhr.open("GET", url);
        xhr.setRequestHeader("Authorization", 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNDY2YjZmNDY0OTNhMDYxN2Q0ODMxYzU1ZTIwN2EzMiIsIm5iZiI6MTczNzM3MDUxNS42NTQsInN1YiI6IjY3OGUyYjkzZGNiNmU4MzlmMzQzMTY5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ULXL5dwBE5GTNYcCWOJADvApqUpfP7mEq3X7_SN0dTI');
        xhr.send();
        xhr.addEventListener("readystatechange", () => {
            if (xhr.readyState === 4) {
                results = JSON.parse(xhr.response).results;
                currentPage = JSON.parse(xhr.response).page;
                total_pages = JSON.parse(xhr.response).total_pages;
                console.log(results);
                viewMovies(results);
            }
        })
    }
});
function viewMovies(movies) {
    var resultMovies = document.getElementById("results");
    resultMovies.innerHTML = "";
    for(m of movies){
        var movieElement = document.createElement("div");
        movieElement.classList.add("flex","flex-col", "justify-center", "items-center", "w-80","px-3.5", "py-3");

        //adult :  false
// backdrop_path :  "/uFMIiNYUDHzo7YGSg5UUR7VLNma.jpg"
// genre_ids : [35]
// id
// : 
// 1278099
// original_language
// : 
// "es"
// original_title
// : 
// "El candidato honesto"
// overview
// : 
// "A former idealistic leader turned corrupt politician is cursed by his grandmother on the eve of the presidential election, forcing him to be honest. Can he win without lies and what will be the conditions?"
// popularity
// : 
// 697.121
// poster_path
// : 
// "/hmV5HPkbQuzgPo11Xm70CMQV3iZ.jpg"
// release_date
// : 
// "2024-08-08"
// title
// : 
// "El Candidato Honesto"
// video
// : 
// false
// vote_average
// : 
// 6.8
// vote_count
// : 
// 66
        movieElement.innerHTML = `<img src='${m.poster_path}'/>
                                <h3>${m.title}</h3>`;
        resultMovies.appendChild(movieElement);
    }
}