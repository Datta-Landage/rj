import React, { useState, useEffect, useRef } from "react";
import { FiUser } from "react-icons/fi";
import { MdLocationOn } from "react-icons/md";
import { PiListPlusFill } from "react-icons/pi";


function CandidateBox({data}) {
  const [fetchedCandidateData, setFetchedCandidateData] = useState(data);

  useEffect(() => {
    console.log(fetchedCandidateData);
  })

  return(
    <div className="flex-wrap m-2 d-flex justify-content-start">
              {fetchedCandidateData.map((candidatesData, index) => (
                <div
                  key={index}
                  className="p-3 m-1  rounded cid-box rounded-3"
                  style={{ width: "32%", height: "350px" }}
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

                  <div className="mt-4 mx-3">
                    {candidatesData.domainSkills.map((domain, domainIndex) => (
                      <div
                        key={domainIndex}
                        className="btn-primary-cidyellow my-2 w-25"
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
  )
}

export default CandidateBox;