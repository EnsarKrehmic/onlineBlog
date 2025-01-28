// Uvozimo modele: User, Post i Comment
const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

// Definišemo relaciju između Post i User modela
Post.belongsTo(User, {
    foreignKey: "author_id",  // Strani ključ koji povezuje Post sa User
});

// Definišemo da jedan User može imati više Post objekata
User.hasMany(Post, {
    foreignKey: "author_id",   // Strani ključ koji povezuje User sa Post
    onDelete: "CASCADE",       // Kada se User obriše, brišu se i svi njegovi Post objekti
});

// Definišemo relaciju između Comment i Post modela
Comment.belongsTo(Post, {
    foreignKey: "post_id",  // Strani ključ koji povezuje Comment sa Post
});

// Definišemo da jedan Post može imati više Comment objekata
Post.hasMany(Comment, {
    foreignKey: "post_id",   // Strani ključ koji povezuje Post sa Comment
    onDelete: "CASCADE",     // Kada se Post obriše, brišu se i svi njegovi Comment objekti
});

// Definišemo relaciju između Comment i User modela
Comment.belongsTo(User, {
    foreignKey: "author_id",  // Strani ključ koji povezuje Comment sa User
});

// Definišemo da jedan User može imati više Comment objekata
User.hasMany(Comment, {
    foreignKey: "author_id",   // Strani ključ koji povezuje User sa Comment
    onDelete: "CASCADE",       // Kada se User obriše, brišu se i svi njegovi Comment objekti
});

// Izvozimo sve modele kako bi bili dostupni u drugim dijelovima aplikacije
module.exports = {
    User,
    Post,
    Comment,
};