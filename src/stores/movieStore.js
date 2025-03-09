// stores/movieStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMovieStore = defineStore('movieStore', () => {
  const movies = ref([]);   
  const genres = ref([]);   
  const favorites = ref([]); 
  const loading = ref(false); 

  const fetchMovies = async () => {
    loading.value = true;
    try {
      const response = await fetch("https://moviesapi.codingfront.dev/api/v1/movies");
      if (!response.ok) {
        console.error("Failed to fetch movies.");
        return;
      }
      const result = await response.json();
      movies.value = result.data;
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
    const index = favorites.value.findIndex(fav => fav.id === movie.id);
    if (index === -1) {
      favorites.value.push(movie); 
    } else {
      favorites.value.splice(index, 1);
    }
  };

  return { movies, genres, favorites, loading, fetchMovies, toggleFavorite };
});
