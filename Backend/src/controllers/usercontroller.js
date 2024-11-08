const User = require("../models/usermodel");
const otpGnerator = require("otp-generator");
const twilio = require("twilio");
const crypto = require("crypto");
const senData = require("../config/mailer");
const { hash } = require("../utils/hashpassword");
const { compare } = require("../utils/Machpass");
const { generateToeken } = require("../utils/Tokengenerate");
const accountsid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = new twilio(accountsid, authToken);
const bcrypt = require("bcryptjs");
const OTP_EXPIRATION_TIME = 30 * 1000; 

exports.Register = async (req, res) => {
  try {
    const {
      UserName,
      SurName,
      Email,
      Phone_Number,
      Country_Name,
      State_Name,
      City_Name,
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
      !Country_Name ||
      !State_Name ||
      !City_Name ||
      !select_society ||
      !password ||
      !Cpassword
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required in this Form",
      });
    }

    // Email validation on site
    const emailAdd = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailAdd.test(Email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email ID",
      });
    }

    // Password length validation for verification
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Pls Add Password must be at least MEN 6 character",
      });
    }

    // Confirm password length validation for change Password
    if (Cpassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Pls Add Confirm password must be at least MEN 6 characters",
      });
    }

    // Check if email exists
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

    // Hash the password
    const hashpassword = await hash(password);

  

    // Create user with hashed password, excluding Cpassword
    const user = await User.create({
      UserName,
      SurName,
      Email,
      Phone_Number,
      Country_Name,
      State_Name,
      City_Name,
      select_society,
      password: hashpassword,
    });

    // Respond if user creation is successful
    if (user) {
      res.status(200).json({
        success: true,
        message: "User Registration Completed...",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};
exports.login = async (req, res) => {
  try {
    const { EmailOrPhone, password } = req.body;

    if (!EmailOrPhone || !password) {
      return res.status(400).json({
        success: false,
        message: "Email/Phone and password are required",
      });
    }

    let query = {};
    if (EmailOrPhone.includes("@")) {
      query = { Email: EmailOrPhone }; // email
    } else {
      query = { Phone: EmailOrPhone }; // number
    }

    // Find user by either email or phone
    const user = await User.findOne(query);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User is not registered",
      });
    }

    // Validate password
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate JWT token 
    generateToeken(user._id, res);

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
exports.logout = async (req, res) => {
  try {
    res.clearCookie("society-auth", {
      path: "/",
      httpOnly: true,
      sameSite: "Strict",
      secure: process.env.NODE_ENV !== "development",
    });

    return res
      .status(200)
      .json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
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
    console.error(error);
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
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
exports.ResetingPassword = async (req, res) => {
  try {
    const { email, new_pass, confirm_pass } = req.body;
    const id = req.params.id;

    if (new_pass.length < 6) {
      return res.status(400).json({
        success: false,
        message: "password must be at letest MEN 6 characters",
      });
    }
    if (confirm_pass.length < 6) {
      return res.status(400).json({
        success: false,
        message: "password must be at letest MEN 6 characters",
      });
    }
    const finddata = await User.findOne({ Email: email });
    if (!finddata) {
      return res.status(404).json({ message: "User not found" });
    }

    if (new_pass != confirm_pass) {
      return res.status(400).json({
        success: false,
        message: "Password and confirm password are not match",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(new_pass, salt);

    finddata.password = hashedPassword;

    await finddata.save();

    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
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
        Country_Name,
        State_Name,
        City_Name,
        select_society,
        password,
        Cpassword,
    } = req.body;
    if (
      !UserName ||
      !SurName ||
      !Email ||
      !Phone_Number ||
      !Country_Name ||
      !State_Name ||
      !City_Name ||
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
        Country_Name,
        State_Name,
        City_Name,
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
    console.log(error);
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
    console.log("Error in logout controller", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};