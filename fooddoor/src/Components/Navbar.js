import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
const Navbar = () => {
  const username = window.localStorage.getItem("name");
  const [darkmode, setdarkmode] = useState(
    JSON.parse(localStorage.getItem("toggler")) || false
  );
  const [scroll, setscroll] = useState(false);
  useEffect(() => {
    localStorage.setItem("toggler", JSON.stringify(darkmode));
    if(darkmode){
      document.documentElement.classList.add('dark')
    }else{
      document.documentElement.classList.remove('dark')
    }
  }, [darkmode]);

  const handletoggle = () => {
    setdarkmode((prev) => !prev);
    localStorage.setItem("toggler", JSON.stringify(darkmode));
  };
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

  const handlescroll = () => {
    if (window.scrollY > 620) {
      setscroll(true);
    } else {
      setscroll(false);
    }
  };
  //for dark mode the header need to change the color to white adding the event scroll
  useEffect(() => {
    window.addEventListener("scroll", handlescroll);

    return () => {
      window.removeEventListener("scroll", handlescroll);
    };
  }, []);
  return (
    <div>
      <nav className={"topnavbar d-flex"}>
        <div className="d-flex justify-content-between vw-100">
          <Link to={"/"}>
            <button
              className={`${
                scroll && darkmode
                  ? "btn mt-3 shadow-0 px-5 py-2 mx-4 text-white"
                  : "btn mt-3 shadow-0 px-5 py-2 mx-4"
              }`}
            >
              <h4>RECEIPE Book</h4>
            </button>
          </Link>
          <div className="d-flex mx-4 justify-content-between">
            <p>
              {username === null ? (
                <nav>
                  <ul className="d-flex">
                    <li onClick={() => handletoggle()} className="btn">
                      {darkmode ? <LightModeIcon /> : <DarkModeIcon />}
                    </li>
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
                    <li onClick={() => handletoggle()} className="btn">
                      {darkmode ? <LightModeIcon /> : <DarkModeIcon />}
                    </li>
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
