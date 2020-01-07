const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const authenticate = require("./auth/authenticate-middleware.js");
const authRouter = require("./auth/auth-router.js");
const projectsRouter = require('./projects/project-router.js');
const usersRouter = require("./users/users-router.js");
const valuesRouter = require("./values/values-router.js");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/auth", authRouter)
server.use("/api/users", usersRouter)
server.use('/api/projects', projectsRouter)
server.use("/api/values",  valuesRouter)

server.get("/", (req, res) => {
  res
    .status(200)
    .json({ api: "Server is up and running", dbenv: process.env.DB_ENV });
});

module.exports = server;
