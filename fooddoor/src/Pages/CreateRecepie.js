import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import { baseurl } from "../helper";
const CreateRecepie = () => {
  const [recipe, setreceipe] = useState({
    name: "",
    type: "veg",
    imgurl: "",
    ingrediants: [],
    description: "",
    time: "",
  });
  const [cookies] = useCookies(["access_token"]);
  const userid = window.localStorage.getItem("userid");
  const creatorname = window.localStorage.getItem("name");
  // form submit
  const handlesubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      `${baseurl}/create/${userid}`,
      {
        name: recipe.name,
        type: recipe.type,
        imgurl: recipe.imgurl,
        ingrediants: recipe.ingrediants,
        description: recipe.description,
        time: recipe.time,
        creatorname: creatorname,
      },
      {
        headers: {
          authorization: cookies.access_token,
        },
      }
    );
    alert(response.data.message);
    navigate("/");
  };
  //on changes the values of input
  const handlechange = (e) => {
    const { name, value } = e.target;
    setreceipe({ ...recipe, [name]: value });
  };

  //add ingrediants
  const addingrediants = () => {
    setreceipe({ ...recipe, ingrediants: [...recipe.ingrediants, ""] });
  };

  const handleingrediantchange = (event, idx) => {
    const { value } = event.target;
    const Ingrediants = recipe.ingrediants;
    Ingrediants[idx] = value;
    setreceipe({ ...recipe, Ingrediants });
  };
  const ingrediantsdelete = (e, idx) => {
    const updatedIngrediants = [...recipe.ingrediants];
    updatedIngrediants.splice(idx, 1);
    setreceipe({ ...recipe, ingrediants: updatedIngrediants });
  };
  //navigae to home page
  let navigate = useNavigate();
  function handleclick() {
    navigate("/");
  }

  return (
    <div className="CreatePage">
      <Navbar />
      <Sidebar/>
      <button
        onClick={() => {
          handleclick();
        }}
        type="button"
      >
      </button>

      <form className="w-100" onSubmit={(e) => handlesubmit(e)}>
        <div className="container d-flex justify-content-between">
          <div className="leftCreateReceipe shadow-lg">
            <input
              type="text"
              placeholder="Enter Recepie Name"
              name="name"
              onChange={(event, idx) => handlechange(event, idx)}
              autoComplete="off"
              required
            />
            <br />
            <select
              name="type"
              id="type"
              onChange={handlechange}
              required
            >
              <option value="veg">Veg</option>
              <option value="nonveg">Non-veg</option>
            </select>
            {/* image */}
            <input
              type="text"
              placeholder="image url get it from google"
              name="imgurl"
              onChange={(event, idx) => handlechange(event, idx)}
              autoComplete="off"
            />
            <input
              type="text"
              name="time"
              placeholder="time takes"
              onChange={handlechange}
              required
              autoComplete="off"
            />
            <br />
          </div>

          <br />

          <div className="middleCreateRecepie shadow-lg">
            {recipe.ingrediants.map((ingrediant, idx) => {
              return (
                <>
                <div className="eachingrediant">
                  <input
                  className="border-1 bg-transparent"
                    key={idx}
                    required
                    type="text"
                    value={ingrediant}
                    onChange={(e) => handleingrediantchange(e, idx)}
                  />
                  <button
                  className="btn"
                    type="button"
                    onClick={(e) => ingrediantsdelete(e, idx)}
                  >
                    X
                  </button>
                  </div>
                </>
              );
            })}
            <button className="AddIngridants btn btn-light text-secondary ml-3 w-75 " type="button " onClick={addingrediants}>
              Click to Add ingreidatns
            </button>
          </div>

          <br />
          <div className="rightCreateRecepie shadow-lg">
            <textarea
              name="description"
              cols="45"
              rows="15"
              placeholder="Describe here"
              onChange={handlechange}
              required
            ></textarea>
          </div>

          <br />
        </div>
          <div className="recepiesubmitbtn">
        <button className="btn btn-primary my-3" type="submit">Add to view all</button>
        </div>
      </form>
    </div>
  );
};

export default CreateRecepie;
