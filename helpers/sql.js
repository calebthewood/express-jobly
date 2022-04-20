const { BadRequestError } = require("../expressError");

/**
 * Accepts two Arguments:
 *   1. dataToUpdate: object of values to be inserted by pg into SQL query.
 *   2. jsToSql: object containing properties to identify column names for update in SQL SET query.
 *
 * Returns two values:
 *  1. column names as $-strings formatted to be inserted into an SQL query,
 *  2. an array of corresponding values.
 */
//provide sample input --> output
function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
