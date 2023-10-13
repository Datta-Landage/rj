import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Layout from "../../Component/Layout";
import Banner from "../Img/createAccountBanner.png";
import Accountbtn from "./AccountButtons";
import "../Css/All.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import { getNames } from "country-list";
const cities = require("countries-cities").getCities;

const MyAccount = () => {
  const fileInputRef = useRef(null);

  const [accountType, setAccountType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [phoneNumber, setPhone] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [alternateEmail, setAlternateEmail] = useState("");
  const [alternateNumber, setAlternateNumber] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [postalCode, setpostalCode] = useState("");
  const [dob, setDob] = useState("");

  const [userId, setUserId] = useState("");
  const [candidateId, setCandidateId] = useState("");
  const [countries, setCountries] = useState([]);
  let [selectedCountry, setSelectedCountry] = useState(null);
  const [citiesList, setCitiesList] = useState([]);
  let [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    const countryNames = getNames().map((name) => ({
      label: name,
      value: name,
    }));

    setCountries(countryNames);
  }, []);

  useEffect(() => {
    if (selectedCountry?.label) {
      const citiesOfSelectedCountry = cities(selectedCountry?.label || "India");
      const formattedCities = citiesOfSelectedCountry.map((city) => ({
        label: city,
        value: city,
      }));
      setCitiesList(formattedCities);
    }
  }, [selectedCountry]);
  console.log("city", citiesList);
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setUserId(userData._id.trim());
      setCandidateId(userData._id.trim());

      setAccountType(userData.accountType || "");
      setEmail(userData.email || "");
      setPassword(userData.password || "");
    }
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      uploadImage(selectedFile);
    }
  };

  const uploadImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(
        `https://api-backend-plum.vercel.app/saveRecruiterPhoto/${userId}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        toast.success("Image Updated Successfully", {
          position: "top-center",
        });
        console.log("Image uploaded successfully:", responseData);
      } else {
        const errorData = await response.json();
        toast.warning(errorData.message, {
          position: "top-right",
        });
        console.error("Image upload failed:", errorData);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.warning("An error occurred while processing your request.", {
        position: "top-center",
      });
    }
  };

  async function getUserAccountInfo() {
    try {
      console.log("userId", userId);
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
        // Set the user account data fetched from the API response
        setPhone(userAccountData.phoneNumber || "");
        setFirstName(userAccountData.firstName || "");
        setLastName(userAccountData.lastName || "");
        setAlternateEmail(userAccountData.alternateEmail || "");
        setAlternateNumber(userAccountData.alternateNumber || "");
        setCountry(userAccountData.country || "");
        setCity(userAccountData.city || "");
        setAddressLine1(userAccountData.addressLine1 || "");
        setAddressLine2(userAccountData.addressLine2 || "");
        setpostalCode(userAccountData.postalCode || "");
        setDob(userAccountData.dateOfBirth || "");
        console.warn(userAccountData);
      } else {
        console.error("Failed to fetch user account info");
        // toast.warning("Failed to fetch user account info", {
        //   position: "top-center",
        // });
      }
    } catch (error) {
      console.error("error");
      toast.warning("An error occurred while processing your request.", {
        position: "top-center",
      });
    }
  }

  useEffect(() => {
    getUserAccountInfo();
  }, [userId]);

  async function AccountData() {
    try {
      let data = {
        phoneNumber,
        firstName,
        lastName,
        alternateEmail,
        alternateNumber,
        country: selectedCountry?.label,
        city: selectedCity?.label,
        addressLine1,
        addressLine2,
        postalCode,
        dateOfBirth: dob,
      };

      const response = await fetch(
        `https://api-backend-plum.vercel.app/updateUser/${candidateId}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const apiData = await response.json();
        toast.success("Acount Details saved SuccessFully", {
          position: "top-center",
        });
      } else {
        const errorData = await response.json();
        toast.warning(errorData.message, {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.warning("An error occurred while processing your request.", {
        position: "top-center",
      });
    }
  }

  return (
    <Layout title={"My Account"}>
      <div className="container py-4">
        <div className="py-4 banner">
          <img src={Banner} style={{ width: "100%" }} alt="Banner" />
        </div>
        <div className="d-flex">
          <Accountbtn />

          <div className="container p-4 mx-4 cid-box">
            <div className="mt-5 bodyAll">
              <h2 className="my-3 ">Account Details</h2>
              <div className="d-flex justify-content-between">
                <div className="my-2 input-box">
                  <label className="cid-label">Email Id</label>
                  <input
                    type="text"
                    className="form-control"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    name="email"
                    placeholder="Email Id"
                    disabled
                  />
                </div>
                <div className="my-2 input-box">
                  <label className="cid-label">
                    Phone number<span className="text-danger"> *</span>
                  </label>
                  <input
                    type="tel" // use "tel" for phone numbers
                    className="form-control"
                    value={phoneNumber}
                    onChange={(e) => {
                      // Allow only numbers and limit to 10 digits
                      const value = e.target.value.replace(/[^0-9]/g, "");
                      if (value.length <= 10) {
                        setPhone(value);
                      }
                    }}
                    name="phoneNumber"
                    maxLength={10}
                    pattern="\d{10}" // Ensure only 10 digits
                    required
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="my-2 ">
                  <label className="pb-2 cid-label">Account type</label>
                  <div className="d-flex align-kitems-center">
                    <div className="radio-btn d-flex pe-4">
                      <input
                        type="radio"
                        value={"Recruiter"}
                        checked={accountType === "Recruiter"}
                        style={{ width: "100%" }}
                        disabled
                      />
                      <label className="px-2">Recruiter</label>
                    </div>
                    <div className="radio-btn d-flex ps-4">
                      <input
                        type="radio"
                        value={"Candidate"}
                        checked={accountType === "Candidate"}
                        style={{ width: "100%" }}
                        disabled
                      />
                      <label className="px-2">Candidate</label>
                    </div>
                  </div>
                </div>
                <div className="my-2 input-box">
                  <label className="cid-label">Password</label>
                  <div className="input-group">
                    <input
                      type="Password"
                      className="form-control "
                      value={password}
                      aria-describedby="basic-addon2"
                      disabled
                    />
                    <span class="input-group-text" id="basic-addon2">
                      <Link
                        to="/resetpassword"
                        className="text-decoration-none text-secondary"
                      >
                        Reset Password
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 bodyAll">
              <h2 className="my-3 ">Personal Details</h2>
              <div className="d-flex justify-content-between">
                <div className="my-2 input-box">
                  <label className="cid-label">
                    First Name<span className="text-danger"> *</span>
                  </label>
                  <input
                    type="text"
                    maxLength="20"
                    className="form-control"
                    value={firstName}
                    onChange={(e) => {
                      const value = e.target.value;
                      const capitalizedValue =
                        value.charAt(0).toUpperCase() + value.slice(1);
                      setFirstName(capitalizedValue);
                    }}
                    name="firstName"
                    required
                  />
                </div>
                <div className="my-2 input-box">
                  <label className="cid-label">
                    Last Name<span className="text-danger"> *</span>
                  </label>
                  <input
                    type="text"
                    maxLength="20"
                    className="form-control"
                    value={lastName}
                    onChange={(e) => {
                      const value = e.target.value;
                      const capitalizedValue =
                        value.charAt(0).toUpperCase() + value.slice(1);
                      setLastName(capitalizedValue);
                    }}
                    name="lastName"
                    required
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="my-2 input-box">
                  <label className="cid-label">Alternate Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={alternateEmail}
                    onChange={(e) => {
                      setAlternateEmail(e.target.value);
                    }}
                    name="alternateEmail"
                  />
                </div>
                <div className="my-2 input-box">
                  <label className="cid-label">Alternate Phone Number</label>
                  <input
                    type="phone"
                    className="form-control"
                    value={alternateNumber}
                    onChange={(e) => {
                      setAlternateNumber(e.target.value);
                    }}
                    name="alternateNumber"
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="my-2 input-box">
                  <label className="cid-label">
                    Country<span className="text-danger"> *</span>
                  </label>
                  <Select
                    options={countries}
                    value={selectedCountry}
                    onChange={setSelectedCountry}
                    isSearchable
                    placeholder="Select a country..."
                    name="country"
                  />
                </div>
                <div className="my-2 input-box">
                  <label className="cid-label">
                    City<span className="text-danger"> *</span>
                  </label>
                  <Select
                    options={citiesList}
                    value={selectedCity}
                    onChange={setSelectedCity}
                    isSearchable
                    placeholder="Select a city..."
                    name="city"
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="my-2 input-box">
                  <label className="cid-label">
                    Address Line1
                    <span className="text-danger">
                      {accountType == "Candidate" ? "*" : <></>}{" "}
                    </span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={addressLine1}
                    onChange={(e) => {
                      setAddressLine1(e.target.value);
                    }}
                    name="addressLine1"
                  />
                </div>
                <div className="my-2 input-box">
                  <label className="cid-label">
                    Address Line2
                    <span className="text-danger">
                      {" "}
                      {accountType == "Candidate" ? "*" : <></>}{" "}
                    </span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={addressLine2}
                    onChange={(e) => {
                      setAddressLine2(e.target.value);
                    }}
                    name="addressLine2"
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="my-2 input-box">
                  <label className="cid-label">
                    postal Code
                    <span className="text-danger">
                      {" "}
                      {accountType == "Candidate" ? "*" : <></>}{" "}
                    </span>
                  </label>
                  <input
                    type="phone"
                    className="form-control"
                    value={postalCode}
                    onChange={(e) => {
                      setpostalCode(e.target.value);
                    }}
                    name="postalCodeCode"
                  />
                </div>
                <div className="my-2 input-box">
                  <label className="cid-label">
                    Date of Birth<span className="text-danger"> </span>
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    value={dob}
                    onChange={(e) => {
                      setDob(e.target.value);
                    }}
                    name="dateOfBirth"
                  />
                </div>
              </div>
              <div className="d-flex justify-content-end">
                <button
                  type="submit"
                  className="mt-4 btn-primary-cidblue"
                  style={{ width: "150px" }}
                  onClick={AccountData}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MyAccount;
