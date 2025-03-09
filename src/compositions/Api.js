const fetchMovies = async () => {
    const response = await fetch(
      "https://moviesapi.codingfront.dev/api/v1/movies"
    );
  
    if (!response.ok) {
      console.log("ok");
    }
    const result = await response.json();
  
    movies.value = result.data;
    console.log(movies.value);
  
    getGenres(result.data);
  };

  export default fetchMovies;