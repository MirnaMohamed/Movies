//change the navbar to hamburger menu on mobile
var menu = document.getElementById('menu');
menu.addEventListener('click', function () {
    if (menu.firstElementChild.classList.contains("fa-bars")) {
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

//updating the search results whenever a character is typed
var searchResults = document.getElementById("results");
var pageNo = document.getElementById("pageNumber");
var search = document.getElementById('searchBar');
let url = new URL("https://api.themoviedb.org/3/search/multi");
let xhr = new XMLHttpRequest();
search.addEventListener('keyup', function () {
    if (search.value !== null) {
        url.searchParams.append("query", search.value);
        xhr.open("GET", url);
        xhr.setRequestHeader("Authorization", 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNDY2YjZmNDY0OTNhMDYxN2Q0ODMxYzU1ZTIwN2EzMiIsIm5iZiI6MTczNzM3MDUxNS42NTQsInN1YiI6IjY3OGUyYjkzZGNiNmU4MzlmMzQzMTY5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ULXL5dwBE5GTNYcCWOJADvApqUpfP7mEq3X7_SN0dTI');
        if (search.value.trim().length !== 0) {
            xhr.send();
            xhr.addEventListener("readystatechange", () => {
                if (xhr.readyState === 4) {
                    handleResponse(JSON.parse(xhr.response));
                }
            })
        }
        else {
            searchResults.innerHTML = "";
            pageNo.classList.add("hidden", "md:hidden")
        }
    }
});
function handleResponse(response) {
    var results = [];
    results = response.results;
    var currentPage = response.page;
    var total_pages = response.total_pages;
    viewMovies(results, total_pages);
}
function viewMovies(movies, total_pages) {
    searchResults.innerHTML = "";
    for (m of movies) {
        var movieElement = document.createElement("div");
        movieElement.classList.add("flex", "flex-col", "justify-center", "items-center", "w-72", "h-30", "px-3", "py-3");
        movieElement.classList.add("shadow-md", "bg-slate-400", "m-2", "rounded");
        var img, title;
        if (m.media_type == "person") {
            img = `https://image.tmdb.org/t/p/w500/${m.profile_path}'`;
            title = m.name;
        }
        else {
            img = `https://image.tmdb.org/t/p/w500/${m.poster_path}'`;
            title = m.title ? m.title : m.name;
        }
        if (img.includes("null")) {
            img = "./images/search-bg.png' class='h-[24.75rem]'";
        }
        movieElement.innerHTML = `<img src='${img}/>
                                <h3>${title}</h3>`;
        searchResults.appendChild(movieElement);
    }
    displayPages(movies, total_pages);
}
function displayPages(movies, total_pages) {

    pageNo.classList.remove("hidden", "md:hidden");
    pageNo.innerHTML = "";
    if (total_pages <= 5 && total_pages !== 0) {
        for (var i = 1; i < total_pages + 1; i++) {
            var page = document.createElement("div");
            page.classList.add("m-2", "p-2", "rounded", "bg-slate-600", "text-white", "cursor-pointer");
            page.innerText = i;
            page.id = i;
            pageNo.appendChild(page);
        }
    }
    else {
        for (var i = 1; i < 4; i++) {
            var page = document.createElement("div");
            page.classList.add("m-2", "p-2", "rounded", "cursor-pointer", "bg-slate-600", "text-white");
            page.innerText = i;
            page.id = i;
            pageNo.appendChild(page);
        }
        var dots = document.createElement("span");
        dots.innerText = "...";
        dots.classList.add("m-2", "p-2", "text-white")
        pageNo.appendChild(dots);
        var lastPage = document.createElement("div");
        lastPage.classList.add("m-2", "p-2", "rounded", "cursor-pointer", "bg-slate-600", "text-white");
        lastPage.innerText = total_pages;
        lastPage.id = total_pages;
        pageNo.appendChild(lastPage);
    }
    pageNo.addEventListener("click", (e) => {
        console.log(e.target.id.length);
        if (!isNaN(Number(e.target.id)) && e.target.id) {
 
            changePage(e.target.id);
        }
    });
}
function changePage(targetPage) {

    console.log(targetPage);
    url.searchParams.delete("query");
    url.searchParams.delete("page");
    url.searchParams.append("query", search.value);
    url.searchParams.append("page", targetPage);
    xhr.open("GET", url);
    xhr.setRequestHeader("Authorization", 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNDY2YjZmNDY0OTNhMDYxN2Q0ODMxYzU1ZTIwN2EzMiIsIm5iZiI6MTczNzM3MDUxNS42NTQsInN1YiI6IjY3OGUyYjkzZGNiNmU4MzlmMzQzMTY5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ULXL5dwBE5GTNYcCWOJADvApqUpfP7mEq3X7_SN0dTI');
    xhr.setRequestHeader("accept", "application/json");
    xhr.send();
    //to ensure there is no overlapping in the request
    xhr.removeEventListener("readystatechange", () => { handleResponse(JSON.parse(xhr.response)); });
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            handleResponse(JSON.parse(xhr.response));
        }
    };

}