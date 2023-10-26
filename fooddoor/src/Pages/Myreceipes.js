import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Navbar from "../Components/Navbar";
import { InfinitySpin } from  'react-loader-spinner'
const Myreceipes = () => {
  const [data, setdata] = useState([]);
  const [cookies] = useCookies(["access_token"]);
  const [loading, setloading] = useState(true);
  const userid = window.localStorage.getItem("userid");
  useEffect(() => {
    try {
      const fetchdata = async () => {
        const response = await axios.get(
          `http://localhost:4001/myrecepies/${userid}`,
          {
            headers: {
              authorization: cookies.access_token,
            },
          }
        );
        if (response) {
          
          setdata(response.data.response);
          setloading(false);
        }
      };
      fetchdata();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div>
      <Navbar />
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
          No Liked Items
        </h2>
      )}
    </div>
  );
};

export default Myreceipes;
