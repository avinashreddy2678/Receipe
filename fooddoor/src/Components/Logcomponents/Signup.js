import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  let navigate = useNavigate();
  const hanldelogin=()=>{
    navigate("/user/login")
  }
  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4001/user/signup", {
        username: name,
        email: email,
        password: password,
      });
     // console.log(response);
      alert(response.data.message);
      if (response.status === 200) {
        navigate("/user/login");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An error occurred during signup");
    }
  };

  return (
    <>
      <section className="background d-flex justify-content-center">
        <form
          className="rounded-4 col-md-6 col-lg-4 h-75 col-8 py-4 m-auto bg-white"
          onSubmit={handlesubmit}
        >
          <div className="title">
            <h1 className="d-flex justify-content-center align-items-center my-5">
              Welcome
            </h1>
          </div>

          <div class="col-8 m-3 border-none">
            <input
              type="text"
              placeholder="Name"
              required
              className="form-control border-0 mx-5 outline-0 border-bottom shadow-none"
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
          </div>

          <div class="col-8 m-3">
            <input
              type="email"
              placeholder="Email address"
              className="form-control border-0 mx-5 outline-0 border-bottom shadow-none"
              required
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
          </div>

          <div class="col-8 m-3">
            <input
              type="password"
              placeholder="Password"
              className="form-control border-0 mx-5 outline-0 border-bottom shadow-none"
              required
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />
          </div>
            
          <div className="submit-btn mx-5">
            <button type="submit" className="w-50 btn btn-primary mt-5 mx-5">
              Submit
            </button>
          </div>
          <div className="col-12 m-3">
              <p className="mx-5 mt-5 ">Already a Memeber ? <span><button className="btn btn-link text-underline-none" onClick={hanldelogin}>Login</button></span></p>
            </div>
        </form>
      </section>
    </>
  );
}

export default Signup;
