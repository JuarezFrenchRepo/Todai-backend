const express = require('express');
const helmet = require('helmet');
const cors = require('cors');


const authenticate = require('./auth/authenticate-middleware');
const authRouter = require('./auth/auth-router');
// const projectsRouter = require('../projects/projects-router.js');
const usersRouter = require('./users/users-router.js');
const valuesRouter = require('./values/values-router.js');



const server = express();



server.use(helmet());
server.use(express.json());
server.use(cors({credentials:true, origin:{localhost:3000} }));


server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);
// server.use('/api/projects', authenticate, projectsRouter);
server.use('/api/values', valuesRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: "Server is up and running", dbenv: process.env.DB_ENV });
});

module.exports = server;