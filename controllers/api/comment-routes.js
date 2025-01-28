// Uvoz Express Routera
const router = require("express").Router();

// Uvoz modela za komentare
const { Comment } = require("../../models");

// Kreiranje novog komentara
router.post("/", async (req, res) => {
    try {
        // Kreiranje novog komentara u bazi
        const dbCommentData = await Comment.create({
            comment: req.body.comment, // Tekst komentara
            author_id: req.body.author_id, // ID autora komentara
            post_id: req.body.post_id, // ID posta na koji se komentar odnosi
        });
        // Slanje uspešnog odgovora sa podacima o komentaru
        return res.status(200).json(dbCommentData);
    } catch (err) {
        console.log(err); // Logovanje greške
        // Slanje greške ako dođe do problema sa kreiranjem komentara
        return res.status(500).json(err);
    }
});

// Brisanje komentara
router.delete("/:id", async (req, res) => {
    try {
        // Brisanje komentara na osnovu ID-a
        const deleteCommentData = await Comment.destroy({
            where: {
                id: req.params.id, // ID komentara koji se briše
            },
        });
        // Slanje uspešnog odgovora sa podacima o brisanju
        return res.status(200).json(deleteCommentData);
    } catch (err) {
        console.log(err); // Logovanje greške
        // Slanje greške ako dođe do problema sa brisanjem komentara
        return res.status(500).json(err);
    }
});

// Eksportovanje routera kako bi mogao da bude korišćen u glavnoj aplikaciji
module.exports = router;
