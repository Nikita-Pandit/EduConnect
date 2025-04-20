
// import React, { useState } from "react";
// import axios from "axios";

// const Chatbot = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [isMaximized, setIsMaximized] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);

//   const sendMessage = async () => {
//     if (!input.trim()) return;
//     const newMessages = [...messages, { sender: "user", text: input }];
//     setMessages(newMessages);

//     try {
//       const response = await axios.post("http://localhost:3002/api/chatbot", {
//         message: input,
//       });
//       const structuredResponse = formatBotResponse(response.data.reply);
//       setMessages([...newMessages, { sender: "bot", text: structuredResponse }]);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//     setInput("");
//   };

//   const formatBotResponse = (response) => {
//     const lines = response.split("\n");
//     const formattedResponse = lines
//       .map((line) => {
//         if (line.trim() === "") return null;
//         return `<div class="mb-2">${line}</div>`;
//       })
//       .join("");
//     return formattedResponse;
//   };

//   const toggleMaximize = () => {
//     setIsMaximized(!isMaximized);
//   };

//   const toggleChatbox = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <>
//       {/* Chat Icon - Only color changed */}
//       {!isOpen && (
//         <div
//           className="fixed bottom-5 right-5 bg-[#9B30FF] wt-20  text-white p-3 rounded-full cursor-pointer shadow-lg hover:bg-[#7B20DF] transition-all"
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

//       {/* Chatbox - Only colors and visual styling changed */}
//       {isOpen && (
//         <div
//           className={`fixed ${isMaximized ? "inset-0" : "bottom-5 right-5"} bg-[#0d1126] text-[#E1C3FF] pt-24 p-10 mb-10 mt-9 rounded-lg border border-[#9B30FF] ${
//             isMaximized ? "w-full h-full" : "w-96"
//           } transition-all duration-300 shadow-lg`}
//         >
//           {/* Header - Only colors changed */}
//           <div className="flex justify-between items-center mb-2">
//             <h2 className="text-lg font-bold">Chatbot</h2>
//             <div className="flex items-center gap-2">
//               <button 
//                 onClick={toggleMaximize} 
//                 className="p-1 bg-[#9B30FF] rounded hover:bg-[#7B20DF] transition-colors"
//               >
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
//               <button 
//                 onClick={toggleChatbox} 
//                 className="p-1 bg-[#9B30FF] rounded hover:bg-[#7B20DF] transition-colors"
//               >
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

//           {/* Messages - Only colors changed */}
//           <div
//             className={`overflow-y-auto ${
//               isMaximized ? "h-[calc(100vh-150px)]" : "h-64"
//             } p-2`}
//           >
//             {messages.map((msg, index) => (
//               <div
//                 key={index}
//                 className={`p-2 rounded ${
//                   msg.sender === "user" 
//                     ? "bg-[#9B30FF] ml-auto text-white" 
//                     : "bg-[#1a1f3d] text-[#E1C3FF]"
//                 }`}
//                 dangerouslySetInnerHTML={{ __html: msg.text }}
//               />
//             ))}
//           </div>

//           {/* Input - Only colors changed */}
//           <div className="flex mt-2">
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               className="flex-1 p-2 bg-[#1a1f3d] text-[#E1C3FF] rounded-l border border-[#9B30FF] focus:outline-none focus:ring-1 focus:ring-[#9B30FF]"
//               placeholder="Ask something..."
//               onKeyPress={(e) => e.key === "Enter" && sendMessage()}
//             />
//             <button
//               onClick={sendMessage}
//               className="bg-[#9B30FF] px-4 py-2 rounded-r hover:bg-[#7B20DF] transition-colors"
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




import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isMaximized, setIsMaximized] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);

    try {
      const response = await axios.post("http://localhost:3002/api/chatbot", {
        message: input,
      });
      const structuredResponse = formatBotResponse(response.data.reply);
      setMessages([...newMessages, { sender: "bot", text: structuredResponse }]);
    } catch (error) {
      console.error("Error:", error);
    }
    setInput("");
  };

  const formatBotResponse = (response) => {
    const lines = response.split("\n");
    return lines
      .map((line) => {
        if (line.trim() === "") return null;
        return `<div class="mb-2">${line}</div>`;
      })
      .join("");
  };

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  const toggleChatbox = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      {!isOpen && (
        <div
          className="fixed bottom-5 right-5 bg-[#9B30FF] text-white p-3 rounded-full cursor-pointer shadow-lg hover:bg-[#7B20DF] transition-all"
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

      {isOpen && (
        <div
          className={`fixed ${isMaximized ? "inset-0" : "bottom-5 right-5 w-96 h-[500px]"} bg-[#0d1126] text-[#E1C3FF] rounded-lg shadow-lg z-50 flex flex-col transition-all`}
        >
          {/* Header */}
          <div className="flex justify-between items-center px-4 py-3 bg-[#0d1126] border-b border-[#9B30FF]">
            <h2 className="text-lg font-bold">Chatbot</h2>
            <div className="flex gap-2">
              <button
                onClick={toggleMaximize}
                className="p-1 bg-[#9B30FF] rounded hover:bg-[#7B20DF]"
              >
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
              <button
                onClick={toggleChatbox}
                className="p-1 bg-[#9B30FF] rounded hover:bg-[#7B20DF]"
              >
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

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded mb-2 max-w-[85%] ${
                  msg.sender === "user"
                    ? "bg-[#9B30FF] ml-auto text-white"
                    : "bg-[#1a1f3d] text-[#E1C3FF]"
                }`}
                dangerouslySetInnerHTML={{ __html: msg.text }}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="flex p-3 bg-[#0d1126]">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 p-2 bg-[#1a1f3d] text-[#E1C3FF] rounded-l border border-[#9B30FF] focus:outline-none"
              placeholder="Ask something..."
            />
            <button
              onClick={sendMessage}
              className="bg-[#9B30FF] px-4 py-2 rounded-r hover:bg-[#7B20DF] text-white"
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
