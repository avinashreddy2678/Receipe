import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { InfinitySpin } from "react-loader-spinner";
import Sidebar from "../Components/Sidebar";
import { baseurl } from "../helper";

const Receipedetails = () => {
  const [loading,setloading]=useState(true);
  const { id } = useParams();
  const [data, setdata] = useState([]);
  const [cookies] = useCookies(["access_token"]);
  const navigate=useNavigate();
  useEffect(() => {
    const fetchdata = async () => {
      const response = await axios.get(`${baseurl}/receipe/${id}`, {
       
      });
      setdata(response.data.response);
      setloading(false)
    };
    fetchdata();
  }, []);
  const handlecreatorname = (id) => {
    navigate(`/allreceipes/${id}`)
  };
  return (
    <div>
      <Navbar />
      <Sidebar/>
      {
        loading ? <div className=" spin d-flex align-middle justify-center"><InfinitySpin/></div> :
      
      <div className="ReceipeBanner shadow-md border border-red-300">
        <div className="left">
          <div>
            <img src={data.imgurl} alt="" />
          </div>
          <div className="details d-flex align-middle justify-between">
            <h1 className="mt-3">{data.name}</h1>
            <h6 className="mt-4">{data.time} min</h6>
            <h6 className="mt-4">{data.type}</h6>
          </div>
          <div className="ingrediants mt-2">
            <p>
              <h5>Ingrediants = &#123;</h5>
              <ul className="d-flex">
                {data.ingrediants !== undefined
                  ? data.ingrediants.length > 0
                    ? data.ingrediants.map((item) => (
                        <li>
                          <h5>{item},</h5>
                        </li>
                      ))
                    : "No ingrediants required or may be forgotten "
                  : ""}
              </ul>
              <h4>&#125; ;</h4>
            </p>
          </div>
        </div>
        <div className="right flex-wrap">
          <h2>Description:</h2>
          <p className="text-lg pt-3 max-w-screen-sm"> {data.description}</p>
          <h4 onClick={() => handlecreatorname(data.creatorid)}>
            -{data.creatorname}
          </h4>
        </div>
      </div>
      }
    </div>
  );
};

export default Receipedetails;
