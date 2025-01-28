// Uvoz Express Routera, modela Post i User, kao i middleware-a za autentifikaciju
const router = require("express").Router();
const { Post, User } = require("../models");
const withAuth = require("../utils/auth");

// Ruta za prikaz kontrolne table (dashboard) sa svim postovima korisnika
router.get("/", withAuth, async (req, res) => {
    try {
        // Dohvatanje svih postova, uključujući podatke o korisniku koji je kreirao post
        const postData = await Post.findAll({
            include: [
                {
                    model: User, // Uključivanje modela User za svaki post
                    attributes: ["id", "username"], // Dohvatanje id-a i korisničkog imena
                },
            ],
            order: [["createdAt", "DESC"]], // Sortiranje postova po datumu kreiranja, od najnovijih ka starijim
        });

        // Pretvaranje podataka o postovima u običan objekat (plain object)
        const posts = postData.map((post) => post.get({ plain: true }));

        // Renderovanje stranice za kontrolnu tablu sa podacima o postovima
        res.render("dashboard", {
            loggedIn: req.session.loggedIn, // Provjera da li je korisnik prijavljen
            loggedInUserData: req.session.loggedInUserData, // Podaci o prijavljenom korisniku
            posts: posts, // Lista postova korisnika
        });
    } catch (err) {
        // U slučaju greške pri dohvaćanju podataka, vraća se status 500 sa greškom
        res.status(500).json(err);
    }
});

// Eksportovanje rute
module.exports = router;
