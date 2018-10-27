// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');  //declara Obj Mongoclient e obj ObjectID q está dentro do MongoClient

var obj = new ObjectID();
console.log(obj); 

// var user = {name: 'andrew', age:25};  
// var {name} = user;  //ES6 destructuring é bom p fazer vars a partir de objs json
// console.log(name);


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {//em mongo n é preciso criar db antes de a usar
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert todo', err);
  //   }
  
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  // Insert new doc into Users (name, age, location)
  db.collection('Users').insertOne({
    // _id: 123, //id manual 
    name: 'Andrew',
    age: 25,
    location: 'Philadelphia'
  }, (err, result) => {
    if (err) {
      return console.log('Unable to insert user', err);
    }

    console.log(result.ops);
    // console.log(result.ops[0]._id.getTimestamp());  //tempo criacao registo

  });

  db.close();
});
