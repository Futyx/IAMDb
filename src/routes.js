import home from "./components/mobile/home.vue";
import movieList from "./components/mobile/movieList.vue";
import MovieDetail from "./components/mobile/movieDetail.vue";
const routes = [
  {
    path: "/",
    component: home,
  },
  { path: "/movies", component: movieList },
  {
    path: "/search",
    component: movieList,
  },
  {
    path: "/movie/:id",
    name: "movie",
    component: MovieDetail,
  },
];

export default routes;
