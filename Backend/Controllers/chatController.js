
const { GoogleGenerativeAI } = require("@google/generative-ai");
const teacherModel = require("../Models/teacherModel");
const teacherMoreInfo = require("../Models/teacherMoreInfo");

// Load API Key from .env
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;
    console.log("Chatbot message: ", message);

    // Fetch all teacher details from both collections
    const teachers = await teacherModel.find({});
    const teacherInfos = await teacherMoreInfo.find({});

    // Map teachers with their additional info
    const teachersData = teachers.map((teacher) => {
      const additionalInfo = teacherInfos.find(
        (info) => info.teacherID.toString() === teacher._id.toString()
      );
      return {
        name: teacher.name,
        email: teacher.email,
        contact: teacher.contact,
        domain: additionalInfo ? additionalInfo.domain.join(", ") : "N/A",
        location: additionalInfo ? additionalInfo.location : "N/A",
      };
    });

    // Check if the message is related to teachers
    const isTeacherQuery =
      message.toLowerCase().includes("teacher") ||
      message.toLowerCase().includes("teach") ||
      message.toLowerCase().includes("email") ||
      message.toLowerCase().includes("contact") ||
      message.toLowerCase().includes("domain") ||
      message.toLowerCase().includes("location") ||
      teachersData.some((teacher) =>
        message.toLowerCase().includes(teacher.name.toLowerCase())
      );

    if (isTeacherQuery) {
      // Construct the AI prompt for teacher-related queries
      const prompt = `
        You are an AI assistant that provides information about teachers.
        Available teachers and their details are:
        ${teachersData
          .map(
            (teacher) =>
              `Name: ${teacher.name}, Email: ${teacher.email}, Contact: ${teacher.contact}, Expertise: ${teacher.domain}, Location: ${teacher.location}`
          )
          .join("\n")}

        User Query: "${message}"

        Provide the most relevant information based on the user's query.
      `;

      // Call Gemini AI
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(prompt);
      const response = result.response.candidates[0].content.parts[0].text;

      res.json({ reply: response });
    } else {
      // Handle general messages
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(message);
      const response = result.response.candidates[0].content.parts[0].text;

      res.json({ reply: response });
    }
  } catch (error) {
    console.error("Chatbot error:", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};

module.exports = { chatWithAI };
