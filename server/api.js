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
  console.log(req.params)
  Recipe.findAll({ where: { id: req.params.id } })
    .then(recipes => res.send(recipes))
    .catch(next)
})
app.get('/recipes/:userId/users/:id', (req, res, next) => {
  console.log("REQ ", req.params.id)
  console.log("REQ ", req.params.userId)
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


module.exports = app;
