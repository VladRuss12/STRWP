const MovieAPI = {
  movies: [
    { id: 1, title: "Ben Blocker", genre: "Teacher" },
    { id: 2, title: "Dave Defender", genre: "Student" },
    { id: 3, title: "Sam Sweeper", genre: "Teacher" },
    { id: 4, title: "Matt Midfielder", genre: "Student" },
    { id: 5, title: "William Winger", genre: "Student" },
    { id: 6, title: "Fillipe Forward", genre: "Rector" },
  ],

  // Получить все фильмы
  all: function () {
    return this.movies;
  },

  // Получить фильм по ID
  get: function (id) {
    return this.movies.find(movie => movie.id === id);
  },

  // Удалить фильм по ID
  delete: function (id) {
    this.movies = this.movies.filter(movie => movie.id !== id);
    return true;
  },

  // Добавить новый фильм
  add: function (movie) {
    if (!movie.id) {
      const maxId = this.movies.reduce((max, current) => (current.id > max ? current.id : max), 0);
      movie = { ...movie, id: maxId + 1 };
    }
    this.movies.push(movie);
    return movie;
  },

  // Обновить фильм по ID
  update: function (updatedMovie) {
    const index = this.movies.findIndex(movie => movie.id === updatedMovie.id);
    if (index !== -1) {
      this.movies[index] = { ...this.movies[index], ...updatedMovie };
      return this.movies[index];
    }
    return null; // Возвращаем null, если фильм не найден
  },
};

export default MovieAPI;
