import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const UpdateUser = () => {
  const location = useLocation();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    console.log(location);
    setFname(location.state.fname);
    setLname(location.state.lname);
    setEmail(location.state.Email);
  }, []);

  const updateData = () => {
    console.log(fname, lname);
    fetch("http://localhost:5050/updateUser", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        id: location.state._id,
        fname: fname,
        lname: lname,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userdata");
        window.location.href = "/userHome";
      });
    console.log(fname, lname);
  };

  return (
    <div className="bg-zinc-400 h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-black/30 h-auto p-6 w-[400px]">
        <div className="flex flex-col mb-4">
          <label htmlFor="fname" className="mb-2">
            First Name:
          </label>
          <input
            id="fname"
            placeholder="First Name"
            className="outline-none h-10 px-5 border border-sm"
            defaultValue={fname}
            onChange={(e) => setFname(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="lname" className="mb-2">
            Last Name:
          </label>
          <input
            id="lname"
            placeholder="Last Name"
            className="outline-none h-10 px-5 border border-sm"
            defaultValue={lname}
            onChange={(e) => setLname(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="email" className="mb-2">
            Email:
          </label>
          <input
            id="email"
            placeholder="Email"
            className="outline-none h-10 px-5 border border-sm"
            disabled
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          onClick={updateData}
          className="bg-gray-600 text-white rounded-lg py-2 px-4 border border-gray-600 hover:bg-gray-700"
        >
          Update Details
        </button>
      </div>
    </div>
  );
};

export default UpdateUser;
