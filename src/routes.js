import home from "./components/home.vue";
import movieList from "./components/movieList.vue";
import movieDetailsMobile from "./components/movieDetailsMobile.vue";
import movieDetailsScreen from "./components/movieDetailsScreen.vue";
import MovieDetailsMobile from "./components/movieDetailsMobile.vue";
import MovieDetailsScreen from "./components/movieDetailsScreen.vue";
// import movieDetail from "./components/movieDetail.vue";
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
    component: MovieDetailsScreen,
    props: true,
  },
  // {
  //   path: "/movie/:name",
  //   name: "movieDetail",
  //   component: MovieDetail
  // }
];

export default routes;
