<a href="#"><img width="100%" height="auto" src="https://ptf.unze.ba/wp/wp-content/uploads/2018/02/Logo-PTF018.png"/></a>


<h1 align="center">Web programiranje (V semestar)</h1>

<br/>
<p align="left">
<a href="https://ptf.unze.ba/"><img alt="PTF UNZE" src="https://img.shields.io/badge/PTF_UNZE-www.ptf.unze.ba/-lightgrey?style=flat-square&logo=google-chrome"></a>
</p>

### Podaci o članovima grupe: 
- 1. član: Ensar Krehmić
- 📧 Kontakt: ime.prezime.22@size.ba

### Podaci o asistentima
- 👨‍💻 Asistent: Narcisa Hadžajlić
- 📧 Kontakt: narcisa.hadzajlic@dl.unze.ba 

### Podaci o predmetu 

- 🔗 Link za Google Classroom:  
<p align="left">
<a href="https://classroom.google.com/u/1/c/NzIxNDQ5NDAyNDc0"><img alt="Google Classroom" src="https://img.shields.io/badge/GoogleClassroom-www.classroom.google.com-darkgreen?style=flat-square&logo=google-classroom"></a>
</p>

### Upute za izradu projekta

Treba razviti cijelu web aplikaciju prema zadanim instrukcijama koristeći koristeći Node.js (Express.js) i React.js.

### Zadaci: 
- Kreirati projekat organiziran strukturom: MVC - Models, Views, Controllers (s minimalno 3 modela).
- Prikazati primjenu svih metoda GET, POST, PUT, DELETE kroz kontrolere za pronalaženje podataka i punjenje obrazaca.
- Poželjno koristiti razvojni okvir Express.js za backend, a za frontend koristiti React.js, Angular.js ili neki drugi razvojni okvir po volji.
- Integrirati bazu podataka sa MySQL ili PostgreSQL (slobodan izbor).
- Implementirati osnovne CRUD operacije (create, read, update, delete) za upravljanje podacima u bazi.
- Aplikacija treba da ima formu za prijavu na stranicu ali ne moraju se napraviti role.
- Pored forme za prijavu implementirati druge forme i načine za upravljanje podacima u bazi preko napravljenog frontend-a.
- Postaviti komentare unutar koda za bolji pregled koda. Organiziranost projekta je ključna i predmet ocjene.

### Ocjenjivanje:
- Ispravnost: Aplikacija radi kako se očekuje i ispunjava funkcionalne zahtjeve (30%).
- Kvalitet koda: čist, dobro dokumentovan i pravilno strukturiran kod (20%).
- Korisnički interfejs: Intuitivan dizajn prilagođen korisniku (20%).
- Integracija baze podataka (30%).

### Napomene:
- Potrebno je pridržavati se MVC (Model-View-Controller) arhitekture projekta.
<hr>

# Platforma za Online Blog
Ovo je MVC full-stack aplikacija za online blog. Aplikacija omogućava korisnicima, administratorima i gostima pristup različitim funkcijama blog platforme. Koristi Node.js, Express.js, Handlebars.js, MySQL, i Bulma za izradu moderne i responzivne aplikacije.

## Funkcionalnosti
### Za korisnike:
- Prikazivanje postojećih blog postova na početnoj stranici.
- Mogućnost kreiranja korisničkog naloga, prijavljivanja i odjavljivanja.
- Komentarisanje blog postova (mogućnost brisanja komentara koji pripadaju tom korisniku).
- Automatska prijava nakon isteka vremena, gdje korisnik mora ponovo da se prijavi za određene akcije (dodavanje, ažuriranje, brisanje, komentari).

### Za administratore:
- Pristup administrativnoj tabli za kreiranje, čitanje, ažuriranje i brisanje blog postova.
- Mogućnost brisanja komentara korisnika.

### Za goste:
- Pregled sadržaja bloga bez potrebe za prijavom ili registracijom.

## Zahtjevi
- Node.js i npm
- MySQL baza podataka
- Sequelize.js za ORM
- Bcrypt za hashiranje lozinki
- Express-Session i connect-session-sequelize za sesije i kolačiće
- Bulma CSS za stilizaciju
- Nodemon za razvojni server

## Upute za pokretanje
- Klonirajte ovaj repo na vašem računaru.
- Pokrenite npm install da instalirate sve potrebne zavisnosti.
- Kreirajte .env fajl u root-u projekta i unesite svoje podatke za pristup bazi podataka.
- Ostvarite konekciju baze podataka sa uređivačem
- Pristupite db/schema.sql fajlu i pokrenite linije koje se tu nalaze
- Pokrenite npm run seed da generišete tabelu i testne podatke u bazi.
- Pokrenite server pomoću npm run dev za automatsko restartovanje servera ili npm run start za normalni start.
- Aplikacija će biti dostupna na http://localhost:3030/

## Upute za pokretanje
Seed podaci za pristup stranici kao admin se nalaze unutar /seeds/user-seeds.json fajlu.
Seed podaci za pristup stranici kao korisnik se nalaze na istoj lokaciji, a moguće je i kreirati nove korisnika!
