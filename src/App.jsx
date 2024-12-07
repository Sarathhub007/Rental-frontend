import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login.jsx";
import Hello from "./Components/Hello.jsx";
import Home from "./Components/Home.jsx";
import Contact from "./Components/contact.jsx";
import { SignIn } from "@clerk/clerk-react";
import Starting from "./Components/Starting.jsx";
import Navbar from "./Components/Navbar.jsx";
import Signin from "./Components/auth/Signin.jsx";
import Signup from "./Components/auth/Signup.jsx";
import About from "./Components/About.jsx";
import Explore from "./Components/Explore.jsx";  

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Starting />} />
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/home" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/hello" element={<Hello />} />
          <Route path="/explore" element={<Explore />} />  
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
