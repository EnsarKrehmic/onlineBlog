// Uvoz potrebnih modula
const sequelize = require("../config/connection"); // Povezivanje sa bazom podataka
const User = require("../models/User"); // Model za korisnike
const Post = require("../models/Post"); // Model za postove
const Comment = require("../models/Comment"); // Model za komentare
const userData = require("./user-seeds.json"); // Podaci o korisnicima za unos
const postData = require("./post-seeds.json"); // Podaci o postovima za unos
const commentData = require("./comment-seeds.json"); // Podaci o komentarima za unos

// Funkcija za unos testnih podataka u bazu podataka
const seedDatabase = async () => {
    // Prvo sinhroniziraj bazu podataka (kreiraj tabele ako ne postoje)
    await sequelize.sync({ force: true });

    // Unos testnih korisnika u tabelu 'User'
    await User.bulkCreate(userData, {
        individualHooks: true, // Izvršavanje hookova (npr. enkripcija lozinke)
        returning: true, // Vraćanje unesenih podataka
    });

    // Unos testnih postova u tabelu 'Post'
    await Post.bulkCreate(postData, {
        individualHooks: true, // Izvršavanje hookova tokom unosa
        returning: true, // Vraćanje unesenih podataka
    });

    // Unos testnih komentara u tabelu 'Comment'
    await Comment.bulkCreate(commentData, {
        individualHooks: true, // Izvršavanje hookova tokom unosa
        returning: true, // Vraćanje unesenih podataka
    });

    // Zatvori proces nakon što su podaci uspješno uneseni
    process.exit(0);
};

// Pozivanje funkcije za unos podataka
seedDatabase();