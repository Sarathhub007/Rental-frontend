import {  useEffect, useState, useRef } from "react";
import { CircleCheck, Copy, SendHorizontal, Share, Image as ImageIcon } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

function Chat({ socket, user }) {
  const [data, setData] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const chatRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [uploadType, setUploadType] = useState("");

  useEffect(() => {
    if (!socket) return;

    const handleDisplay = (add) => {
      setData((prev) => {
        if (prev.some((i) => i.id === add.id)) return prev;
        return [...prev, add];
      });
    };

    socket.on("display", handleDisplay);
    return () => socket.off("display", handleDisplay);
  }, [socket]);

  // auto scroll
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!socket) return;

    if (uploadType === "image" && selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        socket.emit("addMessage", {
          id: uuidv4(),
          name: user,
          message: "Image",
          time: new Date().toLocaleTimeString(),
          image: reader.result,
        });
      };
      reader.readAsDataURL(selectedFile);
      setSelectedFile(null);
      setUploadType("");
    } else {
      socket.emit("addMessage", {
        id: uuidv4(),
        name: user,
        message: userInput,
        time: new Date().toLocaleTimeString(),
      });

      setUserInput("");
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-[85vh] bg-gray-50 px-3">
      <div className="w-full md:w-[55%] lg:w-[45%] h-full bg-white shadow-xl rounded-xl flex flex-col overflow-hidden">

        {/* HEADER */}
        <div className="px-4 py-3 border-b bg-gray-100 flex items-center gap-3">
          <img
            src={`https://ui-avatars.com/api/?name=${user}`}
            className="w-10 h-10 rounded-full"
          />
          <h3 className="font-semibold text-gray-800">Chat Support</h3>
        </div>

        {/* CHAT AREA */}
        <div
          ref={chatRef}
          className="flex-1 overflow-y-auto p-4 space-y-4"
        >
          {data.map((d) => (
            <div key={d.id} className={`flex ${d.name === user ? "justify-end" : "justify-start"}`}>
              
              {/* Chat Bubble */}
              <div
                className={`max-w-xs p-3 rounded-2xl shadow-sm text-sm relative 
                ${d.name === user
                  ? "bg-blue-600 text-white rounded-br-none"
                  : d.name === "Chatbot"
                  ? "bg-blue-50 text-blue-800 border border-blue-200 rounded-bl-none"
                  : "bg-gray-100 text-gray-900 rounded-bl-none"
                }`}
              >
                <div className="text-xs opacity-70 mb-1">{d.name} • {d.time}</div>

                {d.image ? (
                  <img src={d.image} className="rounded-lg max-h-48 object-cover" />
                ) : (
                  <div>{d.message}</div>
                )}

                {/* Copy button for chatbot */}
                {d.name === "Chatbot" && !d.image && (
                  <button
                    className="absolute bottom-2 right-2 opacity-70 hover:opacity-100"
                    onClick={() => {
                      navigator.clipboard.writeText(d.message);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 1500);
                    }}
                  >
                    {copied ? <CircleCheck size={18} /> : <Copy size={18} />}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* INPUT AREA */}
        <form onSubmit={handleSubmit} className="p-3 border-t bg-white flex items-center gap-2">

          {/* File upload */}
          <button
            type="button"
            className="p-2 rounded-lg border hover:bg-gray-100"
            onClick={() => setUploadType(uploadType === "image" ? "" : "image")}
          >
            <ImageIcon />
          </button>

          {uploadType === "image" ? (
            <input
              type="file"
              accept="image/*"
              className="flex-1 border rounded-lg p-2"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
          ) : (
            <input
              type="text"
              className="flex-1 border rounded-lg p-2 focus:outline-blue-500"
              placeholder="Type a message..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              required
            />
          )}

          {/* Send button */}
          <button type="submit" className="p-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white">
            <SendHorizontal size={20} />
          </button>
        </form>

      </div>
    </div>
  );
}

export default Chat;
