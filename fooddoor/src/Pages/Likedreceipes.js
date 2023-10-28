import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Navbar from "../Components/Navbar";
import { InfinitySpin } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Components/Homecomponents/Card";
import { fetchdata } from "../Store/CardSlice";
import MediaCard from "../Components/Homecomponents/MCard";
import Sidebar from "../Components/Sidebar";
const Likedreceipes = () => {
  const [data, setdata] = useState([]);
  const [cookies] = useCookies(["access_token"]);
  const [loading, setloading] = useState(true);
  const name = localStorage.getItem("name");
  const userid = window.localStorage.getItem("userid");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchdata());
  }, [dispatch]);
  const selector = useSelector((state) => state.Card);
  useEffect(() => {
    if (selector.data.data !== undefined) setdata(selector.data.data.Liked);
    setloading(false);
  }, [selector]);

  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="page d-flex flex-col justify-center mt-5">
        <h1>
          {name}-{"'s  "} Liked
        </h1>
        {loading ? (
          <InfinitySpin width="200" color="#4fa94d" />
        ) : data.length > 0 ? (
          <div className="d-flex flex-wrap">
            {data.map((item) => {
              const isLiked = item.Liked.includes(userid);

              return (
                <div className="mx-3">
                  <Card key={item.id} item={item} liked={!isLiked} saved={""} />
                </div>
              );
            })}
          </div>
        ) : (
          <h1>No Items</h1>
        )}
      </div>
    </div>
  );
};

export default Likedreceipes;

//  // useEffect(()=>{
//     try {
//       const fetchdata=async()=>{
//         const response=await axios.get(`http://localhost:4001/liked/${userid}`,{
//               headers:{
//                 authorization:cookies.access_token,
//               }
//         });
//         setloading(false)
//         if(response){
//          setdata(response.data.Liked)
//         }
//       }
//       fetchdata();
//     } catch (error) {
//       console.log(error);
//     }
// },[])
