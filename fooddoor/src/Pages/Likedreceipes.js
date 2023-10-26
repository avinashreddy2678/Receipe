import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import Navbar from '../Components/Navbar';
import { InfinitySpin } from  'react-loader-spinner'
const Likedreceipes = () => {
  const [data,setdata]=useState([]);
  const [cookies,]=useCookies(["access_token"]);
  const [loading, setloading] = useState(true);
  const userid=window.localStorage.getItem("userid");
  useEffect(()=>{
      try {
        const fetchdata=async()=>{
          const response=await axios.get(`http://localhost:4001/liked/${userid}`,{
                headers:{
                  authorization:cookies.access_token,
                }
          });
          setloading(false)
          if(response){
           setdata(response.data.Liked)
          }
        }
        fetchdata();
      } catch (error) {
        console.log(error);
      }
  },[])
  return (
    <div>
      <Navbar/>
        <h1>Liked recepies</h1>
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
  )
}

export default Likedreceipes
