import React, { useState, useEffect } from "react";
import Layout from "../../Component/Layout";
import "./Css/CreateAccount.css";
import JobBtn from "./Recruiter/JobPgJobBtn";
import CandidateBtn from "./Recruiter/JobPgcandidate";
import Accountbtn from "./AccountButtons";
import { MdLocationOn } from "react-icons/md";
import { GiSuitcase } from "react-icons/gi";
import { FaMoneyBillWaveAlt } from "react-icons/fa";

function Jobs() {
  const [accountType, setAccountType] = useState(""); // Corrected spelling
  const [userId, setUserId] = useState("");
  const [applyJobs, setApplyJob] = useState([]);
  const [bookMarkedJobs, setBookMarkedJobs] = useState([]);
  const [activeComponent, setActiveComponent] = useState("");

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setAccountType(userData.accountType);
      setUserId(userData?._id);
    }
  }, [userId]);

  async function getApplyPost() {
    try {
      const response = await fetch(
        `https://it-eta.vercel.app/getAllJobs/${userId}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const applyJobsData = await response.json();
        setApplyJob(applyJobsData?.jobsAppliedByCandidate || []);
      } else {
        console.error("Failed to fetch user account info");
      }
    } catch (error) {
      console.error("error");
    }
  }

  async function getBookMarkedPost() {
    try {
      const response = await fetch(
        `https://it-eta.vercel.app/bookmarkedJobs/${userId}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const bookMarkedJobsData = await response.json();
        setBookMarkedJobs(bookMarkedJobsData?.bookmarkedJobsByCandidate || []);
      } else {
        console.error("Failed to fetch user account info");
      }
    } catch (error) {
      console.error("error");
    }
  }

  useEffect(() => {
    if (activeComponent === "AppliedJobs") {
      getApplyPost();
    }
    if (activeComponent === "BookmarkedJobs") {
      getBookMarkedPost();
    }
  }, [userId, activeComponent]);

  const handleButtonClick = (component) => {
    setActiveComponent(component);
  };

  return (
    <Layout title={"My Account"}>
      <div className="container py-4">
        <div className="d-flex">
          <Accountbtn />

          <div className="container mx-4">
            {accountType == "Candidate" ? (
              <div className="d-flex">
                <button
                  className={
                    activeComponent === "AppliedJobs"
                      ? "btn-primary-cidblue mx-2 px-4"
                      : "btn-second-cidblue mx-2 px-4"
                  }
                  onClick={() => handleButtonClick("AppliedJobs")}
                >
                  Applied Jobs
                </button>
                <button
                  className={
                    activeComponent === "BookmarkedJobs"
                      ? "btn-primary-cidblue mx-2 px-4"
                      : "btn-second-cidblue mx-2 px-4"
                  }
                  onClick={() => handleButtonClick("BookmarkedJobs")}
                >
                  Bookmarked Jobs
                </button>
              </div>
            ) : (
              <div className="d-flex">
                <button
                  className={
                    activeComponent === "job"
                      ? "btn-primary-cidblue mx-2 px-4"
                      : "btn-second-cidblue mx-2 px-4"
                  }
                  onClick={() => handleButtonClick("job")}
                >
                  Job Post
                </button>
                <button
                  className={
                    activeComponent === "candidate"
                      ? "btn-primary-cidblue mx-2 px-4"
                      : "btn-second-cidblue mx-2 px-4"
                  }
                  onClick={() => handleButtonClick("candidate")}
                >
                  Candidates
                </button>
              </div>
            )}
            <div>
              {activeComponent === "job" && <JobBtn />}
              {activeComponent === "candidate" && <CandidateBtn />}
            </div>
            {activeComponent == "AppliedJobs" && (
              <div className="gap-4 mt-4 d-flex">
                {applyJobs?.map((jobData, index) => (
                  <div
                    key={index}
                    className="p-2 m-1 overflow-hidden rounded cid-box rounded-3"
                    style={{ width: "50%", height: "350px" }}
                  >
                    <div className="d-flex align-items-center">
                      <img
                        className="m-1 rounded-circle bg-secondary"
                        src={jobData?.companyLogo}
                        alt="H"
                        style={{ width: "50px" }}
                      />
                      <p className="m-1 fs-5 fw-bolder">
                        {jobData?.companyId?.slice(0, 6)}
                      </p>
                    </div>
                    <h2 className="my-2 fw-bold fs-4">{jobData.jobTitle}</h2>
                    <div className="d-flex">
                      <MdLocationOn className="mt-2" />
                      <p className="mx-3 my-1">
                        {jobData.modeOfWork} , {jobData.location}
                      </p>
                    </div>
                    <div className="d-flex ">
                      <GiSuitcase className="mt-2" />
                      <p className="mx-3 my-1">{jobData.yearsOfExperience} </p>
                    </div>
                    <div className="d-flex ">
                      <FaMoneyBillWaveAlt className="mt-2" />
                      <p className="mx-3 my-1">{jobData.salaryPackage}</p>
                    </div>
                    <p className="my-4 overflow-hidden">
                      {jobData.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
            {activeComponent == "BookmarkedJobs" && (
              <div className="mt-4 d-flex">
                {bookMarkedJobs?.map((jobData, index) => (
                  <div
                    key={index}
                    className="p-2 m-1 overflow-hidden rounded cid-box rounded-3"
                    style={{ width: "50%", height: "350px" }}
                  >
                    <div className="d-flex align-items-center">
                      <img
                        className="m-1 rounded-circle bg-secondary"
                        src={jobData?.companyLogo}
                        alt="H"
                        style={{ width: "50px" }}
                      />
                      <p className="m-1 fs-5 fw-bolder">
                        {jobData?.companyId?.slice(0, 6)}
                      </p>
                    </div>
                    <h2 className="my-2 fw-bold fs-4">{jobData.jobTitle}</h2>
                    <div className="d-flex">
                      <MdLocationOn className="mt-2" />
                      <p className="mx-3 my-1">
                        {jobData.modeOfWork} , {jobData.location}
                      </p>
                    </div>
                    <div className="d-flex ">
                      <GiSuitcase className="mt-2" />
                      <p className="mx-3 my-1">{jobData.yearsOfExperience} </p>
                    </div>
                    <div className="d-flex ">
                      <FaMoneyBillWaveAlt className="mt-2" />
                      <p className="mx-3 my-1">{jobData.salaryPackage}</p>
                    </div>
                    <p className="my-4 overflow-hidden">
                      {jobData.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Jobs;
