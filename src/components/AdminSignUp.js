import React, { useState } from "react";
import { Link } from "react-router-dom";

function AdminSignUp(props) {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [secretKey, setSecretKey] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(fname, lname, email, password);
    fetch("http://localhost:5050/register", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        fname,
        Email: email,
        lname,
        password,
        userType,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        props.updateUserData();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <div className="bg-zinc-400  h-screen flex justify-center items-center  ">
        <div className="bg-white rounded-lg shadow-black/30 h-[485px] pl-10 space-y-3 w-[400px] flex flex-col justify-center ">
          <form className="space-y-1" onSubmit={handleSubmit}>
            <div>
              <p className="font-semibold text-2xl tracking-wide">Sign Up</p>
            </div>
            <div>
              Register As
              <input
                type="radio"
                name="UserType"
                value="User"
                onChange={(e) => setUserType(e.target.value)}
              />
              User
              <input
                type="radio"
                name="UserType"
                value="Admin"
                onChange={(e) => setUserType(e.target.value)}
              />
              Admin
            </div>
            {userType === "Admin" && (
              <div className="mr-5">
                <p className="text-zinc-600 font-semibold">Secret Key :</p>
                <input
                  className=" outline-none h-10 px-5 border border-sm w-full"
                  type="text"
                  placeholder="Secret Key"
                  onChange={(e) => setSecretKey(e.target.value)}
                />
              </div>
            )}

            <div className="mr-5">
              <p className="text-zinc-600 font-semibold">First Name :</p>
              <input
                className=" outline-none h-10 px-5 border border-sm w-full"
                type="text"
                name="fname"
                placeholder="First Name"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
              />
            </div>
            <div className="mr-5">
              <p className="text-zinc-600 font-semibold">Last Name :</p>
              <input
                className=" outline-none h-10 px-5 border border-sm w-full"
                type="text"
                name="lname"
                placeholder="Last Name"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
              />
            </div>
            <div className="mr-5">
              <p className="text-zinc-600 font-semibold">Email :</p>
              <input
                className=" outline-none h-10 px-5 border border-sm w-full"
                type="email"
                name="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mr-5">
              <p className="text-zinc-600 font-semibold">Password</p>
              <input
                className=" outline-none h-10 px-5 border border-sm w-full"
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mr-5">
              <button className="bg-red-400 h-10 w-full rounded-full text-white font-semibold hover:bg-red-500 duration-300">
                Sign Up
              </button>
            </div>

            <div>
              <p className="text-zinc-500">
                <span className="text-black font-bold underline underline-offset-4">
                  <Link to="/AdminHome"></Link>
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminSignUp;
