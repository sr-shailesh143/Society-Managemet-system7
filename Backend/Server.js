const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config();

app.use(express.json());
require("dotenv").config();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
require("dotenv").config();


const port = process.env.PORT || 3000;
const cors = require("cors");
require("./src/config/db.js");


// for all origin
const corsOptions = {
  origin: function (origin, callback) {
    callback(null, origin);
  },
  credentials: true,
};

app.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));

app.use(cors(corsOptions));
const Societyroute = require("./src/routes/societyroute.js");
const Userroute = require("./src/routes/userroute");
const profileRoutes = require("./src/routes/profileRoutes");
const Numberroute = require("./src/routes/numberroute");
const maintenanceRoutes = require("./src/routes/maintenanceRoutes");
const complaintRoutes = require("./src/routes/complaintRoutes.js");
const requestRoutes = require("./src/routes/requestRoutes.js");
const noteRoutes = require("./src/routes/noteRoutes.js");
const facilityRoutes = require("./src/routes/facilityRoutes.js");
const announcementRoutes = require("./src/routes/announcementRoutes");
const clexpenses = require("./src/routes/ClexpenseRoutes.js");
const securityRoutes = require("./src/routes/securityRoutes.js");

const securityProtocolsRoutes = require("./src/routes/securityProtocolsRoutes.js");
const visitorLogRoutes = require("./src/routes/visitorLogs.js");
const TrvisitorRoutes = require("./src/routes/TrvisitorRoutes");
const alertRoutes = require("./src/routes/alertRoutes.js");
const incomeRoutes = require("./src/routes/incomeRoutes.js");

const ownerRoute = require("./src/routes/OwnerRouts.js")

const NotificationRoute = require('./src/routes/notificationRoutes.js')

const PollRoutes = require('./src/routes/pollRoutes.js')

//user registration and login part
app.use("/api/auth", Userroute);
app.use("/api/society", Societyroute);

//Important Number
app.use("/api/number", Numberroute);




app.use("/api/profile", profileRoutes);
app.use("/api/maintenance", maintenanceRoutes);
app.use("/api/complaint", complaintRoutes);
app.use("/api/request", requestRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/facilities", facilityRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/clexpenses", clexpenses);
app.use("/api/security", securityRoutes);
app.use("/api/security-protocols", securityProtocolsRoutes);
app.use("/api/visitor-logs", visitorLogRoutes);
app.use("/api/visitors-tracking", TrvisitorRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/income", incomeRoutes);

//resident apis
app.use('/api/Resident', ownerRoute);
// app.use('/api/tenant', tenantRoute);

app.use('/api/notification',NotificationRoute)

app.use('/api/poll',PollRoutes)



app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () =>
  console.log(`Example app listening on port ${port} 👍👍👍 !`)
);
