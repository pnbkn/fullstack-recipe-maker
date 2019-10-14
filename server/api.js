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
app.get('/users/', (req, res, next) => {
  User.findAll()
    .then(users => res.send(users))
    .catch(next);
})

module.exports = app;
