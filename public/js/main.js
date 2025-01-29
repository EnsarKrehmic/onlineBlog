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

    // Page Loader
    window.addEventListener('load', () => {
        document.getElementById('page-loader').style.display = 'none';
    });

    // Scroll Animations
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-fadeInUp');
        elements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const elementBottom = el.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                el.style.opacity = '1';
                el.style.animation = 'fadeInUp 0.6s ease-out forwards';
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
});