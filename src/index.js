
var myHttp = new XMLHttpRequest();
var list = [];
var category = document.getElementById("dropdown");
var smCategory=document.getElementById("dropdown2");
var cards;
var selectedCategory = category.value;
    function fetchMovies(category) {
        myHttp.open("GET", `https://api.themoviedb.org/3/trending/${category}/day?api_key=c351dc60ae06df185a2561cc33061389`);
        myHttp.send();

        myHttp.addEventListener('readystatechange', function () {
            if (myHttp.readyState == 4 && myHttp.status == 200) {
                list = JSON.parse(myHttp.response).results;
                console.log(list);
                display();
            }
        });
    }

    category.addEventListener('change',()=>{ 
        var selectedCategory = category.value;
        fetchMovies(selectedCategory)});
    
    fetchMovies("all");

smCategory.addEventListener('change',function(){
    var selectedCategory = smCategory.value;
        fetchMovies(selectedCategory);
});
function display() {
    var cartona = ``;
    for (var i = 0; i < list.length; i++) {
        cartona += `<div data-index="${list[i].id}" class="text-center">
            <img class="w-full object-cover rounded-lg" src="https://image.tmdb.org/t/p/w500/${list[i].poster_path?list[i].poster_path:list[i].profile_path}" alt="Card Image">
            <h2 class="mt-4 text-lg font-bold text-white">${list[i].original_title ? list[i].original_title : list[i].original_name}</h2>
        </div>`
    }
    document.getElementById("content").innerHTML = cartona;
    getCards();
}
var menu=document.getElementById("menu");
var section =document.getElementById("section2");
menu.addEventListener('click',function(){
    // menu.classList.toggle("hidden");
    section.classList.toggle("hidden");
})
function getCards(){
    cards=document.querySelectorAll("div[data-index]");
    console.log(cards);
    for(var i=0 ;i<cards.length;i++){
        cards[i].addEventListener('click',(e)=>{
            var id=e.target.parentElement.dataset.index;
            console.log(id);
            //8ayar el path (details.html) b esm el page 3andak
            // window.location.href=`details.html?id=${encodeURIComponent(id)}`;
            //esta5dm el satrin dol 3lshan tgib el id mn el url w tsta5dmo f el api f el function 3andak
            // const urlParam=new URLSearchParams(window.location.search);
            // const index=urlParam.get("id");
        });
    }
}