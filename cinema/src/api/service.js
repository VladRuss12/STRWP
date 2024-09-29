const MovieAPI = {
    movies: [
      { id: 1, title: "Ben Blocker", genre: "Teacher" },
      { id: 2, title: "Dave Defender", genre: "Student" },
      { id: 3, title: "Sam Sweeper", genre: "Teacher" },
      { id: 4, title: "Matt Midfielder", genre: "Student" },
      { id: 5, title: "William Winger", genre: "Student" },
      { id: 6, title: "Fillipe Forward", genre: "Rector" },
    ],
    all: function () {
      return this.movies;
    },
    get: function (id) {
      const isMovie = (p) => p.id === id;
      return this.movies.find(isMovie);
    },
    delete: function (id) {
      const isNotDelMovie = (p) => p.id !== id;
      this.movies = this.movies.filter(isNotDelMovie);
      return true;
    },
    add: function (movie) {
      if (!movie.id)
        movie = {
          ...movie,
          id:
            this.movies.reduce((prev, current) => {
              return prev.id > current.id ? prev : current;
            }, 0).id + 1,
        };
      this.movies = [...this.movies, movie];
      return movie;
    },
    update: function (movie) {
      this.get();
      this.movies.shift(movie);
      return movie;
    },
  };
  export default MovieAPI;