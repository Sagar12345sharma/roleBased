import React, { useEffect, useState } from "react";
import posts from "../posts";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

function Content({ token }) {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [id, setId] = useState(null);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    let jwtSstring = localStorage.getItem("accessToken");
    if (jwtSstring) {
      let decodedToken = jwt_decode(jwtSstring);
      setRole(decodedToken.role);
      setId(decodedToken.id);
      getAllMembers(decodedToken.id);
    }
  }, [token]);

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

  return (
    <div className="content">
      <div className="posts">
        {posts &&
          posts.map((post, index) => (
            <div className="postContainer" key={index}>
              <div className="postImage">
                <img src={post.Image} alt="post image" key={index}></img>
              </div>
              <div className="postDescription">{post.Description}</div>
            </div>
          ))}
      </div>
      {role === "ADMIN" && (
        <div className="members">
          <div className="gotodashboard" onClick={() => navigate("/dashboard")}>
            Go To DashBoard
          </div>
          <div className="membersList">
            {/* <div className="addedMembers">Add New Members</div> */}
            <div className="list">
              {members.map((member) => (
                <div className={`member ${member.id}`}>
                  <div className="email">{member.Email}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Content;
