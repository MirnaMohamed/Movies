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
function sendRequest(type, page = 1) {
    let url = new URL(`https://api.themoviedb.org/3/search/${type}`);

    url.searchParams.append("query", search.value);
    url.searchParams.append("page", page);

    // Ensure the input is not empty
    if (search.value.trim().length === 0) {
        searchResults.innerHTML = "";
        pageNo.classList.add("hidden");
        return;
    }

    // Set up and send the XMLHttpRequest
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.setRequestHeader(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNDY2YjZmNDY0OTNhMDYxN2Q0ODMxYzU1ZTIwN2EzMiIsIm5iZiI6MTczNzM3MDUxNS42NTQsInN1YiI6IjY3OGUyYjkzZGNiNmU4MzlmMzQzMTY5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ULXL5dwBE5GTNYcCWOJADvApqUpfP7mEq3X7_SN0dTI"
    );


    xhr.send();
    xhr.addEventListener("readystatechange", () => {
        if (xhr.readyState === 4) {
            handleResponse(JSON.parse(xhr.response), type);
        }
    })
}

search.addEventListener('keyup', function () {
    sendRequest("multi");
});
function handleResponse(response, type) {
    var results = [];
    results = response.results;
    console.log(results)
    var currentPage = response.page;
    var total_pages = response.total_pages;
    viewMovies(results, currentPage, total_pages, type);
}
function viewMovies(movies, currentPage, total_pages, type, filterOptions = null) {
    searchResults.innerHTML = "";
    for (m of movies) {
        var movieElement = document.createElement("div");
        movieElement.classList.add("flex", "flex-wrap", "flex-col", "justify-center", "items-center", "w-72", "h-30", "px-3", "py-3");
        movieElement.classList.add("shadow-lg", "bg-blend-overlay", "shadow-slate-600", "bg-slate-400", "m-2", "rounded");
        movieElement.style.setProperty("--media_type", m.media_type);
        movieElement.id = m.id;
        var img, title;
        if (type == "person" || m.media_type == "person") {
            img = `https://image.tmdb.org/t/p/w500/${m.profile_path}' class='rounded w-full'`;
            title = m.name;
        }
        else {
            img = `https://image.tmdb.org/t/p/w500/${m.poster_path}' class='rounded w-full'`;
            title = m.title ? m.title : m.name;
        }
        if (img.includes("null")) {
            img = "./images/search-bg.png' class='h-[24.50rem] rounded'";
        }
        movieElement.innerHTML = `<img src='${img}/>
                                <h3>${title}</h3>`;
        searchResults.appendChild(movieElement);
    }
    getCards();
    displayPages(type, currentPage, total_pages);
}
//display the page numbers to choose from
function displayPages(type, currentPage, total_pages) {

    pageNo.classList.remove("hidden", "md:hidden");
    pageNo.innerHTML = "";
    if (total_pages <= 5 && total_pages !== 0) {
        for (var i = 1; i < total_pages + 1; i++) {
            var page = document.createElement("div");
            page.classList.add("m-2", "p-2.5", "rounded", "bg-slate-600", "hover:bg-slate-800", "focus:bg-sky-900", "text-white", "cursor-pointer");
            page.innerText = i;
            page.id = i;
            if (i === currentPage) {
                page.classList.remove("bg-slate-600");
                page.classList.add("bg-sky-900");
            }
            pageNo.appendChild(page);
        }
    }
    else {
        for (var i = 1; i <= 3; i++) {
            var page = document.createElement("div");
            page.classList.add("m-2", "p-2.5", "rounded", "cursor-pointer", "bg-slate-600", "text-white", "focus:bg-sky-900");
            page.innerText = i;
            page.id = i;

            if (i === currentPage) {
                page.classList.remove("bg-slate-600");
                page.classList.add("bg-sky-900");
            }
            pageNo.appendChild(page);
        }
        var dots = document.createElement("span");
        dots.innerText = "...";
        dots.classList.add("m-2", "p-2.5", "text-white")
        pageNo.appendChild(dots);
        var lastPage = document.createElement("div");
        lastPage.classList.add("m-2", "p-2.5", "rounded", "cursor-pointer", "bg-slate-600", "text-white", "focus:bg-sky-900");
        lastPage.innerText = total_pages;
        lastPage.id = total_pages;

        if (currentPage == total_pages) {
            lastPage.classList.add("bg-sky-900");
        }
        pageNo.appendChild(lastPage);
    }
    pageNo.addEventListener("click", (e) => {
        if (!isNaN(Number(e.target.id)) && e.target.id) {

            changePage(type, e.target.id);
        }
    });
}
function changePage(type, targetPage) {
    sendRequest(type, targetPage)

}
function getCards() {
    cards = document.getElementById("results").childNodes;
    console.log(cards);
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', (e) => {
            var movieId = cards[i].id;
            console.log(movieId);
            window.location.href = `details.html?id=${movieId}`;

        });
    }
}
var filterOptions = [];
var submitFilter = document.getElementById("filter")
var filterWindow = document.getElementById("filterWindow")
submitFilter.addEventListener("click", (e) => {
    console.log(e.target)
    if (filterWindow.classList.contains("hidden")) {
        filterWindow.classList.remove("hidden");
        filterWindow.classList.add("flex");
        var filterType = document.getElementById("type")
        filterType.addEventListener("change", ()=> {sendRequest(filterType.value);})
        
    }
    else {
        filterWindow.classList.add("hidden");
    }
})
document.addEventListener("DOMContentLoaded", () => {
    const username = localStorage.getItem("username");
    if (username) {
        const alog = document.getElementById("alog");
        const areg = document.getElementById("areg");
        const userr = document.getElementById("user-namee");
        const userrr = document.getElementById("user-name");
        userr.innerText = username;
        userrr.innerText = username;
        
        userr.classList.add("md:inline-block","hidden")
        alog.classList.add("hidden"); 
        areg.classList.add("hidden");
        userr.classList.remove("hidden");
        
        userrr.classList.add("md:hidden","inline-block");
        userrr.classList.remove("hidden");
        
    }
});