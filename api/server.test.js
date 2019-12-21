const request = require("supertest");

const server = require("./server.js");
const Users = require("../users/users-model.js");

describe("server.js", function() {
  describe("environment", function() {
    it("should set environment to testing", function() {
      expect(process.env.DB_ENV).toBe("testing");
    });
  });

  describe("GET /", function() {
    it("should return a 200 OK", function() {
      // spin up the server
      return request(server)
        .get("/")
        .then(res => {
          expect(res.status).toBe(200);
        });
      // make GET request to /
      // look at the http status code for the response
    });

    it("should return a JSON", function() {
      return request(server)
        .get("/")
        .then(res => {
          expect(res.type).toMatch(/json/i);
        });
    });

});

it("should return {api: 'up'}", function() {
    return request(server)
      .get("/")
      .then(res => {
        expect(res.body.api).toBe("up");
      });
  });

  async function insert(users) {
    // the second parameter here is of other databases, SQLite returns the id by default
    const [id] = await db('users').insert('Frazier Crane', 'pass');
  
    return db('users')
      .where({ id })
      .first();
  }

it.skip("login returns a 200", function() {
    return request(server)
      .post("/login")
      .send({ username: "Martin Crane", password: "pass" })
      .then(res => {
        const token = res.body.token;

        return request(server)
          .get("/login")
          .set("authorization", token)
          .then(res => {
            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
          });
      });
  });





})   
