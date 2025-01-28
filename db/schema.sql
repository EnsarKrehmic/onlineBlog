-- Aktivna sesija na bazi podataka
-- Ovaj fajl samo kreira bazu podataka. Pokreni 'npm seed' nakon pokretanja ovog koda za kreiranje šeme i testnih podataka.

-- Brisanje baze podataka ako već postoji
DROP DATABASE IF EXISTS blog_db;

-- Kreiranje nove baze podataka pod nazivom 'blog_db'
CREATE DATABASE blog_db;