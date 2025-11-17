const API_KEY = "thewdb"; 
const API_URL = "https://www.omdbapi.com/";

async function searchMovies() {
    const input = document.getElementById("search-input");
    const query = input.value.trim();
    const container = document.getElementById("movies-container");

    if (query === "") {
        container.innerHTML = "<p class='no-results'>Please type a movie name.</p>";
        return;
    }

    try {
        const url = `${API_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.Response === "False") {
            container.innerHTML = `<p class='no-results'>${data.Error}</p>`;
            return;
        }

        renderMovies(data.Search);
    } catch (error) {
        console.error("Error fetching movies:", error);
        container.innerHTML = "<p class='no-results'>Error loading movies. Please try again.</p>";
    }
}

function renderMovies(movies) {
    const container = document.getElementById("movies-container");
    container.innerHTML = "";

    movies.forEach(movie => {
        const card = document.createElement("div");
        card.className = "movie-card";

        const poster = movie.Poster !== "N/A" ? movie.Poster : "";
        const posterImg = poster
            ? `<img class="movie-poster" src="${poster}" alt="${movie.Title} Poster">`
            : "";

        card.innerHTML = `
            ${posterImg}
            <div class="movie-title">${movie.Title}</div>
            <div class="movie-info">
                <strong>Year:</strong> ${movie.Year} <br>
                <strong>Type:</strong> ${movie.Type}
            </div>
        `;

        container.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const searchBtn = document.getElementById("search-btn");
    const input = document.getElementById("search-input");
    const clearBtn = document.getElementById("clear-btn");

    searchBtn.addEventListener("click", searchMovies);

    input.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            searchMovies();
        }
    });

    clearBtn.addEventListener("click", () => {
        input.value = "";
        document.getElementById("movies-container").innerHTML = "";
    });
});
