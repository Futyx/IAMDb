<script setup>
9
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
  // console.log(movies.value[0].title);
  // array.forEach(element => {
    
  // });

  // genres.value = result.genres;
  //   console.log(movies.value.data);
getGenres();


};
const getGenres = () => {  
  const allGenres = movies.value.flatMap(movie => movie.genres );  
  genres.value = Array.from(new Set(allGenres.map(genre => genre.trim())));  
  console.log(genres.value);  
};  
fetchMovies();


const search = computed(() => {
  return movies.filter((movie) => {
    //     const jobsFiltered = person.jobs.some(job => job.toLowerCase().includes(query.value.toLowerCase().trim()));
    const query = movie.name
      .toLowerCase()
      .includes(query.value.toLowerCase().trim());
    //     return jobsFiltere || name;
  });
});
</script>

<template>
  <div class="home">
    <h1>IAMDb</h1>
    <div class="search">
      <img src="@/assets/images/search.svg" />
      <input v-model="query" type="text" id="search" />
      <div class="mic-box">
        <img class="mic-icon" src="@/assets/images/microphone.svg" />
      </div>
    </div>
    <div class="category">
      <ul class="ctg-list">
        <li  v-for="(genre, index) in (showMore ? genres : genres.slice(0, 4))" :key="genre" class="ctg-item">
          {{ genre }}
        </li>
      </ul>
    </div>
   
    <div class="more-btn-box">
      <button @click="showMore = !showMore" class="more-ctg-btn">  
      <div>{{ showMore ? 'Show Less' : 'Show More' }}</div>  
      <div class="more-btn-vct">  
        <img src="@/assets/images/Vector.svg" />  
      </div>  
    </button>  
    </div>
  </div>
</template>
<style scoped>
.home {
  margin-top: 304px;
}
.search {
  margin-top: 32px;
  background: #222c4f;
  padding: 12px 16px;
  border-radius: 16px;
  display: flex;
  justify-content: space-between;
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
input {
  background: none;
  border: none;
  outline: none;
  color: white;
}
.category {
  margin-top: 32px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 12px;
  justify-content: center;
}
.ctg-item {
  padding: 6px 12px;
  background: #222c4f;
  border-radius: 8px;
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
  color: white;
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
