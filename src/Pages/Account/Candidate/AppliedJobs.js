import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppliedJobList = () => {
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
      console.warn(candidateId);
    }
    showAllJobs();
  }, []);

  async function showAllJobs() {
    try {
      const response = await fetch(
        `https://api-backend-plum.vercel.app/AppliedJobList/${candidateId}`,
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
        const errorData = await response.json();
        toast.warning(errorData.message, {
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

  const handleJobClick = (job) => {
    setSelectedJobs(job);
  };

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
    <div>
      <div className="input-group my-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <span className="input-group-text">Search</span>
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
              onClick={() => handleJobClick(jobData)}
            >
              <div className="d-flex justify-content-end  align-items-center">
                <h5 onClick={() => Bookmark(jobData._id)}>
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
                <p className="m-0">{jobData.companyId}</p>
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
            </div>
          ))}
        </div>
        {/* ----------------------------------------------------- Detailed Card --------------------------------------------------------------- */}

        <div>
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
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AppliedJobList;
