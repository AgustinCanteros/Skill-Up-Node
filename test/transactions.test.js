var chai = require("chai");
let chaiHttp = require("chai-http");
var expect = require("chai").expect;

let app = require("../app");

chai.use(chaiHttp);

const transactions = {
  description: "impuesto",
  amount: 10,
  userId: 3,
  categoryId: 1,
  date: "2022-11-06",
};

// parent block
describe("Test endpoints transactions", () => {
  describe("GET /transactions", () => {
    it("It should give all transactions information", async () => {
      const response = await chai.request(app).get("/api/transactions");
      expect(response.statusCode).to.equal(200);
      expect(response.body.message).to.equal("Users obtained successfully");
      expect(response).to.have.property("body");
    });
    it("get transactions by id", async () => {
      const id = 1;
      const response = await chai.request(app).get(`/api/transactions/${id}`);
      expect(response.statusCode).to.equal(200);
      expect(response.body.message).to.equal(
        "transactions obtained successfully"
      );
    });
    it("It should not get any information if there is no id", async () => {
      const response = await chai.request(app).get(`/api/transactions/0`);
      expect(response.statusCode).to.equal(400);
    });
  });

  describe("POST /transactions", () => {
    it("should create transactions", async () => {
      const response = await chai
        .request(app)
        .post(`/api/transactions`)
        .send(transactions);
      expect(response.status).to.equal(200);
      expect(response.body.message).to.equal("transactions was created");
    });
    it("should not create transactions without name and description fields", async () => {
      const response = await chai
        .request(app)
        .post(`/api/transactions`)
        .send({});
      expect(response.status).to.equal(400);
    });
  });

  describe("PUT /transactions", () => {
    it("must edit transactions with id if contain firstName, lastName, email, avatar and roleId fields", async () => {
      const id = 23;
      const response = await chai
        .request(app)
        .put(`/api/transactions/${id}`)
        .send(transactions);
      expect(response.statusCode).to.equal(200);
      expect(response.body.message).to.equal("transactions was edited");
    });
    it("must respond error due to missing fields", async () => {
      const id = 5;
      const response = await chai
        .request(app)
        .put(`/api/transactions/${id}`)
        .send({});
      expect(response.statusCode).to.equal(400);
    });
  });
  describe("DELETE /transactions", () => {
    it("you must delete transactions with id", async () => {
      const id = 6;
      const response = await chai
        .request(app)
        .delete(`/api/transactions/${id}`);
      expect(response.statusCode).to.equal(200);
      expect(response.body.message).to.equal(
        "transactions deleted successfully"
      );
    });
    it("should respond error for not finding Id to delete", async () => {
      const response = await chai.request(app).delete(`/api/transactions/0`);
      expect(response.statusCode).to.equal(400);
    });
  });
});
