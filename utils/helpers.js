module.exports = {
    // Helper metoda 'format_time' uzima timestamp i vraća prilagođeni formatirani string
    format_time: (date) => {
        // 'toLocaleDateString()' metoda se koristi za formatiranje vremena sa specifičnim parametrima
        return date.toLocaleDateString("en-US", {
            year: "numeric",      // Prikazuje godinu u numeričkom formatu
            month: "long",        // Prikazuje mjesec u punom nazivu (npr. January)
            day: "numeric",       // Prikazuje dan u numeričkom formatu
            hour: "numeric",      // Prikazuje sat u numeričkom formatu
            minute: "numeric",    // Prikazuje minute u numeričkom formatu
        });
    },
    // Funkcija koja skraćuje sadržaj blog posta za početnu stranicu/index
    format_summary: (content) => {
        if (content.length > 300) {  // Provjerava da li je sadržaj duži od 300 karaktera
            return content.substring(0, 300) + "...";  // Ako je duži, skraćuje na prvih 300 karaktera i dodaje "..."
        } else {
            return content;  // Ako nije duži od 300 karaktera, vraća sadržaj nepromijenjen
        }
    },
};