const Notification = require("../models/notificationModel");

exports.fetchAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find()
      .populate({
        path: "users.userId",
        select: "Full_name Unit Wing FirstName LastName",
        model: function (doc) {
          return doc.model;
        },
      });

    const formattedNotifications = notifications.map((notification) => {
      const formattedUsers = notification.users.map((user) => {
        if (user.userModel === "Owner" || user.userModel === "Tenant") {
          return {
            ...user,
            name: user.userId?.Full_name || "🏠 Resident",
            unit: user.userId?.Unit || "📦 Unknown Unit",
            wing: user.userId?.Wing || "🛖 Unknown Wing",
          };
        } else if (user.userModel === "User") {
          return {
            ...user,
            name: `${user.userId?.FirstName || ""} ${
              user.userId?.LastName || ""
            }` || "👨‍💼 Admin User",
            unit: "⚙️ Admin Unit",
            wing: "⚙️ Admin Wing",
          };
        }
        return user;
      });

      return {
        ...notification._doc,
        users: formattedUsers,
      };
    });

    return res.status(200).json({
      success: true,
      message: "🔔 Notifications fetched successfully!",
      notifications: formattedNotifications,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "❌ Error fetching notifications.",
    });
  }
};

exports.fetchFilteredNotifications = async (req, res) => {
  const { notificationId, startDate, endDate } = req.query; 

  try {
    let query = {};

    if (notificationId) {
      query._id = notificationId;
    }

    if (startDate && endDate) {
      query.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      }; 
    }

    const notifications = await Notification.find(query)
      .populate("users.userId") 
      .exec();

    if (!notifications.length) {
      return res.status(404).json({
        success: false,
        message: "🔕 No notifications found for the given criteria.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "🔔 Notifications fetched successfully!",
      notifications,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "❌ Error fetching notifications.",
    });
  }
};
