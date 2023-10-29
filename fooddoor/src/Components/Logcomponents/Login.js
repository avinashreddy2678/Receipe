import axios from "axios";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { baseurl } from "../../helper";
function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [, Setcookie] = useCookies(["access_token"]);
  let navigate = useNavigate();
  const hanldesignup=()=>{
    navigate("/user/signup")
  }
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseurl}/user/login`, {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        Setcookie("access_token", response.data.token);
        window.localStorage.setItem("name", response.data.name);
        window.localStorage.setItem("userid", response.data.Userid);
        navigate("/");
      } else {
        return navigate("/user/signup");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className=" logbg  vh-100 d-flex justify-content-center">
      <form
        className="col-md-6 rounded-4 col-lg-4 h-75 col-8 py-4 m-auto bg-light"
        onSubmit={handlesubmit}
      >
        <div className="d-flex justify-content-center align-items-center my-5">
          <h1>Welcome BAck,</h1>
        </div>

        <div class="col-8 m-3">
          <input
            type="email"
            placeholder="Email address"
            className="form-control border-0 mx-5 outline-0 border-bottom shadow-none"
            onChange={(e) => {
              setemail(e.target.value);
            }}
            name="email"
            autocomplete="off"
          />
        </div>

        <div class="col-8 m-3">
          <input
            type="password"
            placeholder="Password"
            className="form-control border-0 mx-5 outline-0 border-bottom shadow-none"
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            name="password"
          />
        </div>
        <div className="col-12 mx-5">
          <button type="submit" className=" w-50 btn btn-primary mt-5 mx-5">
            Log in
          </button>
        </div>
        <div className="col-12 m-3">
              <p className="mx-5 mt-5 ">Not a Member ? <span><button className="btn btn-link text-underline-none" onClick={hanldesignup}>signup</button></span></p>
            </div>
      </form>
    </section>
  );
}

export default Login;
