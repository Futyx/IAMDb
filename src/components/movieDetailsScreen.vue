<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
const route = useRoute();
const movieId = route.params.id;
const movie = ref(null);
const router = useRouter();
const mediaQuery = window.matchMedia("(min-width: 600px)");

if (mediaQuery.matches) {
  // Code to execute when the viewport is 600px or wider
  console.log("Screen is 1000px or wider");
} else {
  // Code to execute when the viewport is smaller than 600px
  console.log("Screen is smaller than 600px");
}

const fetchMovieDetails = async () => {
  const response = await fetch(
    `https://moviesapi.codingfront.dev/api/v1/movies/${movieId}`
  );
  const movieDetails = await response.json();
  movie.value = movieDetails;
  console.log(movie.value);
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
  <div class="hero-container">
    <div v-if="movie" class="movie-poster" :style="{ backgroundImage: `url(${movie.images})` }">
      <!-- <img :src="movie.images" :alt="movie.title" :title="movie.title" /> -->
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
    <div class="gradient"></div>
  </div>
  <div class="container">
    <div class="goback">
      <button @click="goBack" class="btn-back">
        <img src="@/assets/images/angle-left.svg" />
      </button>
    </div>
    <div class="flex-box gap">
      <section class="image-rate">
        <div class="poster-box">
          <img class="poster" :src="movie.poster" alt="" />
        </div>
        <div class="rating">
          <div class="flex-box">
            <div class="svg-container">
              <svg width="100" height="100" viewBox="0 0 100 100">
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

            <div class="imdb">
              <div>{{ movie.imdb_votes }}</div>
              <div>ratings on IMDB</div>
            </div>
          </div>

          <div class="other">
            <div>94% on Rotten Tomatoes</div>
            <div>{{ movie.metascore }}/100 on Metacritic</div>
          </div>
        </div>
      </section>
      <section class="details">
        <div class="flex-box space">
          <div class="movie-name">
            <h1>
              {{ movie.title }}
            </h1>
          </div>
          <img class="favorite" src="@/assets/images/Favorite.svg" alt="favorite" />
        </div>

        <div class="genres">
          <div class="movie-genre">
            {{ movie.genres.join(", ") }}
          </div>
        </div>
        <p class="movie-plot">
          {{ movie.plot }}
        </p>
        <div class="more-info">
          <div class="box">PG-13</div>
          <div class="box">{{ movie.year }}</div>
          <div class="box runtime">
            <img src="@/assets/images/duration.svg" alt="" />
            <div>{{ movie.runtime }}</div>
          </div>
        </div>
        <div class="detail-list">
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
      </section>
    </div>
  </div>
</template>
<style scoped>
.container {
  position: relative;
  top: -330px;
  width: 920px;
  margin: 0 auto;
  z-index: 3;
}

.hero-container {
  position: relative;
  width: 100%;
  height: 400px; 
  overflow: hidden; 
}
.movie-poster{
  width: 100%;  
    height: 400px;   
    background-size: cover;  
    background-position: center;  
}

.movie-poster img {
  width: 100%; 
  height: auto; 
  display: block; 
  position: absolute;
  top: -170px;
}

.gradient {
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
    #070d23 99%
  );
  z-index: 2;
}
.flex-box {
  display: flex;
}
.gap {
  gap: 70px;
}
.space{
  justify-content: space-between;
}
.btn-back {
  padding: 10px;
  background: #222c4f;
  border: none;
  border-radius: 18px;
  height: 40px;
  width: 40px;
  margin-bottom: 100px;
}
.image-rate {
  /* background: palegreen; */
  /* flex-grow: 1; */
}
.details {
  /* background: palevioletred; */
  /* flex-grow: 1; */
  width: auto;
}
.genres {
  display: flex;
}
.movie-name h1 {
  padding: 0;
  font-size: 48px;
  font-weight: 700;
  line-height: 58.09px;
}
.movie-genre {
  font-weight: 300;
  font-size: 12px;
  line-height: 14.52px;
  opacity: 40%;
}
.movie-plot {
  /* width: 406px; */
  font-weight: 400;
  line-height: 24px;
  font-size: 14px;
  color: white;
  opacity: 60%;
  margin-top: 18px;
  text-align: justify;
  max-width: 90%;
  /* margin: 0 auto; */
}
.poster {
  width: 208px;
}
.more-info {
  margin: 18px 0;
  display: flex;
  gap: 12px;
  font-size: 12px;
}
.more-info .box {
  background: #222c4f;
  padding: 6px 12px;
  border-radius: 8px;
}
.runtime {
  display: flex;
  gap: 6px;
}
.rating {
  white-space: nowrap;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 30px 0;
}
svg {
  display: block;
}

.rating .imdb {
  margin: 13.5px 0 13.5px 18px;
}
.rating .other {
  opacity: 50%;
  font-weight: 400;
  font-size: 13px;
  line-height: 24px;
  
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

h4 {
  font-size: 28px;
 
}
table {
  width: 100%;
  margin-top: 6px;
  border-collapse: collapse;
  
}

th,
td {
  text-align: left;
  border-bottom: 1px solid #222C4F;
  padding: 12px 0;
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
/* @media (max-width: 768px) {  
    .movie-plot {  
        max-width: 25%;   
    }  
}  
@media (max-width: 1440px) {  
    .movie-plot {  
        max-width: 100%;  
    }  
} 
@media (max-width: 1024px) {  
  .movie-plot {  
        max-width: 80%; 
    }  }  */

 
</style>
