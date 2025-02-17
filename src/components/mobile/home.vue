<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";

const query = ref("");
const movies = ref([]);
const genres = ref([]);
const showMore = ref(false);

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
const getGenres = (movieData) => {
  const allGenres = movieData.flatMap((movie) => movie.genres);
  genres.value = Array.from(new Set(allGenres));
};
fetchMovies();

const router = useRouter();
const route = useRoute();

const search = () => {
  
  router.push({ path: "/movies", query: { search: query.value } });
};

const findCtg = (genre) => {
  router.push({ path: "/movies", query: { category: genre } });
  // console.log(genre);
  
};
</script>

<template>
  <div class="home">
    <h1>IAMDb</h1>
    <div class="search">
      <button @click="search">
        <img src="@/assets/images/search.svg" />
      </button>
      <input v-model="query" type="text" id="search" @keydown.enter="search" />
      <div class="mic-box">
        <img class="mic-icon" src="@/assets/images/microphone.svg" />
      </div>
    </div>
    <div class="category">
      <ul class="ctg-list">
        <li
          v-for="(genre, index) in showMore ? genres : genres.slice(0, 4)"
          :key="genre"
          class="ctg-item"
        >
          <button @click="findCtg(genre)">{{ genre }}</button>
        </li>
      </ul>
    </div>

    <div class="more-btn-box">
      <button @click="showMore = !showMore" class="more-ctg-btn">
        <div>{{ showMore ? "Show Less" : "Show More" }}</div>
        <div class="more-btn-vct">
          <img src="@/assets/images/Vector.svg" />
        </div>
      </button>
    </div>
    <!-- <movie-list :movies="filteredMovies" />   -->
  </div>
</template>
<style scoped>
* {
  color: white;
}
.home {
  margin-top: 304px;
}
.search {
  margin-top: 32px;
  background: #222c4f;
  padding: 12px 16px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}
h1 {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 100px;
  font-weight: 900;
  line-height: 121.02px;
  text-align: center;
}
.mic-box {
  border-left: solid 2px #070d23;
}
.mic-icon {
  padding-left: 16px;
}

.search button,
.category button {
  background: none;
  border: none;
  padding: 6px 12px;
  background: #222c4f;
  border-radius: 8px;
  font-size: 12px;
}
.search input {
  flex-grow: 1;
  padding: 0 14px;
}

input {
  background: none;
  border: none;
  outline: none;
}
.category {
  margin-top: 32px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 12px;
  justify-content: center;
}

.ctg-list {
  list-style: none;
  display: flex;
  gap: 10px;
  width: 406px;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  align-items: center;
  justify-content: center;
}
.more-btn-box {
  padding-top: 10px;
  display: flex;
  justify-content: center;
}

.more-ctg-btn {
  padding: 6px 12px;
  background: #222c4f;
  border: none;
  border-radius: 8px;
  font-size: 12px;
  line-height: 14.52px;
  display: flex;

  cursor: pointer;
}
.more-btn-vct {
  height: 14px;
  width: 14px;
  padding: 0.5px 10.97px;
}
</style>
