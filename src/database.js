const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://Cristian:Calamaalbo13@cluster0.eib76.mongodb.net/ToDoApp')

const connection = mongoose.connection;

connection.once('open', () => { console.log('DB is connect'); } )

module.exports = mongoose;