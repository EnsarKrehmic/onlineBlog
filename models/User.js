// Uvozimo potrebne module: Sequelize, bcrypt i konekciju sa bazom podataka
const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

// Kreiramo klasu 'User' koja naslijeđuje od Sequelize Model-a
class User extends Model {
    // Instancna metoda za provjeru lozinke korisnika s bcrypt
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);  // Upoređuje unos korisnika sa enkriptiranom lozinkom
    }
}

// Kreiramo model za korisnika, tabelu i objekat
User.init(
    {
        // Definicija kolone 'id' (jedinstveni identifikator korisnika)
        id: {
            type: DataTypes.INTEGER,  // Tip podataka je cijeli broj
            allowNull: false,         // ID ne može biti null
            primaryKey: true,         // Ova kolona je primarni ključ
            autoIncrement: true,      // Automatski se povećava
        },
        // Definicija kolone 'username' (korisničko ime korisnika)
        username: {
            type: DataTypes.STRING,   // Tip podataka je string
            allowNull: false,         // Korisničko ime ne može biti null
        },
        // Definicija kolone 'email' (email adresa korisnika)
        email: {
            type: DataTypes.STRING,   // Tip podataka je string
            allowNull: false,         // Email ne može biti null
            unique: true,             // Email mora biti jedinstven
            validate: {
                isEmail: true,        // Validacija za ispravan format emaila
            },
        },
        // Definicija kolone 'password' (lozinka korisnika)
        password: {
            type: DataTypes.STRING,   // Tip podataka je string
            allowNull: false,         // Lozinka ne može biti null
            validate: {
                len: [6],             // Lozinka mora imati barem 6 karaktera
            },
        },
        // Definicija kolone 'isAdmin' (da li je korisnik administrator)
        isAdmin: {
            type: DataTypes.BOOLEAN,  // Tip podataka je boolean (true/false)
            allowNull: false,         // Ova kolona ne može biti null
        },
    },
    {
        // Hooks (poznati kao lifecycle events) - funkcije koje se pozivaju prije ili nakon izvršenja određenih radnji u Sequelize-u
        hooks: {
            // 'beforeCreate' hook se koristi za rad sa podacima prije nego što nova instanca bude kreirana
            async beforeCreate(newUserData) {
                // Enkriptovanje lozinke koju korisnik unosi
                newUserData.password = await bcrypt.hash(newUserData.password, 10);  // Koristi bcrypt za enkripciju lozinke
                return newUserData;  // Vraća enkriptovane podatke
            },
        },
        sequelize,               // Konekcija sa bazom podataka
        freezeTableName: true,   // Sprečava Sequelize da automatski mijenja ime tabele
        underscored: true,       // Koristi donje crtice u imenima kolona (npr. 'is_admin' umjesto 'isAdmin')
        modelName: "user",       // Ime modela je 'user'
    }
);

// Izvozimo model 'User' kako bi bio dostupan u drugim dijelovima aplikacije
module.exports = User;