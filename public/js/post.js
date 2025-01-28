// Funkcija za slanje komentara na server (API)
const submitCommentHandler = async (event) => {
    event.preventDefault(); // Sprečava podrazumevano ponašanje forme

    // Uzimanje komentara, ID-a korisnika i ID-a posta sa stranice
    const comment = document.querySelector(".comment-input").value.trim();
    const author_id = document.querySelector(".logged-in-user-id").innerHTML; // ID prijavljenog korisnika
    const post_id = document.querySelector(".current-post-id").innerHTML; // ID trenutnog posta

    // Provjera da li je korisnik prijavljen
    if (!author_id) {
        document.location.replace("/login"); // Ako nije prijavljen, redirektuje ga na login stranicu
    } else {
        // Provjera da li je komentar popunjen
        if (comment) {
            const response = await fetch("/api/comment/", {
                method: "POST", // HTTP metoda POST
                body: JSON.stringify({ comment, author_id, post_id }), // Podaci koji se šalju serveru
                headers: { "Content-Type": "application/json" }, // Definisanje tipa podataka
            });
            if (response.ok) {
                // Ako je odgovor uspješan, redirektuje korisnika na post sa novim komentarom
                document.location.replace("/post/" + post_id + "#comment-section");
                document.location.reload(); // Reload stranice kako bi se prikazali novi komentari
            } else {
                // Ako nešto pođe po zlu, obavještava korisnika
                alert(
                    "Neuspješno slanje komentara. " +
                        response.status +
                        ": " +
                        response.statusText
                );
            }
        } else {
            // Ako komentar nije popunjen
            alert("Molimo vas da ispunite sva polja.");
        }
    }
};
