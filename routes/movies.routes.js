const express = require("express");
const router = express.Router();

const Movie = require("../models/movie.model");
const Celebrity = require("../models/celebrity.model");

router.get("/movies/new", (req, res, next) => {
  Celebrity.find()
    .then((celebritiesFromDB) => res.render("movies/new-movie.hbs", {
      celebritiesFromDB
    }))
    .catch((err) => console.log(`Error displaying Celebrity info: ${err}`));
});

router.post("/movies/create", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  Movie.create({ title, genre, plot, cast })
    .then(res.redirect("/movies"))
    .catch((err) => console.log(`Error creating new Movie: ${err}`));
  res.redirect("back");
});

router.get("/movies", (req, res, next) => {

  Movie.find()
  .then((moviesFromDB) => res.render("movies/movies.hbs", { moviesFromDB }))

    .catch((err) => console.log(`Error displaying new Movie: ${err}`));
});

//===============================================================================================

router.get("/movies/:id", (req, res, next) => {
  Movie.findById(req.params.id)
    .populate("cast", "name -_id")
    .then((selectedMovie) =>
      res.render("movies/movie-details.hbs", { selectedMovie })
    )

    .catch((err) => console.log(`Error displaying new Movie: ${err}`));
});

module.exports = router;