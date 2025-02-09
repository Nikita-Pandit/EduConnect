// import React, { useState } from "react";
// import axios from "axios";

// const Chatbot = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [isMaximized, setIsMaximized] = useState(false); // State to track if chatbox is maximized
//   const [isOpen, setIsOpen] = useState(false); // State to track if chatbox is open

//   const sendMessage = async () => {
//     if (!input.trim()) return;
//     const newMessages = [...messages, { sender: "user", text: input }];
//     setMessages(newMessages);

//     try {
//       const response = await axios.post("http://localhost:3002/api/chatbot", {
//         message: input,
//       });

//       setMessages([...newMessages, { sender: "bot", text: response.data.reply }]);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//     setInput("");
//   };

//   const toggleMaximize = () => {
//     setIsMaximized(!isMaximized); // Toggle between maximized and small views
//   };

//   const toggleChatbox = () => {
//     setIsOpen(!isOpen); // Toggle chatbox visibility
//   };

//   return (
//     <>
//       {/* Chat Icon */}
//       {!isOpen && (
//         <div
//           className="fixed bottom-5 right-5 bg-blue-500 text-white p-3 rounded-full cursor-pointer shadow-lg hover:bg-blue-600 transition-all"
//           onClick={toggleChatbox}
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-6 w-6"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
//             />
//           </svg>
//         </div>
//       )}

//       {/* Chatbox */}
//       {isOpen && (
//         <div
//           className={`fixed ${isMaximized ? "inset-0" : "bottom-5 right-5"} bg-gray-900 text-white p-4 rounded-lg ${
//             isMaximized ? "w-full h-full" : "w-96"
//           } transition-all duration-300`}
//         >
//           {/* Header with maximize button and close button */}
//           <div className="flex justify-between items-center mb-2">
//             <h2 className="text-lg font-bold">Chatbot</h2>
//             <div className="flex items-center gap-2">
//               <button onClick={toggleMaximize} className="p-1 bg-gray-700 rounded">
//                 {isMaximized ? (
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-5 w-5"
//                     viewBox="0 0 20 20"
//                     fill="currentColor"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M4 4a1 1 0 011-1h10a1 1 0 011 1v10a1 1 0 01-1 1H5a1 1 0 01-1-1V4zm2 1v8h8V5H6z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 ) : (
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-5 w-5"
//                     viewBox="0 0 20 20"
//                     fill="currentColor"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M3 3a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V3zm2 1v10h10V4H5z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 )}
//               </button>
//               <button onClick={toggleChatbox} className="p-1 bg-gray-700 rounded">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-5 w-5"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </button>
//             </div>
//           </div>

//           {/* Chat messages */}
//           <div
//             className={`overflow-y-auto ${
//               isMaximized ? "h-[calc(100vh-150px)]" : "h-64"
//             } p-2`}
//           >
//             {messages.map((msg, index) => (
//               <div
//                 key={index}
//                 className={`p-2 rounded ${
//                   msg.sender === "user" ? "bg-blue-500 ml-auto" : "bg-gray-700"
//                 }`}
//               >
//                 {msg.text}
//               </div>
//             ))}
//           </div>

//           {/* Input area */}
//           <div className="flex mt-2">
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               className="flex-1 p-2 bg-gray-800 text-white rounded-l"
//               placeholder="Ask something..."
//               onKeyPress={(e) => e.key === "Enter" && sendMessage()}
//             />
//             <button
//               onClick={sendMessage}
//               className="bg-blue-500 px-4 py-2 rounded-r"
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Chatbot;



import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isMaximized, setIsMaximized] = useState(false); // State to track if chatbox is maximized
  const [isOpen, setIsOpen] = useState(false); // State to track if chatbox is open

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);

    try {
      const response = await axios.post("http://localhost:3002/api/chatbot", {
        message: input,
      });

      // Parse the response into a structured format
      const structuredResponse = formatBotResponse(response.data.reply);
      setMessages([...newMessages, { sender: "bot", text: structuredResponse }]);
    } catch (error) {
      console.error("Error:", error);
    }
    setInput("");
  };

  // Function to format the bot's response
  const formatBotResponse = (response) => {
    // Split the response into lines
    const lines = response.split("\n");

    // Format each line into a structured list
    const formattedResponse = lines
      .map((line) => {
        if (line.trim() === "") return null; // Skip empty lines
        return `<div class="mb-2">${line}</div>`;
      })
      .join("");

    return formattedResponse;
  };

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized); // Toggle between maximized and small views
  };

  const toggleChatbox = () => {
    setIsOpen(!isOpen); // Toggle chatbox visibility
  };

  return (
    <>
      {/* Chat Icon */}
      {!isOpen && (
        <div
          className="fixed bottom-5 right-5 bg-blue-500 text-white p-3 rounded-full cursor-pointer shadow-lg hover:bg-blue-600 transition-all"
          onClick={toggleChatbox}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </div>
      )}

      {/* Chatbox */}
      {isOpen && (
        <div
          className={`fixed ${isMaximized ? "inset-0" : "bottom-5 right-5"} bg-gray-900 text-white p-4 rounded-lg ${
            isMaximized ? "w-full h-full" : "w-96"
          } transition-all duration-300`}
        >
          {/* Header with maximize button and close button */}
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-bold">Chatbot</h2>
            <div className="flex items-center gap-2">
              <button onClick={toggleMaximize} className="p-1 bg-gray-700 rounded">
                {isMaximized ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a1 1 0 011-1h10a1 1 0 011 1v10a1 1 0 01-1 1H5a1 1 0 01-1-1V4zm2 1v8h8V5H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V3zm2 1v10h10V4H5z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
              <button onClick={toggleChatbox} className="p-1 bg-gray-700 rounded">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Chat messages */}
          <div
            className={`overflow-y-auto ${
              isMaximized ? "h-[calc(100vh-150px)]" : "h-64"
            } p-2`}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded ${
                  msg.sender === "user" ? "bg-blue-500 ml-auto" : "bg-gray-700"
                }`}
                dangerouslySetInnerHTML={{ __html: msg.text }} // Render HTML for structured responses
              />
            ))}
          </div>

          {/* Input area */}
          <div className="flex mt-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-2 bg-gray-800 text-white rounded-l"
              placeholder="Ask something..."
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 px-4 py-2 rounded-r"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;