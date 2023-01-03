import React, { useState } from "react";

function GenericRoleBasedLoginSinUp({
  btnText,
  closeModal,
  userSignUp,
  userLogin,
  addMember,
}) {
  const [data, setData] = useState({
    Email: "",
    Password: "",
    role: "",
  });

  const submitHandler = () => {
    if (!data.Email) {
      alert("Please Enter Email!");
      return;
    }
    if (!data.Password) {
      alert("Please Enter Password!");
    }

    if (btnText === "SignUp" && !data.role) {
      alert("Please Select Role");
      return;
    }

    let payload = { ...data };
    delete payload["message"];
    if (btnText === "SignUp") {
      userSignUp(payload);
    } else if (btnText === "Login") {
      userLogin(payload);
    } else if (btnText === "Add New Member") {
      addMember(payload);
    }
  };

  return (
    <>
      <div className="genericRoleBasedLoginSinUp">
        <div className="container" id={"closeModal"}>
          <div className="cross_icon" onClick={() => closeModal(false)}></div>
          <div className="email_container">
            <div className="EmailLabel">Email</div>
            <input
              placeholder="Enter Email"
              onChange={(e) => setData({ ...data, Email: e.target.value })}
            />
          </div>
          <div className="password_container">
            <div className="EmailLabel">Password</div>
            <input
              placeholder="Enter Password"
              type={"password"}
              onChange={(e) => setData({ ...data, Password: e.target.value })}
            />
          </div>
          {btnText === "SignUp" && (
            <div className="radio_container">
              <input
                type="radio"
                id="admin"
                name="fav_language"
                value="ADMIN"
                onChange={(e) => setData({ ...data, role: e.target.value })}
              />
              <label for="admin">Admin</label>
              <input
                type="radio"
                id="member"
                name="fav_language"
                value="MEMBER"
                onChange={(e) => setData({ ...data, role: e.target.value })}
              />
                <label for="member">Member</label>
            </div>
          )}

          <div className="button_container">
            <div className="submit" onClick={() => submitHandler()}>
              {btnText}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GenericRoleBasedLoginSinUp;
