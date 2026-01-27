const fs = require("node:fs");
const path = require("node:path");

// log contents of the file to console

const imgPath = path.join(__dirname, "../../public/images/admin.jpg");

const logFile = () => {
  fs.readFile(imgPath, (err, data) => {
    if (err) {
      console.log(`***********err reading file: ${err}`);
    }
    console.log("File data (Buffer):", data);
  });
};

logFile();
