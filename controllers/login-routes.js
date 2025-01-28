// Uvoz Express Routera za upravljanje ruterima
const router = require("express").Router();

// Ruter za GET zahtjev na stranicu za prijavu
router.get("/", async (req, res) => {
    // Renderovanje Handlebars stranice za login, uz informacije o prijavi korisnika
    res.render("login", {
        loggedIn: req.session.loggedIn, // Status prijave korisnika (true/false)
        loggedInUserData: req.session.loggedInUserData, // Podaci o prijavljenom korisniku
    });
});

// Eksportovanje rute kako bi bila dostupna u drugim dijelovima aplikacije
module.exports = router;
