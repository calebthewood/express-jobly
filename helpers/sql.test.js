const { BadRequestError } = require("../expressError");

// 1st arg always json body of update data, 2nd arg field names to update.
  //users ex: (req.body , firstName: "first_name",lastName: "last_name",isAdmin: "is_admin")

  // output: {
    //setCols: ['"first_name"=$1', '"last_name"=$2', '"password"=$3', '"email"=$4'],
    //values: ["Frodo", "Baggins", "iluvSam", "email@email.com"]
    //}

