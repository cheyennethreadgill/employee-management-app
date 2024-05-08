import { Router } from "express";
import { employees, users } from "../database.js";
import jwt from "jsonwebtoken";
// import { awsHandler } from "../Middleware/Employee/aws.handler.js";

import multer from "multer";
import aws from "aws-sdk";

// aws
// upload to multer memory storage
const upload = multer({
  storage: multer.memoryStorage(),
});

export const employeeRouter = new Router();

employeeRouter.get("/employees", async (req, res, next) => {
  try {
    let foundArray = [];
    const allEmployeesFound = employees.find();

    for await (const doc of allEmployeesFound) {
      foundArray.push(doc);
    }
    res.json(foundArray);
  } catch (err) {
    console.log(`************error getting employees in employee route: ${err}`);
    next(err);
  }
});

employeeRouter.get("/find-employee", async (req, res, next) => {
  const reqName = req.body.fname;

  try {
    const foundEmployee = await employees.findOne({ fname: reqName });

    if (!foundEmployee) {
      res.send("user not found.");
    } else {
      res.json({
        status: `success: ${res.statusCode}`,
        foundEmployee: foundEmployee,
      });
    }
  } catch (err) {
    console.log(`error finding user: ${err}`);
    next(err);
  }
});

employeeRouter.put("/update-employee/:id", upload.single("image"), async (req, res, next) => {
  console.log(req.body);
  console.log("req body in server--------------");
  console.log(req.file);
  console.log("req file in server--------------");
  const { authorization } = req.headers;
  const { id } = req.params;

  let employeeInfoIntital = {
    email: req.body.email,
  };

  let employeeInfoUpdated = {
    $set: {
      fname: req.body.fname,
      lname: req.body.lname,
      degree: req.body.degree,
      mobile: req.body.mobile,
      designation: req.body.designation,
      department: req.body.department,
      email: req.body.email,
      image: req.body.image || req.file.originalname,
    },
  };

  if (!authorization) {
    console.log("NOT AUTHORIZED");
    res.status(401).json({ message: "You don't have acces to change this resource.", auth: authorization });
  }
  // get payload from auth token sent from client
  const token = authorization.split(" ")[1];

  // verify the payload from client
  jwt.verify(token, "nkjsd;s5s68edsfdgdg8ds56r54KJhHGTFFYHTFYULHJDIUHSD", async (err, decoded) => {
    if (err) {
      return res.status(409).json({ message: "Error with JWT verification" });
    }

    // get id from the client and return error if it doesnt match authorization id

    console.log(id);
    console.log(decoded.id);
    console.log(decoded);

    // const s = paramID.split(".")[1];
    // const d = JSON.parse(atob(s));

    // if email sent from client doesnt equal the id that they want to update
    if (id !== decoded.id) {
      return res.status(409).json({ message: "You do not have access to change this resource." });
    }
    // update the emloyee
    if (req.file) {
      // If a file is selected by client...
      try {
        // Configure AWS SDK with environment variables
        const s3 = new aws.S3({
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          region: process.env.AWS_REGION, // Specify the region where your S3 bucket is located
        });

        // Generate a unique key based on the file's original name
        function generateKey() {
          const origname = req.file.originalname;
          return `${origname}`;
        }
        const uploadParams = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: "", // Leave it empty for now
        };
        // Set the Key property using the generated key function
        uploadParams.Key = generateKey();
        uploadParams.Body = req.file.buffer;

        // Upload file to S3
        s3.upload(uploadParams, (err, data) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: "Failed to upload file to S3" });
          }
          // File uploaded successfully, return URL or other relevant info
          console.log({ url: data.Location });
        });

        employees.updateOne(employeeInfoIntital, employeeInfoUpdated);

        // get the data from db
        // create web token
        jwt.sign(
          { id: _id, fname, lname, username, email, password, isVerified },
          process.env.JWT_SECRET,
          { expiresIn: "2d" },
          function (err, token) {
            if (err) {
              return res.status(401).json("Unauthorized access.");
            } else {
              // send token to front end
              res.status(200).json({ token });
            }
          }
        );

        return res.json({
          status: "success",
          message: "Employee update successfully.",
          employee: req.body,
        });
      } catch (err) {
        console.log(`error update employee: ${err}`);
        return next(err);
      }
    } else {
      try {
        employees.updateOne(employeeInfoIntital, employeeInfoUpdated);

        return res.json({
          status: "success",
          message: "Employee updated successfully.",
          employee: req.body,
        });
      } catch (err) {
        console.log(`error update employee: ${err}`);
        return next(err);
      }
    }
  });

  res.end();
});

employeeRouter.post("/add-employee", upload.single("image"), async (req, res, next) => {
  // if req file isnt present, continue with query
  // if req file is present want to send error if req file is uploaded, else continue with query

  let employeeInfo = {
    fname: req.body.fname,
    lname: req.body.lname,
    mobile: req.body.mobile,
    designation: req.body.designation,
    department: req.body.department,
    email: req.body.email,
    degree: req.body.degree,
    image: (req.file && req.file.originalname) || " ",
  };

  if (req.file) {
    //******\*\*\*\*******\*******\*\*\*\*******if file exists
    console.log(employeeInfo);
    console.log(`^^^^employeeinfo logged inside of req.file cnditional`);

    //SET REQ FILE FOR ABOVE
    image = req.file.originalname;

    // SERVER HANDLE FILE CHECK
    let index = image.lastIndexOf(".");
    let extension = image.substring(-1 + index + 1);

    // Generate a unique key based on the file's original name
    function generateKey() {
      const origname = req.file.originalname;
      return `${origname}`;
    }
    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: "", // Leave it empty for now
    };
    // Set the Key property using the generated key function
    uploadParams.Key = generateKey();
    uploadParams.Body = req.file.buffer;

    // Upload file to S3
    s3.upload(uploadParams, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to upload file to S3" });
      }
      // File uploaded successfully, return URL or other relevant info
      console.log({ url: data.Location });
    });

    if (extension !== ".png" && extension !== ".jpeg" && extension !== ".jpg") {
      //if file exists and extension is wrong
      res.status(500).json({ error: `Please give valid extension: ${extension}` });
      console.log(`Please give valid extension. File entered: ${extension}`);
    } else {
      try {
        await employees.insertOne(employeeInfo);

        res.json({
          status: "success",
          message: "Employee added successfully.",
          employee: req.body,
        });
      } catch (err) {
        console.log(`error adding employee: ${err}`);
        next(err);
      }
      console.log(` valid extension: ${extension}`);
      console.log(`IMAGE UPLOADED (req file else conditional): ${image}`);
      console.log(req.file);
      console.log({ body: req.body });
    }
  } else {
    try {
      await employees.insertOne(employeeInfo);

      res.json({
        status: res.statusCode,
        message: "Employee added successfully.",
        employee: req.body,
      });
    } catch (err) {
      console.log(`error adding employee: ${err}`);
      next(err);
    }

    console.log("*******employee added successfully" + { body: req.body });
  }
});

employeeRouter.delete("/delete-employee/:email", async (req, res) => {
  try {
    let vals = req.params.email;
    console.log(vals);
    await employees.deleteOne({ email: vals });
    await users.deleteOne({ email: vals });
  } catch (err) {
    res.json({ message: err });
  }
});
