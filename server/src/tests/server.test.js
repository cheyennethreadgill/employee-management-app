const mysql = require("mysql");

describe("test DB", () => {
  beforeEach(() => {
    console.log("before working");

    function connectToDatabase() {
      return mysql.createConnection({
        user: process.env.MYSQL_ROOT,
        host: process.env.MYSQL_HOST,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
      });
    }

    // setup a new connection
    const dbConnection = connectToDatabase();

    // connect to db
    dbConnection.connect((err) => {
      if (err) {
        console.log(`DB TEST CONNECTION ERROR: ${err}`);
        throw err;
      } else {
        expect(dbConnection.state).toBe("connected");
      }
    });
  });
  // -------------------------------------------------before each end

  it("test get all employees from db", () => {
    // create dummy data
    console.log("first test working");
  });
});
// ---------describe end
