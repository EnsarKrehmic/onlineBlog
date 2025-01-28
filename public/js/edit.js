// Funkcija za ažuriranje posta putem klijenta pozivom API-ja
const submitPostHandler = async (event) => {
    event.preventDefault();  // Sprječava automatsko slanje forme i reload stranice

    // Dohvatanje vrijednosti unesenih u polja za naslov i sadržaj posta
    const title = document.querySelector(".subject-input").value.trim();
    const content = document.querySelector(".content-input").value.trim();
    const author_id = document.querySelector(".logged-in-user-id").innerHTML;  // ID prijavljenog korisnika
    const post_id = document.querySelector(".current-post-id").innerHTML;  // ID trenutnog posta koji se ažurira

    // Provjera da li korisnik nije prijavljen
    if (!author_id) {
        alert(
            "Ne možete objaviti post ako niste prijavljeni. Molimo vas da se odjavite i ponovo prijavite, a zatim pokušajte ponovo."
        );
    } else {
        // Provjera da li su svi potrebni podaci uneseni
        if (title && content) {
            try {
                // Slanje PUT zahtjeva za ažuriranje posta sa novim podacima
                const response = await fetch("/api/post/" + post_id, {
                    method: "PUT",  // Metoda zahtjeva je PUT jer ažuriramo postojeći post
                    body: JSON.stringify({ title, content, author_id }),  // Telo zahtjeva s novim podacima
                    headers: { "Content-Type": "application/json" },  // Zaglavlje koje označava JSON format
                });

                // Provjera da li je odgovor uspješan (status 200)
                if (response.ok) {
                    // Preusmjeravanje korisnika na stranicu sa svim postovima (npr. dashboard)
                    document.location.replace("/dashboard");
                } else {
                    // Ako ažuriranje nije uspjelo, obavještavamo korisnika o grešci
                    alert(
                        "Neuspješno ažuriranje posta. " +
                            response.status +
                            ": " +
                            response.statusText
                    );
                }
            } catch (err) {
                // U slučaju greške prilikom slanja zahtjeva, obavještavamo korisnika
                console.error("Greška pri ažuriranju posta:", err);
                alert("Došlo je do greške pri ažuriranju posta.");
            }
        } else {
            // Ako nisu popunjena sva polja, obavještavamo korisnika
            alert("Molimo vas da popunite sva polja.");
        }
    }
};

// Dodavanje event listenera na dugme za slanje ažuriranog posta
document
    .querySelector(".edit-submit")
    .addEventListener("click", submitPostHandler);
