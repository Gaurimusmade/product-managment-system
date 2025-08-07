const bcrypt = require("bcryptjs");
const db = require("../config/db");
const Users = require("../models/userSchema");

module.exports.isUserExists = async (name, email) => {
  try {
    const user = await Users.findOne({ $or: [{ name }, { email }] });
    if (user == null) return false;
    return true;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.newUser = async (userData) => {
  try {
    const newUser = new Users(userData);
    await newUser.save();
    return true;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.varifyUser = async (name, password) => {
  try {
    const result = await Users.findOne({ name });
    if (result.length > 0) {
      let flag = bcrypt.compare(password, result[0].password);
      if (flag) {
        return result[0];
      } else {
        return [];
      }
    }
    return [];
  } catch (err) {
    throw new Error(err);
  }
};
