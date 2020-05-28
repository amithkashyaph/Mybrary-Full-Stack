const express = require("express");
const router = express.Router();
const Author = require("../models/author");

// GET All authors
router.get("/", async (req, res) => {
  let searchOptions = {};
  if (req.query.name !== null && req.query.name !== "") {
    searchOptions.name = new RegExp(req.query.name, "i");
  }
  try {
    const authors = await Author.find(searchOptions);
    res.render("authors/index", {
      authors: authors,
      searchOptions: req.query,
    });
  } catch {
    res.redirect("/");
  }
});

// GET New author
router.get("/new", (req, res) => {
  res.render("authors/new", { author: new Author() });
});

// Create new author
router.post("/", async (req, res) => {
  const author = new Author({
    name: req.body.name,
  });

  try {
    const newAuthor = await author.save();
    res.redirect("/authors");
  } catch {
    res.render("authors/new", {
      author: author,
      errorMessage: "Error creating a new Author. Try again.",
    });
  }

  //   author.save((err, newAuthor) => {
  //     if (err) {
  //
  //     } else {
  //       res.redirect("authors");
  //       //   res.redirect(`/authors/${newAuthor.id}`);
  //     }
  //   });
});
module.exports = router;
