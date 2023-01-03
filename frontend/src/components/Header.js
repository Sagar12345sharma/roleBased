import React, { useEffect, useState } from "react";
import ConfirmationModal from "./ConfirmationModal";
import GenericRoleBasedLoginSinUp from "./GenericRoleBasedLoginSinUp";

function Header({ setToken }) {
  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);
  const [message, setMessage] = useState("");
  const [login, setLogin] = useState(false);

  const userSignUp = (payload) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      Email: payload.Email,
      Password: payload.Password,
      role: payload.role,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:5000/api/v1/signUp", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        if (result.error) {
          setSignupModal(false);
          setMessage(result.message);
        } else {
          setSignupModal(false);
          setMessage("SignUp SuccessFully Done!");
        }
      })
      .catch((error) => console.log("error", error));
  };

  const userLogin = (payload) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      Email: payload.Email,
      Password: payload.Password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:5000/api/v1/login", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (!result.success) {
          setLoginModal(false);
          setMessage(result.message);
        } else {
          setLoginModal(false);
          setMessage("SignUp SuccessFully Done!");
          setLogin(true);
          localStorage.setItem("accessToken", result.accessToken);
          setToken(result.accessToken);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const logoutClicked = () => {
    localStorage.removeItem("accessToken");
    let localStorageData = localStorage.getItem("accessToken");
    if (!localStorageData) {
      setLogin(false);
      setToken("");
    }

    refreshPage();
  };

  useEffect(() => {
    let localStorageData = localStorage.getItem("accessToken");
    if (localStorageData) {
      setLogin(true);
      setToken(localStorageData);
    } else {
      setLogin(false);
    }
  }, []);

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <>
      <div className="header">
        <div className="logo">Logo</div>
        <div className="heading">Role Based Access System</div>
        <div className="login_signup_container">
          <div className="login">
            {!login ? (
              <div className="loginbtn" onClick={() => setLoginModal(true)}>
                Login
              </div>
            ) : (
              <>
                <div className="loginbtn" onClick={() => logoutClicked()}>
                  Logout
                </div>
              </>
            )}

            {!login && (
              <div className="signupbtn" onClick={() => setSignupModal(true)}>
                SignUp
              </div>
            )}
          </div>
        </div>
        {loginModal && (
          <GenericRoleBasedLoginSinUp
            btnText={"Login"}
            closeModal={setLoginModal}
            setMessage={setMessage}
            userLogin={userLogin}
          />
        )}
        {signupModal && (
          <GenericRoleBasedLoginSinUp
            btnText={"SignUp"}
            closeModal={setSignupModal}
            setMessage={setMessage}
            userSignUp={userSignUp}
          />
        )}
      </div>
      {message && (
        <ConfirmationModal
          message={message}
          closeConfirmationModal={setMessage}
        />
      )}
    </>
  );
}

export default Header;
