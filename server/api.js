const express = require('express');
const app = express.Router();
const db = require('./models/db')
const { Recipe, User } = db.models;
app.use(express.json());

app.get('/recipes/', (req, res, next) => {
  Recipe.findAll()
    .then(recipes => res.send(recipes))
    .catch(next);
})

app.get('/recipes/:id', (req, res, next) => {

  Recipe.findAll({ where: { id: req.params.id } })
    .then(recipes => res.send(recipes))
    .catch(next)
})

app.get('/recipes/:id', (req, res, next) => {

  Recipe.findAll({ where: { id: req.params.id } })
    .then(recipes => res.send(recipes))
    .catch(next)
})
app.get('/recipes/:userId/users/:id', (req, res, next) => {

  User.findAll({ where: { id: req.params.userId } })
    .then(users => res.send(users))
    .catch(next)
})

app.get('/users/', (req, res, next) => {
  User.findAll()
    .then(users => res.send(users))
    .catch(next);
})

app.get('/users/:id', (req, res, next) => {
  User.findAll({ where: { id: req.params.id } })
    .then(users => res.send(users))
    .catch(next)
})

app.post('/users', (req, res, next) => {
  User.create(req.body)
    .then(_user => res.status(201).send(_user))
    .catch(next)
})

app.post('/recipes', (req, res, next) => {
  Recipe.create(req.body)
    .then(_recipe => res.status(201).send(_recipe))
})

app.delete('/users/:id', (req, res, next) => {
  User.findByPk(req.params.id)
    .then(_user => _user.destroy())
    .then(() => res.sendStatus(204))
    .catch(next)
})

app.delete('/recipes/:userId/users/:id', (req, res, next) => {
  Recipe.findByPk(req.params.userId)
    .then(_recipe => _recipe.destroy())
    .then(() => res.sendStatus(204))
    .catch(next)
})


module.exports = app;
