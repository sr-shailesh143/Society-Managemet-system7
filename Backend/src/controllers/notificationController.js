const Notification = require("../models/notificationModel");

// Fetch all notifications
exports.fetchAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find()
      .populate({
        path: "users.userId", // Updated to match renamed field
        select: "Full_name Unit Wing FirstName LastName",
        model: function (doc) {
          return doc.model;
        },
      });

    // Format notifications with enhanced user details
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
    console.error("Error fetching notifications:", error);
    return res.status(500).json({
      success: false,
      message: "❌ Error fetching notifications.",
    });
  }
};

// Fetch filtered notifications
exports.fetchFilteredNotifications = async (req, res) => {
  const { notificationId, startDate, endDate } = req.query; // Query params for filtering

  try {
    // Build query conditions
    let query = {};

    // Filter by notification ID if provided
    if (notificationId) {
      query._id = notificationId; // Match by ObjectId
    }

    // Filter by date range if startDate and endDate are provided
    if (startDate && endDate) {
      query.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      }; // Date range
    }

    // Find notifications based on the constructed query
    const notifications = await Notification.find(query)
      .populate("users.userId") // Updated to match renamed field
      .exec();

    // Check if any notifications were found
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
    console.error("Error fetching notifications:", error);
    return res.status(500).json({
      success: false,
      message: "❌ Error fetching notifications.",
    });
  }
};
