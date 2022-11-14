const chaiHTTP = require("chai-http");
const chai = require("chai");
const { assert } = require("chai");
const app = require("../app");
const { suite, test } = require("mocha");

chai.use(chaiHTTP);

suite("Tests for Users Routes", function () {
  const createUser = {
    firstName: "cesar",
    lastName: "villafuerte",
    email: "jose@test.com",
    password: "1234",
    roleId: 1,
  };
  const updateUsers = {
    email: "updated@email.com",
    firstName: "updatedName",
    lastName: "updatedLastname",
    password: "updatePassword",
  };

  let UserID = 36;
  let token;

  before((done) => {
    chai
      .request(app)
      .post("/api/auth/login")
      .send({
        email: "jose@test.com",
        password: "1234",
      })
      .end((err, res) => {
        token = res.body.body.token;
        done();
      });
  });

  suite("create User ", function () {
    test("succesfull creation of user", function (done) {
      chai
        .request(app)
        .post("/api/users")
        .send(createUser)
        .end((err, res) => {
          assert.equal(res.status, 200);
          done();
        });
    });

    test("Email already exists ", function (done) {
      chai
        .request(app)
        .post("/api/users")
        .send(createUser)
        .end((err, res) => {
          assert.equal(res.status, 400);
          done();
        });
    });

    test("Validation Errors", function (done) {
      chai
        .request(app)
        .post("/api/users")
        .send({})
        .end((err, res) => {
          assert.equal(res.status, 400);
          done();
        });
    });
  });

  suite("Update User", function () {
    test("Successfull user update", function (done) {
      chai
        .request(app)
        .put(`/api/users/${UserID}`)
        .set("Authorization", `Bearer ${token}`)
        .send(updateUsers)
        .end((err, res) => {
          assert.equal(res.status, 200);
          done();
        });
    });
    test("Trying update inexistent User", function (done) {
      chai
        .request(app)
        .put("/api/users/0")
        .set("Authorization", `Bearer ${token}`)
        .send(updateUsers)
        .end((err, res) => {
          assert.equal(res.status, 403);
          done();
        });
    });
  });

  suite("Get Users", function () {
    test("Get user by ID", function (done) {
      chai
        .request(app)
        .get(`/api/users/${UserID}`)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          assert.equal(res.status, 200);
          //   assert.equal(res.body.message, "User retrieved successfully");
          done();
        });
    });
    test("Get All Users", function (done) {
      chai
        .request(app)
        .get("/api/users/")
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          assert.equal(res.status, 200);
          done();
        });
    });
    test("Trying to get Unexistent User", function (done) {
      chai
        .request(app)
        .get("/api/users/0")
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          assert.equal(res.status, 403);
          done();
        });
    });
  });

  suite("Delete User", function () {
    test("succesfully delete User", function (done) {
      chai
        .request(app)
        .delete(`/api/users/${UserID}`)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.message, "User deleted successfully");
          done();
        });
    });
    test("Trying to delete unexistent user", function (done) {
      chai
        .request(app)
        .delete("/api/users/0")
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          assert.equal(res.status, 403);
          done();
        });
    });
  });
});
