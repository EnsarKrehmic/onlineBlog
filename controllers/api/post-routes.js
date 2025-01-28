// Uvoz Express Routera i modela Post
const router = require("express").Router();
const { Post } = require("../../models");

// Kreiranje novog posta
router.post("/", async (req, res) => {
    try {
        // Kreiranje posta u bazi podataka
        const dbPostData = await Post.create({
            title: req.body.title, // Naslov posta
            content: req.body.content, // Sadržaj posta
            author_id: req.body.author_id, // ID autora posta
        });
        // Vraćanje uspješnog odgovora sa podacima o postu
        return res.status(200).json(dbPostData);
    } catch (err) {
        console.log(err); // Ispis greške u konzolu
        return res.status(500).json(err); // Vraća grešku sa statusom 500
    }
});

// Ažuriranje postojećeg posta
router.put("/:id", async (req, res) => {
    try {
        // Ažuriranje postojećeg posta na osnovu ID-a
        const updateResult = await Post.update(req.body, {
            where: {
                id: req.params.id, // Korištenje ID-a posta za ažuriranje
            },
        });
        // Vraćanje uspješnog odgovora sa rezultatima ažuriranja
        return res.status(200).json(updateResult);
    } catch (err) {
        console.log(err); // Ispis greške u konzolu
        return res.status(500).json(err); // Vraća grešku sa statusom 500
    }
});

// Brisanje posta
router.delete("/:id", async (req, res) => {
    try {
        // Brisanje posta na osnovu ID-a
        const deletePostData = await Post.destroy({
            where: {
                id: req.params.id, // Korištenje ID-a posta za brisanje
            },
        });
        // Vraćanje uspješnog odgovora sa podacima o brisanju
        return res.status(200).json(deletePostData);
    } catch (err) {
        console.log(err); // Ispis greške u konzolu
        return res.status(500).json(err); // Vraća grešku sa statusom 500
    }
});

// Eksportovanje rute
module.exports = router;
