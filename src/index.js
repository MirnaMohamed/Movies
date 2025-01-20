
var myHttp = new XMLHttpRequest();
var list = [];
var category = document.getElementById("dropdown");
(function () {
    function fetchMovies() {
        var selectedCategory = category.value;
        myHttp.open("GET", `https://api.themoviedb.org/3/trending/${selectedCategory}/day?api_key=c351dc60ae06df185a2561cc33061389`);
        myHttp.send();

        myHttp.addEventListener('readystatechange', function () {
            if (myHttp.readyState == 4 && myHttp.status == 200) {
                list = JSON.parse(myHttp.response).results;
                console.log(list);
                display();
            }
        });
    }

    category.addEventListener('change', fetchMovies);
    fetchMovies();
})();

function display() {
    var cartona = ``;
    for (var i = 0; i < list.length; i++) {
        cartona += `<div class="text-center">
            <img class="w-full object-cover rounded-lg" src="https://image.tmdb.org/t/p/w500/${list[i].poster_path?list[i].poster_path:list[i].profile_path}" alt="Card Image">
            <h2 class="mt-4 text-lg font-bold text-white">${list[i].original_title ? list[i].original_title : list[i].original_name}</h2>
        </div>`
    }
    document.getElementById("content").innerHTML = cartona;
}
