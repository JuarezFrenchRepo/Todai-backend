const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/authenticate-middleware');
const authRouter = require('../auth/auth-router');
// const projectsRouter = require('../projects/projects-router.js');
const valuesRouter = require('../values/values-router.js');
const usersRouter = require('../users/users-router');


const server = express();
server.get("/", (req, res) => {
    res.status(200).json({ api: "server is up", dbenv: process.env.DB_ENV });
  });
server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);

server.use('/api/users', usersRouter);
// server.use('/api/projects', authenticate, projectsRouter);
server.use('/api/values', authenticate, valuesRouter);

module.exports = server;