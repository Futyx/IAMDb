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

            <div class="movie-info">
              <div class="movie-title">
                <div class="movie-name">
                  <h3>{{ movie.title }}</h3>
                </div>
                <div class="fav-box">
                  <img
                    class="favorite"
                    src="@/assets/images/favorite.svg"
                    alt=""
                  />
                </div>
              </div>
              <div class="ctg-box">
                <span
                  v-for="(genre, index) in movie.genres"
                  :key="index"
                  class="genre"
                >
                  {{ genre
                  }}
                </span>
              </div>
              <div class="movie-detail">
                <span>{{ movie.year }}</span>
                <div class="circle"></div>
                <span class="country">{{ movie.country }}</span>
                <div class="circle"></div>
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
            </div>
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
  text-decoration: none;
  color: inherit;
}


.movie-content {
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

.circle {
  width: 6px;
  height: 6px;
  background: #222c4f;
}
.movie-info {

  flex-grow: 1;
  margin-left: 20px;

}

.movie-detail {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  opacity: 80%;
  line-height: 21.78px;
  align-items: center;

}

.movie-name {
  flex-grow: 1;
}
.movie-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 2;
}
.genre {
  display: inline;
  font-weight: 300;
  opacity: 40%;
  font-size: 12px;

}
.genre:not(:first-child){
  padding-left: 5px;

}
.genre:not(:last-child)::after {
  content: ", "; 
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
}
.rating {

  white-space: nowrap;
}

</style>
