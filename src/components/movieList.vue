<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import Loading from "./loading.vue";
import { useMovieStore } from "@/stores/movieStore";
import { useInfiniteScroll } from "@vueuse/core";

const route = useRoute();
const searchQuery = ref(route.query.search || "");
const router = useRouter();
const movieStore = useMovieStore();
const currentPage = ref(1);
const totalPages = ref(1);
const scrollTarget = ref(null);
const hoverState = ref({});
const clickedState = ref({});
const isLoading = ref(false);
const movies = ref([]);


const fetchMovies = (page = 1) => {
  if (isLoading.value) return; 
  isLoading.value = true;
  
  movieStore.fetchMovies(page).then(() => {
    movies.value = movieStore.movies; 
    totalPages.value = movieStore.totalPages; 
    isLoading.value = false; 
  });
};

onMounted(() => {
  fetchMovies(currentPage.value);
});

const loadMoreMovies = () => {
 
  if (currentPage.value < totalPages.value && !isLoading.value) {
    currentPage.value += 1;
    fetchMovies(currentPage.value);
  }
};

useInfiniteScroll(scrollTarget, loadMoreMovies, { distance: 50 }); // Trigger load more when near the bottom


onMounted(() => {
  movieStore.fetchMovies();
});




const filteredMovies = computed(() => {
  const searchTerm = searchQuery.value.toLowerCase();
  const searchProperties = ["title", "country", "year", "genres"];
  const category = route.query.genres ? route.query.genres.toLowerCase() : "";

  return movieStore.movies.filter((movie) => {
    const matchesSearch = searchProperties.some((prop) =>
      movie[prop].toString().toLowerCase().includes(searchTerm)
    );
    const matchesCategory =
      !category || movie.genres.map((g) => g.toLowerCase()).includes(category);

    return matchesSearch && matchesCategory;
  });
});

const goBack = () => {
  router.go(-1);
};

const isFavorite = (movie) => {
  return movieStore.favorites.some((fav) => fav.id === movie.id);
};
const toggleFavorite = (movie) => {
  movieStore.toggleFavorite(movie);
  clickedState.value[movie.id] = true;
};
</script>

<template>
  <div  class="movie-list" ref="scrollTarget">
    <div class="result">
      <div class="head">
          <button @click="goBack" class="btn-back">
            <img src="@/assets/images/angle-left.svg" />
          </button>
        <div class="head-title">
          <h1>Result</h1>

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
        <RouterLink
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
                  <h2>{{ movie.title }}</h2>
                </div>
              </div>
              <div class="genre-box">
                <span
                  v-for="(genre, index) in movie.genres"
                  :key="index"
                  class="genre"
                >
                  {{ genre }}
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
        </RouterLink>
        <div class="fav-box">
          <img
            class="favorite"
            :src="
              hoverState[movie.id] && !clickedState[movie.id]
                ? '/src/assets/images/Fav-Hover.svg'
                : isFavorite(movie)
                ? '/src/assets/images/Fav-Liked.svg'
                : '/src/assets/images/Fav-Idle.svg'
            "
            @click="toggleFavorite(movie)"
            @mouseenter="hoverState[movie.id] = true"
            @mouseleave="hoverState[movie.id] = false"
          />
        </div>
      </div>
    </div>
    <div v-else>
      <Loading />
    </div>
  </div>
</template>

<style scoped>
.movie-list {
  max-width: 920px;
  margin: auto;
  padding: 50px 20px;
}

.head {
  display: flex;
  justify-content: space-between;
}

.btn-back {
  padding: 10px;
  background: var(--secondary-color);
  border: none;
  border-radius: 18px;
  height: 40px;
  margin-top: 0;
  width: 40px;
}
.movie-box {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  border-bottom: solid 1px var(--secondary-color);
  padding-bottom: 20px;
}
.head-title {
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  text-align: center;
}
h1 {
  font-size: 18px;
  line-height: 21.78px;
}
.head-query {
  font-weight: 300;
  font-size: 12px;
  opacity: 40%;
}
.search {
  margin: 32px 0;
  background: var(--secondary-color);
  /* width: 100%; */
  padding: 12px 16px;
  border-radius: 16px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  align-items: center;
}

input {
  background: none;
  border: none;
  outline: none;
  flex-grow: 1;
  margin: 0 16px;
  color: white;
  width: 50%;
}
input::placeholder {
  color: #ffffff;
  opacity: 80%;
}
.mic-box {
  border-left: solid 2px var(--primary-color);
}
.mic-icon {
  padding-left: 16px;
}

.movie-link {
  text-decoration: none;
  color: inherit;
  flex-grow: 1;
}

.movie-content {
  border-radius: 8px;
  display: flex;
}
h2 {
  font-size: 24px;
  line-height: 29.05px;
}
.genre-box {
  display: flex;
  word-wrap: break-word;
}

.circle {
  width: 6px;
  height: 6px;
  background: var(--primary-color);
  border-radius: 50%;
}
.movie-info {
  flex-grow: 1;
  margin-left: 20px;
  position: relative;
  padding-top: 10px;
}

.movie-detail {
  display: flex;
  flex-wrap: wrap;
  /* text-wrap: nowrap; */
  margin-top: 10px;
  width: 100%;
  opacity: 80%;
  line-height: 21.78px;
  align-items: center;
  gap: 12px;
  font-size: 18px;
}

.movie-name {
  flex-grow: 1;
}

.genre {
  display: inline;
  font-weight: 300;
  opacity: 40%;
  font-size: 12px;
  line-height: 16.52px;
}
.genre:not(:first-child) {
  padding-left: 5px;
}
.genre:not(:last-child)::after {
  content: ", ";
}

.movie-poster {
  width: 137px;
  height: 137px;
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
.favorite {
  display: block;
  width: 24px;
  cursor: pointer;
  margin: 7px;
  transition: transform 0.3s ease;
}
.favorite.hovered {
  transform: scale(1.1);
}

.favorite:active {
  opacity: 1;
}

@media (max-width: 700px) {
  .movie-list {
    padding-top: 35px;
  }
  .movie-poster {
    width: 127px;
    height: 127px;
  }
  .movie-info {
    padding-top: 10px;
  }
  h2 {
    font-size: 24px;
    line-height: 29.05px;
  }
}

@media (max-width: 400px) {
  .movie-poster {
    width: 122px;
    height: 122px;
  }

  h2 {
    font-size: 22px;
    line-height: 25.05px;
  }
}
</style>
