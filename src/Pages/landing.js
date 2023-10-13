import React, { useEffect, useState } from "react";
import Layout from "../Component/Layout";
import "./Css/Landing.css";
import Banner1 from "./Img/landingBanner.png";
import landingBanner1 from "./Img/newbanner.jpg";
import Banner2 from "./Img/landingBanner2.png";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiUser } from "react-icons/fi";
import { MdLocationOn } from "react-icons/md";
import { PiListPlusFill } from "react-icons/pi";
import { BiSolidBookmarks } from "react-icons/bi";
import { GiSuitcase } from "react-icons/gi";
import { FaMoneyBillWaveAlt } from "react-icons/fa";
import CandidateBox from "./CandidateBox";

function LandingPage() {
  const [fetchedCandidateData, setFetchedCandidateData] = useState([]);
  const [fetchedJobsData, setFetchedJobsData] = useState([]);
  const [candidateId, setCandidateId] = useState(null);
  const [jobPostId, setJobPostId] = useState("");

  useEffect(() => {
    showAllcandidates();
    showAllJobs();
  }, []);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setCandidateId(userData._id.trim());
    }
  }, []);

  async function showAllcandidates() {
    try {
      const response = await fetch(`http://localhost:4000/getAllProfiles`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const candidatesData = await response.json();
        console.warn(candidatesData.data);
        const limitedData = candidatesData.slice(0, 3);

        setFetchedCandidateData(limitedData);
        console.warn(fetchedCandidateData);
      } else {
        console.error("Failed to fetch CandidatesData");
        toast.warning("Failed to fetch Candidates Data ", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast.warning("An error occurred while processing your request.", {
        position: "top-center",
      });
    }
  }

  async function showAllJobs() {
    try {
      const response = await fetch(`http://localhost:4000/getAllJobs`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const jobsData = await response.json();
        console.warn(jobsData.data);
        const limitedPost = jobsData.slice(0, 3);
        setFetchedJobsData(limitedPost);
      } else {
        console.error("Failed to fetch jobsData");
        toast.warning("Failed to fetch jobs Data", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast.warning("An error occurred while processing your request.", {
        position: "top-center",
      });
    }
  }

  async function Apply(jobDataId) {
    try {
      if (!candidateId) {
        return toast.error("Please Login First !!", {
          position: "top-center",
        });
      }
      let data = { jobPostId: jobDataId };
      const response = await fetch(
        `http://localhost:4000/jobApply/${candidateId}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        toast.success("Job Applied Successfully", {
          position: "top-center",
        });
        setJobPostId("");
      } else {
        const errorData = await response.json();
        toast.warning(errorData.message, {
          position: "top-center",
        });
        setJobPostId("");
      }
    } catch (error) {
      console.error("An error occured:", error);
      toast.warning("An error occurred while processing your request.", {
        position: "top-center",
      });
      setJobPostId("");
    }
  }

  return (
    <Layout title={"Home Page"}>
      {/* <div className="tw-w-64 tw-h-64 tw-z-0 tw-bg-blue-500 tw-blur-[120px] tw-rounded-full tw-min-h-max tw-min-w-max tw-absolute tw-top-[1020px] tw-left-[900px]"></div>
      <div className="tw-w-64 tw-h-64 tw-z-0 tw-bg-yellow-500 tw-blur-[120px] tw-rounded-full tw-min-h-max tw-min-w-max tw-absolute tw-top-24 tw-left-16"></div> */}

      <div className="container">
        <div
          className="bg-image p-5 text-center shadow-1-strong rounded mb-5 text-dark bg-secondary"
          style={{ height: "240px" }}
        >
          {/* <img src={landingBanner1}  /> */}
          {/* <h1 class="mb-3 h2">Jumbotron</h1> */}
        </div>

        <div className="data-body">
          <div className="d-flex justify-content-between ">
            <h4>Your Candidate</h4>
            <Link to="/allCandidates">
              <h6>View all</h6>
            </Link>
          </div>
          <div className="candidates h-100">
            <div
              // className="bg-secondary d-flex justify-content-start flex-wrap"
              className="flex-wrap m-2 d-flex justify-content-start"
            >
              {fetchedCandidateData.map((candidatesData, index) => (
                <div
                  key={index}
                  // className="candidatecard "
                  className="p-3 m-1  rounded cid-box rounded-3 overflow-hidden"
                  style={{ width: "32.5%", height: "450px" }}
                >
                  <div className="d-flex justify-content-end align-items-center ">
                    <h4>
                      <PiListPlusFill />
                    </h4>
                  </div>
                  <div className="d-flex mx-2">
                    <div className="m-0 d-flex align-items-center">
                      {!!candidatesData.profilePhoto ? (
                        <img
                          className="mx-2 rounded-circle bg-secondary"
                          src={candidatesData.profilePhoto}
                          alt="H"
                          style={{ width: "70px", height: "70px" }}
                        />
                      ) : (
                        <div className="bg-secondary tw-h-14 tw-aspect-square tw-rounded-full tw-flex">
                          <FiUser className="tw-m-auto tw-text-2xl tw-text-white" />
                        </div>
                      )}

                      <p
                        className="my-2 text-white text-primary position-relative translate-middle  rounded-circle tw-h-6 tw-w-6 tw-flex tw-items-center tw-justify-center"
                        style={{
                          top: "2.5em",
                          left: "-1rem",
                          backgroundColor: "#38349F",
                        }}
                      >
                        {candidatesData.yearsOfExperience}
                      </p>
                    </div>
                    <div className="my-2 mt-4 d-flex justify-content-center">
                      <h3 className=" fw-bold " style={{ color: "#38349F" }}>
                        {candidatesData?.uniqueId.slice(0, 7)}
                      </h3>
                    </div>
                  </div>
                  {/* <div className="mt-4 mx-3 d-flex ">
                    <MdLocationOn className="mt-1" />
                    <p>Pune, India</p>
                    <p>{candidatesData.place} </p>
                  </div> */}
                  {/* <div className="d-flex justify-content-center">
                    <b>
                      <h6 className="fw-bold" style={{ color: "#38349F" }}>
                        {`${candidatesData.domainSkills[0]} , ${candidatesData.domainSkills[1]} `}
                      </h6>
                    </b>
                  </div> */}
                  {/* //---------------------------------------------------------------------------------------------------------\\ */}

                  {/* <div className="mt-4 mx-3">
                    {candidatesData.domainSkills.map((domain, domainIndex) => (
                      <div
                        key={domainIndex}
                        className="btn-primary-cidyellow my-2 w-25"
                      >
                        {domain}
                      </div>
                    ))}
                  </div> */}
                  <div className="mt-4 mx-3 d-flex flex-wrap">
                    {candidatesData.domainSkills.map((domain, domainIndex) => (
                      <div
                        key={domainIndex}
                        className="btn-primary-cidyellow my-2 mx-2" // Adjust the margin as needed (e.g., mx-2)
                      >
                        {domain}
                      </div>
                    ))}
                  </div>
                  <div className="candidatecard-summary p-3 my-2 mx-3 text-wrap rounded">
                    {candidatesData?.summary?.length > 160 ? (
                      <p className="">
                        {`${candidatesData.summary?.slice(0, 160)} ...`}
                      </p>
                    ) : (
                      <p className="">{candidatesData.summary}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {/* <CandidateBox data={fetchedCandidateData} /> */}
          </div>
        </div>
        <div className="my-2">
          <img src={Banner2} style={{ width: "100%" }} />
        </div>
        <div className="data-body">
          <div className="d-flex justify-content-between">
            <h4>Your Jobs</h4>
            <Link to="/alljobs">
              <h6>View all</h6>
            </Link>
          </div>
          <div className="candidates h-100 ">
            <div className="flex-wrap d-flex justify-content-start rounded-4">
              {fetchedJobsData.map((jobData, index) => (
                <div
                  key={index}
                  className="p-2 m-1 overflow-hidden rounded cid-box rounded-3"
                  style={{ width: "32%", height: "100%" }}
                >
                  <div className="d-flex justify-content-end align-items-center">
                    <BiSolidBookmarks className="mx-2 mb-1 fs-5" />

                    <button
                      className="p-1 mb-2 btn-primary-cidblue w-25"
                      value={jobData._id}
                      onClick={() => Apply(jobData._id)}
                    >
                      Apply
                    </button>
                  </div>
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
                  <p className="my-4 overflow-hidden">{jobData.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </Layout>
  );
}

export default LandingPage;
