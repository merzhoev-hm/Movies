import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";

import { useSearchStore } from "@/stores/SearchStore";

export const useMovieStore = defineStore("movieStore", () => {
  const movies = ref([]);
  const activeTab = ref(2);

  const moviesInLocalStorage = localStorage.getItem("movies");
  if (moviesInLocalStorage) {
    movies.value = JSON.parse(moviesInLocalStorage);
  }

  const watchedMovies = computed(() =>
    movies.value.filter((movie) => movie.isWatched)
  );

  const totalCountMovies = computed(() => movies.value.length);

  const setActiveTab = (id) => {
    activeTab.value = id;
  };

  const toggleWatched = (movieId) => {
    movies.value.forEach((el) => {
      if (el.id === movieId) {
        el.isWatched = !el.isWatched;
      }
    });
  };

  const deleteMovie = (movieId) => {
    const searchStore = useSearchStore();

    movies.value = movies.value.filter((el) => el.id !== movieId);

    searchStore.movies.forEach((el) => {
      if (movieId === el.id) {
        el.isAdd = !el.isAdd;
      }
    });
  };

  watch(
    movies,
    (state) => {
      localStorage.setItem("movies", JSON.stringify(state));
    },
    { deep: true }
  );

  return {
    movies,
    activeTab,
    watchedMovies,
    totalCountMovies,
    toggleWatched,
    deleteMovie,
    setActiveTab,
  };
});
