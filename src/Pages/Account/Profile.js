import React, { useState, useEffect, useRef } from "react";
import Layout from "../../Component/Layout";
import Banner from "../Img/createAccountBanner.png";
import "./Css/CreateAccount.css";
import "../Css/All.css";
import Accountbtn from "./AccountButtons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CandidateProfile from "./Candidate/ProfileForm";

function CompanyProfile() {
  const [accoutType, setAccountType] = useState("");

  // ------------------------------------- Recruiter part --------------------------------------------\\
  const [selectedImage, setSelectedImage] = useState(null);
  const [companyName, setCompanyName] = useState("");
  const [recruiterDesignation, setDesignation] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [domains, setDomain] = useState("");
  const [city, setCity] = useState("");
  const [aboutCompany, setAboutCompany] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);
  const [recruiterId, setRecruiterId] = useState();
  const [showimg, setShowImg] = useState(false);
  const [error, setError] = useState(false);
  const [candidateData, setCandidate] = useState(null);
  const [companyData, setCompanyData] = useState(null);

  const selectedImageInputRef = useRef(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const [userId, setUserId] = useState("");

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setUserId(userData._id.trim());
    }
  }, []);

  async function getUserAccountInfo() {
    try {
      const response = await fetch(
        `http://localhost:4000/getProfileById/${userId}`,
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
        setCandidate(userAccountData);
        console.log("fett", userAccountData);
      } else {
        console.error("Failed to fetch user account info");
      }
    } catch (error) {
      console.error("error");
    }
  }

  console.log("dataof can", candidateData);

  useEffect(() => {
    if (accoutType === "Candidate") {
      getUserAccountInfo();
    }
  }, [userId]);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setAccountType(userData.accountType);
      setRecruiterId(userData._id.trim());
    }
  }, [recruiterId]);

  useEffect(() => {
    if (accoutType === "Recruiter") {
      getCompanyData();
    }
  }, [recruiterId]);

  async function getCompanyData() {
    try {
      const response = await fetch(
        `http://localhost:4000/getCompanyProfile/${recruiterId}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const CompanyData = await response.json();
        setSelectedImage(CompanyData.companyPhoto);
        setCompanyName(CompanyData.companyName);
        setDesignation(CompanyData.recruiterDesignation);
        setWebsite(CompanyData.website);
        setAddress(CompanyData.address);
        setCountry(CompanyData.country);
        setDomain(CompanyData.domains);
        setCity(CompanyData.city);
        setAboutCompany(CompanyData.aboutCompany);
        setDataLoaded(true);
      } else {
        console.error("Failed to fetch company info");
      }
    } catch (error) {
      console.error("error");
    }
  }

  async function saveCompanyData() {
    if (
      !companyName ||
      !recruiterDesignation ||
      !website ||
      !address ||
      !country ||
      !domains ||
      !city ||
      !aboutCompany
    ) {
      setError(true);
      return toast.warning("All fields are mandatory", {
        position: "top-center",
      });
    } else {
      // alert ("Good to go")
    }
    try {
      const formData = new FormData();
      formData.append("companyName", companyName);
      formData.append("recruiterDesignation", recruiterDesignation);
      formData.append("website", website);
      formData.append("address", address);
      formData.append("country", country);
      formData.append("domains", domains);
      formData.append("city", city);
      formData.append("aboutCompany", aboutCompany);
      formData.append("recruiterId", recruiterId);
      formData.append("companyPhoto", selectedImage);

      const response = await fetch(
        `http://localhost:4000/companyProfile/${recruiterId}`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (response.ok) {
        const apiData = await response.json();
        toast.success("Company Data created sucessfully", {
          position: "top-center",
        });
        // localStorage.setItem("companyData", JSON.stringify(apiData));
        console.worn(response);
      } else {
        const errorData = await response.json();
        toast.warning(errorData.message, {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("An error occured:", error);
      toast.warning("An error occurred while processing your request.", {
        position: "top-center",
      });
    }
  }

  const handleEditButtonClick = () => {
    setDataLoaded(false);
  };
  //-----------------------------------------------------------------------------------------\\

  return (
    <Layout title={"My Account"}>
      <div className="container py-4">
        {dataLoaded ? (
          <div></div>
        ) : (
          <div className="mb-4 banner">
            <img src={Banner} style={{ width: "100%" }} alt="Banner" />
          </div>
        )}
        <div className="d-flex">
          <Accountbtn />

          {/* --------------------------------------------- If user is Recruiter ------------------------------------------- */}

          {accoutType === "Recruiter" ? (
            <div className="container py-4 mx-4 cid-box">
              <h2>Company Profile</h2>
              {dataLoaded ? (
                <div>
                  <div className="d-flex align-items-center">
                    {selectedImage ? (
                      <img
                        src={selectedImage}
                        alt="Company Logo"
                        style={{ width: "100px", borderRadius: "50%" }}
                      />
                    ) : (
                      <img
                        className="m-4 rounded-circle bg-secondary"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZK8JJONDX7V4VvtKIQRECkhSj4jWC7F8HXnlWkB8ZR4YW_dUvAh2ChDc3vLXf4n63mwg&usqp=CAU"
                        alt="H"
                        style={{ width: "150px" }}
                      />
                    )}
                    <h2 className="mx-4 fw-bold">{companyName} </h2>
                  </div>
                  <p className="my-4 shadow-sm">{aboutCompany} </p>
                  <div class="row my-2">
                    <div class="col col-sm-3 ">
                      <h6>website</h6>
                    </div>
                    <div class="col col-sm-4">{website} </div>
                  </div>
                  <div class="row my-2">
                    <div class="col col-sm-3">
                      <h6>Address</h6>
                    </div>
                    <div class="col col-sm-4">{address}</div>
                  </div>
                  <div class="row my-2">
                    <div class="col col-sm-3">
                      <h6>City</h6>
                    </div>
                    <div class="col col-sm-4">{city}</div>
                  </div>
                  <div class="row my-2">
                    <div class="col col-sm-3">
                      <h6>Country</h6>
                    </div>
                    <div class="col col-sm-4">{country}</div>
                  </div>
                  <div class="row my-2">
                    <div class="col col-sm-3">
                      <h6>Your Designation</h6>
                    </div>
                    <div class="col col-sm-4">{recruiterDesignation}</div>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button
                      className="mt-4 btn-primary-cidblue "
                      style={{ width: "150px" }}
                      onClick={handleEditButtonClick}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div>
                    <div className="m-2 d-flex justify-content-start">
                      <img
                        class="rounded-circle"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZK8JJONDX7V4VvtKIQRECkhSj4jWC7F8HXnlWkB8ZR4YW_dUvAh2ChDc3vLXf4n63mwg&usqp=CAU"
                        style={{ cursor: "pointer", width: "150px" }}
                        alt="H"
                        onClick={() => selectedImageInputRef.current.click()}
                      />
                      <input
                        type="file"
                        ref={selectedImageInputRef}
                        style={{ display: "none" }}
                        onChange={handleImageChange}
                      />
                    </div>

                    <form className="mt-3 bodyAll" onSubmit={saveCompanyData}>
                      <div className="d-flex justify-content-between">
                        <div className="my-2 input-box">
                          <label className="cid-label">Company name<span className="text-danger"> *</span></label>
                          <input
                            type="text"
                            className="form-control"
                            required
                            value={companyName}
                            onChange={(e) => {
                              setCompanyName(e.target.value);
                            }}
                            name="companyName"
                          />
                        </div>
                        <div className="my-2 input-box">
                          <label className="cid-label">Your Designation<span className="text-danger"> *</span></label>
                          <input
                            type="text"
                            className="form-control"
                            required
                            value={recruiterDesignation}
                            onChange={(e) => {
                              setDesignation(e.target.value);
                            }}
                            name="recruiterDesignation"
                          />
                        </div>
                      </div>
                      <div className="d-flex justify-content-between">
                        <div className="my-2 input-box">
                          <label className="cid-label">website<span className="text-danger"> *</span></label>
                          <input
                            type="text"
                            className="form-control"
                            required
                            value={website}
                            onChange={(e) => {
                              setWebsite(e.target.value);
                            }}
                            name="website"
                          />
                        </div>
                        <div className="my-2 input-box">
                          <label className="cid-label">Address<span className="text-danger"> *</span></label>
                          <input
                            type="phone"
                            className="form-control"
                            required
                            value={address}
                            onChange={(e) => {
                              setAddress(e.target.value);
                            }}
                            name="address"
                          />
                        </div>
                      </div>
                      <div className="d-flex justify-content-between">
                        <div className="my-2 input-box">
                          <label className="cid-label">Country<span className="text-danger"> *</span></label>
                          <input
                            type="text"
                            className="form-control"
                            required
                            value={country}
                            onChange={(e) => {
                              setCountry(e.target.value);
                            }}
                            name="country"
                          />
                        </div>
                        <div className="my-2 input-box">
                          <label className="cid-label">Domain<span className="text-danger"> *</span></label>
                          <input
                            type="text"
                            className="form-control"
                            required
                            value={domains}
                            onChange={(e) => {
                              setDomain(e.target.value);
                            }}
                            name="domains"
                          ></input>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between">
                        <div className="my-2 input-box">
                          <label className="cid-label">City<span className="text-danger"> *</span></label>
                          <input
                            type="text"
                            className="form-control"
                            required
                            value={city}
                            onChange={(e) => {
                              setCity(e.target.value);
                            }}
                            name="city"
                          ></input>
                        </div>
                      </div>
                      <div className="my-2">
                        <label className="cid-label">About Company<span className="text-danger"> *</span></label>
                        <textarea
                          className="form-control"
                          style={{ height: "150px" }}
                          rows="4"
                          value={aboutCompany}
                          onChange={(e) => {
                            setAboutCompany(e.target.value);
                          }}
                          name="aboutCompany"
                        />
                      </div>
                      <div className="d-flex justify-content-end">
                        <button
                        type="submit"
                          className="btn-primary-cidblue "
                          style={{ width: "150px" }}
                          // onClick={saveCompanyData}
                        >
                          Create
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          ) : (
            //----------------------------------------------- if user is Candidate ----------------------------------------------------\\
            <div className="ms-4">
              <div>
                <div>
                  <CandidateProfile data={candidateData} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </Layout>
  );
}

export default CompanyProfile;
