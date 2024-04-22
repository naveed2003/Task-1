import React, { useState, useEffect } from "react";
import UserHome from "./UserHome";
import AdminHome from "./AdminHome";

const Homepage = () => {
  const [userData, setUserData] = useState(null);
  const [admin, setAdmin] = useState(false);

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
        if (data.data.userType == "Admin") {
          setAdmin(true);
        }

        setUserData(data.data);
        if (data.data == "token expired") {
          alert("Token expired login again");
          window.localStorage.clear();
          window.location.href = "./";
        }
      });
  }, []);

  return admin ? <AdminHome /> : <UserHome userData={userData} />;
};

export default Homepage;
