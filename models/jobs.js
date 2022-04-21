"use strict";
const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

/** Related functions for jobs */

class Job {
  /** Create a job { title, salary, equity, company_handle },
   *  update db, return new job data.
   *
   * Returns { id, title, salary, equity, company_handle }
   *
   * Throws BadRequestError if job already in database.
   * */
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

  /**
   * Accepts parameters to filter by in query string, and applies filters to
   * findAll query.
   *
   * append "WHERE"
   * {num} minSalary => {string} `salary <= $${index+1}`
   * append "AND"
   * {string} title => {string} `title ILIKE $${values.length}`
   * append "AND"
   * {bool} hasEquity => {string} `equity > 0`
   *
   */
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

  /** Find all jobs.
   * Accepts optional filter argument
   *
   * { minSalary: int, hasEquity: bool, title: string }
   *
   * Returns [{ id, title, salary, equity, company_handle }, ...]
   * */
  static async findAll(filters = {}) {
    const { minSalary, hasEquity, title } = filters;

    const { where, values } = this.sqlFilterMaker({
      minSalary,
      hasEquity,
      title,
    });

    const response = await db.query(
      `SELECT id, title, salary, equity, company_handle
      FROM jobs
      ${where}
      ORDER BY id`,
      values
    );

    return response.rows;
  }

  /** Given a job id, return data about job.
   *
   * Returns { id, title, salary, equity, company_handle }
   *   where jobs is [{ id, title, salary, equity, companyHandle }, ...]
   *
   * Throws NotFoundError if not found.
   **/

  static async get(id) {
    const results = await db.query(
      `SELECT id, title, salary, equity, company_handle
      FROM jobs
      WHERE id = $1
    `,
      [id]
    );

    const job = results.rows[0];
    if (!job) throw new NotFoundError(`No job with id: ${id}`);

    return job;
  }

  /** Update job data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain all the
   * fields; this only changes provided ones.
   *
   * Data can include: {title, salary, equity}
   *
   * Returns {id, title, salary, equity, company_handle}
   *
   * Throws NotFoundError if not found.
   */

  static async update(id, data) {
    const { setCols, values } = sqlForPartialUpdate(data, {});

    const querySql = `
      UPDATE jobs
      SET ${setCols}
        WHERE id = ${id}
        RETURNING id, title, salary, equity, company_handle`;
    const result = await db.query(querySql, [...values]);
    const job = result.rows[0];

    if (!job) throw new NotFoundError(`No job id: ${id}`);

    return job;
  }

  /** Delete given job from database; returns undefined.
   *
   * Throws NotFoundError if job not found.
   **/
  static async remove(id) {
    const result = await db.query(
      `DELETE
           FROM jobs
           WHERE id = $1
           RETURNING id`,
      [id]
    );
    const job = result.rows[0];

    if (!job) throw new NotFoundError(`No job id: ${id}`);
  }
}

module.exports = Job;
