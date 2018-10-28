var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');  //deconstruncting ES6
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());  //midleware

//routes conf
app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text  //body é gravado pelo midleware bodyParser. enviado do web browser
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  })
});

app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = {app};  //property igual name