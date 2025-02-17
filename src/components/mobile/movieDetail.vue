<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
const route = useRoute();
const movieId = route.params.id;
const movie = ref(null);
const router = useRouter();
const background = movie.images;


const fetchMovieDetails = async () => {
  const response = await fetch(
    `https://moviesapi.codingfront.dev/api/v1/movies/${movieId}`
  );
  const movieDetails = await response.json();
  movie.value = movieDetails;
  console.log(movie);
  const goBack = () => {
    router.go(-1);
  };
};

fetchMovieDetails();
</script>
<template>
  <div class="movie-container">
    <div class="back-poster" :style="{ background: `url(${movie?.images})` }" >
      <div class="movie-detail-container">
        <button @click="goBack" class="btn-back">
          <img src="@/assets/images/angle-left.svg" />
        </button>

        <div class="movie-name">
          <h1>
            {{ movie.title }}
          </h1>
        </div>
        <div class="movie-ctg" v-for="genre in movie.genres">
          <div>{{ genre }}</div>
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
            stroke-width="10"
            fill="none"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="#6a00ff"
            stroke-width="10"
            stroke-dasharray="283"
            stroke-dashoffset="{{ movie.imdb_rating }}"
            stroke-linecap="round"
            transform="rotate(-90 50 50)"
          />
          <circle cx="50" cy="50" r="38" fill="black" />
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
      <button class="add-fav-btn">Add to Favorite</button>
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
object-fit:contain;
background: linear-gradient(180deg, rgba(7, 13, 35, 0) 0%, rgba(7, 13, 35, 0.7) 28.5%, rgba(7, 13, 35, 0.9) 60%, #070D23 99%);

}
.movie-poster {
  /* background: red; */
}

.btn-back {
  padding: 10px;
  background: #222c4f;
  border: none;
  border-radius: 18px;
  height: 40px;
  width: 40px;
}
.movie-name {
  margin-top: 100px;
}
.movie-image{
  width: 100%;
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
  /* font-family: 'inter'; */
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

  /* background: red; */
  /* border: solid 2px red; */
}
.rating .imdb {
  margin: 13.5px 0 13.5px 18px;
  /* font-family: ; */
}
.rating .other {
  opacity: 50%;
  font-weight: 400;
  font-size: 13px;
  line-height: 24px;
  margin-left: 53px;
  margin-top: 16px;
  /* margin-bottom: 16px; */
  /* margin: 16px 53px 16px 0; */
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
.add-fav-box {
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

  position: fixed;
  bottom: 0;
  left: 124px;
  /* margin: auto; */
  /* position: absolute; */
}
.poster-box {
  display: flex;
  justify-content: center;
  align-items: center;
  /* position: relative; */
}
.details {
  padding: 10px;
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
  /* padding: 8px;   */
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
/* .circle-rating{ 
    width:10px;
    height: 100px;
    border-radius: 50%;
    background: conic-gradiant(#6a00ff 91%, #333 0%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: bold;
    color: white;
    position: relative;
}
.circle-rating::after{
    content: "";
    width: 70%;
    height: 70%;
    background: black;
    position: absolute;
    border-radius: 50%;
} */
</style>
