// Uvozimo potrebne module iz Sequelize-a
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection"); // Uvozimo Sequelize konekciju

// Kreiramo klasu za model komentara
class Comment extends Model {}

// Definisanje modela za tabelu 'comment'
Comment.init(
    {
        // Definisanje kolone 'id' (jedinstveni identifikator komentara)
        id: {
            type: DataTypes.INTEGER,  // Tip podataka za ID je cijeli broj
            allowNull: false,         // ID ne može biti null
            primaryKey: true,         // Ova kolona je primarni ključ
            autoIncrement: true,      // ID se automatski povećava
        },
        // Definisanje kolone 'comment' (tekst komentara)
        comment: {
            type: DataTypes.STRING,   // Tip podataka za komentar je string
            allowNull: false,         // Komentar ne može biti null
        },
        // Definisanje kolone 'author_id' (ID korisnika koji je postavio komentar)
        author_id: {
            type: DataTypes.INTEGER,  // Tip podataka za ID autora je cijeli broj
            allowNull: false,         // ID autora ne može biti null
            references: {
                model: "user",        // Spaja se sa modelom 'user'
                key: "id",            // Veza je na kolonu 'id' u tabeli 'user'
            },
        },
        // Definisanje kolone 'post_id' (ID posta na kojem je komentar postavljen)
        post_id: {
            type: DataTypes.INTEGER,  // Tip podataka za ID posta je cijeli broj
            allowNull: false,         // ID posta ne može biti null
            references: {
                model: "post",        // Spaja se sa modelom 'post'
                key: "id",            // Veza je na kolonu 'id' u tabeli 'post'
            },
        },
    },
    {
        sequelize,               // Konekcija sa bazom podataka
        freezeTableName: true,   // Sprečava Sequelize da automatski mijenja ime tabele (ostaje 'comment')
        underscored: true,       // Koristi donje crtice u imenima kolona umjesto velikih slova (npr. 'author_id' umjesto 'authorId')
        modelName: "comment",    // Ime modela je 'comment'
    }
);

// Izvozimo model 'Comment' kako bi bio dostupan u drugim dijelovima aplikacije
module.exports = Comment;