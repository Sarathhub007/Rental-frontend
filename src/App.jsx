import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Starting from "./Components/Starting";
import Signin from "./Components/auth/Signin";
import Signup from "./Components/auth/Signup";
import About from "./Components/About";
import Home from "./Components/Home";
import Contact from "./Components/contact";
import Explore from "./Components/Explore";
import Chat from "./Components/Chat";
import { io } from "socket.io-client";
import { useUser } from "@clerk/clerk-react";

function App() {
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState("");
  const hasPrompted = useRef(false);
  const socket = useRef(null);
  const { isLoaded, user } = useUser();

  useEffect(() => {
    socket.current = io("http://localhost:3000");

    socket.current.on("connect", () => {
      console.log("Connected: ", socket.current.id);
    });

    return () => {
      socket.current.off("connect");
      socket.current.disconnect();
    };
  }, []);

  // useEffect(() => {
  //   if (!hasPrompted.current) {
  //     const name = "Enter your username";
  //     console.log(name);
  //     socket.current.emit("addUsers", name);
  //     setUserName(name);
  //     hasPrompted.current = true;
  //   }

  //   socket.current.on("giveUsers", (usersList) => {
  //     setUsers(usersList);
  //   });

  //   socket.current.on("error", (error) => {
  //     console.log("Socket error:", error);
  //   });

  //   return () => {
  //     socket.current.off("addUsers");
  //     socket.current.off("giveUsers");
  //     socket.current.off("error");
  //   };
  // }, []);
  console.log(user?.fullName);
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Starting />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/home" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/explore/:propertyId" element={<Explore />} />
        <Route
          path={`/chat`}
          element={
            <div className="ml-2 flex justify-around">
              {socket.current && (
                <Chat socket={socket.current} user={user?.fullName} />
              )}
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
