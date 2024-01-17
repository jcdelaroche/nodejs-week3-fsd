const usersRoute = require('../resources/users/users.route')
const shopsRoute = require('../resources/shops/shops.route')
const express = require('express')
const cookieSession = require('cookie-session');


const initializeRoutes = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
  }))
  app.use('/api/users', usersRoute)
  app.use('/api/shops', shopsRoute)
}

module.exports = { initializeRoutes }