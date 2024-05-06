const User = require('../model/User');

const getAllUsers = async (req, res) => {
    const users = await User.find();
    console.log("this is get all users")
    console.log(users.length);
    if (!users) return res.status(204).json({ 'message': 'No users found' });
    res.json(users);
}

const deleteUser = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ "message": 'User ID required' });
    const user = await User.findOne({ _id: req.body.id }).exec();
    if (!user) {
        return res.status(204).json({ 'message': `User ID ${req.body.id} not found` });
    }
    const result = await user.deleteOne({ _id: req.body.id });
    console.log("deleting",result);
    res.json(result);
}

const updateUser = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }

    const foundUser = await User.findOne({ _id: req.body.id }).exec();
    if (!foundUser) {
        return res.status(201).json({ "message": `No user matches ID ${req.body.id}.` });
    }
    if (req.body?.username) foundUser.username = req.body.username;
    if (req.body?.email) foundUser.email = req.body.email;
    if (req.body?.password) foundUser.password = req.body.password;
    const result = await foundUser.save();
    res.json(result);
}


const getUser = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": 'User ID required' });
    const user = await User.findOne({ _id: req.params.id }).exec();
    if (!user) {
        return res.status(204).json({ 'message': `User ID ${req.params.id} not found` });
    }
    res.json(user);
}

module.exports = {
    getAllUsers,
    deleteUser,
    getUser,
    updateUser
}