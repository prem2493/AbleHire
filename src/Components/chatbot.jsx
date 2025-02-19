import React, { useState, useEffect, useRef } from "react";
import { FaMicrophone, FaPaperPlane } from "react-icons/fa";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false); // For skeleton loading
  const recognitionRef = useRef(null);
  const synth = window.speechSynthesis;

  const geminiAPIKey = "AIzaSyDvlXqqjjMLCBDkt6pc7W9p12mz1-pfoNA";
  const geminiEndpoint = https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${geminiAPIKey};

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Your browser does not support Speech Recognition.");
    } else {
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (event) => {
        const userSpeech = event.results[0][0].transcript;
        handleUserMessage(userSpeech);
      };
    }

    return () => {
      synth.cancel(); // Stops voice when navigating away
    };
  }, []);

  const parseBotResponse = (message) => {
    return message
      .replace(/\\(.?)\\*/g, "<b>$1</b>") // Bold
      .replace(/\(.?)\*/g, "<i>$1</i>") // Italic
      .replace(/\n/g, "<br/>"); // Newlines
  };

  const handleUserMessage = async (message) => {
    stopSpeaking();
    setMessages((prev) => [...prev, { text: message, sender: "user" }]);
    setInput("");
    setLoading(true); // Start loading

    try {
      const response = await fetch(geminiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: message }] }],
        }),
      });

      if (!response.ok) {
        throw new Error(API error: ${response.status} ${response.statusText});
      }

      const data = await response.json();
      const botReply = data.candidates[0].content.parts[0].text;
      const formattedReply = parseBotResponse(botReply);

      setMessages((prev) => [...prev, { text: formattedReply, sender: "bot" }]);
      speak(formattedReply);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { text: "Sorry, something went wrong.", sender: "bot" },
      ]);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const speak = (text) => {
    stopSpeaking();
    const strippedText = text.replace(/<[^>]+>/g, ""); // Remove HTML tags
    const utterance = new SpeechSynthesisUtterance(strippedText);
    synth.speak(utterance);
  };

  const stopSpeaking = () => {
    synth.cancel();
  };

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center text-white py-8">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-extrabold text-blue-400">
          Career Advice Chatbot
        </h1>
        <p className="text-lg text-gray-300">
          Empowering people with disabilities to navigate their career paths
        </p>
      </div>

      <div className="bg-gray-800 shadow-lg rounded-xl p-6 w-[70vw] max-w-4xl flex flex-col items-center border border-gray-700">
        <main className="w-full">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-200">
              Chat with us
            </h2>
            <button
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
              onClick={startListening}
            >
              <FaMicrophone /> Voice Recognition
            </button>
          </div>

          <div className="chat-box h-96 overflow-y-auto border border-gray-600 rounded-lg p-4 mb-4 bg-gray-900">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-3 my-2 max-w-[75%] ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white rounded-bl-xl rounded-tr-xl ml-auto"
                    : "bg-gray-700 text-gray-200 rounded-br-xl rounded-tl-xl"
                }`}
                dangerouslySetInnerHTML={{ __html: msg.text }}
              ></div>
            ))}

            {/* Skeleton Loader */}
            {loading && (
              <div className="p-3 my-2 max-w-[75%] bg-gray-700 text-gray-200 rounded-br-xl rounded-tl-xl animate-pulse">
                <div className="h-4 bg-gray-600 w-3/4 mb-2 rounded"></div>
                <div className="h-4 bg-gray-600 w-2/3 mb-2 rounded"></div>
                <div className="h-4 bg-gray-600 w-1/2 rounded"></div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              className="flex-grow border border-gray-600 bg-gray-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
              placeholder="Type your message here..."
              value={input}
              onChange={(e) => {
                stopSpeaking();
                setInput(e.target.value);
              }}
              onKeyPress={(e) => e.key === "Enter" && handleUserMessage(input)}
            />
            <button
              className="bg-blue-500 hover:bg-blue-400 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
              onClick={() => handleUserMessage(input)}
            >
              <FaPaperPlane />
            </button>
          </div>

          <div className="mt-4">
            <button
              className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300 transition"
              onClick={stopSpeaking}
            >
              Stop Voice
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Chatbot;