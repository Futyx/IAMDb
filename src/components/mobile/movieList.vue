<script setup>

import { ref, onMounted, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import Loading from "./loading.vue";
 
const route = useRoute();
const movies = ref([]);
const searchQuery = ref(route.query.search || "");
const router = useRouter();

// console.log(category.value);
// console.log(searchQuery.value);

const fetchMovies = async () => {
  const response = await fetch(
    "https://moviesapi.codingfront.dev/api/v1/movies"
  );
  if (response.ok) {
    const result = await response.json();
    movies.value = result.data;
    // filterMovies();
  }
};
const filteredMovies = computed(() => {
  const searchTerm = searchQuery.value.toLowerCase();
  const searchProperties = ["title", "country", "year"];
  const category = route.query.category
    ? route.query.category.toLowerCase()
    : "";

  return movies.value.filter((movie) => {
    const matchesSearch = searchProperties.some((prop) =>
      movie[prop].toString().toLowerCase().includes(searchTerm)
    );
    const matchesCategory =
      !category || movie.genres.map((g) => g.toLowerCase()).includes(category);

    // console.log(matchesSearch);

    return matchesSearch && matchesCategory;
  });
});

onMounted(fetchMovies);
// watch(searchQuery, (newQuery) => {
//   console.log("Search query changed to:", newQuery);
// });

const goBack = () => {
  router.go(-1);
};
</script>
<template>
  <div class="movie-list">
    <div class="result">
      <div class="head">
        <router-link>
        <button @click="goBack" class="btn-back">
          <img src="@/assets/images/angle-left.svg" />
        </button>
        </router-link>
        <div class="head-title">
          <h2>Result</h2>

          <div class="head-query" v-if="searchQuery">
            for “{{ searchQuery }}”
          </div>
        </div>
      </div>
      <div class="search">
        <img src="@/assets/images/search.svg" />
        <input
          v-model="searchQuery"
          placeholder="Search Query"
          type="text"
          id="search"
        />
        <div class="mic-box">
          <img class="mic-icon" src="@/assets/images/microphone.svg" />
        </div>
      </div>
    </div>
    <!-- <div v-if="filteredMovies.length === 0">no movie found</div> -->
    <div v-if="filteredMovies">
      <div v-for="movie in filteredMovies" :key="movie.id" class="movie-box">
        <router-link
          :to="{ name: 'movie', params: { id: movie.id } }"
          class="movie-link"
        >
          <div class="movie-content">
            <div>
              <img class="movie-poster" :src="movie.poster" alt="" />
            </div>

            <ul>
              <li class="movie-info">
                <div class="movie-title">
                  <div class="name">
                    <h3>{{ movie.title }}</h3>
                  </div>
                  <div class="image"> 
                    <img
                      class="favorite"
                      src="@/assets/images/favorite.svg"
                      alt=""
                    />
                  </div>
                </div>
                <div class="ctg-box">
                  <div v-for="ctg in movie.genres" class="ctg">{{ ctg }}</div>
                </div>
                <div class="movie-detail">
                  <span>{{ movie.year }}</span>
                  <span>{{ movie.country }}</span>
                  <div class="rating">
                    <img
                      class="rate-star"
                      src="@/assets/images/star.svg"
                      alt=""
                    /><span>
                      {{ movie.imdb_rating }}
                    </span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </router-link>
      </div>
    </div>
    <div v-else>
      <Loading />
    </div>
  </div>
</template>
<style scoped>
.result {
  padding: 32px 12px;
}
.head {
  display: flex;
  justify-content: space-between;
}

.btn-back {
  padding: 10px;
  background: #222c4f;
  border: none;
  border-radius: 18px;
  height: 40px;
  width: 40px;
}
.head-title {
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  text-align: center;
}
h2 {
  /* font-weight: 700; */
  font-size: 18px;
  line-height: 21.78px;
}
.head-query {
  font-weight: 300;
  font-size: 12px;
  opacity: 40%;
}
.search {
  margin-top: 32px;
  background: #222c4f;
  padding: 12px 16px;
  border-radius: 16px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}
input {
  background: none;
  border: none;
  outline: none;
  flex-grow: 1;
  margin: 0 16px;
  color: white;
}
input::placeholder {
  color: #ffffff;
  opacity: 80%;
}
.mic-box {
  border-left: solid 2px #070d23;
}
.mic-icon {
  padding-left: 16px;
}

.movie-link {
  /* display: block;   */
  text-decoration: none;
  color: inherit;
}

.movie-box {
  /* cursor: pointer;   */
  /* margin-top: 32px;   */
  /* display: flex; */
  /* margin-top: 32px; */
  /* border: solid 1px red; */
}

.movie-content {
  /* padding: 10px;    */
  /* background-color: #222c4f;  */
  border-radius: 8px;
  display: flex;
}
h3 {
  font-size: 24px;
  line-height: 29.05px;
}
.ctg-box {
  display: flex;
  word-wrap: break-word; 
}
.ctg {
  font-weight: 300;
  opacity: 40%;
  font-size: 12px;
}

.movie-info {
  /* margin-left: 20px; */
}
ul li {
  list-style: none;
  margin: 0;
}
.movie-detail {
  /* border:solid 2px pink; */
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  opacity: 80%;
  line-height: 21.78px;
}
.movie-title {
  display: flex;
  justify-content: space-between;
  /* border: solid 1px rebeccapurple; */
  align-items: center;
  /* grid-template-columns: 1fr 1fr; */
  /* width: 264px; */
  /* flex-grow: 1; */
}

.movie-poster {
  width: 122px;
  height: 122px;
  border-radius: 18px;
  object-fit: cover;
  display: block;
  box-sizing: border-box;
}
.rate-star {
  margin-right: 6px;
  /* align-self: flex-end; */
  /* border: solid 1px rebeccapurple; */
}
.rating {
  margin-right: 20px;
}
.favorite {
  /* width: 24px; */
  margin-left: 10px;
  /* align-content: flex-end; */
}
</style>
