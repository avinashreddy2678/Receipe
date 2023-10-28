import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Edit";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Home from "@mui/icons-material/Home";
import Back from "@mui/icons-material/ArrowBack";


function Sidebar({ home,back }) {
  const navigate = useNavigate();
  const username = window.localStorage.getItem("name");
  const userid = window.localStorage.getItem("userid");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const goBack = () => {
navigate(-1);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  const handleCreateNew = () => {
    navigate(`/create/${userid}`);
  };

  const handlesavedclick = () => {
    navigate(`/saved/${userid}`);
  };
  const handlelikeclick = () => {
    navigate(`/liked/${userid}`);
  };
  const handlemyrecepies = () => {
    navigate(`/myrecepies/${userid}`);
  };
  const handleHome = () => {
    navigate("/");
  };
  return (
    <>
      <div className="sidebar px-2 ">
        <div className="top">
          <ul>
            
          </ul>
        </div>
        <div className="sidebottom">
          <p>
            <ul className="list-style-none">
              <li className="">
                {username !== null ? (
                  <div className="newreceipe">
                    {
                        !back && !back===true ? <button
                        onClick={() => goBack()}
                        className=" sidebtns my-3 d-flex py-1 btn btn-primary"
                      >
                        <span className="sidename"> Go Back </span>
                        <span className="px-2">
                          <Back />
                        </span>
                      </button>: " "
                      }
                    
                    {!home && !home === true ? (
                      <button
                        onClick={() => handleHome()}
                        className="sidebtns my-3 d-flex py-1 btn btn-primary"
                      >
                        <span className="sidename"> Home </span>
                        <span className="px-2">
                          <Home />
                        </span>
                      </button>
                    ) : (
                      ""
                    )}
                    

                    <button
                      onClick={() => handleCreateNew()}
                      className=" sidebtns my-3 d-flex py-1 btn btn-primary"
                    >
                      <span className="sidename"> Add New </span>
                      <span className="px-2">
                        <AddIcon />
                      </span>
                    </button>
                      
                    

                    <div className=" ">
                      <button
                        onClick={() => {
                          toggleDropdown();
                        }}
                        className=" sidebtns my-3 d-flex py-1 btn btn-primary"
                      >
                        <span className="sidename"> {username}</span>
                        <span className="px-2">
                          <AccountCircleIcon />
                        </span>
                      </button>

                      {isDropdownOpen && (
                        <div className="dropdown-content">
                          <ul className="list-style-none">
                            <li
                              onClick={() => {
                                handlemyrecepies();
                              }}
                              className="w-100 btn my-1 btn-light py-2 px-3"
                            >
                              My Receipes
                            </li>
                            <li
                              onClick={() => handlelikeclick()}
                              className="w-100 btn btn-light py-2 px-3"
                            >
                              Liked Receipes
                            </li>
                            <li
                              onClick={() => {
                                handlesavedclick();
                              }}
                              className="w-100 btn btn-light my-1 py-2 px-3"
                            >
                              Saved Receipe
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </li>
            </ul>
          </p>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
