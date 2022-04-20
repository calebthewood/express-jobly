const { BadRequestError } = require("../expressError");
const { sqlForPartialUpdate } = require("./sql");

// 1st arg always json body of update data, 2nd arg field names to update.
//users ex: (req.body , firstName: "first_name",lastName: "last_name",isAdmin: "is_admin")

// output: {
//setCols: ['"first_name"=$1', '"last_name"=$2', '"password"=$3', '"email"=$4'],
//values: ["Frodo", "Baggins", "iluvSam", "email@email.com"]
//}

describe("sqlForPartialUpdate", function () {
  test("process user input", function () {
    const result = sqlForPartialUpdate(
      { firstName: "Frodo", isAdmin: true },
      {
        firstName: "first_name",
        lastName: "last_name",
        isAdmin: "is_admin",
      }
    );
    expect(result).toEqual({
      setCols: '"first_name"=$1, "is_admin"=$2',
      values: ["Frodo", true],
    });
  });

  test("process company input", function () {
    const result = sqlForPartialUpdate(
      { numEmployees: "23", logoUrl: "url1" },
      {
        numEmployees: "num_employees",
        logoUrl: "logo_url",
      }
    );
    expect(result).toEqual({
      setCols: '"num_employees"=$1, "logo_url"=$2',
      values: ["23", "url1"],
    });
  });

  test("process no input", function () {
    let result;
    let error;
    try {
      result = sqlForPartialUpdate(
        {},
        {
          numEmployees: "num_employees",
          logoUrl: "logo_url",
        }
      );
    } catch (err) {
      error = err;
      //could catch err msg or code as well
    }
    expect(error).toBeInstanceOf(BadRequestError);
  });
});
