// Uvozimo potrebne module
const Sequelize = require("sequelize");
require("dotenv").config(); // Učitavamo konfiguracijske varijable iz .env fajla

let sequelize; // Definišemo varijablu za sequelize objekt

// Provjera da li je aplikacija pokrenuta na Heroku ili lokalno
// Ako je aplikacija na Heroku, koristi JAWSDB_URL iz okruženja
if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL); // Povezivanje na bazu putem JAWSDB_URL
} else {
    // Ako je aplikacija lokalno, koristi konfiguraciju iz .env fajla
    sequelize = new Sequelize(
        process.env.DB_NAME,      // Naziv baze podataka
        process.env.DB_USER,      // Korisničko ime za bazu podataka
        process.env.DB_PASSWORD,  // Lozinka za bazu podataka
        {
            host: "localhost",   // Lokacija servera baze podataka
            dialect: "mysql",    // Tip baze podataka (MySQL)
            port: 3030,          // Port na kojem baza radi
        }
    );
}

// Izvozimo sequelize objekt kako bi bio dostupan u drugim dijelovima aplikacije
module.exports = sequelize;