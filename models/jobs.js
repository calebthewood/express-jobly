"use strict";
const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");


/** Related functions for jobs */

class Job {

//Create Job, POST
static async create({ title, salary, equity, company_handle }) {

  const result = await db.query(
    `INSERT INTO jobs(title, salary, equity, company_handle)
    VALUES ($1, $2, $3, $4)
    RETURNING id, title, salary, equity, company_handle`,
    [title, salary, equity, company_handle]
  );

  const job = result.rows[0];
  return job;

}


static sqlFilterMaker({ minSalary, hasEquity, title }) {
  let whereArr = [];
  let values = [];

  if (minSalary) {
    values.push(minSalary);
    whereArr.push(`salary >= $${values.length}`);
  }
  if (title) {
    values.push(`%${title}%`);
    whereArr.push(`title ILIKE $${values.length}`);
  }
  if (hasEquity) {
    whereArr.push(`equity > 0`);
  }

  const where = whereArr.length > 0 ? "WHERE " + whereArr.join(" AND ") : "";
  return { where, values };
}


//Show Jobs, GET
static async findAll(filters = {}) {
  const {minSalary, hasEquity, title} = filters;

  const { where, values } = this.sqlFilterMaker({
    minSalary,
    hasEquity,
    title
  });

  const response = await db.query(
    `SELECT id, title, salary, equity, company_handle
      FROM jobs
      ${where}
      ORDER BY id`,
      values
    );

    return response.rows
}

//Show Job, GET

static async get(id) {
  const results = await db.query(
    `SELECT id, title, salary, equity, company_handle
      FROM jobs
      WHERE id = $1
    `, [id]
  );

  const job = results.rows[0];
  if (!job) throw new NotFoundError(`No job with id: ${id}`);

  return job;
}


//Update Job, PATCH
//Delete Job, DELETE


}

module.exports = Job;
