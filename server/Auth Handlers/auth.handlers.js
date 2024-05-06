import User from "../Models/user.login.model.js";
// import successPage from "../views/successPage.jsx";
import jwt from "jsonwebtoken";
import { employees, users } from "../database.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export const signUpHandler = async (req, res) => {
  const { fname, lname, username, email, password } = req.body;
  try {
    const user = new User({
      fname: req.body.fname,
      lname: req.body.lname,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    // check to see if user is already in db
    const userExists = await User.findOne({
      username: req.body.username,
    });

    if (userExists) {
      res.status(409).json({ message: "sign up function handler: Username already exists." });
    } else {
      // // *****saving user with mongoose
      const insertedUser = await user.save();

      // get the id from the inserted user after query into the database
      const { _id } = insertedUser;

      // create web token
      jwt.sign(
        { id: _id, fname, lname, username, email },
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
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

export const loginHandler = async (req, res) => {
  // const { username, password } = req.body;

  let usernameBody = req.body.username;
  let passwordBody = req.body.password;

  try {
    // compare user info and db info

    // check to see if user is already in db
    const foundUser = await User.findOne({
      username: usernameBody,
    });

    if (foundUser) {
      const { _id, fname, lname, username, password, email } = foundUser;
      // conpmare password against db
      bcrypt.compare(passwordBody, password, (err, result) => {
        if (err) {
          res.sendStatus(409).json({ message: "*****Login encryption error." });
        }
        if (result === false) {
          res.status(401).json({
            message: "login error: Invalid credentials.",
            user: username,
          });
        } else {
          // generate token(cookie) to send to client
          jwt.sign(
            { id: _id, fname, lname, username, email, password },
            process.env.JWT_SECRET,
            { expiresIn: "1hr" },
            (err, token) => {
              if (err) {
                res.sendStatus(401).json({ message: "login error: Invalid JWT credentials." });
              }
              res.status(200).json({ token });
            }
          );
        }
      });
    } else {
      res.status(409).json({ message: "Invalid credentials." });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
export const forgotPasswordHandler = async (req, res) => {
  const { email } = req.params;

  // // generate random string to send to user
  const passwordResetCode = uuid();

  const { modifiedCount } = await employees.updateOne(
    {
      email,
    },
    { $set: { passwordResetCode } }
  );
  console.log(modifiedCount);
  if (modifiedCount > 0) {
    try {
      await sendEmail({
        to: email,
        from: "threadgillcheyenne@gmail.com",
        subject: "Password reset",
        text: `
          To reset your password, click this link: http://localhost:3000/reset-password/${passwordResetCode}
        `,
      });
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  } else {
    return res.status(500).json({ message: "Invalid credentials." });
  }
};
