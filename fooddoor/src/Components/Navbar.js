import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
const Navbar = () => {
  const username = window.localStorage.getItem("name");
  const [scroll, setscroll] = useState(false);

  const [, , removeCookie] = useCookies(["access_token"]);
  let navigate = useNavigate();
  const navigatetosignup = () => {
    navigate("/user/signup");
  };
  const navigatetologin = () => {
    navigate("/user/login");
  };
  const navigatetologout = () => {
    removeCookie("access_token");
    window.localStorage.removeItem("userid");
    window.localStorage.removeItem("name");
    navigate("/");
  };

  return (
    <div>
      <nav className={"topnavbar d-flex"}>
        <div className="d-flex justify-content-between vw-100">
          <Link to={"/"}>
            <button className={`${"btn mt-3 shadow-0 px-5 py-2 mx-4"}`}>
              <h4>RECEIPE Book</h4>
            </button>
          </Link>
          <div className="d-flex mx-4 justify-content-between">
            <p>
              {username === null ? (
                <nav>
                  <ul className="d-flex">
                    <li className="list-style-none ">
                      <button className="btn" onClick={navigatetosignup}>
                        Signup
                      </button>
                    </li>
                    <li className="list-style-none">
                      <button className="btn" onClick={navigatetologin}>
                        Login
                      </button>
                    </li>
                  </ul>
                </nav>
              ) : (
                <>
                  <ul className="d-flex">
                    <li>
                      <button className={`btn`} onClick={navigatetologout}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </>
              )}
            </p>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
