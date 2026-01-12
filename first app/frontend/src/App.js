import React from "react";
import Login from "./Login";
import Signup from "./Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Userlist from "./Userlist";
import Userdetail from "./Userdetail";




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
         <Route path="/userlist" element={<Userlist />} />
         <Route path="/users/:id" element={<Userdetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
