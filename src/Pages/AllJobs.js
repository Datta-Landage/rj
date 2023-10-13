import React, { useEffect, useState } from "react";
import Layout from "../Component/Layout";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiSolidBookmarks } from "react-icons/bi";
import { MdLocationOn } from "react-icons/md";
import { GiSuitcase } from "react-icons/gi";
import { FaMoneyBillWaveAlt } from "react-icons/fa";

const AllJobPosts = () => {
  const [fetchedJobsData, setFetchedJobsData] = useState([]);
  const [candidateId, setCandidateId] = useState([]);
  const [jobPostId, setJobPostId] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [selectedJobs, setSelectedJobs] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setCandidateId(userData._id.trim());
    }
    showAllJobs();
  }, []);

  async function showAllJobs() {
    try {
      const response = await fetch(
        `https://api-backend-plum.vercel.app/getAllJobs`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const jobsData = await response.json();
        setFetchedJobsData(jobsData);
      } else {
        console.error("Failed to fetch jobsData");
        toast.warning("Failed to Fetch Job posts", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast.warning("An error occurred while pocessing your request.", {
        position: "top-center",
      });
    }
  }

  async function Apply(jobDataId) {
    try {
      let data = { jobPostId: jobDataId };
      console.warn("jjjjjjj", candidateId);
      const response = await fetch(
        `https://api-backend-plum.vercel.app/jobApply/${candidateId}`,
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
        console.log("dqfdddfff", candidateId);
        alert("Job Applied Successfully");
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

  const filteredJobs = fetchedJobsData.filter((jobData) => {
    return (
      jobData.jobTitle.toLowerCase().includes(searchValue.toLowerCase()) ||
      jobData.modeOfWork.toLowerCase().includes(searchValue.toLowerCase()) ||
      jobData.location.toLowerCase().includes(searchValue.toLowerCase()) ||
      jobData.description.toLowerCase().includes(searchValue.toLowerCase())
    );
  });

  // const handleJobClick = (job) => {
  //   setSelectedJobs(job);
  // };

  const clearSelectedJob = () => {
    setSelectedJobs(null);
  };

  //-------------------------Bookmark----------------------------\\

  async function Bookmark(jobDataId) {
    try {
      let data = { jobPostId: jobDataId };
      const response = await fetch(
        `https://api-backend-plum.vercel.app/bookmarkJobPost/${candidateId}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        toast.success("Bookmarked Successfully", {
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
    <Layout title={AllJobPosts}>
      <div className="container">
        <h1>All Job Posts</h1>
        <div>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <span className="input-group-text">Search</span>
          </div>
        </div>
        <div className="d-flex">
          <div
            className={
              selectedJobs
                ? "my-4"
                : "my-4 d-flex justify-content-start flex-wrap"
            }
          >
            {filteredJobs.map((jobData, index) => (
              <div
                key={index}
                className="cid-box m-3 py-2 px-3 overflow-hidden"
                style={{ width: "400px", height: "450px" }}
                // onClick={() => handleJobClick(jobData)}
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
          {/* ----------------------------------------------------- Detailed Card --------------------------------------------------------------- */}

          {/* <div>
            {filteredJobs.map((jobData, index) => (
              <div>
                {selectedJobs === jobData && (
                  <div className="cid-box m-5 p-4">
                    <div className="d-flex justify-content-end  align-items-center">
                      <h5>
                        <big>
                          <i class="bi bi-bookmark-fill"></i>
                        </big>
                      </h5>
                      <button
                        className="btn-primary-cidblue mb-2 p-0 w-25"
                        value={jobData._id}
                        onClick={() => Apply(jobData._id)}
                      >
                        Apply
                      </button>
                    </div>
                    <div className="d-flex align-items-center">
                      <img
                        className="rounded-circle bg-secondary m-2"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZK8JJONDX7V4VvtKIQRECkhSj4jWC7F8HXnlWkB8ZR4YW_dUvAh2ChDc3vLXf4n63mwg&usqp=CAU"
                        alt="H"
                        style={{ width: "50px" }}
                      />
                      <p className="">{jobData.companyId}</p>
                    </div>
                    <h4 className="text-primary my-3">{jobData.jobTitle}</h4>
                    <div className="d-flex ">
                      <i class="bi bi-geo-alt-fill"></i>
                      <p className="mx-3">
                        {jobData.modeOfWork} , {jobData.location}
                      </p>
                    </div>
                    <div className="d-flex my-0">
                      <i class="bi bi-briefcase-fill"></i>
                      <p className="mx-3">{jobData.yearsOfExperience} </p>
                    </div>
                    <div className="d-flex">
                      <i class="bi bi-cash"></i>
                      <p className="mx-3">{jobData.salaryPackage}</p>
                    </div>
                    <p className="p-1 border border-3">{jobData.description}</p>
                    <h2>{jobData.status} </h2>
                    <button onClick={clearSelectedJob}>Close</button>
                  </div>
                )}
              </div>
            ))}
          </div> */}
        </div>
      </div>
      <ToastContainer />
    </Layout>
  );
};

export default AllJobPosts;
