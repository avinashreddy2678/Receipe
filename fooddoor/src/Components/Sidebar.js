import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Edit";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
function Sidebar() {
  const navigate = useNavigate();
  const username = window.localStorage.getItem("name");
  const userid = window.localStorage.getItem("userid");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);


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
  const handlemyrecepies=()=>{
    navigate(`/myrecepies/${userid}`);
  }
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
                    <button
                      onClick={() => handleCreateNew()}
                      className="my-3 d-flex py-1 btn btn-primary"
                    >
                      Add New{" "}
                      <span className="px-2">
                        <AddIcon />
                      </span>
                    </button>
                    <div className="btn btn-secondary align-items-center d-flex btn">
                    <p className="px-2 m-auto h6" onClick={toggleDropdown}>
                      {username}
                    </p>
                    <div className="icon-container" onClick={toggleDropdown}>
                      <AccountCircleIcon />
                    </div>
                    {isDropdownOpen && (
                      <div className="dropdown-content">
                        <ul className="list-style-none">
                          <li onClick={()=>{handlemyrecepies()}} className=" btn btn-light py-2 px-3">My Receipes</li>
                          <li onClick={()=>handlelikeclick()} className=" btn btn-light py-2 px-3">Liked Receipes</li>
                          <li onClick={()=>{handlesavedclick()}} className=" btn btn-light py-2 px-3">Saved Receipes</li>
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
