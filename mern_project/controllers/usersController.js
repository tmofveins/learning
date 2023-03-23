const User = require("../models/User");
const Note = require("../models/Note");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");


// @desc get all users
// @route GET /users
// @access private
const getAllUsers = asyncHandler(async(req, res) => {
    // -password removes the password field
    // lean returns js object instead of mongoose document
    // more lightweight return option, but you can't use mongoose features on it
    const users = await User.find().select("-password").lean();

    if (!users?.length) {
        // 400 = bad request
        return res.status(400).json({ message: "No users found" });
    }

    res.json(users);
});

// @desc create new user
// @route POST /users
// @access private
const createNewUser = asyncHandler(async(req, res) => {
    const { username, password, roles } = req.body;

    // confirming data exists
    if (!username || !password || !Array.isArray(roles) || !roles.length) {
        return res.status(400).json({ message: "All fields are required to create a user" });
    }

    // check for duplicate username
    // exec ensures the statement is executed as a Promise (hence the await)
    const duplicate = await User.findOne({ username }).lean().exec();
    if (duplicate) {
        // 409 = conflict
        return res.status(409).json({ message: "Duplicate username" });
    }

    // hash password
    const hashedPwd = await bcrypt.hash(password, 10); // salt rounds
    const userObject = { username, "password": hashedPwd, roles };
    const user = await User.create(userObject);

    if (user) {
        // 201 = created, usually sent after POST/PUT requests
        res.status(201).json({ message: `New user ${username} created` });
    } else {
        res.status(400).json({ message: "Invalid user data received" });
    }
});

// @desc update a user
// @route PATCH /users
// @access private
const updateUser = asyncHandler(async(req, res) => {
    const { id, username, roles, active, password } = req.body;

    if (!id || !username || !Array.isArray(roles) || !roles.length || typeof active !== "boolean") {
        return res.status(400).json({ message: "All fields are required" });
    }

    // we need to save changes, so obtain user as mongoose document
    const user = await User.findById(id).exec();

    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    // check for potential duplicate
    const duplicate = await User.findOne({ username }).lean().exec();
    // only an actual duplicate if the id is the same
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: "Duplicate username" });
    }

    user.username = username;
    user.roles = roles;
    user.active = active;

    // password might not be updated
    if (password) {
        user.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await user.save();
    res.json({ message: `Update user ${updatedUser.username}` });
});

// @desc delete a user
// @route DELETE /users
// @access private
const deleteUser = asyncHandler(async(req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ message: "User ID required" });
    }

    // can't delete user with assigned notes
    const note = await Note.findOne({ user: id }).lean().exec();
    if (note) {
        return res.status(400).json({ message: "User has assigned notes" });
    }

    const user = await User.findById(id).exec();
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    const result = await user.deleteOne();
    const reply = `Username ${result.username} with ID ${result._id} deleted`;
    res.json(reply);
});

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
};