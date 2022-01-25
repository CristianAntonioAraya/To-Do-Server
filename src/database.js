const mongoose = require('mongoose')

mongoose.connect(process.env.MONGOOSE_URI)

const connection = mongoose.connection;

connection.once('open', () => { console.log('DB is connect'); } )

module.exports = mongoose;