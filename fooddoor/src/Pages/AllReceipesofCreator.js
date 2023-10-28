import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar" 
import Card from "../Components/Homecomponents/Card"
import { InfinitySpin } from  'react-loader-spinner'
const AllReceipesofCreator = () => {    
  const { id } = useParams();
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
  return <div >
    <Navbar/>
    <Sidebar/>
    <div className="d-flex flex-col align-middle mt-5 justify-center">
    <div className="text-center">
  <h1>
    {data[0]!==undefined && data[0].creatorname !== undefined ? `${data[0].creatorname}'s Recipes` : "Recipes"}
  </h1>
</div>

    <div className="d-flex align-middle justify-center">
      {loading ? (
        <h2 className="vw-100 vh-100 d-flex justify-content-center align-items-center">
        <InfinitySpin 
                width='200'
                color="#4fa94d"
              />
      </h2>
      ) : data.length > 0 ? (
        data.map((item) => (
          <div className="mx-5">
          <Card key={item.id}
          item={item} />
          </div>
        ))
      ) : (
        <h2 className="vw-100 vh-100 d-flex justify-content-center align-items-center">
          No Saved Items
        </h2>
      )}</div>
       </div>
  </div>;
};

export default AllReceipesofCreator;
