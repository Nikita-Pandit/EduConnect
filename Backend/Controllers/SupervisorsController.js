const teacherMoreInfo = require("../Models/teacherMoreInfo");

const getSupervisorsController = async (req, res) => {
  const { name, domain, studentId } = req.query;

  try {
    // Build the query object
    let query = {};
    if (name) {
      query.name = { $regex: new RegExp(name, "i") }; // Case-insensitive search
    }
    if (domain) {
      query.domain = { $in: [domain] }; // Matches domain in the array
    }

    // Fetch the data from the database based on the query
    const allProfileDetails = await teacherMoreInfo.find(query).lean(); // Convert to plain objects

    // ✅ Fix: Use object access for rank instead of .get()
    if (studentId) {
      allProfileDetails.sort((a, b) => {
        const rankA = a.rank?.[studentId] ?? Infinity; // Default to Infinity if no rank
        const rankB = b.rank?.[studentId] ?? Infinity;
        return rankA - rankB; // Ascending order (lower rank first)
      });
    }

    // Check if data was retrieved
    if (!allProfileDetails.length) {
      return res.status(404).json({
        success: false,
        message: "No profiles found matching the provided filters.",
      });
    }

    // Send the response with the fetched data
    res.status(200).json({ success: true, allProfileDetails });
  } catch (error) {
    console.error("Error in getSupervisorsController:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching the profile info.",
      error: error.message,
    });
  }
};

module.exports = { getSupervisorsController };
