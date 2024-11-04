const UserController = require("../controllers/usercontroller");
const router = require("express").Router();
router.post("/signup", UserController.Register);
router.post("/login", UserController.login);
router.get("/logout", UserController.logout);
router.post("/GetOtp", UserController.GetOtp);
router.post("/Otpverification", UserController.Otpverification);
//reset password
router.post("/resetpass", UserController.ResetingPassword);
///update profile
router.patch("/:id", UserController.Updateform);
router.get("/:id", UserController.FindByIdUser);
module.exports = router;
