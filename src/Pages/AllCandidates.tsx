import React, { useEffect, useState } from "react";
import Layout from "../Component/Layout";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiMessageSquare } from "react-icons/fi";
import { useMessageStore } from "../store/useMessagesStore";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../utils/routes";
import { USER_TYPE, useUserInfo } from "../hooks/useUserInfo";
import { useUserStore } from "../store/useUserStore";
import { MdLocationOn, MdCurrencyRupee, MdInsertDriveFile, MdApartment } from "react-icons/md";
import { GiSuitcase } from "react-icons/gi";
import { FiUser } from "react-icons/fi";
import { PiListPlusFill } from "react-icons/pi";
import { RiGraduationCapFill } from "react-icons/ri";
import { BiSolidCertification } from "react-icons/bi";

export interface IProfile {
  _id: string;
  uniqueId: string;
  candidateId: string;
  profilePhoto?: string;
  name: string;
  prefferedRole: string[];
  allRoles: string[];
  yearsOfExperience: number;
  summary: string;
  expectedSalary: string;
  workType: string[];
  workLocation: string[];
  workHistory: Record<string, any>[];
  educationHistory: Record<string, any>[];
  projects: Record<string, any>[];
  skills: string[];
  domainSkills: string[];
  toolsAndTechnology: string[];
  jobsAppliedByCandidate: string[];
  isDeleted?: boolean;
  bookmarkedJobs: string[];
  softSkills: string[];
}

