// Funkcija za slanje komentara na server (API)
const submitCommentHandler = async (event) => {
    event.preventDefault(); // Sprečava podrazumijevano ponašanje forme

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

// Funkcija za beisanje komentara na server (API)
const deleteCommentHandler = async (event) => {
    event.preventDefault(); // Sprečava podrazumijevano ponašanje forme

    const deleteCommentId = event.target.getAttribute("data-id");
    const currentPostId = document.querySelector(".current-post-id").innerHTML;
    console.log(2);

    // Provjera da li je komentar obrisan
    if (deleteCommentId) {
        const response = await fetch("/api/comment/" + deleteCommentId, {
            method: "DELETE", // HTTP metoda DELETE
            headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
            document.location.replace(
                "/post/" + currentPostId + "#comment-section"
            );
            document.location.reload();
        } else {
            alert(
                "Neuspješno brisanje komentara. " +
                    response.status +
                    ": " +
                    response.statusText
            );
        }
    }
};

document
    .querySelector(".comment-submit")
    .addEventListener("click", submitCommentHandler);

const deleteLinks = document.querySelectorAll(".delete-comment");
deleteLinks.forEach((el) =>
    el.addEventListener("click", (event) => deleteCommentHandler(event))
);