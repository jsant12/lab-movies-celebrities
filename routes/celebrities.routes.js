const express = require("express");
const router = express.Router();

const Celebrity = require("../models/celebrity.model");

router.get("/celebrities/new", (req, res, next) =>
  res.render("celebrities/new-celebrity.hbs")
);

router.post("/celebrities/create", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.create({ name, occupation, catchPhrase })
    .then(res.redirect("/celebrities"))
    .catch((err) => console.log(`Error creating new Celeb: ${err}`));
  res.redirect("back");
});

router.get("/celebrities", (req, res, next) => {
    Celebrity.find()
      .then((celebritiesFromDB) =>
        res.render("celebrities/celebrities.hbs", { celebritiesFromDB })
      )
      .catch((err) => console.log(`Error displaying new Celeb: ${err}`));
    
});

module.exports = router;
