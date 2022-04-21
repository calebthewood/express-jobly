"use strict";

const db = require("../db.js");
const { BadRequestError, NotFoundError } = require("../expressError");

const Job = require("./jobs.js");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  jobsIds
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);


/************************************** create */

describe("create", function () {
  const newJob = {
    company_handle: "c1",
    title: "new_job",
    salary: "50",
    equity: "0.01",
  };
  test("works", async function () {
    let job = await Job.create(newJob);
    expect(job).toEqual(newJob);

    const result = await db.query(
      `SELECT company_handle, title, salary, equity
        FROM jobs
        WHERE company_handle = 'c1'`
    );
    expect(result.rows[0]).toEqual([
      {
        company_handle: "c1",
        title: "new_job",
        salary: "50",
        equity: "0.01",
      },
    ]);
  });
  test("bad request with dupe", async function () {
    try {
      await Job.create(newJob);
      await Job.create(newJob);
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

/************************************** findAll */

describe("findAll", function () {
    test("works: no filter", async function () {
      let jobs = await Job.findAll();
      expect(jobs).toEqual([
        {
          id: jobsIds[0].id,
          title: "firstJob",
          salary: "45",
          equity: "0.1",
          company_handle: "c1",
        },
        {
            id: jobsIds[1].id,
            title: "c2Job",
            salary: "4",
            equity: "0.01",
            company_handle: "c2",
          },
          {
            id: jobsIds[2].id,
            title: "c3Job",
            salary: "5",
            equity: "0.0011",
            company_handle: "c3",
          },
          {
            id: jobsIds[3].id,
            title: "secondJob",
            salary: "45",
            equity: "0.01",
            company_handle: "c1",
          },
      ]);
    });
  
    test("works: with filter", async function () {
      let jobs = await Job.findAll({
        title: "c",
        minSalary: 5,
        hasEquity: true,
      });
      expect(jobs).toEqual([
        {
            id: jobsIds[2].id,
            title: "c3Job",
            salary: "5",
            equity: "0.0011",
            company_handle: "c3",
          }
      ]);
    });

    /************************************** get */

describe("get", function () {
    test("works", async function () {
      let job = await Job.get(jobsIds[0].id);
      expect(job).toEqual({
        id: jobsIds[0].id,
        title: "firstJob",
        salary: "45",
        equity: "0.1",
        company_handle: "c1",
      },);
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
    company_handle: "new_company",
    title: "new_job",
    salary: "500",
    equity: "99",
  };

  test("works", async function () {
    let job = await Job.update(jobsIds[0].id, updateData);
    expect(job).toEqual({
      id: jobsIds[0].id,
      ...updateData,
    });

    const result = await db.query(
      `SELECT company_handle, title, salary, equity
           FROM jobs
           WHERE title = 'new_job'`
    );
    expect(result.rows).toEqual([
      {
        id: jobsIds[0].id,
        company_handle: "new_company",
        title: "new_job",
        salary: "500",
        equity: "99",
      },
    ]);
  });

  test("works: null fields", async function () {
    const updateDataSetNulls = {
      company_handle: "new_company",
      title: "new_job",
      salary: null,
      equity: null,
    };

    let job = await Job.update(jobsIds[0].id, updateDataSetNulls);
    expect(job).toEqual({
      id: jobsIds[0].id,
      ...updateDataSetNulls,
    });

    const result = await db.query(
      `SELECT company_handle, title, salary, equity
           FROM jobs
           WHERE title = 'new_job'`
    );
    expect(result.rows).toEqual([
      {
        id: jobsIds[0].id,
        company_handle: "new_company",
        title: "new_job",
        salary: null,
        equity: null,
      },
    ]);
  });

  test("not found if no such job", async function () {
    try {
      await Job.update("nope", updateData);
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
    await Job.remove(jobsIds[0].id);
    const res = await db.query(
      "SELECT title FROM jobs WHERE title='c2Job'"
    );
    expect(res.rows.length).toEqual(0);
  });

  test("not found if no such company", async function () {
    try {
      await Job.remove("nope");
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});