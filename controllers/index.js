// Uvoz Express Routera za upravljanje ruterima
const router = require("express").Router();

// Uvoz ruter fajlova za različite dijelove aplikacije
const apiRoutes = require("./api");
const indexRoutes = require("./index-routes");
const loginRoutes = require("./login-routes");
const postRoutes = require("./post-routes");
const signupRoutes = require("./signup-routes");
const logoutRoutes = require("./logout-routes");
const dashboardRoutes = require("./dashboard-routes");
const editRoutes = require("./edit-routes");

// Definisanje ruta koje koriste odgovarajuće fajlove kontrolera
router.use("/", indexRoutes); // Ruta za početnu stranicu
router.use("/api", apiRoutes); // Ruta za API pozive
router.use("/login", loginRoutes); // Ruta za prijavu korisnika
router.use("/post", postRoutes); // Ruta za upravljanje postovima
router.use("/signup", signupRoutes); // Ruta za registraciju korisnika
router.use("/logout", logoutRoutes); // Ruta za odjavu korisnika
router.use("/dashboard", dashboardRoutes); // Ruta za korisničku kontrolnu tablu
router.use("/edit", editRoutes); // Ruta za uređivanje postova ili korisničkih podataka

// Eksportovanje rute kako bi bile dostupne u drugim dijelovima aplikacije
module.exports = router;