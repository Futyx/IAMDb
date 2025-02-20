<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
const route = useRoute();
const movieId = route.params.id;
const movie = ref(null);
const router = useRouter();

const fetchMovieDetails = async () => {
  const response = await fetch(
    `https://moviesapi.codingfront.dev/api/v1/movies/${movieId}`
  );
  const movieDetails = await response.json();
  movie.value = movieDetails;
  console.log(movie);
};
const goBack = () => {
  router.go(-1);
};

fetchMovieDetails();


const getStrokeDashoffset = (rating) => {  
  const circumference = 2 * Math.PI * 40; 
  const offset = circumference - (rating * circumference) / 10; 
  return offset;  
};
</script>
<template>
  <div class="movie-container">
    <div class="hero">
      <div class="hero-img-container">
        <img
          class="hero-img"
          :src="movie.images"
          :alt="movie.title"
          :title="movie.title"
        />
        <div class="gradient-overlay"></div>
      </div>
      <!-- <div class="back-poster" :style="{ background: `url(${movie?.images})` }"> -->
      <div class="hero-detail-container">
        <button @click="goBack" class="btn-back">
          <img src="@/assets/images/angle-left.svg" />
        </button>

        <div class="movie-name">
          <h1>
            {{ movie.title }}
          </h1>
        </div>
        <div class="genres">
          <div class="movie-ctg">
            {{ movie.genres.join(", ") }}
          </div>
        </div>

        <p class="movie-plot">
          {{ movie.plot }}
        </p>
      </div>
    </div>

    <div class="more-info">
      <div class="box">PG-13</div>
      <div class="box">{{ movie.year }}</div>
      <div class="box runtime">
        <img src="@/assets/images/duration.svg" alt="" />
        <div>{{ movie.runtime }}</div>
      </div>
    </div>
    <div class="rating">
      <div>
        <svg width="100" height="100" view-box="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="#333"
            stroke-width="6"
            fill="none"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="#6a00ff"
            stroke-width="6"
            stroke-dasharray="251.33"
            :stroke-dashoffset="getStrokeDashoffset(movie.imdb_rating)"
            stroke-linecap="round"
            transform="rotate(-90 50 50)"
            fill="none"

          />
          <circle cx="50" cy="50" r="28" fill="black" />
          <text
            class="rate-value"
            x="50"
            y="55"
            text-anchor="middle"
            fill="white"
          >
            {{ movie.imdb_rating }}
          </text>
        </svg>
      </div>
      <!-- <div class="circle-rating">9.1</div> -->

      <div class="imdb">
        <div>{{ movie.imdb_votes }}</div>
        <div>ratings on IMDB</div>
      </div>
      <div class="other">
        <div>94% on Rotten Tomatoes</div>
        <div>{{ movie.metascore }}/100 on Metacritic</div>
      </div>
    </div>

    <div class="add-fav-box">
      <div class="poster-box">
        <img class="poster" :src="movie.poster" alt="" />
      </div>
      <button @click="" class="add-fav-btn">Add to Favorite</button>
    </div>
    <div class="details">
      <h4>Details</h4>
      <table>
        <tr>
          <th class="left">Directors</th>
          <td>{{ movie.director }}</td>
        </tr>
        <tr>
          <th>Writers</th>
          <td>{{ movie.writer }}</td>
        </tr>
        <tr>
          <th>Actors</th>
          <td>{{ movie.actors }}</td>
        </tr>
        <tr>
          <th>Country</th>
          <td>{{ movie.country }}</td>
        </tr>
        <tr>
          <th>Language</th>
          <td>{{ movie.language }}</td>
        </tr>
        <tr>
          <th>Awards</th>
          <td>{{ movie.awards }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<style scoped>
.movie-container {
  margin-bottom: 100px;
}
.back-poster {
  width: 100%;
  height: 400px; 
  background-size: cover; 
  background-position: center;
  background-repeat: no-repeat;
  position: relative; 
  overflow: hidden; 
}
.movie-poster {
}
.genres {
  display: flex;
}
.hero-detail-container{
  padding: 12px;
  position: relative;
  margin-top: 20px;
}

.btn-back {
  padding: 10px;
  background: #222c4f;
  border: none;
  border-radius: 18px;
  height: 40px;
  width: 40px;
}
.movie-name h1 {
  margin-top: 100px;
  font-size: 48px;
  font-weight: 700;
  line-height: 58.09px;
 
}
.gradient-overlay {  
  position: absolute;
  top: 0;  
  left: 0;  
  right: 0;  
  bottom: 0;  
  background: linear-gradient(  
    180deg,  
    rgba(7, 13, 35, 0) 0%,  
    rgba(7, 13, 35, 0.7) 28.5%,  
    rgba(7, 13, 35, 0.9) 60%,  
    #070D23 99%  
  ); }

.hero-img {
  position: absolute;
  width: 160%;
  object-position: -130px;
}
.hero {
  overflow: hidden;
  position: relative;
}
.movie-ctg {
  font-weight: 300;
  font-size: 12px;
  line-height: 14.52px;
  opacity: 40%;
}
.movie-plot {
  width: 406px;
  font-weight: 400;
  line-height: 24px;
  font-size: 14px;
  color: white;
  opacity: 60%;
  margin-top: 18px;
  text-align: justify;
}
.more-info {
  margin: 18px 0;
  display: flex;
  gap: 12px;
  font-size: 12px;
  padding: 0 12px;
}
.more-info .box {
  background: #222c4f;
  padding: 6px 12px;
  border-radius: 8px;
}
img {
  display: block;
}
.runtime {
  display: flex;
  gap: 6px;
}

.rating {
  display: flex;
  white-space: nowrap;
  padding: 0 12px;
}
.rating .imdb {
  margin: 13.5px 0 13.5px 18px;
}
.rating .other {
  opacity: 50%;
  font-weight: 400;
  font-size: 13px;
  line-height: 24px;
  margin-left: 53px;
  margin-top: 16px;
 
}
.imdb :nth-child(1) {
  opacity: 80%;
  font-weight: 700;
  font-size: 16px;
  line-height: 18.75px;
  padding-top: 6px;
  padding-bottom: 6px;
}
.imdb :nth-child(2) {
  font-weight: 400;
  opacity: 60%;
  font-size: 14px;
  line-height: 16.41px;
}
.rate-value {
  font-weight: 700;
  font-size: 24px;
  line-height: 29.05px;
}
.poster {
  border-radius: 18px;
  margin-top: 18px;
  width: 406px;
  text-align: center;
}

.add-fav-btn {
  background: #724cf9;
  border-radius: 12px;
  width: 406px;
  padding: 12px 0 12px;
  color: white;
  font-weight: 400;
  font-size: 14px;
  border: none;
cursor: pointer;
  position: fixed;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
}
.poster-box {
  display: flex;
  justify-content: center;
  align-items: center;
}
.details {
  padding: 12px;
}
h4 {
  margin-bottom: 24px;
  margin-top: 24px;
}
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  text-align: left;
  border-bottom: 1px solid #ccc;
  padding: 12px 10px;
}

tr:last-child th,
tr:last-child td {
  border-bottom: none;
}
td {
  font-weight: 400;
  line-height: 24px;
  font-size: 14px;
  color: white;
  opacity: 60%;
}
th {
  opacity: 80%;
  font-weight: 700;
  font-size: 16px;
  line-height: 18.75px;
}

</style>
