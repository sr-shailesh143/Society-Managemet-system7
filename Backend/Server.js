const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("dotenv").config();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const path = require("path");

const port = process.env.PORT || 3000;
require("./src/config/db.js");
const cors = require("cors");

port.timeout = 60000;

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
// const profileRoutes = require('./src/routes/profileRoutes');
const Numberroute = require("./src/routes/numberroute");
const Residentroute = require("./src/routes/residentroute");
// const ResidentRoutes=require("./src/routes/ResidentRoutes.js")

const complaintRoutes = require('./src/routes/complaintRoutes.js');
const requestRoutes = require('./src/routes/requestRoutes.js');
const noteRoutes = require('./src/routes/noteRoutes.js');
const facilityRoutes  = require('./src/routes/facilityRoutes.js');
const announcementRoutes = require('./src/routes/announcementRoutes');
const clexpenses =require('./src/routes/ClexpenseRoutes.js')
const securityRoutes = require("./src/routes/securityRoutes.js");

const securityProtocolsRoutes = require('./src/routes/securityProtocolsRoutes.js');
const visitorLogRoutes = require('./src/routes/visitorLogs.js');
const TrvisitorRoutes = require('./src/routes/TrvisitorRoutes');
const alertRoutes = require('./src/routes/alertRoutes.js')
const incomeRoutes = require('./src/routes/incomeRoutes.js')


//user registration and login part
app.use("/api/auth", Userroute);

app.use("/api/society", Societyroute);
//Important Number
app.use("/api/number", Numberroute);
//resident
app.use("/api/resident", Residentroute);
// app.use("/resident",ResidentRoutes)

// app.use('/api/profile', profileRoutes);
app.use('/api/complaint', complaintRoutes);
app.use("/api/request", requestRoutes);
app.use("/api/notes", noteRoutes);
app.use('/api/facilities', facilityRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/clexpenses',clexpenses);
app.use("/api/security", securityRoutes);

app.use('/api/security-protocols', securityProtocolsRoutes);
app.use('/api/visitor-logs', visitorLogRoutes);
app.use('/api/visitors-tracking',TrvisitorRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/income', incomeRoutes);


app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port} 👍👍👍 !`))