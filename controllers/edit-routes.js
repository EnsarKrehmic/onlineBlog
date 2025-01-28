// Uvoz Express Routera i potrebnih modela
const router = require("express").Router();
const { Post } = require("../models");
// Middleware za autentifikaciju korisnika
const withAuth = require("../utils/auth");

// Ruta za prikaz stranice za uređivanje posta
router.get("/:id", withAuth, async (req, res) => {
    try {
        // Dohvatanje posta prema ID-u sa parametra URL-a
        const postData = await Post.findByPk(req.params.id);
        const post = postData.get({ plain: true });

        // Provjera da li post postoji
        if (post) {
            // Ako post postoji, renderuj stranicu za uređivanje sa podacima o postu
            res.render("edit", {
                loggedIn: req.session.loggedIn, // Provjera da li je korisnik prijavljen
                loggedInUserData: req.session.loggedInUserData, // Podaci o prijavljenom korisniku
                postData: post, // Podaci o postu koji se uređuje
            });
        } else {
            // Ako post ne postoji, preusmjeri korisnika na dashboard
            res.redirect("/dashboard");
        }
    } catch (err) {
        // U slučaju greške, vraćanje 500 statusa sa greškom
        res.status(500).json(err);
    }
});

// Eksportovanje rute
module.exports = router;