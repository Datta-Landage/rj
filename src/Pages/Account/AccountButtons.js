import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../Css/All.css";
import toast from "react-hot-toast";

const Accountbtn = () => {
  const [candidateId, setcandidateId] = useState("");
  const [userData, setUserData] = useState("");
  const [userId, setUserId] = useState("");
  const [showImg, setShowImg] = useState(false);

  const fileInputRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    getUserAccountInfo();
  }, [userId]);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setcandidateId(userData._id.trim());
      setUserId(userData._id.trim());
    }
  }, []);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];

    try {
      const formData = new FormData();
      formData.append("profilePhoto", selectedFile);

      console.log("pics", formData);

      const response = await fetch(
        `https://api-backend-plum.vercel.app/savePhoto/${candidateId}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        setUserData(responseData);
        if (responseData.profilePhoto) {
          setShowImg(true);
        }

        toast.success("Image Updated Successfully");
        console.log("Image uploaded successfully:", responseData);
      } else {
        const errorText = await response.text(); // Read the response as text
        toast.error(`Image upload failed: ${errorText}`);
        console.error("Image upload failed:", errorText);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred while processing your request.");
    }
  };

  // const uploadImage = async (file) => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("image", file);

  //     console.log("pics",formData)
  //     const response = await fetch(
  //       `https://api-backend-plum.vercel.app/savePhoto/${candidateId}`,
  //       {
  //         method: "POST",
  //         body: formData,
  //       }
  //     );
  //     if (response.ok) {
  //       const responseData = await response.json();
  //       alert("Image Updated Successfully");
  //       console.log("Image uploaded successfully:", responseData);
  //     } else {
  //       const errorData = await response.json();
  //       alert(errorData.message);
  //       console.error("Image upload failed:", errorData);
  //     }
  //   } catch (error) {
  //     console.error("An error occurred:", error);
  //     alert("An error occurred while processing your request.");
  //   }
  // };

  async function getUserAccountInfo() {
    try {
      const response = await fetch(
        `https://api-backend-plum.vercel.app/userAccount/${userId}`,
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
    <div
      className="cid-box d-flex flex-column p-4"
      style={{ width: "30%", maxHeight: "450px" }}
    >
      <div className="d-flex justify-content-center m-1">
        {showImg ? (
          <img
            class="rounded-circle w-50"
            src={userData.profilePhoto}
            style={{ cursor: "pointer", width: "120px", height: "120px" }}
            alt="profile"
            onClick={() => fileInputRef.current.click()}
          />
        ) : (
          <img
            class="rounded-circle w-50"
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
            style={{ cursor: "pointer" }}
            alt="profile"
            onClick={() => fileInputRef.current.click()}
          />
        )}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={(e) => handleFileChange(e)}
        />
      </div>
      <Link to="/myaccount" className="text-decoration-none">
        <button
          className={
            location.pathname === "/myaccount"
              ? "btn-secondary-cidblue my-2 w-100 p-2"
              : "btn-second-cidblue my-2 w-100 p-2"
          }
        >
          My Account
        </button>
      </Link>
      <Link to="/profile" className="text-decoration-none">
        <button
          className={
            location.pathname === "/profile"
              ? "btn-secondary-cidblue my-2 w-100 p-2"
              : "btn-second-cidblue my-2 w-100 p-2"
          }
        >
          Profile
        </button>
      </Link>
      <Link to="/jobs" className="text-decoration-none">
        <button
          className={
            location.pathname === "/jobs"
              ? "btn-secondary-cidblue my-2 w-100 p-2"
              : "btn-second-cidblue my-2 w-100 p-2"
          }
        >
          Jobs
        </button>
      </Link>
      <Link to="/calender" className="text-decoration-none">
        <button
          className={
            location.pathname === "/calender"
              ? "btn-secondary-cidblue my-2 w-100 p-2"
              : "btn-second-cidblue my-2 w-100 p-2"
          }
        >
          Calender
        </button>
      </Link>
      <Link to="/messages" className="text-decoration-none">
        <button
          className={
            location.pathname === "/messages"
              ? "btn-secondary-cidblue my-2 w-100 p-2"
              : "btn-second-cidblue my-2 w-100 p-2"
          }
        >
          Message
        </button>
      </Link>
    </div>
  );
};

export default Accountbtn;
