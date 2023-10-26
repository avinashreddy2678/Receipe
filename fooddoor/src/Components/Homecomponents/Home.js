import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Navbar";
import Card from "./Card";
import Sidebar from "../Sidebar";
import { InfinitySpin } from  'react-loader-spinner'


function Home() {
  const [data, setdata] = useState([]);
  const [filterdata, setfilterdata] = useState([...data]);
  const [caterogry, setcategory] = useState("");
  const [Likes, setLikes] = useState("");
  const [searchword, setsearchword] = useState("");
  const [loading,setloading]=useState(true);
  const userid = window.localStorage.getItem("userid");
  const name = window.localStorage.getItem("name");
  const mode = JSON.parse(localStorage.getItem("toggler"));
  //fetching all the data
  useEffect(() => {
    try {
      const fetchdata = async () => {
        const response = await axios.get("http://localhost:4001");
        if (response) {
          setloading(false);
          setdata(response.data.response);
        }
      };

      fetchdata();
    } catch (error) {
      console.log(error);
    }
  }, []);
  // filterdata
  useEffect(() => {
    setfilterdata(data);
  }, [data]);

  const handlefilters = (e) => {
    e.preventDefault();
    const sortOrder = Likes === "more" ? 1 : -1; // 1 for ascending, -1 for descending

    // Sort the data array based on Likes in descending order
    const sortedData = [...data].sort((a, b) => {
      if (a.Liked.length < b.Liked.length) return 1 * sortOrder;
      if (a.Liked.length > b.Liked.length) return -1 * sortOrder;
      return 0;
    });
    // setfilterdata(sortedData);
    if (caterogry === "veg") {
      const filteredData = sortedData.filter((item) => item.type === "veg");
      setfilterdata(filteredData);
    } else if (caterogry === "nonveg") {
      const filteredData = sortedData.filter((item) => item.type === "nonveg");
      setfilterdata(filteredData);
    } else {
      setfilterdata(sortedData);
    }
  };
  const handleremovefilters = () => {
    setfilterdata(data);
    setLikes("");
    setcategory("");
  };
 useEffect(()=>{
  const filterindividual=data.filter((individual)=>{
    return individual.name.toLowerCase().includes(searchword.toLowerCase())
  })
  setfilterdata(filterindividual);
 },[searchword])
  return (
    <div className="home">
      <div className="banner z-index-2">
        <img
          className="top-0 left-0"
          src="https://images.pexels.com/photos/175753/pexels-photo-175753.jpeg?cs=srgb&dl=pexels-clem-onojeghuo-175753.jpg&fm=jpg"
          alt=""
        />
        <div className="title text-center">
          <h1>
            Hey..!{" "}
            <span onClick={""} className="text-gradient">
              {name}
            </span>{" "}
            <br /> Do something....
          </h1>
        </div>
      </div>
      <Navbar />

      <div className={`${!mode ? "homediv" : "darkModeAllcards"} d-flex`}>
        <Sidebar />
        <div className="title-box my-4">
          <div className="SecondpageTitle">
            <h1>Title</h1>
          </div>

          {/* search box */}
          <div className="search-box my-2">
            <input
              type="text"
              placeholder="Type to Search ...."
              className="mx-3"
              onChange={(e) => setsearchword(e.target.value)}
            />
           
          </div>

          {/* filters buttons */}
          <div className="filterbuttons d-flex">
            <div className="filters">
              <select
                name="likes"
                className="border-1 rounded-pill bg-transparent py-1 px-3 mx-2"
                id="likes"
                onChange={(e) => setLikes(e.target.value)}
              >
                <option value="less">Least-Liked</option>
                <option value="more">Most-Liked</option>
              </select>

              <select
                name="food-type"
                className="border-1 rounded-pill bg-transparent py-1 px-3 "
                id="food-type"
                onChange={(e) => setcategory(e.target.value)}
              >
                <option value="veg">Vegetarian</option>
                <option value="nonveg">Non-Vegetarian</option>
              </select>
            </div>
            <div className="filterbuttons">
              <button
                type="submit"
                className="btn btn-primary rounded-pill  mx-2 py-1 px-3"
                onClick={(e)=>handlefilters(e)}
              >
                Apply Filter
              </button>

              <button
                onClick={() => {
                  handleremovefilters();
                }}
                className="btn btn-danger rounded-pill  py-1 px-3"
                type="button"
              >
                Remove Filters
              </button>
            </div>
          </div>
        </div>

        <div className={`${"Allcards"} my-3`}>

            {
              loading ? (<InfinitySpin 
                width='200'
                color="#4fa94d"
              />):(filterdata.length >0 ?  filterdata.map((item) => {
                const isLiked = item.Liked.includes(userid);
                const isSaved = item.Saved.includes(userid);
                return (
                  <Card
                    key={item.id}
                    item={item}
                    liked={!isLiked}
                    saved={!isSaved}
                  />
                );
              }):(<h1>No Items</h1>))
            }

          
        </div>
      </div>
    </div>
  );
}

export default Home;