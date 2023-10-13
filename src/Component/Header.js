import React, { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Pages/Img/CID_logo-01.svg";
import Logo1 from "../Pages/Img/Logo1.png";
import Dropdown from "react-bootstrap/Dropdown";
import "../Pages/Css/All.css";
import { useUserStore } from "../store/useUserStore";

function Header() {
  const [logedIn, setLogedIn] = useState(false);
  const [userData, setUserData] = useState("");
  const [userId, setUserId] = useState("");
  const [showImg, setShowImg] = useState(false);
  const [accountType, setAccountType] = useState("");
  const navigate = useNavigate();

  const setUser = useUserStore((s) => s.setUser);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const userDatas = JSON.parse(storedUserData);
      setUserId(userDatas._id.trim());
      setLogedIn(true);
      getUserAccountInfo();
      setAccountType(userDatas.accountType);
    }
  }, [userId]);

  const handleDropdownItemClick = (path) => {
    navigate(path);
  };

  const handleSignOut = () => {
    localStorage.removeItem("userData");
    setLogedIn(false);
    setUserData("");
    setUserId("");
    navigate("/");
    setUser(null);
  };

  async function getUserAccountInfo() {
    try {
      const response = await fetch(
        `https://it-eta.vercel.app/userAccount/${userId}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const userAccountData = await response.json();
        setUserData(userAccountData);
        if (userAccountData.profilePhoto) {
          setShowImg(true);
        }
      } else {
        console.error("Failed to fetch user account info");
      }
    } catch (error) {
      console.error("error");
    }
  }

  return (
    <div className="tw-z-10">
      <Navbar className="px-5 header-cid text-warning justify-content-between ">
        <div className="logo">
          <Link
            to={
              accountType === "Recruiter"
                ? "/allcandidates"
                : accountType === "Candidate"
                ? "/allJobs"
                : "/"
            }
            className="text-decoration-none d-flex"
          >
            <img
              src={Logo}
              alt="logo"
              className="largeLogo"
              style={{ width: "250px" }}
            />
            <img
              src={Logo1}
              alt="logo"
              className="smallLogo"
              style={{ width: "100px" }}
            />
          </Link>
        </div>
        <div className="nav-button">
          {logedIn ? (
            <div className="d-flex align-items-center me-5 pe-5">
              <div>
                <p className="m-0">
                  {userData.firstName} {userData.lastName}{" "}
                </p>
              </div>
              <div>
                {showImg ? (
                  <img
                    src={userData.profilePhoto}
                    className="mx-3 rounded-circle"
                    style={{ width: "40px" }}
                  />
                ) : (
                  <img
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                    className="mx-3 rounded-circle"
                    style={{ width: "40px" }}
                  />
                )}
              </div>
              <Dropdown>
                <Dropdown.Toggle variant="" className="text-light">
                  <i class="bi bi-justify"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => handleDropdownItemClick("/myaccount")}
                  >
                    My Account
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleDropdownItemClick("/profile")}
                  >
                    Profile
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleDropdownItemClick("/jobs")}
                  >
                    Job
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleDropdownItemClick("/calender")}
                  >
                    Calendar
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleDropdownItemClick("/messages")}
                  >
                    Message
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleSignOut}>
                    Sign Out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          ) : (
            <div>
              <Link to="/Signup">
                <button
                  className="VanisButton btn-primary-cidwhite my-1 text-decoration-none"
                  style={{ width: "120px", marginLeft: "20px" }}
                >
                  Sign Up
                </button>
              </Link>
              <Link to="/Signin">
                <button
                  className="btn-primary-cidyellow text-decoration-none"
                  style={{
                    width: "120px",
                    marginLeft: "20px",
                    minWidth: "60px",
                  }}
                >
                  Sign in
                </button>
              </Link>
            </div>
          )}
        </div>
      </Navbar>
    </div>
  );
}

export default Header;
