const { GoogleGenerativeAI } = require("@google/generative-ai");
const teacherModel = require("../Models/teacherModel");
const teacherMoreInfo = require("../Models/teacherMoreInfo");
// const studentModel = require("../Models/studentModel");
const studentModel = require("../Models/studentmodel");
const studentMoreInfo = require("../Models/studentMoreInfo");

// Load API Key from .env
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;
   

    // Fetch all teacher details
    const teachers = await teacherModel.find({}, "name email contact");
    const teacherInfos = await teacherMoreInfo.find(
      {},
      "teacherID Bio github linkedin twitter domain location rank"
    );

    // Fetch all student details
    const students = await studentModel.find({}, "name email contact");
    const studentInfos = await studentMoreInfo.find(
      {},
      "studentID Bio github linkedin twitter domain location branch selectYear projects"
    );

    // Map teachers with additional info
    const teachersData = teachers.map((teacher) => {
      const additionalInfo = teacherInfos.find(
        (info) => info.teacherID === teacher._id.toString()
      );
      return {
        name: teacher.name,
        email: teacher.email,
        contact: teacher.contact,
        Bio: additionalInfo ? additionalInfo.Bio : "N/A",
        github: additionalInfo ? additionalInfo.github : "N/A",
        linkedin: additionalInfo ? additionalInfo.linkedin : "N/A",
        twitter: additionalInfo ? additionalInfo.twitter : "N/A",
        domain: additionalInfo ? additionalInfo.domain.join(", ") : "N/A",
        location: additionalInfo ? additionalInfo.location : "N/A",
        rank: additionalInfo ? JSON.stringify([...additionalInfo.rank]) : "N/A",
      };
    });

    // Map students with additional info
    const studentsData = students.map((student) => {
      const additionalInfo = studentInfos.find(
        (info) => info.studentID === student._id.toString()
      );
      return {
        name: student.name,
        email: student.email,
        contact: student.contact,
        Bio: additionalInfo ? additionalInfo.Bio : "N/A",
        github: additionalInfo ? additionalInfo.github : "N/A",
        linkedin: additionalInfo ? additionalInfo.linkedin : "N/A",
        twitter: additionalInfo ? additionalInfo.twitter : "N/A",
        domain: additionalInfo ? additionalInfo.domain.join(", ") : "N/A",
        location: additionalInfo ? additionalInfo.location : "N/A",
        branch: additionalInfo ? additionalInfo.branch : "N/A",
        selectYear: additionalInfo ? additionalInfo.selectYear : "N/A",
        projects: additionalInfo ? additionalInfo.projects : "N/A",
      };
    });

    // Determine if the query is about teachers or students
    const isTeacherQuery =
      [
        "teacher",
        "teach",
        "professor",
        "email",
        "contact",
        "rank",
        "domain",
        "location",
      ].some((word) => message.toLowerCase().includes(word)) ||
      teachersData.some((teacher) =>
        message.toLowerCase().includes(teacher.name.toLowerCase())
      );

    const isStudentQuery =
      [
        "student",
        "projects",
        "branch",
        "year",
        "linkedin",
        "github",
        "skills",
      ].some((word) => message.toLowerCase().includes(word)) ||
      studentsData.some((student) =>
        message.toLowerCase().includes(student.name.toLowerCase())
      );

    let prompt;

    if (isTeacherQuery) {
      // Construct prompt for teacher-related queries
      prompt = `
        You are an AI assistant that provides information about teachers.
        The available teachers and their details are:
        ${teachersData
          .map(
            (teacher) =>
              `Name: ${teacher.name}, Email: ${teacher.email}, Contact: ${teacher.contact}, Bio: ${teacher.Bio}, Expertise: ${teacher.domain}, Location: ${teacher.location}, Rank: ${teacher.rank}, LinkedIn: ${teacher.linkedin}, GitHub: ${teacher.github}`
          )
          .join("\n")}

        User Query: "${message}"

        Provide the most relevant information based on the user's query.
      `;
    } else if (isStudentQuery) {
      // Construct prompt for student-related queries
      prompt = `
        You are an AI assistant that provides information about students.
        The available students and their details are:
        ${studentsData
          .map(
            (student) =>
              `Name: ${student.name}, Email: ${student.email}, Contact: ${student.contact}, Bio: ${student.Bio}, Branch: ${student.branch}, Year: ${student.selectYear}, Projects: ${student.projects}, Location: ${student.location}, LinkedIn: ${student.linkedin}, GitHub: ${student.github}`
          )
          .join("\n")}

        User Query: "${message}"

        Provide the most relevant information based on the user's query.
      `;
    } else {
      // Handle general questions
      prompt = `User Query: "${message}"`;
    }

    // Call Gemini AI API
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const result = await model.generateContent(prompt);
    const response = result.response.candidates[0].content.parts[0].text;

    res.json({ reply: response });
  } catch (error) {
    console.error("Chatbot error:", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};

module.exports = { chatWithAI };
