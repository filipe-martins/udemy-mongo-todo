const expect = require('expect');
const request = require('supertest');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');
const {ObjectID} = require('mongodb');

// const todos = [{
//   text: 'dummy text'
// }, {
//   text: 'dummy2 text'
// }];

const todos = [{
  _id: new ObjectID(), //gerar id dinamico
  text: 'First test todo'
}, {
  _id: new ObjectID(), //gerar id dinamico
  text: 'Second test todo'
}];

beforeEach((done) => {  //antes de cada teste remove dados
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos); //callback
  }).then(() => done());
});

describe('POST /todos', () => {
  // it('should create a new todo', (done) => {  //done for asynch
  //   var text = 'Test todo text';

  //   request(app)
  //     .post('/todos')
  //     .send({text})
  //     .expect(200)
  //     .expect((res) => {
  //       expect(res.body.text).toBe(text);
  //     })
  //     .end((err, res) => {
  //       if (err) {
  //         return done(err);
  //       }

  //       Todo.find().then((todos) => {  //see if texto inserido é igual
  //         expect(todos.length).toBe(1);
  //         expect(todos[0].text).toBe(text);
  //         done();
  //       }).catch((e) => done(e));  //apanha erros no callback
  //     });
  // });

  // it('should not create todo with invalid body data', (done) => {
  //   request(app)
  //     .post('/todos')
  //     .send({})
  //     .expect(400)  //error
  //     .end((err, res) => {
  //       if (err) {
  //         return done(err);
  //       }

  //       Todo.find().then((todos) => {
  //         expect(todos.length).toBe(2);
  //         done();
  //       }).catch((e) => done(e));
  //     });
  // });

});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2); //nº de registo q lá havia
      })
      .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should return todo doc', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)  //gerar id dinamico
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should return 404 if todo not found', (done) => {
    var hexId = new ObjectID().toHexString();

    request(app)
      .get(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-object ids', (done) => {
    request(app)
      .get('/todos/123abc')
      .expect(404)
      .end(done);
  });
});


