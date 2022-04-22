"use strict";

const request = require("supertest");

const db = require("../db");
const app = require("../app");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
  adminToken,
} = require("./_testCommon");
const { response } = require("../app");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

let testId;

/************************************** POST /jobs */

describe("POST /jobs", function () {
  const newJob = {
    title: "new job",
    salary: 50,
    equity: "0.50",
    company_handle: "c1",
  };

  test("ok for users", async function () {
    const resp = await request(app)
      .post("/jobs")
      .send(newJob)
      .set("authorization", `Bearer ${adminToken}`);

    console.log("RESP BODY:     ", resp.body);
    newJob.id = resp.body.job.id;

    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({
      job: newJob,
    });
  });

  test("bad request with missing data", async function () {
    const resp = await request(app)
      .post("/jobs")
      .send({
        title: "incomplete job",
      })
      .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(400);
  });

  test("bad request with invalid data", async function () {
    const resp = await request(app)
      .post("/jobs")
      .send({
        title: "bad equity",
        salary: "50",
        equity: ".5",
        company_handle: "c1",
      })
      .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(400);
  });
});

/************************************** GET /jobs */

describe("GET /jobs", function () {
  test("ok for anon", async function () {
    const resp = await request(app).get("/jobs");
    let ids = resp.body.jobs.map(row => row.id);
    testId = ids[0];
    expect(resp.body).toEqual(
      {
        "jobs": [
          {
            "company_handle": "c1",
            "equity": "0.1",
            "id": ids[0],
            "salary": 45,
            "title": "firstJob"
          },
          {
            "company_handle": "c2",
            "equity": "0.01",
            "id": ids[1],
            "salary": 4,
            "title": "c2Job"
          },
          {
            "company_handle": "c3",
            "equity": "0.0011",
            "id": ids[2],
            "salary": 5,
            "title": "c3Job"
          },
          {
            "company_handle": "c1",
            "equity": "0.01",
            "id": ids[3],
            "salary": 45,
            "title": "secondJob"
          }]
      });
  });

  test("fails: test next() handler", async function () {
    // there's no normal failure event which will cause this route to fail ---
    // thus making it hard to test that the error-handler works with it. This
    // should cause an error, all right :)
    await db.query("DROP TABLE jobs CASCADE");
    const resp = await request(app)
      .get("/jobs")
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(500);
  });
});

/************************************** GET /jobs/:handle */

describe("GET /jobs/:id", function () {
  test("works for anon", async function () {
    const resp = await request(app).get(`/jobs/${testId}`);

    expect(resp.body).toEqual({
      job: {
        "company_handle": "c1",
        "equity": "0.1",
        "id": testId,
        "salary": 45,
        "title": "firstJob"
      }
    });
  });

  test("not found for no such job", async function () {
    const resp = await request(app).get(`/jobs/999999`);
    expect(resp.statusCode).toEqual(404);
  });
});

/************************************** PATCH /jobs/:handle */

describe("PATCH /jobs/:id", function () {
  test("works for users", async function () {
    const resp = await request(app)
      .patch(`/jobs/${testId}`)
      .send({
        title: "new job",
      })
      .set("authorization", `Bearer ${adminToken}`);
    expect(resp.body).toEqual({
      job: {
        "company_handle": "c1",
        "equity": "0.1",
        "id": testId,
        "salary": 45,
        "title": "new job"
      }
    });
  });

  test("unauth for anon", async function () {
    const resp = await request(app).patch(`/jobs/9999`).send({
      name: "C1-new",
    });
    expect(resp.statusCode).toEqual(401);
  });

  test("not found on no such job", async function () {
    const resp = await request(app)
      .patch(`/jobs/999999`)
      .send({
        title: "new nope",
      })
      .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(404);
  });


  test("bad request on invalid data", async function () {
    const resp = await request(app)
      .patch(`/jobs/${testId}`)
      .send({
        salary: "not a number",
      })
      .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(400);
  });
});

/************************************** DELETE /jobs/:handle */

describe("DELETE /jobs/:handle", function () {
  test("works for amin", async function () {
    const resp = await request(app)
      .delete(`/jobs/${testId}`)
      .set("authorization", `Bearer ${adminToken}`);
    expect(resp.body).toEqual({ deleted: `${testId}` });
  });

  test("unauth for anon", async function () {
    const resp = await request(app).delete(`/jobs/${testId}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("not found for no such company", async function () {
    const resp = await request(app)
      .delete(`/jobs/9999`)
      .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(404);
  });
});
