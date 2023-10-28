import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Navbar from "../Components/Navbar";
import { InfinitySpin } from "react-loader-spinner";
import MediaCard from "../Components/Homecomponents/MCard";
import Sidebar from "../Components/Sidebar";
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
        console.log(response)
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
      <Sidebar />
      <div className="page  mt-5">
        <h1>My Receipes</h1>
        {loading ? (
          <h2 className="vw-100 vh-100 d-flex justify-content-center align-items-center">
            <InfinitySpin width="200" color="#4fa94d" />
          </h2>
        ) : data!==null && data.length > 0 ? (
          <div className="d-flex flex-wrap">
            {data.map((item) => (
              <div key={item.id}>
                <MediaCard item={item} />
              </div>
            ))}
          </div>
        ) : (
          <h2 className="vw-100 vh-100 d-flex justify-content-center align-items-center">
            No Items
          </h2>
        )}
      </div>
    </div>
  );
};

export default Myreceipes;
