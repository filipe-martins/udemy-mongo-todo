// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  db.collection('Todos').find({
      completed: true  //query
    // _id: new ObjectID('57bb36afb3b6a3801d8c479d') //tem de ser new objID pq string n dá
  }).toArray().then((docs) => {
    console.log('Todos');
    console.log(JSON.stringify(docs, undefined, 2));  //undifined é p formatar
  }, (err) => {
    console.log('Unable to fetch todos', err);
  });

  db.collection('Todos').find().count().then((count) => {
    console.log(`Todos count: ${count}`); //template string
  }, (err) => {
    console.log('Unable to fetch todos', err);
  });

  db.collection('Users').find({name: 'Andrew'}).toArray().then((docs) => { //toArray devolve a promisse logo pode se fazer 
    console.log(JSON.stringify(docs, undefined, 2));
  });

  // db.close();
});
