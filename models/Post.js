// Uvozimo potrebne module: Sequelize i konekciju sa bazom podataka
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// Kreiramo klasu 'Post' koja naslijeđuje od Sequelize Model-a
class Post extends Model {
    // Ovdje možemo dodati metode specifične za 'Post' model ako bude potrebno
}

// Kreiramo model za post (objavu), tabelu i objekat
Post.init(
    {
        // Definicija kolone 'id' (jedinstveni identifikator objave)
        id: {
            type: DataTypes.INTEGER,  // Tip podataka je cijeli broj
            allowNull: false,         // ID ne može biti null
            primaryKey: true,         // Ova kolona je primarni ključ
            autoIncrement: true,      // Automatski se povećava
        },
        // Definicija kolone 'title' (naslov objave)
        title: {
            type: DataTypes.STRING,   // Tip podataka je string
            allowNull: false,         // Naslov ne može biti null
        },
        // Definicija kolone 'content' (sadržaj objave), maksimalna dužina je 10,000 karaktera
        content: {
            type: DataTypes.STRING(10000),  // Tip podataka je string sa maksimalnom dužinom 10,000 karaktera
            allowNull: false,              // Sadržaj ne može biti null
        },       
        // Definicija kolone 'author_id' (ID autora objave), povezuje se sa korisnicima
        author_id: {
            type: DataTypes.INTEGER,   // Tip podataka je cijeli broj
            allowNull: false,          // Autor ne može biti null
            references: {
                model: "user",         // Povezuje se sa tabelom 'user'
                key: "id",             // Preko kolone 'id' u tabeli 'user'
            },
        },
    },
    {
        sequelize,               // Konekcija sa bazom podataka
        freezeTableName: true,   // Sprečava Sequelize da automatski mijenja ime tabele
        underscored: true,       // Koristi donje crtice u imenima kolona (npr. 'author_id' umjesto 'authorId')
        modelName: "post",       // Ime modela je 'post'
    }
);

// Izvozimo model 'Post' kako bi bio dostupan u drugim dijelovima aplikacije
module.exports = Post;