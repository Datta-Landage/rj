import { useEffect, useState } from "react";
import "../../Css/All.css";
import { Link } from "react-router-dom";
import { PiListPlusFill } from "react-icons/pi";
import { MdLocationOn } from "react-icons/md";
import { FiUser } from "react-icons/fi";

function CandidateBtn() {
  const [fetchedCandidateData, setFetchedCandidateData] = useState([]);
  const [activeLayout, setActiveLayout] = useState("grid");
  const [selectedHeaders, setSelectedHeaders] = useState(["Candidate Id"]);

  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showTableFilter, setShowTableFilter] = useState(false);

  const [searchValue, setSearchValue] = useState("");

  const toggleFilterDropdown = () => {
    setShowFilterDropdown(!showFilterDropdown);
  };

  const toggleTableFilter = () => {
    setShowTableFilter(!showTableFilter);
  };

  async function getAppliedCandidate() {
    try {
      const response = await fetch(
        `https://api-backend-plum.vercel.app/candidatesWhoHasAppliedToJob/651a792d1fc15a18afc504dc`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
        }
      );
      if (response.ok) {
        const candidatesData = await response.json();
        console.warn(candidatesData);
        setFetchedCandidateData(candidatesData);
      } else {
        console.error("Failed to fetch Applied candidates data");
      }
    } catch (error) {
      console.error("error");
    }
  }

  useEffect(() => {
    getAppliedCandidate();
  }, []);

  const handleButtonClick = (layout) => {
    setActiveLayout(layout);
  };

  const handleHeaderSelect = (header) => {
    if (selectedHeaders.includes(header)) {
      setSelectedHeaders(selectedHeaders.filter((h) => h !== header));
    } else {
      setSelectedHeaders([...selectedHeaders, header]);
    }
  };

  const renderTableHeaders = () => {
    return (
      <tr>
        {selectedHeaders.map((header) => (
          <th key={header}>{header}</th>
        ))}
      </tr>
    );
  };

  const renderTableBody = () => {
    return fetchedCandidateData.map((candidate, index) => (
      <tr key={index}>
        {selectedHeaders.map((header) => (
          <td key={header}>
            {header === "Candidate Id"
              ? candidate.candidateId
              : header === "Job List"
              ? candidate.jobsAppliedByCandidate
              : header === "Skills"
              ? candidate.skills.join(", ")
              : header === "Year Experince"
              ? candidate.yearsOfExperience
              : candidate[header]}
          </td>
        ))}
      </tr>
    ));
  };

  const filteredCandidates = fetchedCandidateData.filter((candidateData) => {
    return (
      (candidateData.uniqueId &&
        candidateData.uniqueId
          .toLowerCase()
          .includes(searchValue.toLowerCase())) ||
      (candidateData.yearsOfExperience !== undefined &&
        candidateData.yearsOfExperience
          .toString()
          .includes(searchValue.toLowerCase())) ||
      (candidateData.toolsAndTechnology &&
        candidateData.toolsAndTechnology.some((tool) =>
          tool.toLowerCase().includes(searchValue.toLowerCase())
        )) ||
      (candidateData.summary &&
        candidateData.summary.toLowerCase().includes(searchValue.toLowerCase()))
    );
  });

  const availableFields = [
    "Job List",
    "Status",
    "Year Experince",
    "Preferred work Type",
    "Remote / On-site",
    "Salary Range",
    "Skills",
  ];

  return (
    <div className="my-4 job-body ">
      <div
        className={
          activeLayout === "grid" ? "d-flex justify-content-between" : ""
        }
      >
        <div className={activeLayout === "grid" ? "w-75 me-3" : "w-100 me-3"}>
          <div className="d-flex">
            <div class="input-group">
              <input type="text" class="form-control" placeholder="Search" />
              <span class="input-group-text">Search</span>
            </div>
            <div className="dropdown">
              <button
                className="p-1 mx-2 btn-secondary-cidblue "
                style={{ width: "100px" }}
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded={showFilterDropdown}
                onClick={toggleFilterDropdown}
              >
                List
              </button>
              <div
                className={`p-1 dropdown-menu${
                  showFilterDropdown ? " show" : ""
                }`}
                style={{ width: "100px" }}
              >
                <div className="my-1 form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="newCheckbox"
                  />
                  <label className="form-check-label" htmlFor="newCheckbox">
                    <small>New</small>
                  </label>
                </div>
                <div className="my-1 form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="oldCheckbox"
                  />
                  <label className="form-check-label" htmlFor="oldCheckbox">
                    <small>Old</small>
                  </label>
                </div>
                <div className="my-1 form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="mostExperiencedCheckbox"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="mostExperiencedCheckbox"
                  >
                    <small>Most Experienced</small>
                  </label>
                </div>
                <div className="my-1 form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="lessExperiencedCheckbox"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="lessExperiencedCheckbox"
                  >
                    <small>Less Experienced</small>
                  </label>
                </div>
                <div>
                  <Link to="/jobs" className="text-decoration-none">
                    Create a new job
                  </Link>
                </div>
              </div>
            </div>
            {activeLayout === "grid" ? (
              <div></div>
            ) : (
              <div className="dropdown">
                <button
                  className="p-1 mx-2 btn-secondary-cidblue "
                  style={{ width: "200px" }}
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded={showFilterDropdown}
                  onClick={toggleTableFilter}
                >
                  Add Fields
                </button>
                <div
                  className={`p-1 dropdown-menu${
                    showTableFilter ? " show" : ""
                  }`}
                >
                  {availableFields.map((header) => (
                    <div key={header} className="my-1 form-check">
                      <input
                        type="checkbox"
                        id={header}
                        checked={selectedHeaders.includes(header)}
                        onChange={() => handleHeaderSelect(header)}
                      />
                      <label htmlFor={header}>{header}</label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="my-3 d-flex">
            <h3 onClick={() => handleButtonClick("grid")}>
              <i class="bi bi-grid"></i>
            </h3>
            <h3 className="ms-3" onClick={() => handleButtonClick("table")}>
              <i class="bi bi-border-width"></i>
            </h3>
          </div>
          <div>
            {activeLayout === "grid" ? (
              <div className="flex-wrap my-4 d-flex justify-content-start">
                {filteredCandidates.map((candidatesData, index) => (
                  <div
                    key={index}
                    className="p-1 m-1 rounded cid-box rounded-3"
                    style={{ width: "60%", height: "350px" }}
                  >
                    <div className="d-flex justify-content-end align-items-center ">
                      <h4>
                        <PiListPlusFill />
                      </h4>
                    </div>
                    <div className="m-0 d-flex justify-content-center align-items-center">
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
                        className="my-2 text-white text-primary position-relative translate-middle rounded-circle tw-h-6 tw-w-6 tw-flex tw-items-center tw-justify-center"
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
                      <h3 className=" fw-bold" style={{ color: "#38349F" }}>
                        {candidatesData?.uniqueId.slice(0, 7)}
                      </h3>
                    </div>
                    <div className="my-1 d-flex justify-content-center">
                      <MdLocationOn className="mt-1" />
                      <p>Pune, India</p>
                      <p>{candidatesData.place} </p>
                    </div>
                    <div className="d-flex justify-content-center">
                      <b>
                        <h6 className="fw-bold" style={{ color: "#38349F" }}>
                          {`${candidatesData.domainSkills[0]} , ${candidatesData.domainSkills[1]} `}
                        </h6>
                      </b>
                    </div>
                    <div className="p-1 my-1 text-center">
                      <p className="">{candidatesData.summary}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="overflow-scroll" style={{ width: "920px" }}>
                <table className="table table-bordered">
                  <thead>{renderTableHeaders()}</thead>
                  <tbody>{renderTableBody()}</tbody>
                </table>
              </div>
            )}
          </div>
        </div>
        <div className="w-25 ">
          {activeLayout === "grid" ? (
            <div>
              <div className="px-3 py-2 cid-box">
                <h6>sort</h6>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="flexCheckDefault"
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    <p className="m-0">
                      <small>New</small>
                    </p>
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="flexCheckDefault"
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    <p className="m-0">
                      <small>Old</small>
                    </p>
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="flexCheckDefault"
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    <p className="m-0">
                      <small>Most Experienced</small>
                    </p>
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="flexCheckDefault"
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    <p className="m-0">
                      <small>Less Experienced</small>
                    </p>
                  </label>
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}
export default CandidateBtn;
