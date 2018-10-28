const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

beforeEach((done) => {  //antes de cada teste remove dados
  Todo.remove({}).then(() => done()); //callback
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

  it('should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)  //error
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(0);
          done();
        }).catch((e) => done(e));
      });
  });

});