const AllCandidatesData = () => {
  const [fetchedCandidateData, setFetchedCandidateData] = useState<IProfile[]>(
    []
  );
  const [searchValue, setSearchValue] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState<string>(null);
  const setSelectedProfile = useMessageStore((s) => s.setSelectedProfile);
  const navigate = useNavigate();
  const { userData, getUserInfo, error, isLoading } = useUserInfo();
  const user = useUserStore((state) => state.user);

  //==============================Full Profile================================\\

  const [viewMore, setViewMore] = useState(false);

  const showFullProfile = () => {
    setViewMore(true);
  };

  const showLess = () => {
    setViewMore(false);
  };

  useEffect(() => {
    showAllcandidates();
  }, []);

  //============================================================================\\

  useEffect(() => {
    if (!!error) {
      toast.error(error, {
        position: "top-center",
      });
    }
  }, [error]);

  useEffect(() => {
    if (
      !isLoading &&
      !error &&
      !!userData &&
      !!selectedCandidate &&
      userData._id === selectedCandidate
    ) {
      setSelectedProfile(
        filteredCandidates.filter(
          (candidate) => candidate.candidateId === selectedCandidate
        )[0]
      );
      navigate(ROUTES.MESSAGES);
    }
  }, [error, userData, isLoading]);

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
        console.warn(candidatesData?.data);
        setFetchedCandidateData(candidatesData);
      } else {
        console.error("Failed to fetch CandidatesData");
        toast.warning("Failed to fetch Candidate Data", {
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

  let filteredCandidates = fetchedCandidateData.filter((candidatesData) => {
    return (
      (candidatesData.uniqueId &&
        candidatesData.uniqueId
          .toLowerCase()
          .includes(searchValue.toLowerCase())) ||
      (candidatesData.yearsOfExperience !== undefined &&
        candidatesData.yearsOfExperience
          .toString()
          .includes(searchValue.toLowerCase())) ||
      (candidatesData.domainSkills &&
        candidatesData.domainSkills.some((skill) =>
          skill.toLowerCase().includes(searchValue.toLowerCase())
        )) ||
      (candidatesData.summary &&
        candidatesData.summary
          .toLowerCase()
          .includes(searchValue.toLowerCase()))
    );
  });

  const clearSelectedCandidate = () => {
    setSelectedCandidate(null);
  };
  const messageCandidate = () => {
    // checking if the candidate exist or not
    getUserInfo(selectedCandidate);
  };

  return (
    <Layout title={AllCandidatesData}>
      <div className="container py-5">
        {viewMore ? (
          // |||||||||||||||||||||||||||||||||||||||||||| Full View ||||||||||||||||||||||||||||||||||||||||||||||||
          <div>
            <div className="">
              {selectedCandidate &&
                [
                  filteredCandidates?.find(
                    (candidate) => candidate.candidateId === selectedCandidate
                  ),
                ]?.map((candidatesData, index) => (
                  <div className="mt-4 w-100 cid-box ">
                    <div className="">
                      {" "}
                      <div className="p-4 m-5 tw-sticky tw-top-3">
                        {/* -------------------------------------------------close button------------------------------------------ */}
                        {viewMore ? (
                          <div></div>
                        ) : (
                          <div className="d-flex justify-content-end align-items-center">
                            <button
                              onClick={clearSelectedCandidate}
                              className="tw-px-4 tw-py-2 tw-font-bold tw-text-white tw-bg-red-500 tw-rounded-md tw-mt-4 tw-hover:bg-red-700 "
                            >
                              Close
                            </button>
                            <h4>
                              <i className="bi bi-database-fill-add"></i>
                            </h4>
                          </div>
                        )}

                        {/* ---------------------------------------User Image----------------------------------------- */}
                        <div className="d-flex align-items-center">
                          <div className="d-flex align-items-end">
                            <img
                              className="m-2 rounded-circle bg-secondary"
                              src={candidatesData?.profilePhoto}
                              alt="H"
                              style={{ width: "150px", height: "150px" }}
                            />
                            {/* <p
                              className="p-1 my-3 text-white text-primary position-relative translate-middle bg-primary rounded-circle"
                              style={{ top: "1em", left: "-1rem" }}
                            >
                              {candidatesData?.yearsOfExperience}+
                            </p> */}
                          </div>

                          {/* -----------------------------------Unique Id--------------------------------------------- */}
                          <div className="mx-2 mt-4  justify-content-center">
                            <h2 className=" fw-border fs-5 fw-bold">
                              {candidatesData?.uniqueId.slice(0, 7)}
                              {/* <p className="fs-6 fw-bold"> {candidatesData?.prefferedRole[0]?.slice(1, -1)}</p> */}
                            </h2>
                            <div className="d-flex">
                              <div className="d-flex ">
                                <MdLocationOn className="mt-1" />
                                <p>Pune, India</p>
                                {/* <p>{candidatesData.place} </p> */}
                              </div>
                              <div className="ms-4 d-flex">
                                <GiSuitcase className="mt-1 mx-1" />
                                {candidatesData?.yearsOfExperience} Years
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* ---------------------------------------------Recruiter Buttons---------------------------------------------- */}

                        {/* {user?.accountType?.toLowerCase() === USER_TYPE.RECRUITER.toLowerCase() && ( */}
                        <div className="d-flex">
                          <button className="btn-secondary-cidblue m-2">
                            Add To List
                          </button>
                          <button className="btn-secondary-cidblue m-2">
                            Watch My Video
                          </button>
                          {viewMore ? (
                            <button
                              className="btn-primary-cidblue m-2"
                              onClick={showLess}
                            >
                              View Less
                            </button>
                          ) : (
                            <button
                              className="btn-primary-cidblue m-2"
                              onClick={showFullProfile}
                            >
                              Know More
                            </button>
                          )}
                          <div>
                            <button
                              onClick={messageCandidate}
                              // className="tw-px-4 tw-py-2 tw-font-bold active:tw-bg-blue-400 tw-text-primary tw-bg-blue-500/10 hover:tw-bg-blue-200 tw-rounded-md tw-mt-4"
                              className="btn-secondary-cidblue m-2"
                              title={"Message Candidate"}
                            >
                              Message
                            </button>
                          </div>
                        </div>
                        {/* )} */}

                        {/* -------------------------------------------------Roles-------------------------------------------------- */}

                        <div className="my-5">
                          <h5 className="mx-2 mt-3 fs-5 fw-bold">Roles</h5>
                          <div className="my-2 d-flex flex-wrap ">
                            {candidatesData.allRoles.map(
                              (rools, roolIndex) => (
                                <div
                                  key={roolIndex}
                                  className="bg-warning rounded py-2 px-3 m-2 fw-bold"
                                >
                                  {rools}
                                </div>
                              )
                            )}
                          </div>
                        </div>

                        <div className="my-5">
                          <h5 className="mx-2 mt-3 fs-5 fw-bold">Preffered Roles</h5>
                          <div className="my-2 d-flex flex-wrap ">
                            {candidatesData.prefferedRole.map(
                              (rools, roolIndex) => (
                                <div
                                  key={roolIndex}
                                  className="bg-warning rounded py-2 px-3 m-2 fw-bold"
                                >
                                  {rools}
                                  {/* {candidatesData?.prefferedRole[0]?.slice(1, -1)} */}
                                </div>
                              )
                            )}
                          </div>
                        </div>

                        {/* --------------------------------------------Summary----------------------------------------------- */}
                        <div className="my-5">
                          <h5 className="mx-2 my-3 fs-5 fw-bold">Summary</h5>
                          <p className="mx-2 fs-6">{candidatesData?.summary}</p>
                        </div>
                        <div className="summary-box d-flex justify-content-around p-4 rounded">
                            <div className="d-flex w-25">
                              <div>
                              <MdCurrencyRupee className="mt-1 mx-1" />
                              </div>
                              <div className="d-flex flex-wrap">
                              {candidatesData?.expectedSalary}
                              </div>
                            </div>
                            <div className="d-flex w-25">
                              <div>
                              <MdInsertDriveFile className="mt-1 mx-1" />
                              </div>
                              <div className="d-flex flex-wrap">
                              {candidatesData?.workType.join(', ')}
                              </div>
                            </div>
                            <div className="d-flex w-25">
                              <div>
                              <MdApartment className="mt-1 mx-1" />
                              </div>
                              <div className="d-flex flex-wrap">
                              {candidatesData?.workLocation.join(', ')}
                              </div>
                            </div>
                          </div>

                        {/* --------------------------------------------Skills and Tools--------------------------------------------- */}
                        <div className="my-5 mx-2">
                          <h5 className=" mt-4 fs-5 fw-bold">
                            Skills and Tools
                          </h5>
                          <div className="d-flex justify-content-between">
                            <div className="col-4">
                              <div className="">
                                {/* ===========================Hard Skills============================ */}
                                <h6 className="my-3 mt-3 fs-5 fw-bold">
                                  Hard Skills
                                </h6>
                              </div>
                              <div className="gap-2 d-flex">
                                {candidatesData?.domainSkills?.map(
                                  (skill, index) => (
                                    <p
                                      key={index}
                                      className="p-2 rounded-3"
                                      style={{ backgroundColor: "#a6a6e8" }}
                                    >
                                      <span className="p-1 text-white fw-bold">
                                        {skill}
                                      </span>
                                    </p>
                                  )
                                )}
                              </div>
                            </div>
                            {/* ==============================Soft Skills================================ */}
                            <div className="col-4 px-2">
                              <div className=" d-flex">
                                <h6 className="my-3 fs-5 fw-bold ">
                                  SoftSkills
                                </h6>
                              </div>

                              <div className="gap-2 d-flex flex-wrap">
                                {candidatesData?.softSkills?.map(
                                  (skill, index) => (
                                    <p
                                      key={index}
                                      className="p-2 rounded-3"
                                      style={{ backgroundColor: "#a6a6e8" }}
                                    >
                                      <span className="p-1 text-white fw-bold">
                                        {skill}
                                      </span>
                                    </p>
                                  )
                                )}
                              </div>
                            </div>
                            {/* ================================Tools/Technology============================= */}
                            <div className="col-4 px-2">
                              <div className=" d-flex">
                                <h6 className="my-3 fs-5 fw-bold ">
                                  Tools/Technology
                                </h6>
                              </div>

                              <div className="gap-1 d-flex flex-wrap">
                                {candidatesData?.toolsAndTechnology?.map(
                                  (tools, index) => (
                                    <p
                                      key={index}
                                      className="p-2 rounded-3"
                                      style={{ backgroundColor: "#a6a6e8" }}
                                    >
                                      <span className="p-1 text-white fw-bold">
                                        {tools}
                                      </span>
                                    </p>
                                  )
                                )}
                                {/* <p key={index} className="p-2 rounded-3" style={{ backgroundColor: "#a6a6e8" }}>
                                  <span className="p-1 text-white fw-bold">{candidatesData?.toolsAndTechnology[0]}</span>
                                </p>
                                <p key={index} className="p-2 rounded-3" style={{ backgroundColor: "#a6a6e8" }}>
                                  <span className="p-1 text-white fw-bold">{candidatesData?.toolsAndTechnology[1]}</span>
                                </p> */}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* ----------------------------------------------Work & Education History----------------------------------------------- */}

                        <div className="d-flex justify-content-between gap-5">
                          <div className="my-4 me-5 w-50">
                            <h5 className="mx-2 my-3 fs-5 fw-bold">
                              Latest Role
                            </h5>
                            <div className="my-4 mx-2">
                              {candidatesData?.workHistory?.map(
                                (allWork, index) => (
                                  <div key={index} className="my-4">
                                    <p>
                                      <span
                                        className="fw-bolder"
                                        style={{
                                          color: "#38349F",
                                          marginRight: "10px",
                                        }}
                                      >
                                        Role:
                                      </span>
                                      {allWork?.jobTitle}
                                    </p>
                                    <p>
                                      <span
                                        className="fw-bolder"
                                        style={{
                                          color: "#38349F",
                                          marginRight: "10px",
                                        }}
                                      >
                                        Company:
                                      </span>
                                      {allWork?.companyName}
                                    </p>
                                    <p>
                                      <span
                                        className="fw-bolder"
                                        style={{
                                          color: "#38349F",
                                          marginRight: "10px",
                                        }}
                                      >
                                        Date:
                                      </span>
                                      {allWork?.startDate} -{" "}
                                      {allWork?.endDate}
                                    </p>
                                    <p>
                                      <span
                                        className="fw-bolder"
                                        style={{
                                          color: "#38349F",
                                          marginRight: "10px",
                                        }}
                                      >
                                        Description:
                                      </span>
                                      {allWork?.Description}
                                    </p>
                                    <hr />
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                          {/* ================================Education History================================= */}
                          <div className="my-4 ms-5 w-50">
                            <h5 className="mx-2 my-3 fs-5 fw-bold">
                              Education History
                            </h5>
                            <div className="my-4 mx-2">
                              <div>
                                {candidatesData?.educationHistory?.map(
                                  (allEducation, index) => (
                                    <div key={index} className="my-4">
                                      <p>
                                        <span
                                          className="fw-bolder"
                                          style={{
                                            color: "#38349F",
                                            marginRight: "10px",
                                          }}
                                        >
                                          Title:
                                        </span>
                                        {allEducation?.title}
                                      </p>
                                      <p>
                                        <span
                                          className="fw-bolder"
                                          style={{
                                            color: "#38349F",
                                            marginRight: "10px",
                                          }}
                                        >
                                          University:
                                        </span>
                                        {allEducation?.school}
                                      </p>
                                      <p>
                                        <span
                                          className="fw-bolder"
                                          style={{
                                            color: "#38349F",
                                            marginRight: "10px",
                                          }}
                                        >
                                          PassOut Year:
                                        </span>
                                        {allEducation?.year}
                                      </p>
                                      <hr />
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* <div>
                          <p className="mx-2 mt-3 fs-5 fw-bold">About Me</p>
                          <p className="fs-6">{candidatesData?.summary}</p>
                        </div> */}

                        {/* <div className="d-flex">
                          <p>
                            {" "}
                            <GiSuitcase className="mt-3 fs-3" />{" "}
                          </p>{" "}
                          <p className="mx-2 mt-3 fs-5 fw-bold">Work Experince</p>
                        </div> */}

                        {/* <div>
                          {candidatesData?.workHistory?.map((allWork, index) => (
                            <div key={index}>
                              <p>
                                <span
                                  className="fw-bolder"
                                  style={{
                                    color: "#38349F",
                                    marginRight: "10px",
                                  }}
                                >
                                  Role:
                                </span>
                                {allWork?.jobTitle}
                              </p>
                              <p>
                                <span
                                  className="fw-bolder"
                                  style={{
                                    color: "#38349F",
                                    marginRight: "10px",
                                  }}
                                >
                                  Company:
                                </span>
                                {allWork?.companyName}
                              </p>
                              <p>
                                <span
                                  className="fw-bolder"
                                  style={{
                                    color: "#38349F",
                                    marginRight: "10px",
                                  }}
                                >
                                  Date:
                                </span>
                                {allWork?.startDate} - {allWork?.endDate}
                              </p>
                              <p>
                                <span
                                  className="fw-bolder"
                                  style={{
                                    color: "#38349F",
                                    marginRight: "10px",
                                  }}
                                >
                                  Description:
                                </span>
                                {allWork?.Description}
                              </p>
                            </div>
                          ))}
                        </div> */}

                        {/* <div className="d-flex">
                          <p>
                            {" "}
                            <RiGraduationCapFill className="mt-3 fs-3" />{" "}
                          </p>{" "}
                          <p className="mx-2 mt-3 fs-5 fw-bold">Education</p>
                        </div> */}

                        {/* <div className="d-flex">
                          <p>
                            {" "}
                            <GiSuitcase className="mt-3 fs-3" />{" "}
                          </p>{" "}
                          <p className="mx-2 mt-3 fs-5 fw-bold">Projects</p>
                        </div> */}

                        {/* <div>
                          {candidatesData?.projects?.map((project, index) => (
                            <div key={index}>
                              {Object.entries(project).map(([title, description], idx) => (
                                <div key={idx}>
                                  <p>
                                    <span
                                      className="fw-bolder"
                                      style={{
                                        color: "#38349F",
                                        marginRight: "10px",
                                      }}
                                    >
                                      Title:
                                    </span>
                                    {title}
                                  </p>
                                  <p>
                                    <span
                                      className="fw-bolder"
                                      style={{
                                        color: "#38349F",
                                        marginRight: "10px",
                                      }}
                                    >
                                      Description:
                                    </span>
                                    {description}
                                  </p>
                                  <hr />
                                </div>
                              ))}
                            </div>
                          ))}
                        </div> */}
                      </div>
                    </div>

                    {/* <div style={{ marginLeft: "10px", marginTop: "80px" }}>
                        <div className="gap-4 d-flex">
                          {user?.accountType?.toLowerCase() === USER_TYPE.RECRUITER.toLowerCase() && (
                            <button
                              onClick={messageCandidate}
                              className="tw-px-4 tw-py-2 tw-font-bold active:tw-bg-blue-400 tw-text-primary tw-bg-blue-500/10 hover:tw-bg-blue-200 tw-rounded-md tw-mt-4"
                              title={"Message Candidate"}
                            >
                              Message
                            </button>
                          )}

                        </div>
                      </div> */}

                    {/* <div
                      style={{
                        width: "500px",
                        marginTop: "160px",
                        marginRight: "100px",
                      }}
                    >
                      <div className="mt-4 d-flex">
                        <p> </p> <p className="mx-2 mt-3 fs-5 fw-bold">Domains</p>
                      </div>
                      <div className="gap-2 d-flex">
                        {candidatesData?.domainSkills?.map((skill, index) => (
                          <p key={index} className="p-2 rounded-3" style={{ backgroundColor: "#38349F" }}>
                            <span className="p-1 text-white fw-bold">{skill}</span>
                          </p>
                        ))}
                      </div>

                      <div className="mt-4 d-flex">
                        <p> </p> <p className="mt-3 fs-5 fw-bold ">Tools/Technology</p>
                      </div>

                      <div className="gap-2 d-flex">
                        <p key={index} className="p-2 rounded-3" style={{ backgroundColor: "#38349F" }}>
                          <span className="p-1 text-white fw-bold">{candidatesData?.toolsAndTechnology[0]}</span>
                        </p>
                        <p key={index} className="p-2 rounded-3" style={{ backgroundColor: "#38349F" }}>
                          <span className="p-1 text-white fw-bold">{candidatesData?.toolsAndTechnology[1]}</span>
                        </p>
                      </div>

                      <div className="mt-4 d-flex">
                        <p> </p> <p className="mt-3 fs-5 fw-bold ">SoftSkills</p>
                      </div>

                      <div className="gap-2 d-flex">
                        {candidatesData?.softSkills?.map((skill, index) => (
                          <p key={index} className="p-2 rounded-3" style={{ backgroundColor: "#38349F" }}>
                            <span className="p-1 text-white fw-bold">{skill}</span>
                          </p>
                        ))}
                      </div>
                    </div> */}
                  </div>
                ))}
            </div>
          </div>
        ) : (
          // |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
          <div>
            <div className="container">
              <div className="input-group ">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for candidate ids, skills etc"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <span className="input-group-text">Search</span>
              </div>
            </div>
            <div className="d-flex">
              <div
                className={
                  selectedCandidate
                    ? "my-4"
                    : "my-4 d-flex justify-content-start flex-wrap"
                }
              >
                {filteredCandidates?.map((candidatesData, index) => (
                  <div
                    key={index}
                    role="button"
                    className={`cid-box m-3 px-4 py-2 tw-cursor-pointer ${selectedCandidate === candidatesData?.candidateId
                      ? "detailed-box tw-border tw-border-primary"
                      : ""
                      }`}
                    style={{ width: "400px", height: "450px" }}
                    onClick={() =>
                      setSelectedCandidate(candidatesData?.candidateId)
                    }
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
                          <div className="bg-secondary tw-h-14 tw-aspect-square tw-rounded-full ">
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


                    <div className="mt-4 d-flex flex-wrap">
                      {candidatesData.domainSkills.map((domain, domainIndex) => (
                        <div
                          key={domainIndex}
                          className="btn-primary-cidyellow my-2 mx-2" // Adjust the margin as needed (e.g., mx-2)
                        >
                          {domain}
                        </div>
                      ))}
                    </div>


                    <div className="summary-box p-3 my-2 mx-3 border border-light rounded">
                      <p className="">{candidatesData.summary}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="">
                {/* //======================================================Selected Candidate===========================================================\\ */}

                {selectedCandidate &&
                  [
                    filteredCandidates?.find(
                      (candidate) => candidate.candidateId === selectedCandidate
                    ),
                  ]?.map((candidatesData, index) => (

                    <div className="mt-4 w-100 cid-box ">
                      <div className="">
                        {" "}
                        <div className="p-4 m-5 tw-sticky tw-top-3">
                          {/* -------------------------------------------------close button------------------------------------------ */}
                          <div className="d-flex justify-content-end align-items-center">
                            <button
                              onClick={clearSelectedCandidate}
                              className="tw-px-4 tw-py-2 tw-font-bold tw-text-white tw-bg-red-500 tw-rounded-md tw-mt-4 tw-hover:bg-red-700 "
                            >
                              Close
                            </button>
                            <h4>
                              <i className="bi bi-database-fill-add"></i>
                            </h4>
                          </div>

                          {/* ---------------------------------------User Image----------------------------------------- */}
                          <div className="d-flex align-items-center">
                            <div className="d-flex align-items-end">
                              <img
                                className="m-2 rounded-circle bg-secondary"
                                src={candidatesData?.profilePhoto}
                                alt="H"
                                style={{ width: "150px", height: "150px" }}
                              />
                              {/* <p
                              className="p-1 my-3 text-white text-primary position-relative translate-middle bg-primary rounded-circle"
                              style={{ top: "1em", left: "-1rem" }}
                            >
                              {candidatesData?.yearsOfExperience}+
                            </p> */}
                            </div>

                            {/* -----------------------------------Unique Id--------------------------------------------- */}
                            <div className="mx-2 mt-4  justify-content-center">
                              <h2 className=" fw-border fs-5 fw-bold">
                                {candidatesData?.uniqueId.slice(0, 7)}
                              </h2>
                              <div className="d-flex">
                                <div className="d-flex ">
                                  <MdLocationOn className="mt-1" />
                                  <p>Pune, India</p>
                                  {/* <p>{candidatesData.place} </p> */}
                                </div>
                                <div className="ms-4 d-flex">
                                  <GiSuitcase className="mt-1 mx-1" />
                                  {candidatesData?.yearsOfExperience} Years
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* ---------------------------------------------Recruiter Buttons---------------------------------------------- */}

                          {/* {user?.accountType?.toLowerCase() === USER_TYPE.RECRUITER.toLowerCase() && ( */}
                          <div className="d-flex">
                            <button className="btn-secondary-cidblue m-2">
                              Add To List
                            </button>
                            <button className="btn-secondary-cidblue m-2">
                              Watch My Video
                            </button>
                            {viewMore ? (
                              <button
                                className="btn-primary-cidblue m-2"
                                onClick={showLess}
                              >
                                View Less
                              </button>
                            ) : (
                              <button
                                className="btn-primary-cidblue m-2"
                                onClick={showFullProfile}
                              >
                                Know More
                              </button>
                            )}
                            <button
                              onClick={messageCandidate}
                              // className="tw-px-4 tw-py-2 tw-font-bold active:tw-bg-blue-400 tw-text-primary tw-bg-blue-500/10 hover:tw-bg-blue-200 tw-rounded-md tw-mt-4"
                              className="btn-secondary-cidblue m-2"
                              title={"Message Candidate"}
                            >
                              Message
                            </button>
                          </div>
                          {/* )} */}

                          {/* -------------------------------------------------Roles-------------------------------------------------- */}

                          <div className="my-5">
                            <h5 className="mx-2 mt-3 fs-5 fw-bold">Roles</h5>
                            <div className="my-2 d-flex flex-wrap ">
                              {candidatesData.allRoles.map(
                                (rools, roolIndex) => (
                                  <div
                                    key={roolIndex}
                                    className="bg-warning rounded py-2 px-3 m-2 fw-bold"
                                  >
                                    {rools}
                                  </div>
                                )
                              )}
                            </div>
                          </div>

                          {/* <div className="my-5">
                            <h5 className="mx-2 mt-3 fs-5 fw-bold">Preffered Roles</h5>
                            <div className="my-2 d-flex flex-wrap ">
                              {candidatesData.prefferedRole.map(
                                (role, roleIndex) => (
                                  <div
                                    key={roleIndex}
                                    className="bg-warning rounded py-2 px-3 m-2 fw-bold"
                                  >
                                    {role}
                                  </div>
                                )
                              )}
                            </div>
                          </div> */}

                          {/* --------------------------------------------Summary----------------------------------------------- */}
                          <div className="my-5">
                            <h5 className="mx-2 my-3 fs-5 fw-bold">Summary</h5>
                            <p className="mx-2 fs-6">
                              {candidatesData?.summary}
                            </p>
                          </div>
                          <div className="summary-box d-flex justify-content-around py-3 px-5 border border-light rounded">
                            <div className="d-flex w-25">
                              <div>
                              <MdCurrencyRupee className="mt-1 mx-1" />
                              </div>
                              <div className="d-flex flex-wrap">
                              {candidatesData?.expectedSalary}
                              </div>
                            </div>
                            <div className="d-flex w-25">
                              <div>
                              <MdInsertDriveFile className="mt-1 mx-1" />
                              </div>
                              <div className="d-flex flex-wrap">
                              {candidatesData?.workType.join(', ')}
                              </div>
                            </div>
                            <div className="d-flex w-25">
                              <div>
                              <MdApartment className="mt-1 mx-1" />
                              </div>
                              <div className="d-flex flex-wrap">
                              {candidatesData?.workLocation.join(', ')}
                              </div>
                            </div>
                          </div>

                          {/* --------------------------------------------Skills and Tools--------------------------------------------- */}
                          <div className="my-5 mx-2">
                            <h5 className=" mt-4 fs-5 fw-bold" style={{ color: "#38349F" }}>
                              Skills and Tools
                            </h5>
                            <div className="d-flex justify-content-between">
                              {/* ------------------------------Hard Skills-------------------------------- */}
                              <div className="col-4 px-2">
                                <div className=" d-flex">
                                  <h6 className="my-3 fs-5 fw-bold" style={{ color: "#38349F" }}>
                                    Hard Skills
                                  </h6>
                                </div>
                                <div className="gap-2 d-flex flex-wrap">
                                  {candidatesData?.domainSkills?.map(
                                    (skill, index) => (
                                      <p
                                        key={index}
                                        className="p-2 rounded-3 "
                                        style={{ backgroundColor: "#a6a6e8" }}
                                      >
                                        <span className="p-1 text-dark fw-bold">
                                          {skill}
                                        </span>
                                      </p>
                                    )
                                  )}
                                </div>
                              </div>
                              {/* ------------------------------------Soft Skills------------------------------------------- */}
                              <div className="col-4 px-2">
                                <div className=" d-flex">
                                  <h6 className="my-3 fs-5 fw-bold " style={{ color: "#38349F" }}>
                                    SoftSkills
                                  </h6>
                                </div>
                                <div className="gap-2 d-flex flex-wrap">
                                  {candidatesData?.softSkills?.map(
                                    (skill, index) => (
                                      <p
                                        key={index}
                                        className="p-2 rounded-3"
                                        style={{ backgroundColor: "#a6a6e8" }}
                                      >
                                        <span className="p-1 text-dark fw-bold">
                                          {skill}
                                        </span>
                                      </p>
                                    )
                                  )}
                                </div>
                              </div>
                              {/* ---------------------------------------------Tools/Technology---------------------------------------------- */}
                              <div className="col-4 px-2">
                                <div className=" d-flex">
                                  <h6 className="my-3 fs-5 fw-bold " style={{ color: "#38349F" }}>
                                    Tools/Technology
                                  </h6>
                                </div>

                                <div className="gap-1 d-flex flex-wrap">
                                  {candidatesData?.toolsAndTechnology?.map(
                                    (tools, index) => (
                                      <p
                                        key={index}
                                        className="p-2 rounded-3"
                                        style={{ backgroundColor: "#a6a6e8" }}
                                      >
                                        <span className="p-1 text-dark fw-bold">
                                          {tools}
                                        </span>
                                      </p>
                                    )
                                  )}
                                  {/* <p key={index} className="p-2 rounded-3" style={{ backgroundColor: "#a6a6e8" }}>
                                  <span className="p-1 text-white fw-bold">{candidatesData?.toolsAndTechnology[0]}</span>
                                </p>
                                <p key={index} className="p-2 rounded-3" style={{ backgroundColor: "#a6a6e8" }}>
                                  <span className="p-1 text-white fw-bold">{candidatesData?.toolsAndTechnology[1]}</span>
                                </p> */}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* ----------------------------------------------Work & Education History----------------------------------------------- */}

                          <div className="d-flex justify-content-between gap-5">
                            <div className="my-4 me-4  w-50">
                              <h5 className="mx-2 my-3 fs-5 fw-bold">
                                Latest Role
                              </h5>
                              <div className="my-4 mx-2">
                                <div>
                                  {candidatesData?.workHistory?.[0] && (
                                    <div key={index}>
                                      <p>
                                        <span
                                          className="fw-bolder"
                                          style={{
                                            color: "#38349F",
                                            marginRight: "10px",
                                          }}
                                        >
                                          Role:
                                        </span>
                                        {candidatesData?.workHistory[0]?.jobTitle}
                                      </p>
                                      <p>
                                        <span
                                          className="fw-bolder"
                                          style={{
                                            color: "#38349F",
                                            marginRight: "10px",
                                          }}
                                        >
                                          Company:
                                        </span>
                                        {candidatesData?.workHistory[0]?.companyName}
                                      </p>
                                      <p>
                                        <span
                                          className="fw-bolder"
                                          style={{
                                            color: "#38349F",
                                            marginRight: "10px",
                                          }}
                                        >
                                          Date:
                                        </span>
                                        {candidatesData?.workHistory[0]?.startDate} -{" "}
                                        {candidatesData?.workHistory[0]?.endDate}
                                      </p>
                                      <p>
                                        <span
                                          className="fw-bolder"
                                          style={{
                                            color: "#38349F",
                                            marginRight: "10px",
                                          }}
                                        >
                                          Description:
                                        </span>
                                        {candidatesData?.workHistory[0]?.Description}
                                      </p>
                                    </div>
                                    // )
                                  )}
                                </div>
                              </div>
                            </div>
                            {/* -------------------------------------------Education History------------------------------------------------------- */}
                            <div className="my-4 ms-4 w-50">
                              <h5 className="mx-2 my-3 fs-5 fw-bold ">
                                Education History
                              </h5>
                              <div className="my-4 mx-2">
                                {/* {candidatesData?.educationHistory?.[0] && (
                                <div className="">
                                  <p><b>{candidatesData?.educationHistory?.[0]?.title}</b></p>
                                  <p>{candidatesData?.educationHistory?.[0]?.school}</p>
                                </div>
                              )} */}
                                <div>
                                  {candidatesData?.educationHistory?.[0] && (
                                    <div key={index}>
                                      <p>
                                        <span
                                          className="fw-bolder"
                                          style={{
                                            color: "#38349F",
                                            marginRight: "10px",
                                          }}
                                        >
                                          Title:
                                        </span>
                                        {
                                          candidatesData?.educationHistory?.[0]
                                            ?.title
                                        }
                                      </p>
                                      <p>
                                        <span
                                          className="fw-bolder"
                                          style={{
                                            color: "#38349F",
                                            marginRight: "10px",
                                          }}
                                        >
                                          University:
                                        </span>
                                        {
                                          candidatesData?.educationHistory?.[0]
                                            ?.school
                                        }
                                      </p>
                                      <p>
                                        <span
                                          className="fw-bolder"
                                          style={{
                                            color: "#38349F",
                                            marginRight: "10px",
                                          }}
                                        >
                                          PassOut Year:
                                        </span>
                                        {
                                          candidatesData?.educationHistory?.[0]
                                            ?.year
                                        }
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* <div>
                          <p className="mx-2 mt-3 fs-5 fw-bold">About Me</p>
                          <p className="fs-6">{candidatesData?.summary}</p>
                        </div> */}

                          {/* <div className="d-flex">
                          <p>
                            {" "}
                            <GiSuitcase className="mt-3 fs-3" />{" "}
                          </p>{" "}
                          <p className="mx-2 mt-3 fs-5 fw-bold">Work Experince</p>
                        </div> */}

                          {/* <div>
                          {candidatesData?.workHistory?.map((allWork, index) => (
                            <div key={index}>
                              <p>
                                <span
                                  className="fw-bolder"
                                  style={{
                                    color: "#38349F",
                                    marginRight: "10px",
                                  }}
                                >
                                  Role:
                                </span>
                                {allWork?.jobTitle}
                              </p>
                              <p>
                                <span
                                  className="fw-bolder"
                                  style={{
                                    color: "#38349F",
                                    marginRight: "10px",
                                  }}
                                >
                                  Company:
                                </span>
                                {allWork?.companyName}
                              </p>
                              <p>
                                <span
                                  className="fw-bolder"
                                  style={{
                                    color: "#38349F",
                                    marginRight: "10px",
                                  }}
                                >
                                  Date:
                                </span>
                                {allWork?.startDate} - {allWork?.endDate}
                              </p>
                              <p>
                                <span
                                  className="fw-bolder"
                                  style={{
                                    color: "#38349F",
                                    marginRight: "10px",
                                  }}
                                >
                                  Description:
                                </span>
                                {allWork?.Description}
                              </p>
                            </div>
                          ))}
                        </div> */}

                          {/* <div className="d-flex">
                          <p>
                            {" "}
                            <RiGraduationCapFill className="mt-3 fs-3" />{" "}
                          </p>{" "}
                          <p className="mx-2 mt-3 fs-5 fw-bold">Education</p>
                        </div> */}

                          {/* <div>
                          {candidatesData?.educationHistory?.map((allEducation, index) => (
                            <div key={index}>
                              <p>
                                <span
                                  className="fw-bolder"
                                  style={{
                                    color: "#38349F",
                                    marginRight: "10px",
                                  }}
                                >
                                  Title:
                                </span>
                                {allEducation?.title}
                              </p>
                              <p>
                                <span
                                  className="fw-bolder"
                                  style={{
                                    color: "#38349F",
                                    marginRight: "10px",
                                  }}
                                >
                                  University:
                                </span>
                                {allEducation?.school}
                              </p>
                              <p>
                                <span
                                  className="fw-bolder"
                                  style={{
                                    color: "#38349F",
                                    marginRight: "10px",
                                  }}
                                >
                                  PassOut Year:
                                </span>
                                {allEducation?.year}
                              </p>
                              <hr />
                            </div>
                          ))}
                        </div> */}

                          {/* <div className="d-flex">
                          <p>
                            {" "}
                            <GiSuitcase className="mt-3 fs-3" />{" "}
                          </p>{" "}
                          <p className="mx-2 mt-3 fs-5 fw-bold">Projects</p>
                        </div> */}

                          {/* <div>
                          {candidatesData?.projects?.map((project, index) => (
                            <div key={index}>
                              {Object.entries(project).map(([title, description], idx) => (
                                <div key={idx}>
                                  <p>
                                    <span
                                      className="fw-bolder"
                                      style={{
                                        color: "#38349F",
                                        marginRight: "10px",
                                      }}
                                    >
                                      Title:
                                    </span>
                                    {title}
                                  </p>
                                  <p>
                                    <span
                                      className="fw-bolder"
                                      style={{
                                        color: "#38349F",
                                        marginRight: "10px",
                                      }}
                                    >
                                      Description:
                                    </span>
                                    {description}
                                  </p>
                                  <hr />
                                </div>
                              ))}
                            </div>
                          ))}
                        </div> */}
                        </div>
                      </div>

                      {/* <div style={{ marginLeft: "10px", marginTop: "80px" }}>
                          <div className="gap-4 d-flex">
                            {user?.accountType?.toLowerCase() === USER_TYPE.RECRUITER.toLowerCase() && (
                              <button
                                onClick={messageCandidate}
                                className="tw-px-4 tw-py-2 tw-font-bold active:tw-bg-blue-400 tw-text-primary tw-bg-blue-500/10 hover:tw-bg-blue-200 tw-rounded-md tw-mt-4"
                                title={"Message Candidate"}
                              >
                                Message
                              </button>
                            )}

                          </div>
                        </div> */}

                      {/* <div
                      style={{
                        width: "500px",
                        marginTop: "160px",
                        marginRight: "100px",
                      }}
                    >
                      <div className="mt-4 d-flex">
                        <p> </p> <p className="mx-2 mt-3 fs-5 fw-bold">Domains</p>
                      </div>
                      <div className="gap-2 d-flex">
                        {candidatesData?.domainSkills?.map((skill, index) => (
                          <p key={index} className="p-2 rounded-3" style={{ backgroundColor: "#38349F" }}>
                            <span className="p-1 text-white fw-bold">{skill}</span>
                          </p>
                        ))}
                      </div>

                      <div className="mt-4 d-flex">
                        <p> </p> <p className="mt-3 fs-5 fw-bold ">Tools/Technology</p>
                      </div>

                      <div className="gap-2 d-flex">
                        <p key={index} className="p-2 rounded-3" style={{ backgroundColor: "#38349F" }}>
                          <span className="p-1 text-white fw-bold">{candidatesData?.toolsAndTechnology[0]}</span>
                        </p>
                        <p key={index} className="p-2 rounded-3" style={{ backgroundColor: "#38349F" }}>
                          <span className="p-1 text-white fw-bold">{candidatesData?.toolsAndTechnology[1]}</span>
                        </p>
                      </div>

                      <div className="mt-4 d-flex">
                        <p> </p> <p className="mt-3 fs-5 fw-bold ">SoftSkills</p>
                      </div>

                      <div className="gap-2 d-flex">
                        {candidatesData?.softSkills?.map((skill, index) => (
                          <p key={index} className="p-2 rounded-3" style={{ backgroundColor: "#38349F" }}>
                            <span className="p-1 text-white fw-bold">{skill}</span>
                          </p>
                        ))}
                      </div>
                    </div> */}
                    </div>
                  ))}
                {/* //==============================================================================================================\\ */}
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </Layout>
  );
};

export default AllCandidatesData;
