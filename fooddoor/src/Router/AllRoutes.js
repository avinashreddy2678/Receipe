import React from "react";
import { Route, Routes } from "react-router-dom";

import Signup from "../Components/Logcomponents/Signup";
import Login from "../Components/Logcomponents/Login";
import CreateRecepie from "../Pages/CreateRecepie";
import Home from "../Components/Homecomponents/Home";
import Savedrecepies from "../Pages/Savedrecepies";
import Likedreceipes from "../Pages/Likedreceipes";
import Myreceipes from "../Pages/Myreceipes";
import Receipedetails from "../Pages/Receipedetails";
import AllReceipesofCreator from "../Pages/AllReceipesofCreator";

function AllRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create/:userid" element={<CreateRecepie />} />
        <Route path="/saved/:userid" element={<Savedrecepies />} />
        <Route path="/liked/:userid" element={<Likedreceipes />} />
        <Route path="/myrecepies/:userid" element={<Myreceipes />} />
        <Route path="/user/signup" element={<Signup />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/receipe/:id" element={<Receipedetails />} />
        <Route path="/allreceipes/:id" element={<AllReceipesofCreator />} />
      </Routes>
    </>
  );
}

export default AllRoutes;
