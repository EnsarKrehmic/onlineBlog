// Middleware funkcija koja provjerava da li je korisnik prijavljen prije nego što mu dozvoli pristup stranici
// Ako korisnik nije prijavljen, biće preusmjeren na login stranicu
const withAuth = (req, res, next) => {
    if (!req.session.loggedIn) {  // Provjerava da li je korisnik prijavljen u sesiji
        res.redirect("/login");   // Ako nije, preusmjerava ga na login stranicu
    } else {
        next();  // Ako je korisnik prijavljen, nastavlja dalje sa izvršavanjem koda
    }
};

// Middleware funkcija koja provjerava da li je korisnik admin prije nego što mu dozvoli pristup određenim stranicama
// Ako korisnik nije admin, biće preusmjeren na početnu stranicu
const withAuthAdmin = (req, res, next) => {
    if (!req.session.loggedInUserData.isAdmin) {  // Provjerava da li je korisnik admin na osnovu podataka u sesiji
        res.redirect("/");  // Ako nije admin, preusmjerava ga na početnu stranicu
    } else {
        next();  // Ako je admin, nastavlja dalje sa izvršavanjem koda
    }
};

// Izvozimo obje middleware funkcije kako bi se mogle koristiti u drugim dijelovima aplikacije
module.exports = [withAuth, withAuthAdmin];