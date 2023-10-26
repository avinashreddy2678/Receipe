import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";

const Receipedetails = () => {
  const { id } = useParams();
  const [data, setdata] = useState([]);
  const [cookies] = useCookies(["access_token"]);
  const navigate=useNavigate();
  useEffect(() => {
    const fetchdata = async () => {
      const response = await axios.get(`http://localhost:4001/receipe/${id}`, {
        headers: {
          authorization: cookies.access_token,
        },
      });
      setdata(response.data.response);
    };
    fetchdata();
  }, []);
  const handlecreatorname = (id) => {
    navigate(`/allreceipes/${id}`)
  };
  return (
    <div>
      <Navbar />
      <div className="ReceipeBanner w-75 d-flex flex-col  border border-red-300">
        <div className="left">
          <div>
            <img src={data.imgurl} alt="" />
          </div>
          <div className="details d-flex w-100 justify-center">
            <h1>{data.name}</h1>
            <h6>{data.time} min</h6>
            <h6>{data.type}</h6>
          </div>
          <div className="ingrediants">
            <p>
              <h4>Ingrediants = &#123;</h4>
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
          <p className="text-lg"> {data.description}</p>
          <h4 onClick={() => handlecreatorname(data.creatorid)}>
            -{data.creatorname}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Receipedetails;
