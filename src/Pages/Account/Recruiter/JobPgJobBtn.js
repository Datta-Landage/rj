import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import "../../Css/All.css";
import { BiSolidBookmarks } from "react-icons/bi";
import { MdLocationOn } from "react-icons/md";
import { GiSuitcase } from "react-icons/gi";
import { FaMoneyBillWaveAlt } from "react-icons/fa";

function JobBtn() {
  const [jobForm, setJobForm] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [yearsOfExperience, setExperience] = useState("4");
  const [salaryPackage, setsalaryPackage] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [modeOfWork, setModeOfWork] = useState("");
  const [typeOfEmployment, setTypeOfEmployment] = useState("");
  const [skillsAndTools, setSkillsAndTools] = useState([]);
  const [recruiterId, setrecruiterId] = useState("");
  const [companyId, setCompanyId] = useState("");

  const [fetchedJobsData, setFetchedJobsData] = useState([]);

  useEffect(() => {
    const storedCompanyId = localStorage.getItem("companyData");
    if (storedCompanyId) {
      const companyId = JSON.parse(storedCompanyId);
      setCompanyId(companyId.companyId);
    }
    console.warn(companyId);
  }, []);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setrecruiterId(userData._id.trim());
    }
  }, []);

  const showJobForm = () => {
    setJobForm(true);
  };

  async function showJobs() {
    console.warn(recruiterId);
    try {
      const response = await fetch(
        `https://it-eta.vercel.app/getJob/${recruiterId}`,
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
        console.warn(jobsData);
      } else {
        console.error("Failed to fetch jobsdata");
      }
    } catch (error) {
      console.error("error");
    }
  }

  useEffect(() => {
    showJobs();
  }, [recruiterId]);

  async function saveJobData() {
    try {
      let data = {
        recruiterId,
        jobTitle,
        summary,
        yearsOfExperience,
        salaryPackage,
        location,
        description,
        modeOfWork,
        typeOfEmployment,
        skillsAndTools,
        companyId,
      };
      console.warn(data);
      const response = await fetch(`https://it-eta.vercel.app/createJob`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Job Posted Successfully");
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }

      setJobTitle("");
      setSummary("");
      setsalaryPackage("");
      setLocation("");
      setDescription("");
      setModeOfWork("");
      setTypeOfEmployment("");
      setSkillsAndTools("");
    } catch (error) {
      console.error("An error occured:", error);
      alert("An error occurred while processing your request.");
    }
  }

  const handlemodeOfWorkToggle = (type) => {
    setModeOfWork(type);
  };

  const handleWorkTypeToggle = (type) => {
    setTypeOfEmployment(type);
  };

  const handleSkillsAndToolsChange = (event) => {
    const skillsArray = event.target.value
      .split(",")
      .map((skill) => skill.trim());
    setSkillsAndTools(skillsArray);
  };

  return (
    <div className="job-body">
      {!jobForm && (
        <div className="flex-wrap my-4 d-flex justify-content-start">
          {fetchedJobsData.map((jobData, index) => (
            <div
              key={index}
              className="p-2 m-1 overflow-hidden rounded cid-box rounded-3"
              style={{ width: "32%", height: "350px" }}
            >
              <div className="d-flex justify-content-end align-items-center">
                <button
                  className="p-1 mb-2 btn-primary-cidblue w-25"
                  value={jobData._id}
                  //   onClick={() => Apply(jobData._id)}
                >
                  Edit
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
          <div
            className="p-2 m-3 cid-box bg-primary"
            onClick={showJobForm}
            style={{ width: "40%", height: "400px" }}
          >
            <h1 className="p-4 text-light" style={{ fontSize: "70px" }}>
              Create a new Job
            </h1>
            <i
              class="bi bi-arrow-right"
              style={{ width: "1000px", color: "white" }}
            ></i>
          </div>
        </div>
      )}

      {jobForm && (
        <div className="p-4 my-2 cid-box">
          <form>
            <h2>Create a Job</h2>
            <div className="my-4 input-box w-100">
              <label className="cid-label">Job title</label>
              <input
                type="text"
                className="form-control"
                required
                value={jobTitle}
                onChange={(e) => {
                  setJobTitle(e.target.value);
                }}
              />
            </div>
            <div className="my-4 input-box w-100">
              <label className="cid-label">Job Summary</label>
              <br />
              <input
                type="text"
                className="form-control"
                required
                value={summary}
                onChange={(e) => {
                  setSummary(e.target.value);
                }}
              />
            </div>
            <div className="my-4 d-flex justify-content-between">
              <div className="input-box">
                <label className="cid-label">Salary Range</label>
                <br />
                <input
                  type="text"
                  className="form-control"
                  required
                  value={salaryPackage}
                  onChange={(e) => {
                    setsalaryPackage(e.target.value);
                  }}
                />
              </div>
              <div className="input-box">
                <label className="cid-label">Location</label>
                <br />
                <input
                  type="text"
                  className="form-control"
                  required
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="my-4 input-box w-100">
              <label className="cid-label">Job Description</label>
              <br />
              <input
                type="text"
                className="form-control"
                style={{ height: "200px" }}
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
            <div className="mt-3 d-flex">
              <div className="w-25">
                <label className="cid-label">Remote / On-site</label>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="flexCheckDefault"
                    checked={modeOfWork === "Remote"}
                    onChange={() => handlemodeOfWorkToggle("Remote")}
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    Remote
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="flexCheckDefault"
                    checked={modeOfWork === "Office"}
                    onChange={() => handlemodeOfWorkToggle("Office")}
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    Office
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="flexCheckDefault"
                    checked={modeOfWork === "Hybrid"}
                    onChange={() => handlemodeOfWorkToggle("Hybrid")}
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    Hybrid
                  </label>
                </div>
              </div>
              <div className="w-25">
                <label className="cid-label">Work Type</label>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="flexCheckDefault"
                    checked={typeOfEmployment === "Internship"}
                    onChange={() => handleWorkTypeToggle("Internship")}
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    Internship
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="flexCheckDefault"
                    checked={typeOfEmployment === "Freelance"}
                    onChange={() => handleWorkTypeToggle("Freelance")}
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    Freelance
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="flexCheckDefault"
                    checked={typeOfEmployment === "Contract"}
                    onChange={() => handleWorkTypeToggle("Contract")}
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    Contract
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="flexCheckDefault"
                    checked={typeOfEmployment === "Full-time/Part-time"}
                    onChange={() => handleWorkTypeToggle("Full-time/Part-time")}
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    Full-time / Part-time
                  </label>
                </div>
              </div>
            </div>
            <div className="my-4 input-box w-100">
              <label className="cid-label">SkillsAndTools</label>
              <br />
              <input
                type="text"
                className="form-control"
                value={skillsAndTools.join(", ")}
                onChange={handleSkillsAndToolsChange}
              />
            </div>
            <div>
              {skillsAndTools.map((skill, index) => (
                <span key={index} className="mr-2 badge badge-primary">
                  {skill}
                </span>
              ))}
            </div>
          </form>
          <button
            className="btn-primary-cidblue"
            style={{ width: "150px" }}
            onClick={saveJobData}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
}

export default JobBtn;
