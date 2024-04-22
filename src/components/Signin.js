import React, { useState } from "react";
import { Link } from "react-router-dom";
import Signup from "./Signup";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    console.log(email, password);
    fetch("http://localhost:5050/login-user", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        Email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.status == "ok") {
          alert("login successful");
          window.localStorage.setItem("token", data.data);
          window.localStorage.setItem("loggedIn", true);
          window.location.href = "./Homepage";
        }
      });
  }

  return (
    <>
      <div className="bg-zinc-400  h-screen flex justify-center items-center ">
        {/*form */}
        <div className="bg-white rounded-lg shadow-black/30 h-96 pl-10 space-y-3 w-[350px] flex flex-col justify-center">
          <form className="space-y-1" action="" onSubmit={handleSubmit}>
            <div>
              <p className="font-semibold text-2xl tracking-wide">LOGIN</p>
            </div>
            <div className="mr-5">
              <p className="text-zinc-600 font-semibold">Email :</p>
              <input
                className=" outline-none h-10 px-5 border border-sm w-full"
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mr-5">
              <p className="text-zinc-600 font-semibold">Password</p>
              <input
                className=" outline-none h-10 px-5 border border-sm w-full"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex space-y-2 gap-5 mt-5"></div>
            <div className="mr-5">
              <button className="bg-red-400 h-10 w-full rounded-full text-white font-semibold hover:bg-red-500 duration-300">
                LOGIN
              </button>
              <p className="text-end mt-2">
                <a className="text-end" href="/">
                  {" "}
                  Forget Password
                </a>
              </p>
            </div>

            <div>
              <p className="text-zinc-500">
                Need an Account?
                <span className="text-black font-bold underline underline-offset-4">
                  <Link to="/Signup" element={<Signup />}>
                    SignUp
                  </Link>
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signin;
