// Funkcija za kreiranje posta putem klijenta pozivom API-ja
const submitPostHandler = async (event) => {
    event.preventDefault();  // Sprječava automatsko slanje forme

    // Dohvatanje vrijednosti unesenih u polja za naslov i sadržaj posta
    const title = document.querySelector(".subject-input").value.trim();
    const content = document.querySelector(".content-input").value.trim();
    const author_id = document.querySelector(".logged-in-user-id").innerHTML;  // ID prijavljenog korisnika

    // Provjera da li je korisnik prijavljen
    if (!author_id) {
        alert(
            "Ne možete objaviti post ako niste prijavljeni. Molimo vas da se odjavite i ponovo prijavite, a zatim pokušajte ponovo."
        );
    } else {
        // Provjera da li su svi potrebni podaci uneseni (naslov i sadržaj)
        if (title && content) {
            try {
                // Slanje POST zahtjeva za kreiranje novog posta
                const response = await fetch("/api/post/", {
                    method: "POST",  // Metoda zahtjeva je POST jer kreiramo novi post
                    body: JSON.stringify({ title, content, author_id }),  // Telo zahtjeva sa podacima
                    headers: { "Content-Type": "application/json" },  // Zaglavlje koje označava JSON format
                });

                // Provjera da li je odgovor uspješan (status 200)
                if (response.ok) {
                    document.location.replace("/dashboard");  // Preusmjeravanje na dashboard
                } else {
                    alert(
                        "Neuspješno slanje posta. " +
                            response.status +
                            ": " +
                            response.statusText
                    );
                }
            } catch (err) {
                // U slučaju greške prilikom slanja zahtjeva, obavještavamo korisnika
                console.error("Greška pri slanju posta:", err);
                alert("Došlo je do greške pri slanju posta.");
            }
        } else {
            alert("Molimo vas da popunite sva polja.");
        }
    }
};

// Funkcija za brisanje posta putem klijenta pozivom API-ja
const deletePostHandler = async (event) => {
    event.preventDefault();  // Sprječava podrazumijevano ponašanje

    const deletePostId = event.target.getAttribute("data-id");  // Dohvatanje ID-a posta koji treba obrisati

    // Provjera da li je ID posta prisutan
    if (deletePostId) {
        try {
            // Slanje DELETE zahtjeva za brisanje posta
            const response = await fetch("/api/post/" + deletePostId, {
                method: "DELETE",  // Metoda zahtjeva je DELETE jer brišemo postojeći post
                headers: { "Content-Type": "application/json" },  // Zaglavlje koje označava JSON format
            });

            // Provjera da li je odgovor uspješan (status 200)
            if (response.ok) {
                document.location.replace("/dashboard");  // Preusmjeravanje na dashboard
            } else {
                alert(
                    "Neuspješno brisanje posta. " +
                        response.status +
                        ": " +
                        response.statusText
                );
            }
        } catch (err) {
            // U slučaju greške prilikom slanja zahtjeva, obavještavamo korisnika
            console.error("Greška pri brisanju posta:", err);
            alert("Došlo je do greške pri brisanju posta.");
        }
    }
};

// Dodavanje event listener-a na dugme za slanje novog posta
document
    .querySelector(".submit-post")
    .addEventListener("click", submitPostHandler);

// Dodavanje event listener-a na sva dugmadi za brisanje postojećih postova
const deleteButtons = document.querySelectorAll(".delete-post");
deleteButtons.forEach((el) =>
    el.addEventListener("click", (event) => deletePostHandler(event))
);
