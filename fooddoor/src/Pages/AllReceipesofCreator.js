import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Card from "../Components/Homecomponents/Card"
import { InfinitySpin } from  'react-loader-spinner'
const AllReceipesofCreator = () => {    const { id } = useParams();
  const [data, setdata] = useState([]);
  const [loading,setloading]=useState(true)
  useEffect(() => {
    const fetchdata = async () => {
      const response = await axios.get(`http://localhost:4001/allreceipes/${id}`);
      setdata(response.data.response);
      setloading(false);
    };
    fetchdata();
  }, []);
  return <div>
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
          <Card key={item.id}
          item={item} />
        ))
      ) : (
        <h2 className="vw-100 vh-100 d-flex justify-content-center align-items-center">
          No Saved Items
        </h2>
      )}
  </div>;
};

export default AllReceipesofCreator;
