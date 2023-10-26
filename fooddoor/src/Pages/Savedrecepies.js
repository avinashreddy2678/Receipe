import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import { InfinitySpin } from  'react-loader-spinner'
const Savedrecepies = () => {
  const [cookies,] = useCookies(["access_token"]);
  const [data, setdata] = useState([]);
  let userid = window.localStorage.getItem("userid");
  const [loading, setloading] = useState(true);
  let navigate=useNavigate();
  useEffect(() => {
    try {
      const fetchdata = async () => {
        const response = await axios.get(
          `http://localhost:4001/saved/${userid}`,
          {
            headers: {
              authorization: cookies.access_token,
            },
          }
        );
          setloading(false)
        if (response) {
          setdata(response.data.saved);
        }
        else{
          navigate("/user/login")
        }
      };
      fetchdata();
    } catch (error) {
      navigate("/user/login")
      console.log(error);
    }
  }, []);
  return (
    <div>
      <Navbar/>
      {loading ? (
        <h2 className="vw-100 vh-100 d-flex justify-content-center align-items-center">
        <InfinitySpin 
                width='200'
                color="#4fa94d"
              />
      </h2>
      ) : data.length > 0 ? (
        data.map((item) => (
          <div key={item.id}>
            <h1>Name:</h1>
            {item.name}
          </div>
        ))
      ) : (
        <h2 className="vw-100 vh-100 d-flex justify-content-center align-items-center">
          No Saved Items
        </h2>
      )}
    </div>
  );
};

export default Savedrecepies;
