// Funkcija za prijavu korisnika sa klijentske strane prema API-ju
const loginFormHandler = async (event) => {
    event.preventDefault(); // Sprječava reload stranice

    // Dohvatanje vrijednosti unesenih u formu
    const email = document.querySelector(".username-input").value.trim();
    const password = document.querySelector(".password-input").value.trim();

    if (email && password) {
        try {
            const response = await fetch("/api/user/login", {
                method: "POST",
                body: JSON.stringify({ email, password }),
                headers: { "Content-Type": "application/json" },
            });

            if (response.ok) {
                document.location.replace("/"); // Preusmjeravanje ako je uspješno
            } else {
                alert("Neuspješna prijava: " + response.statusText);
            }
        } catch (err) {
            console.error("Greška:", err);
            alert("Došlo je do greške pri prijavi.");
        }
    } else {
        alert("Molimo vas da popunite sva polja.");
    }
};

// Selektuje dugme i dodaje event listener
document
    .querySelector(".login-button")
    .addEventListener("click", loginFormHandler);
