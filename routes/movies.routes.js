const express = require("express");
const router = express.Router();

const Movie = require("../models/movie.model");
const Celebrity = require("../models/celebrity.model");

router.get("/movies/new", (req, res, next) => {
  Celebrity.find()
    .then((celebritiesFromDB) =>
      res.render("movies/new-movie.hbs", {
        celebritiesFromDB,
      })
    )
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
//================================================================================================
router.post("/movies/:id/delete", (req, res, next) => {
  Movie.findByIdAndRemove(req.params.id)
    .then(() => res.redirect("/movies"))
    .catch((err) => console.log(`Error deleting Movie: ${err}`));
});

//================================================================================================

// router.get("/movies/:id/edit", (req, res, next) => {
//   Movie.findById(req.params.Id)
//     .populate("cast")
//     .then((selectedMovie) => {
     
//       Celebrity.find()
//       .then(allCelebritiesFromDB => {
//         allCelebritiesFromDB.forEach(singleCeleb => {
//           selectedMovie.cast.forEach(element => {
//             if (singleCeleb._id.equals(element._id)) {
              
//               singleCeleb.isInCast = true;
//             }
//           })
//         })
//         res.render("movies/edit-movies.hbs", {
//           selectedMovie,
//           allCelebritiesFromDB,
//         });
//       })
//      })
//     .catch((err) =>
//       console.log(`Error while editing the movie details from DB: ${err}`)
//     );
// });

router.get("/movies/:id/edit", (req, res, next) => {
  Movie.findById(req.params.id)
    .populate("cast")
    .then((foundMovie) => {
      Celebrity.find().then((allCelebritiesFromDB) => {
        allCelebritiesFromDB.forEach(oneCeleb => {
          foundMovie.cast.forEach(element => {
            if (oneCeleb._id.equals(element._id)) {
              oneCeleb.isInCast = true;
            }
          })
        })
        res.render("movies/edit-movie.hbs", {
          foundMovie,
          allCelebritiesFromDB
        });
      });
    })
    .catch((err) =>
      console.log(`Error while editing the movie details from DB: ${err}`)
    );
}); 

router.post("/movies/:id/update", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  Movie.findByIdAndUpdate(
    req.params.id,
    { title, genre, plot, cast },
    { new: true }
  )
    .then((editedMovie) => {
      // console.log("updated:", updatedBook);
      res.redirect(`/movies/${editedMovie.id}`);
    })
    .catch((err) =>
      console.log(`Error while saving the Movie updates: ${err}`)
    );
});

module.exports = router;
