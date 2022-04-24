const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../../app");

chai.use(chaiHttp);
let token;

describe("Posts test", () => {
  before((done) => {
    chai
      .request(server)
      .post("/api/v1/users/authenticate")
      .send({ email: "jeyhun", password: "12345" })
      .end((err, res) => {
        if (err) throw err;
        token = res.body.token;
        done();
      });
  });

  describe("GET posts", () => {
    it("should return all posts", (done) => {
      chai
        .request(server)
        .get("/auth/api/v1/posts")
        .set("x-access-token", token)
        .end((err, res) => {
          if (err) throw err;
          res.should.have.status = 200;
          res.body.posts.should.be.a('array');
          done();
        });
    });
  });
});
