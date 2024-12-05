const Survey = require("../models/pollModel");

// Create a new survey
exports.createSurvey = async (req, res) => {
  try {
    const { surveyType, questionText, answerOptions } = req.body;
    console.log(req.body);

    if (!surveyType || !questionText || !answerOptions) {
      return res.status(400).json({
        success: false,
        message: "⚠️ All fields are required to create a survey!",
      });
    }

    const userType = req.user.Resident_status;

    if (userType !== "Owner" && userType !== "Tenant") {
      return res.status(400).json({
        success: false,
        message: "❌ Invalid user type for creating a survey! Only Owners and Tenants can create surveys.",
      });
    }

    const survey = new Survey({
      surveyType,
      questionText,
      options: answerOptions.map(option => ({ text: option })),
      createdBy: req.user._id, // The user creating the survey
      creatorRole: userType,   // Either 'Owner' or 'Tenant'
    });

    await survey.save();
    return res.status(201).json({
      success: true,
      message: "🎉 Survey created successfully! Thank you for your participation.",
    });
  } catch (error) {
    console.error("Error creating survey:", error);
    return res.status(500).json({
      success: false,
      message: "⚠️ There was an error creating the survey. Please try again later.",
    });
  }
};

// Get all surveys
exports.getSurveys = async (req, res) => {
  try {
    const surveys = await Survey.find({})
      .populate('createdBy', 'name email role')  // Populating the creator details
      .sort({ createdAt: -1 }); // Sorting by the latest created surveys

    if (surveys.length === 0) {
      return res.status(404).json({
        success: false,
        message: "❌ No surveys available at the moment. Please check back later.",
      });
    }

    return res.status(200).json({
      success: true,
      surveys,
      message: "📋 Surveys fetched successfully!",
    });
  } catch (error) {
    console.error("Error fetching surveys:", error);
    return res.status(500).json({
      success: false,
      message: "⚠️ Error fetching surveys. Please try again later.",
    });
  }
};
