const User = require("../models/usermodel");
const otpGnerator = require("otp-generator");
const twilio = require("twilio");
const crypto = require("crypto");
const senData = require("../config/mailer");

const { compare } = require("../utils/Machpass");
const { generateToeken } = require("../utils/Tokengenerate");
const accountsid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = new twilio(accountsid, authToken);
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { hash } = require("../utils/hashpassword");
const OTP_EXPIRATION_TIME = 30 * 1000;

exports.Register = async (req, res) => {
  try {
    const {
      UserName,
      SurName,
      Email,
      Phone_Number,
      Country,
      State,
      City,
      select_society,
      password,
      Cpassword,
    } = req.body;

    // Check required fields
    if (
      !UserName ||
      !SurName ||
      !Email ||
      !Phone_Number ||
      !Country ||
      !State ||
      !City ||
      !select_society ||
      !password ||
      !Cpassword
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required in this Form🤨",
      });
    }

    const emailAdd = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailAdd.test(Email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email ID",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Pls Add Password must be at least MEN 6 character",
      });
    }

    if (Cpassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Pls Add Confirm password must be at least MEN 6 characters",
      });
    }

    const UserByEmail = await User.findOne({ Email });
    if (UserByEmail) {
      return res.status(400).json({
        success: false,
        message: "Email ID already exists",
      });
    }

    // Confirm passwords match
    if (password !== Cpassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords does not match pls Add Right Passwords",
      });
    }

    const hashpassword = await hash(password);

    // Create user with hashed password, excluding Cpassword
    const user = await User.create({
      UserName,
      SurName,
      Email,
      Phone_Number,
      Country,
      State,
      City,
      select_society,
      password: hashpassword,
    });

    if (user) {
      res.status(200).json({
        success: true,
        message: "User Registration Completed...",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};


// Login endpoint
exports.login = async (req, res) => {
  const { EmailOrPhone, password } = req.body;

  const defaultCredentials = [
    {
      email: "user7@gmail.com",
      password: "user@7",
      role: "user",
      redirectUrl: "/ResidentManageMent",
    },
    {
      email: "security72@gmail.com",
      password: "secur7",
      role: "security",
      redirectUrl: "/VisitorTracking",
    },
  ];

  try {
    const matchedDefault = defaultCredentials.find(
      (cred) => cred.email === EmailOrPhone && cred.password === password
    );

    if (matchedDefault) {
      return res.status(200).json({
        success: true,
        message: `${matchedDefault.role} logged in successfully`,
        redirectUrl: matchedDefault.redirectUrl,
        user: { email: matchedDefault.email, role: matchedDefault.role },
      });
    }

    let query = {};
    if (EmailOrPhone.includes("@")) {
      query = { Email: EmailOrPhone }; 
    } else {
      query = { Phone: EmailOrPhone }; 
    }

    const user = await User.findOne(query); 
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate JWT token
    const token = gen(user._id,res);

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token: token,
      user: { email: user.Email, role: user.role },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
exports.logout = async (req, res) => {
  try {

    // Clear the authentication cookie
    res.clearCookie("society-auth", {
      path: "/",
      httpOnly: true,
      sameSite: "Strict",
      secure: process.env.NODE_ENV === "production",
    });

    // Send success response
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {

    // Handle error in case something goes wrong
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.GetOtp = async (req, res) => {
  try {
    const { EmailOrPhone } = req.body;

    if (!EmailOrPhone) {
      return res.status(400).json({
        success: false,
        message: "Please, Enter Email or mobile number!",
      });
    }

    const otp = otpGnerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    const currentTime = new Date();

    let user;
    if (EmailOrPhone.includes("@")) {
      user = await User.findOne({ Email: EmailOrPhone });
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Email not registered",
        });
      }

      if (user.otpExpiration && user.otpExpiration > currentTime) {
        return res.status(400).json({
          success: false,
          message: "Current OTP is still valid. Please wait for it to expire.",
        });
      }

      const otpExpiration = new Date(
        currentTime.getTime() + OTP_EXPIRATION_TIME
      );
      await User.findOneAndUpdate(
        { Email: EmailOrPhone },
        { otp, otpExpiration },
        { new: true }
      );

      // Send OTP via email
      senData(user.Email, "Forgot your password", otp);

      return res.status(200).json({
        success: true,
        message: "OTP sent successfully to email",
      });
    } else {
      user = await User.findOne({ Phone: EmailOrPhone });
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Mobile number not registered",
        });
      }

      // Check if OTP is expired
      if (user.otpExpiration && user.otpExpiration > currentTime) {
        return res.status(400).json({
          success: false,
          message: "Current OTP is still valid. Please wait for it to expire.",
        });
      }

      // Generate and set OTP with new expiration
      const otpExpiration = new Date(
        currentTime.getTime() + OTP_EXPIRATION_TIME
      );
      await User.findOneAndUpdate(
        { Phone: EmailOrPhone },
        { otp, otpExpiration },
        { new: true }
      );

      // Send OTP via SMS
      await twilioClient.messages.create({
        body: `Your Forgot Password OTP is ${otp}`,
        to: EmailOrPhone, // Phone number
        from: process.env.TWILIO_PHONE_NUMBER,
      });

      return res.status(200).json({
        success: true,
        message: "OTP sent successfully to phone number",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
exports.Otpverification = async (req, res) => {
  try {
    const { EmailOrPhone, otp } = req.body;

    let user;

    if (EmailOrPhone.includes("@")) {
      //by mail
      user = await User.findOne({ Email: EmailOrPhone });
    } else {
      //by phone
      user = await User.findOne({ Phone: EmailOrPhone });
    }

    // Check if user exists in the database
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
exports.ResetingPassword = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;
    const id = req.params.id;

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "password must be at letest MEN 6 characters",
      });
    }
    if (confirmPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "password must be at letest MEN 6 characters",
      });
    }
    const finddata = await User.findOne({ Email: email });
    if (!finddata) {
      return res.status(404).json({ message: "User not found" });
    }

    if (newPassword != confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and confirm password are not match",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    finddata.password = hashedPassword;

    await finddata.save();

    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
exports.Updateform = async (req, res) => {
  try {
    const {
      UserName,
      SurName,
      Email,
      Phone_Number,
      Country,
      State,
      City,
      select_society,
      password,
      Cpassword,
    } = req.body;
    if (
      !UserName ||
      !SurName ||
      !Email ||
      !Phone_Number ||
      !Country ||
      !State ||
      !City ||
      !select_society ||
      !password ||
      !Cpassword
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(Email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email",
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "password must be at letest MEN 6 characters",
      });
    }
    if (Cpassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "password must be at letest MEN 6 characters",
      });
    }

    if (password !== Cpassword) {
      return res.status(400).json({ message: "Passwords does not match" });
    }
    const hashpassword = await hash(password);
    const user = await User.findByIdAndUpdate(req.params.id, {
      UserName,
      SurName,
      Email,
      Phone_Number,
      Country,
      State,
      City,
      select_society,
      password: hashpassword,
      Cpassword: hashpassword,
    });
    if (user) {
      res.status(200).json({
        success: true,
        message: "User  Profile Updated...",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};
exports.FindByIdUser = async (req, res) => {
  try {
    const find = await User.findById(req.params.id, {
      otp: 0,
      otpExpiration: 0,
    });
    if (!find) {
      return res.status(400).json({
        success: false,
        message: "No Data Found",
      });
    }
    return res.status(200).json({
      success: true,
      Profile: find,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
