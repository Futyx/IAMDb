import { defineStore } from "pinia";
export const useMovieStore = defineStore("movie", {
  state: () => ({
    movies: [],
    favorites: [],
  }),
  actions: {
    setMovies(movies) {
      this.movies = movies;
    },
    addFavorites(movies) {
      if (!this.favorites.find((fav) => fav.id === movies.id))
        this.favorites.push(movie);
    },
  },
  removeFavorite(movieId) {
    this.favorites = this.favorites.filter((fav) => fav.id !== movieId);
  },
});
