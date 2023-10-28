import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import { InfinitySpin } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Components/Homecomponents/Card";
import { fetchdata } from "../Store/CardSlice";
import MediaCard from "../Components/Homecomponents/MCard";
import Sidebar from "../Components/Sidebar";
const Savedrecepies = () => {
  const [cookies] = useCookies(["access_token"]);
  const [data, setdata] = useState([]);
  const userid = window.localStorage.getItem("userid");
  const name = localStorage.getItem("name");
  const [loading, setloading] = useState(true);
  let navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchdata());
  }, [dispatch]);
  const selector = useSelector((state) => state.Card);
  useEffect(() => {
    if (selector.data.data !== undefined) setdata(selector.data.data.Saved);
    setloading(false);
  }, [selector]);
  // useEffect(() => {
  //   try {
  //     const fetchdata = async () => {
  //       const response = await axios.get(
  //         `http://localhost:4001/saved/${userid}`,
  //         {
  //           headers: {
  //             authorization: cookies.access_token,
  //           },
  //         }
  //       );
  //         setloading(false)
  //       if (response) {
  //         setdata(response.data.saved);
  //       }
  //       else{
  //         navigate("/user/login")
  //       }
  //     };
  //     fetchdata();
  //   } catch (error) {
  //     navigate("/user/login")
  //     console.log(error);
  //   }
  // }, []);
  return (
    <div>
      <Navbar />
      <Sidebar/>
      <div className="page d-flex flex-col justify-center mt-5">
        <h1>{name}'s Saved</h1>
        {loading ? (
          <InfinitySpin width="200" color="#4fa94d" />
        ) : data.length > 0 ? (
          <div className="d-flex flex-wrap mx-5">
            {data.map((item) => {
              // const isLiked = item.Liked.includes(userid);
              const isSaved = item.Saved.includes(userid);

              return (
                <div className="mx-5">
                  <Card key={item.id} item={item} liked={""} saved={!isSaved} />
                </div>
              );
            })}
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

export default Savedrecepies;

// useEffect(() => {
//   try {
//     const fetchdata = async () => {
//       const response = await axios.get(
//         `http://localhost:4001/saved/${userid}`,
//         {
//           headers: {
//             authorization: cookies.access_token,
//           },
//         }
//       );
//         setloading(false)
//       if (response) {
//         setdata(response.data.saved);
//       }
//       else{
//         navigate("/user/login")
//       }
//     };
//     fetchdata();
//   } catch (error) {
//     navigate("/user/login")
//     console.log(error);
//   }
// }, []);
