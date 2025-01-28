// Funkcija za prijavu korisnika sa klijentske strane prema API-ju
const loginFormHandler = async (event) => {
    event.preventDefault();  // Sprječava da se stranica automatski reloaduje pri submitovanju forme

    // Dohvatanje vrijednosti unesene email adrese i lozinke sa forme
    const email = document.querySelector(".username-input").value.trim();
    const password = document.querySelector(".password-input").value.trim();

    // Provjera da li su oba polja popunjena
    if (email && password) {
        try {
            // Slanje POST zahtjeva za prijavu korisnika
            const response = await fetch("/api/user/login", {
                method: "POST",  // Metoda zahtjeva je POST jer šaljemo podatke (email i lozinku)
                body: JSON.stringify({ email, password }),  // Telo zahtjeva s JSON podacima
                headers: { "Content-Type": "application/json" },  // Zaglavlje koje označava JSON format
            });

            // Provjera da li je odgovor uspješan (status 200)
            if (response.ok) {
                document.location.replace("/");  // Ako je prijava uspješna, preusmjeravamo korisnika na početnu stranicu
            } else {
                // Ako prijava nije uspjela, obavještavamo korisnika o grešci
                alert(
                    "Neuspješna prijava. " +
                        response.status +
                        ": " +
                        response.statusText
                );
            }
        } catch (err) {
            // U slučaju greške prilikom slanja zahtjeva, obavještavamo korisnika
            console.error("Greška prilikom prijave:", err);
            alert("Došlo je do greške pri prijavi.");
        }
    } else {
        // Ako polja nisu popunjena, obavještavamo korisnika
        alert("Molimo vas da popunite sva polja.");
    }
};

// Dodavanje event listenera na dugme za prijavu
document
    .querySelector(".login-button")
    .addEventListener("click", loginFormHandler);
