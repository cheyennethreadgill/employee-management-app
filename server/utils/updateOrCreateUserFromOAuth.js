import { connectDB } from "../api/database.js";
// take user info from google oath and create new user in db

// user from get user
export const updateOrCreateUserFromOAuth = async (req, res, next, { oauthUserInfo }) => {
  const { id: googleID, verified_email, email, given_name, family_name } = oauthUserInfo;

  const db = await connectDB();

  try {
    // check to see if user is already in db

    const userExists = await db(process.env.MONGODB_DBNAME)
      .collection("employees")
      .findOne({
        email,
      })
      .toArray();

    if (userExists) {
      console.log("****userExists");
      await employees.findOneAndUpdate(
        { email },
        {
          $set: {
            googleID,
            isVerified: verified_email,
          },
        }
      );
      const foundInsertedUser = await employees.findOne({
        email,
      });
      return foundInsertedUser;
    } else {
      // // *****saving user with mongoose
      await employees.insertOne({
        googleID,
        fname: given_name,
        lname: family_name,
        email,
        isVerified: verified_email,
      });
      const foundInsertedUser = await employees.findOne({
        email,
      });

      return foundInsertedUser;
    }
  } catch (err) {
    next(err);
    // return res.status(500).json({ message: err });
  }
};
