var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

module.exports = {mongoose};  //retorna a var mongoose

// //temos 3 metodos de env da app
// process.env.NODE_ENV === 'production'
