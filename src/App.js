import React from "react";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Homepage from "./components/Homepage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UpdateUser from "./components/UpdateUser";
import UserHome from "./components/UserHome";
import EditUser from "./components/EditUser";
import AdminHome from "./components/AdminHome";

function App() {
  const isLoggednIn = window.localStorage.getItem("loggedIn");
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={isLoggednIn == "true" ? <Homepage /> : <Signin />}
          />
          <Route exact path="/Signin" element={<Signin />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/updateUser" element={<UpdateUser />} />
          <Route path="/userHome" element={<UserHome />} />
          <Route path="/AdminHome" element={<AdminHome />} />
          <Route path="/edituser" element={<EditUser />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
