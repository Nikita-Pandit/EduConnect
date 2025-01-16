// const studentMoreInfo= require("../Models/studentMoreInfo");
// const getProjectController=async (req,res)=>{
//  const {branch,year,domain}=req.query
//  console.log(branch)
//  console.log(year)
//  console.log(domain)
//     try{
//       let query={}
//       if(branch && year && domain){
//         query={branch:branch,selectYear:year,domain:domain}
//       }
//       else if(branch){
//         query={branch:branch}
//       }
//       else if(year){
//         query={selectYear:year}
//       }
//       else if(domain){
//         query={domain:domain}
//       }
//       console.log(query)
//       const allProfileDetails=await studentMoreInfo.find(query)
//      console.log(allProfileDetails);
//       if(!allProfileDetails){
//         return res.status(404).json({ success: false, message: "Profile info not retrieved from the database." });
//       }
//       res.status(200).json({ success: true, allProfileDetails});
    
//     }
//     catch(error){
//       console.error("Error in getProfileInfo:", error.message);
//       res.status(500).json({ success: false, message: "An error occurred while fetching the profile info from the db.", error: error.message });
//     }
//     }
    
// module.exports={getProjectController} 



const studentMoreInfo = require("../Models/studentMoreInfo");

const getProjectController = async (req, res) => {
  const { branch, year, domain } = req.query;
  console.log("Branch:", branch);
  console.log("Year:", year);
  console.log("Domain:", domain);

  try {
    // Build the query object based on the provided parameters
    let query = {};
    if (branch && year && domain) {
      query = { branch: branch, selectYear: year, domain: domain };
    } else if (branch) {
      query = { branch: branch };
    } else if (year) {
      query = { selectYear: year };
    } else if (domain) {
      query = { domain: domain };
    }
    console.log("Query:", query);

    // Fetch the data from the database based on the query
    const allProfileDetails = await studentMoreInfo.find(query);
    console.log("Fetched Data:", allProfileDetails);

    // Check if data was retrieved
    if (!allProfileDetails || allProfileDetails.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No profiles found matching the provided filters.",
      });
    }

    // Send the response with the fetched data
    res.status(200).json({ success: true, allProfileDetails });
  } catch (error) {
    console.error("Error in getProjectController:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching the profile info.",
      error: error.message,
    });
  }
};

module.exports = { getProjectController };
