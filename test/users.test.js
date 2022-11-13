var chai = require("chai");
let chaiHttp = require("chai-http");
var expect = require("chai").expect;

let app = require("../app");

chai.use(chaiHttp);

const users = {
  firstName: "cesar",
  lastName: "villafuerte",
  email: "tonor@gmail.com",
  password: "1234",
  avatar: "pepe",
  roleId: 2,
};

// parent block
describe("Test endpoints user", () => {
  describe("GET /users", () => {
    it("It should give all users information", async () => {
      const response = await chai.request(app).get("/api/users");
      expect(response.statusCode).to.equal(200);
      expect(response.body.message).to.equal("Users obtained successfully");
      expect(response).to.have.property("body");
    });
    it("get user by id", async () => {
      const id = 1;
      const response = await chai.request(app).get(`/api/users/${id}`);
      expect(response.statusCode).to.equal(200);
      expect(response.body.message).to.equal("User obtained successfully");
    });
    it("It should not get any information if there is no id", async () => {
      const response = await chai.request(app).get(`/api/users/0`);
      expect(response.statusCode).to.equal(400);
    });
  });

  describe("POST /users", () => {
    it("should create user", async () => {
      const response = await chai.request(app).post(`/api/users`).send(users);
      expect(response.status).to.equal(200);
      expect(response.body.message).to.equal("Users was created");
    });
    it("should not create user without name and description fields", async () => {
      const response = await chai.request(app).post(`/api/users`).send({});
      expect(response.status).to.equal(400);
    });
  });

  describe("PUT /users", () => {
    it("must edit users with id if contain firstName, lastName, email, avatar and roleId fields", async () => {
      const id = 23;
      const response = await chai
        .request(app)
        .put(`/api/users/${id}`)
        .send(users);
      expect(response.statusCode).to.equal(200);
      expect(response.body.message).to.equal("User was edited");
    });
    it("must respond error due to missing fields", async () => {
      const id = 5;
      const response = await chai.request(app).put(`/api/users/${id}`).send({});
      expect(response.statusCode).to.equal(400);
    });
  });
  describe("DELETE /categories", () => {
    it("you must delete category with id", async () => {
      const id = 9;
      const response = await chai.request(app).delete(`/api/categories/${id}`);
      expect(response.statusCode).to.equal(200);
      expect(response.body.message).to.equal("Categories deleted successfully");
    });
    it("should respond error for not finding Id to delete", async () => {
      const response = await chai.request(app).delete(`/api/categories/0`);
      expect(response.statusCode).to.equal(401);
    });
  });
});
