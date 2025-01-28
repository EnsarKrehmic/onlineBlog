// Uvoz Express Routera za upravljanje ruterima
const router = require("express").Router();

// Ruter za GET zahtjev kada korisnik želi izaći (logout)
router.get("/", async (req, res) => {
    // Brisanje podataka sesije i postavljanje 'loggedIn' na false
    req.session.loggedIn = false;
    req.session.loggedInUserData = null; // Brisanje podataka o korisniku

    // Renderovanje Handlebars stranice za logout, postavljanje loggedIn na false
    res.render("logout", {
        loggedIn: false, // Postavljanje statusa na 'false' jer korisnik nije prijavljen
        loggedInUserData: req.session.loggedInUserData, // Podaci o korisniku (prazni nakon logout-a)
    });
});

// Eksportovanje rute kako bi bila dostupna u drugim dijelovima aplikacije
module.exports = router;
