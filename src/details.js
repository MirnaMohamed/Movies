const params = new URLSearchParams(window.location.search);
const movieId = params.get('id');
console.log(movieId);



var container = document.getElementById("container");

const xhr = new XMLHttpRequest();

xhr.addEventListener('readystatechange', function () {
    if (this.readyState === this.DONE) {
        console.log("response");

        // Parse the JSON response
        const movie = JSON.parse(this.responseText);
        console.log(movie);

        
        const cartona = `
<div 
    class="flex flex-col lg:flex-row items-center lg:items-start bg-cover bg-center rounded-lg shadow-2xl p-8 max-w-6xl mx-auto my-8 border border-gray-800"
    style="background-image: linear-gradient(to right, rgba(17, 24, 39, 0.9), rgba(17, 24, 39, 0.7)), url('https://image.tmdb.org/t/p/original${movie.backdrop_path}');"
>
    <!-- Movie Poster -->
    <img 
        src="https://image.tmdb.org/t/p/w500${movie.poster_path}" 
        class="w-96 rounded-lg shadow-xl mb-8 lg:mb-0 lg:mr-8 border-2 border-gray-800"
        alt="${movie.original_title} Poster"
    />

    <!-- Movie Details -->
    <div class="flex flex-col space-y-4 text-center lg:text-left">
        <!-- Movie Title -->
        <h1 class="text-5xl font-bold text-gray-100">${movie.original_title}</h1>

        <!-- Tagline -->
        <h5 class="text-lg italic text-gray-400">${movie.tagline}</h5>

        <!-- Overview -->
        <p class="text-gray-300 leading-relaxed">${movie.overview}</p>

        <!-- Genres -->
        <h5 class="text-lg font-semibold text-indigo-400">
            ${movie.genres.map(genre => genre.name).join(', ')}
        </h5>

        <!-- Rating -->
        <p class="flex items-center text-yellow-400">
            <i class="fa-solid fa-star mr-2"></i>
            ${movie.vote_average}
        </p>

        <!-- Release Date -->
        <p class="text-gray-400">Release date: ${movie.release_date}</p>

        <!-- Duration -->
        <p class="text-gray-400">Duration: ${movie.runtime} minutes</p>

        <!-- Countries -->
        <p class="text-gray-400">
            Countries: ${movie.production_countries.map(country => country.name).join(', ')}
        </p>

        <!-- Spoken Languages -->
        <p class="text-gray-400">Languages: ${movie.spoken_languages.map(lang => lang.english_name).join(', ')}</p>

        <!-- Status -->
        <p class="text-gray-400">Status: ${movie.status}</p>

        <!-- Buttons -->
        <div class="flex space-x-4">
            <!-- Watch Now Button -->
    <button class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 text-sm flex items-center">
        <a href="${movie.homepage}" class="flex items-center justify-center">
            <i class="fas fa-play mr-2"></i> Watch Now
        </a>
    </button>

            <!-- IMDb Button -->
            <button class="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 text-sm">
                <a href="https://www.imdb.com/title/${movie.imdb_id}" target="_blank" class="flex items-center justify-center">
                    View on IMDb
                </a>
            </button>
        </div>
    </div>
</div>   `

        // Update the container with the new content
        container.innerHTML = cartona;
    }
});

// Configure the request
xhr.open('GET', `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`);
xhr.setRequestHeader('accept', 'application/json');
xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyY2ZkNDA2MDdkNWMyMmFlZTA0Yzg3MTk3NTU1MzBmZiIsIm5iZiI6MTczNzQ1ODQxOS4wMzIsInN1YiI6IjY3OGY4MmYzZjg3ZjQxMTllNmFhYWZmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BmpiPvazBB4wiFd7g6g9w62u3vx6rGViOnv645QmkBo');

// Send the request
xhr.send();

