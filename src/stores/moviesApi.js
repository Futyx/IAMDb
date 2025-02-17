import { defineStore } from 'pinia';  
import { ref } from 'vue';  

export const useMovieStore = defineStore('movieStore', () => {  
  const movies = ref([]);  
  
  const fetchMovies = async () => {  
    const response = await fetch("https://moviesapi.codingfront.dev/api/v1/movies");  
    if (response.ok) {  
      const result = await response.json();  
      movies.value = result.data;  
    } else {  
      console.error("Failed to fetch movies");  
    }  
  };  

  return { movies, fetchMovies };  
}); 