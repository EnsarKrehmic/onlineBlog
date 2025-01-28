// Uvoz Express Routera za upravljanje rutama
const router = require("express").Router();
// Uvoz modela Post i User za rad sa postovima i korisnicima
const Post = require("../models/Post");
const User = require("../models/User");

// Ruta za početnu stranicu
router.get("/", async (req, res) => {
    try {
        // Dohvatanje svih postova, uključujući korisničke podatke
        const postData = await Post.findAll({
            // Povezivanje sa tabelom User
            include: [
                {
                    model: User,
                    attributes: ["id", "username"], // Dohvat samo ID i korisničkog imena
                },
            ],
            // Sortiranje postova od najnovijeg do najstarijeg
            order: [["createdAt", "DESC"]],
        });

        // Mapiranje podataka u obični objekat
        const posts = postData.map((post) => post.get({ plain: true }));

        // Kreiranje posebne strukture podataka za postove, prema potrebama HTML/CSS šablona
        const packagedPosts = [];
        let currentPackage = [];

        // Pakovanje postova u grupe po 2, radi boljeg prikaza u šablonu
        for (let i = 0; i < posts.length; i++) {
            // Ako je prvi post, dodaj u novi paket
            if (i == 0) {
                currentPackage.push(posts[i]);
                packagedPosts.push(currentPackage);
                currentPackage = [];
            } else {
                currentPackage.push(posts[i]);
            }

            // Ako je trenutni indeks paran ili preostalo 1 post, završavaj trenutni paket
            if (i % 2 == 0 || posts.length - i <= 1) {
                if (currentPackage.length != 0) {
                    packagedPosts.push(currentPackage);
                }
                currentPackage = [];
            }
        }

        // Rendiranje stranice sa postovima i dodatnim podacima
        res.render("index", {
            loggedIn: req.session.loggedIn,
            loggedInUserData: req.session.loggedInUserData,
            posts: packagedPosts, // Prosljeđivanje raspakovanih postova za prikaz
        });
    } catch (err) {
        // Ako dođe do greške, vraćanje 500 statusa
        res.status(500).json(err);
    }
});

// Eksportovanje rute
module.exports = router;