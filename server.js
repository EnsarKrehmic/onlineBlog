// Zavisine
const express = require("express");
const expressHandlebars = require("express-handlebars");
const session = require("express-session");
const path = require("path");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sequelize = require("./config/connection");
const controllers = require("./controllers");
const helpers = require("./utils/helpers");

// Dodavanje vlastitog Handlebars helpera
helpers.truncate = function (str, len) {
    // Provjera da li je `str` definisan i da li je tip string
    if (typeof str !== "string" || !str) {
        return ""; // Vraća prazan string ako je `str` nepostojeći ili nije string
    }
    return str.length > len ? str.substring(0, len) + "..." : str;
};

// Inicijalizacija Express aplikacije
const app = express();
const PORT = process.env.PORT || 3001;

// Konfiguracija sesija
const sess = {
    secret: process.env.SESSION_SECRET || "Tajni ključ",
    cookie: { maxAge: 28800000 },
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({ db: sequelize }),
};

// Primjena sesije na Express aplikaciju
app.use(session(sess));

// Postavljanje Handlebars templating engine-a sa prilagođenim helperima
const handlebars = expressHandlebars.create({ helpers });
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

// Middleware za parsiranje JSON i URL enkodiranih podataka
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Omogućavanje servisa statičkih fajlova
app.use(express.static(path.join(__dirname, "public")));

// Inicijalizacija ruta
app.use(controllers);

// Pokretanje servera i povezivanje sa bazom podataka
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Server je pokrenut na portu: ${PORT}`));
});
