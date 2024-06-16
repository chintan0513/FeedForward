const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secretKey = "FeedForward"

exports.createUser = async (req, res) => {
    const { address, name, email, password } = req.body;
    console.log(req.body);
    try {
        const encryptedPassword = await bcrypt.hash(password, 7);

        const newUser = new User({
            name: name,
            email: email,
            address: address,
            password: encryptedPassword,
        });

        await newUser.save();
        res.status(201).json({ ...newUser });
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: "Username or Password is incorrect!" });
        }

        const verifyUser = await bcrypt.compare(password, user.password);
        if (!verifyUser) {
            return res.status(401).json({ message: "Username or Password is incorrect!" });
        }

        const token = jwt.sign({ userId: user._id }, 
                                 secretKey,
                               { expiresIn: '1h' });

        console.log("Sign in successfully")
        let loggedInUser = {
            id: user?._id,
            token: token,
            name: user?.name,
            email: user?.email,
            active: user?.active
        }
        res.status(200).json({ message: 'Login successful', user: loggedInUser });
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message });
    }
}

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({ success: true, message: 'Users Data', data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }

        const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedUser) {
            return res.status(400).json({ success: false, message: 'Error while updating!' });
        }

        res.status(200).json({ success: true, message: 'User Updated Successfully!', data: updatedUser });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};