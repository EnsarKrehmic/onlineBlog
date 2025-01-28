// Definisanje protokola, domena i porta za API
const apiAccessProtocol = "http";  // Protokol koji koristi API (može biti 'http' ili 'https')
const apiDomain = "localhost";     // Domen na kojem se nalazi API
const apiPort = 3001;              // Port na kojem API sluša

// Funkcija koja vraća punu URL adresu za API pozive
// eslint-disable-next-line no-unused-vars
function getApiUrl() {
    // Kreiranje punog URL-a za API koristeći prethodno definisane parametre
    const apiUrl = `${apiAccessProtocol}://${apiDomain}:${apiPort}`;
    return apiUrl;  // Vraća URL koji se može koristiti za API pozive
}
