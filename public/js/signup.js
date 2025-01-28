// Funkcija za pokušaj registracije korisnika
const signupFormHandler = async (event) => {
    event.preventDefault(); // Sprečava podrazumevano ponašanje forme (reload stranice)

    // Uzimanje vrednosti sa input polja
    const username = document.querySelector(".username-input").value.trim(); // Korisničko ime
    const email = document.querySelector(".email-input").value.trim(); // Email
    const password = document.querySelector(".password-input").value.trim(); // Lozinka
    const is_admin = false; // Novi korisnici nisu administratori po default-u

    // Provjera dužine lozinke
    if (password.length < 6) {
        alert("Minimalna dužina lozinke je 6 karaktera.");
    } else if (username && email && password) {
        // Ako su sva polja popunjena, šaljemo podatke na server
        const response = await fetch("/api/user", {
            method: "POST",
            body: JSON.stringify({ username, email, password, is_admin }), // Poslati podaci
            headers: { "Content-Type": "application/json" }, // Definisanje tipa sadržaja
        });

        // Provjera odgovora servera
        if (response.ok) {
            // Ako je registracija uspješna, preusmjeravamo korisnika na početnu stranicu
            document.location.replace("/");
        } else {
            // Ako nešto krene po zlu, obavještavamo korisnika o grešci
            alert(
                "Registracija nije uspjela. " +
                    response.status +
                    ": " +
                    response.statusText
            );
        }
    } else {
        // Ako neka polja nisu popunjena
        alert("Molimo vas da popunite sva polja.");
    }
};

// Dodavanje event listener-a na dugme za registraciju
document
    .querySelector(".signup-button")
    .addEventListener("click", signupFormHandler);
