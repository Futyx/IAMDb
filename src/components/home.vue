<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
// import fetchMovies from "@/compositions/Api";
import { useMovieStore } from "@/stores/movieStore"; // Import the store


const movieStore = useMovieStore();

const query = ref("");
const movies = ref([]);
const genres = ref([]);
const showMore = ref(false);
const recognition = ref(null); 


const router = useRouter();
const route = useRoute();

const search = () => {
  router.push({ path: "/movies", query: { search: query.value } });
};

onMounted(() => {
  movieStore.fetchMovies();
});
const findCtg = (genre) => {
  router.push({ path: "/movies", query: { category: genre } });
  // console.log(genre);
};

const setupRecognition = () => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (SpeechRecognition) {
    recognition.value = new SpeechRecognition();
    recognition.value.continuous = false;
    recognition.value.interimResults = false;

    recognition.value.onresult = (event) => {
      query.value = event.results[0][0].transcript;
      search();
    };

    recognition.value.onerror = (event) => {
      console.error("Speech recognition error", event.error);
    };
  } else {
    console.error("Speech recognition not supported in this browser.");
  }
};

setupRecognition();

const startListening = () => {
  if (recognition.value) {
    query.value = "";
    recognition.value.start();
  }
};
</script>

<template>
  <div class="home-container">
    <h1>IAMDb</h1>
    <div class="search">
      <button @click="search">
        <img src="@/assets/images/search.svg" />
      </button>
      <input v-model="query" type="text" id="search" @keydown.enter="search" />
      <div class="mic-box">
        <button @click="startListening">
          <img class="mic-icon" src="@/assets/images/microphone.svg" />
        </button>
      </div>
    </div>
    <div class="genre-box">
      <div class="genre">
        <ul class="genre-list">
          <li
            v-for="(genre, index) in showMore ? movieStore.genres : movieStore.genres.slice(0, 4)"
            :key="genre"
            class="genre-item"
          >
            <button @click="findCtg(genre)">{{ genre }}</button>
          </li>
        </ul>
      </div>

      <div class="more-btn-box">
        <button @click="showMore = !showMore" class="more-genre-btn">
          <div>{{ showMore ? "Show Less" : "Show More" }}</div>
          <div class="more-btn-vct">
            <img src="@/assets/images/Vector.svg" />
          </div>
        </button>
      </div>
    </div>
  

    <!-- <movie-list :movies="filteredMovies" />   -->
  </div>
</template>
<style scoped>
* {
  color: white;
  
}
.home-container {
  padding: 0 12px;
  max-width: 980px;
  margin: 304px auto;

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
.mic-box button {
  cursor: pointer;
}
.mic-icon {
  padding-left: 16px;
}

.search button,
.genre button {
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
.genre {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 12px;
  justify-content: center;
}
.genre-box{
  margin-top: 32px;
}

.genre-list {
  list-style: none;
  display: flex;
  gap: 10px;
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

.more-genre-btn {
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

@media screen and (min-width: 1280px) {
  .home-container{

  }
  h1 {
    font-size: 140px;
    line-height: 169.43px;
  }
  .genre-box{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
  .more-btn-box{
    padding: 0;
  }
 
}
</style>
