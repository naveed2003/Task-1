import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import UploadImage from "./UploadImage";

const UserHome = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState("");

  const logout = () => {
    window.localStorage.clear();
    window.location.href = "./";
  };

  useEffect(() => {
    fetch("http://localhost:5050/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userdata");

        setUserData(data.data);
        if (data.data === "token expired") {
          alert("Token expired login again");
          window.localStorage.clear();
          window.location.href = "./";
        }
      });
  }, []);

  return (
    <div className="bg-zinc-400 h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-black/30 h-96 pl-10 space-y-3 w-[400px] flex flex-col justify-center">
        <div></div>
        <UploadImage />
        {userData && (
          <div className="flex items-center justify-between bg-white-400 border-solid border-2 border-black rounded-lg mr-10 mb-20 p-4">
            <div>
              <h1>
                {" "}
                Name: {userData.fname}
                {userData.lname}
              </h1>
              <h1> Email: {userData.Email}</h1>
            </div>
            <FontAwesomeIcon
              icon={faUserPlus}
              className="text-xl cursor-pointer"
              onClick={() => navigate("/updateUser", { state: userData })}
            />
          </div>
        )}
        <button
          onClick={logout}
          className="flex justify-center items-center bg-slate-900 w-20 h-7 text-white rounded-full mb-2 ml-2"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default UserHome;
