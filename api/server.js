const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
// const projectsRouter = require('../projects/projects-router.js');
// const valuesRouter = require('../values/values-router.js');
// const jokesRouter = require('../jokes/jokes-router.js');


const server = express();
server.get("/", (req, res) => {
    res.status(200).json({ api: "server is up", dbenv: process.env.DB_ENV });
  });
server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/users', authRouter);
// server.use('/api/projects', authenticate, projectsRouter);
// server.use('/api/values', authenticate, Router);

module.exports = server;