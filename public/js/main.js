// Čekanje na učitavanje cijelog sadržaja stranice
document.addEventListener("DOMContentLoaded", () => {
    // Pronalaženje svih elemenata s klasom "navbar-burger" (hamburger meni ikona)
    const $navbarBurgers = Array.prototype.slice.call(
        document.querySelectorAll(".navbar-burger"),
        0
    );

    // Provjera da li postoje hamburger meniji na stranici
    if ($navbarBurgers.length > 0) {
        // Dodavanje event listener-a za svaki hamburger meni
        $navbarBurgers.forEach((el) => {
            el.addEventListener("click", () => {
                // Uzmi "data-target" atribut iz hamburger menija koji označava ciljani meni
                const target = el.dataset.target;
                const $target = document.getElementById(target);

                // Toggle (prebacivanje) klase "is-active" za hamburger meni i odgovarajući meni
                el.classList.toggle("is-active");  // Otvori ili zatvori hamburger ikonu
                $target.classList.toggle("is-active");  // Otvori ili zatvori sam meni
            });
        });
    }
});
