import { React, useEffect, useState, useRef } from "react";
import { CircleCheck, Copy, SendHorizontal, Share } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import "../index.css";
import { useParams } from "react-router-dom";

function Chat({ socket, user }) {
  const [data, setData] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const chatRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const id = useParams();
  const [uploadType, setUploadType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

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
      setUploadType(false);
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

  const handleInput = (e) => setUserInput(e.target.value);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  socket.on("display", (add) => {
    setData((prev) => {
      if (prev.some((item) => item.id === add.id)) {
        return prev;
      }
      return [...prev, add];
    });
  });

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [data]);

  return (
    <div className="flex items-center justify-center w-full h-[80vh] mt-0 border border-2 border-blue mb-9">
      <div className="border w-[100%] md:w-[50%] lg:w-[40%] rounded-md p-2 h-full">
        <div
          ref={chatRef}
          className="h-[calc(100vh-10rem)] w-full overflow-y-scroll no-scrollbar scroll-smooth"
        >
          <ul>
            {data.map((d) => (
              <li key={d.id}>
                {d.name === user ? (
                  <div className="chat chat-end">
                    <div className="chat-header">
                      {d.name}
                      <time className="text-xs opacity-50">{d.time}</time>
                    </div>
                    {d.image ? (
                      <img
                        src={d.image}
                        alt="Uploaded"
                        className="chat-bubble max-w-xs rounded-lg"
                      />
                    ) : (
                      <div className="chat-bubble">{d.message}</div>
                    )}
                  </div>
                ) : d.name === "Chatbot" ? (
                  <div className="chat chat-start">
                    <div className="chat-header text-blue-500">
                      {d.name}
                      <time className="text-xs opacity-50">{d.time}</time>
                    </div>
                    <div className="chat-bubble bg-blue-100 text-blue-800">
                      {d.message}
                      <span
                        className="flex justify-end cursor-pointer"
                        onClick={() => {
                          navigator.clipboard.writeText(d.message);
                          setCopied(true);
                          setTimeout(() => {
                            setCopied(false);
                          }, 2000);
                        }}
                      >
                        {copied ? (
                          <CircleCheck className="w-5"></CircleCheck>
                        ) : (
                          <Copy className="w-5"></Copy>
                        )}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="chat chat-start">
                    <div className="chat-header">
                      {d.name}
                      <time className="text-xs opacity-50">{d.time}</time>
                    </div>
                    {d.image ? (
                      <img
                        src={d.image}
                        alt="Uploaded"
                        className="chat-bubble max-w-xs rounded-lg"
                      />
                    ) : (
                      <div className="chat-bubble">{d.message}</div>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <form action="" onSubmit={handleSubmit}>
            <div className="flex items-center">
              <div className="dropdown dropdown-top">
                <div tabIndex={0} role="button" className="btn m-1">
                  <Share className="" />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                >
                  <li>
                    <a onClick={() => setUploadType("image")}>Image</a>
                  </li>
                </ul>
              </div>

              {uploadType === "image" ? (
                <input
                  type="file"
                  accept="image/*"
                  className="m-1"
                  onChange={handleFileChange}
                  required
                />
              ) : (
                <input
                  type="text"
                  className="w-[18rem] m-1  text-white rounded-md focus:outline-none border p-2"
                  value={userInput}
                  onChange={handleInput}
                  required
                />
              )}

              <button
                type="submit"
                className="w-[2rem] h-[2.5rem] bg-green-400 rounded-lg mt-1 p-1"
              >
                <SendHorizontal width={20} height={20} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chat;
