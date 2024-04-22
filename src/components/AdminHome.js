import React, { useEffect, useState } from "react";
import Table from "./Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import AdminSignUp from "./AdminSignUp";

const AdminHome = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAdminSignUp, setShowAdminSignUp] = useState(false);

  useEffect(() => {
    getAllUser();
  }, [searchQuery]);

  const getAllUser = () => {
    fetch(`http://localhost:5050/getAllUser?search=${searchQuery}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        setData(data.data);
      });
  };

  const logout = () => {
    window.localStorage.clear();
    window.location.href = "./";
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCreateAdminSignUp = () => {
    setShowAdminSignUp(true);
  };

  const updateUserData = () => {
    getAllUser();
  };

  return (
    <div className="bg-zinc-400 min-h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-black/30 border-solid border-2 border-black p-10 space-y-3 flex flex-col justify-center items-center w-full max-w-3xl">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search..."
            onChange={handleSearch}
            className="px-8 py-2 rounded border border-gray-300 w-full"
            style={{ paddingLeft: "40px" }}
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black"
          />
          <span className="absolute right-4 top-2 text-gray-500">
            {searchQuery.length > 0
              ? `Records Found ${data.length}`
              : `Total Records ${data.length}`}
          </span>
        </div>
        <div className="overflow-x-auto flex-1 w-full">
          {data.map((userData) => (
            <Table
              key={userData._id}
              userData={userData}
              getAllUser={getAllUser}
            />
          ))}
        </div>
        <button
          onClick={logout}
          className="bg-slate-900 w-20 h-7 text-white rounded-full"
        >
          Log Out
        </button>
        <button
          className="bg-slate-900 w-20 h-7 text-white rounded-full"
          onClick={handleCreateAdminSignUp}
        >
          Create
        </button>
      </div>
      {showAdminSignUp && <AdminSignUp updateUserData={updateUserData} />}
    </div>
  );
};

export default AdminHome;
