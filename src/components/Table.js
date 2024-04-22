import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Table = ({ userData, getAllUser }) => {
  const navigate = useNavigate();

  const { _id, fname, lname, Email, userType } = userData;

  const deleteUser = (id, name) => {
    if (window.confirm(`Are you sure you want delete ${name} `)) {
      fetch("http://localhost:5050/deleteUser", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          userid: id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.data);
          getAllUser();
        });
    } else {
    }
    console.log(id, name);
  };

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">UserType</th>
            <th className="px-4 py-2">Delete</th>
            <th className="px-4 py-2">Edit</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2">{`${fname} ${lname}`}</td>
            <td className="border px-4 py-2">{Email}</td>
            <td className="border px-4 py-2">{userType}</td>
            <td className="border px-8 py-4">
              <FontAwesomeIcon
                icon={faTrash}
                onClick={() => deleteUser(_id, fname)}
                className="cursor-pointer"
              />
            </td>
            <td className="border px-8 py-4">
              <FontAwesomeIcon
                icon={faEdit}
                onClick={() => navigate("/EditUser", { state: userData })}
                className="cursor-pointer"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
