// Uvoz Express Routera za upravljanje ruterima
const router = require("express").Router();
// Uvoz modela za Post, User i Comment za rad sa podacima
const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");

// Ruter za prikaz podataka o postu kada se učita stranica za post
router.get("/:id", async (req, res) => {
    try {
        // Dohvatanje podataka o postu sa povezanim komentarima i korisnicima
        const postData = await Post.findOne({
            where: {
                id: req.params.id, // Pretraga posta prema ID-u iz URL parametra
            },
            include: [
                {
                    model: Comment, // Uključivanje komentara koji pripadaju postu
                    include: [
                        {
                            model: User, // Uključivanje podataka o korisnicima koji su ostavili komentare
                            attributes: ["id", "username"], // Prikazivanje ID-a i korisničkog imena
                        },
                    ],
                },
                {
                    model: User, // Uključivanje podataka o korisniku koji je postavio post
                    attributes: ["id", "username"], // Prikazivanje ID-a i korisničkog imena
                },
            ],
        });

        // Pretvaranje podataka u običan objekt
        const post = postData.get({ plain: true });

        console.log(post); // Ispis podataka o postu u konzolu radi debuggiranja

        // Provjera da li post postoji
        if (post) {
            // Ako post postoji, renderuj stranicu sa podacima
            res.render("post", {
                loggedIn: req.session.loggedIn, // Informacija o prijavljenom korisniku
                loggedInUserData: req.session.loggedInUserData, // Podaci o prijavljenom korisniku
                postData: post, // Podaci o postu
            });
        } else {
            // Ako post ne postoji, preusmjeri korisnika na početnu stranicu
            res.redirect("/");
        }
    } catch (err) {
        // Ako dođe do greške, vrati status 500 i grešku u JSON formatu
        res.status(500).json(err);
    }
});

// Dohvaćanje svih postova sa autorima i komentarima
router.get("/", async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User, // Informacije o autoru posta
                    attributes: ["username"],
                },
                {
                    model: Comment, // Broj komentara
                },
            ],
            order: [["createdAt", "DESC"]],
        });

        // Pretvaranje u čisti JavaScript objekat
        const posts = postData.map((post) => post.get({ plain: true }));

        // Renderovanje početne stranice
        res.render("index", {
            loggedIn: req.session.loggedIn,
            loggedInUserData: req.session.loggedInUserData,
            posts, // Prosljeđivanje podataka o postovima
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Eksportovanje rute kako bi bila dostupna u drugim dijelovima aplikacije
module.exports = router;