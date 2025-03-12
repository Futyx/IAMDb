// stores/movieStore.js
import { defineStore } from "pinia";
import { ref, onMounted } from "vue";

export const useMovieStore = defineStore("movieStore", () => {
  const movies = ref([]);
  const genres = ref([]);
  const favorites = ref([]);
  const totalPages = ref(1);
  const loading = ref(false);

  const fetchMovies = async (page = 1) => {
    loading.value = true;
    try {
      const response = await fetch(
        "https://moviesapi.codingfront.dev/api/v1/movies"
      );
      if (!response.ok) {
        console.error("Failed to fetch movies.");
        return;
      }
      const result = await response.json();
      if (page === 1) {
        movies.value = result.data; 
      } else {
        movies.value = [...movies.value, ...result.data]; 
      }
      totalPages.value = result.totalPages;
      getGenres(result.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      loading.value = false;
    }
  };

  const getGenres = (movieData) => {
    const allGenres = movieData.flatMap((movie) => movie.genres);
    genres.value = Array.from(new Set(allGenres));
  };

  const toggleFavorite = (movie) => {
    const index = favorites.value.findIndex((fav) => fav.id === movie.id);
    if (index === -1) {
      favorites.value.push(movie);
    } else {
      favorites.value.splice(index, 1);
    }
    saveFavorites();
  };
  const saveFavorites = () => {
    localStorage.setItem("favorites", JSON.stringify(favorites.value));
  };

  const loadFavorites = () => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      favorites.value = JSON.parse(storedFavorites);
    }
  };

  onMounted(() => {
    loadFavorites();
  });

  return { movies, genres, favorites, loading, fetchMovies, toggleFavorite };
});
