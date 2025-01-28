// Uvoz Express Routera za upravljanje ruterima
const router = require("express").Router();

// Ruter za prikaz stranice za registraciju (signup) kada se učita početna stranica
router.get("/", async (req, res) => {
    // Renderovanje 'signup' pogleda koristeći Handlebars
    // Prosljeđivanje podataka o prijavljenom korisniku u view
    res.render("signup", {
        loggedIn: req.session.loggedIn, // Informacija o tome da li je korisnik prijavljen
        loggedInUserData: req.session.loggedInUserData, // Podaci o prijavljenom korisniku
    });
});

// Eksportovanje rute kako bi bila dostupna u drugim dijelovima aplikacije
module.exports = router;