const SurveyController = require("../controllers/pollController"); // Updated to match new naming
const { auth } = require("../middlewares/Auth");
const router = require("express").Router();

// Route to create a new survey
router.post("/createsurvey", auth, SurveyController.createSurvey);

// Route to get all surveys
router.get("/getsurveys", auth, SurveyController.getSurveys);

module.exports = router;
