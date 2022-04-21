"use strict";

const db = require("../db.js");
const { BadRequestError, NotFoundError } = require("../expressError");
const Job = require("./jobs.js");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

let jobId;

/************************************** create */

describe("create", function () {
  const newJob = {
    company_handle: "c1",
    title: "new_job",
    salary: 50,
    equity: "0.01",
  };

  test("works", async function () {
    let job = await Job.create(newJob);
    let id = job.id;
    expect(job).toEqual({
      id: id,
      company_handle: "c1",
      title: "new_job",
      salary: 50,
      equity: "0.01",
    });

    const result = await db.query(
      `SELECT company_handle, title, salary, equity
        FROM jobs
        WHERE title = 'new_job'`
    );
    expect(result.rows).toEqual([
      {
        company_handle: "c1",
        title: "new_job",
        salary: 50,
        equity: "0.01",
      },
    ]);
  });
});

/************************************** findAll */

describe("findAll", function () {
  test("works: no filter", async function () {
    let jobs = await Job.findAll();
    jobId = jobs[0].id;
    expect(jobs).toEqual([
      {
        id: jobs[0].id,
        title: "firstJob",
        salary: 45,
        equity: "0.1",
        company_handle: "c1",
      },
      {
        id: jobs[1].id,
        title: "c2Job",
        salary: 4,
        equity: "0.01",
        company_handle: "c2",
      },
      {
        id: jobs[2].id,
        title: "c3Job",
        salary: 5,
        equity: "0.0011",
        company_handle: "c3",
      },
      {
        id: jobs[3].id,
        title: "secondJob",
        salary: 45,
        equity: "0.01",
        company_handle: "c1",
      },
    ]);
  });

  test("works: with filter", async function () {
    let jobs = await Job.findAll({
      title: "c3",
      minSalary: 5,
      hasEquity: true,
    });
    expect(jobs).toEqual([
      {
        id: jobs[0].id,
        title: "c3Job",
        salary: 5,
        equity: "0.0011",
        company_handle: "c3",
      },
    ]);
  });
});
/************************************** get */

describe("get", function () {
  test("works", async function () {
    let job = await Job.get(jobId);

    expect(job).toEqual({
      id: jobId,
      title: "firstJob",
      salary: 45,
      equity: "0.1",
      company_handle: "c1",
    });
  });

  test("not found if no such company", async function () {
    try {
      await Job.get(999999);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

/************************************** update */

describe("update", function () {
  const updateData = {
    title: "new_job",
    salary: 500,
    equity: "1",
  };

  test("works", async function () {
    let job = await Job.update(jobId, updateData);

    expect(job).toEqual({
      id: job.id,
      title: "new_job",
      salary: 500,
      equity: "1",
      company_handle: "c1",
    });

    const result = await db.query(
      `SELECT company_handle, title, salary, equity
           FROM jobs
           WHERE title = 'new_job'`
    );
    expect(result.rows[0]).toEqual({
      id: result.rows[0].id,
      title: "new_job",
      salary: 500,
      equity: "1",
      company_handle: "c1",
    });
  });

  test("works: null fields", async function () {
    const updateDataSetNulls = {
      title: "new_job",
      salary: null,
      equity: null,
    };

    let job = await Job.update(jobId, updateDataSetNulls);
    expect(job).toEqual({
      id: job.id,
      title: "new_job",
      salary: null,
      equity: null,
      company_handle: "c1",
    });

    const result = await db.query(
      `SELECT id, company_handle, title, salary, equity
           FROM jobs
           WHERE title = 'new_job'`
    );

    expect(result.rows[0]).toEqual({
      id: jobId,
      company_handle: "c1",
      title: "new_job",
      salary: null,
      equity: null,
    });
  });

  test("not found if no such job", async function () {
    try {
      await Job.get(999999999);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });

  test("bad request with no data", async function () {
    try {
      await Job.update("new_job", {});
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

/************************************** remove */

describe("remove", function () {
  test("works", async function () {
    await Job.remove(jobId);
    const res = await db.query("SELECT title FROM jobs WHERE title='firstJob'");
    expect(res.rows.length).toEqual(0);
  });

  test("not found if no such company", async function () {
    try {
      await Job.remove(99999);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});
