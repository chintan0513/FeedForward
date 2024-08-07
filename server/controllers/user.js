const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const secretKey = "FeedForward";

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
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "Username or Password is incorrect!" });
    }

    const verifyUser = await bcrypt.compare(password, user.password);
    if (!verifyUser) {
      return res
        .status(401)
        .json({ message: "Username or Password is incorrect!" });
    }

    const token = jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: "1h",
    });

    console.log("Sign in successfully");
    let loggedInUser = {
      id: user?._id,
      token: token,
      name: user?.name,
      email: user?.email,
      active: user?.active,
      isAdmin: user?.isAdmin,
    };
    res.status(200).json({ message: "Login successful", user: loggedInUser });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const userId = req.headers.userid;
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    res.status(200).json({ success: true, message: "User data", data: user });
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
      return res.status(404).json({ message: "User not found!" });
    }

    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedUser) {
      return res
        .status(400)
        .json({ success: false, message: "Error while updating!" });
    }

    res.status(200).json({
      success: true,
      message: "User Updated Successfully!",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ message: "No account with that email address exists." });

    // Generate a reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    // Configure nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "chintantripathi1310@gmail.com",
        pass: "qixk bujz dxrv yroy", // Use environment variables for sensitive information
      },
    });

    // Email options
    const mailOptions = {
      to: user.email,
      from: "passwordreset@your-domain.com",
      subject: "Password Reset",
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste it into your browser, to complete the process:\n\n
        http://localhost:5173/reset-password/${resetToken}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res
      .status(200)
      .json({ message: "An e-mail has been sent with further instructions." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Reset password
exports.resetPassword = async (req, res) => {
  const { token } = req.params; // Extract token from URL params
  const { password } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Password reset token is invalid or has expired." });
    }

    user.password = await bcrypt.hash(password, 7);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();
    res.status(200).json({ message: "Your password has been updated." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
