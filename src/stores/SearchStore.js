import { defineStore } from "pinia";
import { useMovieStore } from "./MovieStore";
import { ref } from "vue";

const url =
  "https:api.themoviedb.org/3/search/movie?api_key=068289f5cb41c3fad3680f30067e7efa&query=";

export const useSearchStore = defineStore("searchStore", () => {
  const loader = ref(false);
  const movies = ref([]);

  const getMovies = async (search) => {
    loader.value = true;
    movies.value = [];
    const res = await fetch(`${url}${search}`);
    const data = await res.json();
    data.results.forEach((el) => {
      movies.value.push({ ...el, isWatched: false, isAdd: false });
    });

    loader.value = false;
  };

  const addToUserMovies = (object) => {
    const movieStore = useMovieStore();

    if (object.isAdd === true) {
      object.isAdd = false;
      movieStore.movies = movieStore.movies.filter((el) => el.id !== object.id);
      return;
    }

    movieStore.movies.push({ ...object });

    object.isAdd = !object.isAdd;
  };

  return {
    loader,
    movies,
    getMovies,
    addToUserMovies,
  };
});
