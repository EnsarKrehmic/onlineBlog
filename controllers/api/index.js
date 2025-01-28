// Uvoz Express Routera
const router = require("express").Router();

// Uvoz specifičnih ruta za korisnike, postove i komentare
const userRoutes = require("./user-routes.js");
const postRoutes = require("./post-routes.js");
const commentRoutes = require("./comment-routes.js");

// Prosljeđivanje svake API rute odgovarajućem routeru
router.use("/user", userRoutes); // Rute za korisnike
router.use("/post", postRoutes); // Rute za postove
router.use("/comment", commentRoutes); // Rute za komentare

// Eksportovanje glavnog routera sa svim API rutama
module.exports = router;
