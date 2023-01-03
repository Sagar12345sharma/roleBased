import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import GenericRoleBasedLoginSinUp from "./GenericRoleBasedLoginSinUp";
import { useNavigate } from "react-router-dom";

function DashBoard({ token }) {
  const navigate = useNavigate();
  const [role, setRole] = useState("ADMIN");
  const [members, setMembers] = useState([]);
  const [id_, setId] = useState(null);
  const [addNewMember, setAddNewMember] = useState(false);

  useEffect(() => {
    let jwtSstring = localStorage.getItem("accessToken");
    if (jwtSstring) {
      let decodedToken = jwt_decode(jwtSstring);
      setRole(decodedToken.role);
      setId(decodedToken.id);
      getAllMembers(decodedToken.id);
    }
  }, [token]);

  //   useEffect(() => {
  //     let jwtSstring = localStorage.getItem("accessToken");
  //     if (jwtSstring) {
  //       let decodedToken = jwt_decode(jwtSstring);
  //       setRole(decodedToken.role);
  //       setId(decodedToken.id);
  //       getAllMembers(decodedToken.id);
  //     }
  //   }, []);

  const getAllMembers = (id) => {
    if (!id) {
      return;
    }
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      id: id,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:5000/api/v1/getMembers", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setMembers(result);
      })
      .catch((error) => console.log("error", error));
  };

  const deleteHandler = (id) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      id: id,
    });

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:5000/api/v1/delete", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        alert(result.message);
        getAllMembers(id_);
      })
      .catch((error) => console.log("error", error));
  };

  const addMember = (payload) => {
    payload.createdBy = id_;
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(payload);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:5000/api/v1/addMember", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          alert("Member added SuccessFully!");
        } else {
          alert(result.message);
        }
        setAddNewMember(false);
        getAllMembers(id_);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <div className="dashboard">
        {" "}
        <div className="members">
          <div className="gotodashboard" onClick={() => navigate("/")}>
            Go To Home
          </div>
          <div className="membersList">
            <div className="addedMembers" onClick={() => setAddNewMember(true)}>
              Add New Members
            </div>
            <div className="list">
              {members.map((member) => (
                <div className="de">
                  <div className={`member ${member.id}`}>
                    <div className="email">{member.Email}</div>
                    <div
                      className="delete"
                      onClick={() => deleteHandler(member.id)}
                    >
                      Delete
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {addNewMember && (
        <GenericRoleBasedLoginSinUp
          btnText={"Add New Member"}
          closeModal={setAddNewMember}
          addMember={addMember}
        />
      )}
    </>
  );
}

export default DashBoard;
