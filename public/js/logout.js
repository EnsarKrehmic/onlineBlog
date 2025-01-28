// Funkcija za odjavu korisnika sa klijentske strane prema API-ju
const logout = async () => {
    try {
        // Slanje POST zahtjeva na API da se korisnik odjavi
        const response = await fetch("/api/user/logout", {
            method: "POST",  // Metoda zahtjeva je POST jer šaljemo podatke (odjava)
            headers: { "Content-Type": "application/json" },  // Postavljamo zaglavlje za JSON
        });

        // Provjera da li je zahtjev uspješan
        if (!response.ok) {
            // Ako je status odgovora različit od 200, obavještavamo korisnika o grešci
            alert("Neuspješna odjava.");
        } else {
            // Ako je odjava uspješna, preusmjeravamo korisnika na stranicu prijave
            document.location.replace("/login");
        }
    } catch (err) {
        // Ako dođe do greške u procesu (npr. mrežna greška), obavještavamo korisnika
        console.error("Greška prilikom odjave:", err);
        alert("Došlo je do greške prilikom odjave.");
    }
};

// Pozivanje funkcije za odjavu
logout();
