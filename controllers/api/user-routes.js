// Uvoz Express Routera i modela User
const router = require("express").Router();
const { User } = require("../../models");

// Kreiranje novog korisnika
router.post("/", async (req, res) => {
    try {
        // Kreiranje korisnika u bazi podataka
        const dbUserData = await User.create({
            username: req.body.username, // Korisničko ime
            email: req.body.email, // Email korisnika
            password: req.body.password, // Lozinka korisnika
            isAdmin: req.body.is_admin, // Da li je korisnik administrator
        });

        // Spremanje sesije sa podacima korisnika
        req.session.save(() => {
            req.session.loggedIn = true; // Postavljanje statusa prijave
            req.session.loggedInUserData = dbUserData; // Spremanje podataka o korisniku u sesiju
            return res.status(200).json(dbUserData); // Vraća uspješan odgovor sa podacima korisnika
        });
    } catch (err) {
        console.log(err); // Ispis greške u konzolu
        return res.status(500).json(err); // Vraća grešku sa statusom 500
    }
});

// Login korisnika
router.post("/login", async (req, res) => {
    try {
        // Dohvatanje korisnika iz baze na osnovu emaila
        const dbUserData = await User.findOne({
            where: {
                email: req.body.email, // Traženje korisnika prema emailu
            },
        });

        // Ako korisnik ne postoji, vraća grešku
        if (!dbUserData) {
            res.status(400).json({
                message: "Pogrešan email ili lozinka. Pokušajte ponovo!",
            });
            return;
        }

        // Provjera lozinke pomoću metode za provjeru lozinke iz modela User
        const validPassword = await dbUserData.checkPassword(req.body.password);

        // Ako lozinka nije ispravna, vraća grešku
        if (!validPassword) {
            res.status(400).json({
                message: "Pogrešan email ili lozinka. Pokušajte ponovo!",
            });
            return;
        }

        // Spremanje podataka u sesiju nakon uspješne prijave
        req.session.save(() => {
            req.session.loggedIn = true; // Postavljanje statusa prijave
            req.session.loggedInUserData = dbUserData; // Spremanje podataka o korisniku u sesiju
            console.log("🚀", req.session.cookie); // Ispis sesije u konzolu

            res.status(200).json({
                user: dbUserData, // Vraća podatke o korisniku
                message: "Uspješno ste prijavljeni!", // Poruka o uspješnoj prijavi
            });
        });
    } catch (err) {
        console.log(err); // Ispis greške u konzolu
        res.status(500).json(err); // Vraća grešku sa statusom 500
    }
});

// Logout korisnika
router.post("/logout", (req, res) => {
    if (req.session.loggedIn) {
        // Uništavanje sesije ako je korisnik prijavljen
        req.session.destroy(() => {
            res.status(204).end(); // Vraća status 204 (No Content) nakon logout-a
        });
    } else {
        res.status(404).end(); // Ako korisnik nije prijavljen, vraća status 404
    }
});

// Eksportovanje rute
module.exports = router;
