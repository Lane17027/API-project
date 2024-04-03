import Header from "./Header";
import Footer from "./Footer";
import Spots from "./Spots";
import SpotsDetails from "./SpotsDetails";
import '../App.css'
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
export default function Main() {
  return (
    <div>
      <div>
      <Header />
      </div>

      <Routes>
        <Route path="/spots/:id" element={<SpotsDetails/>}/>
        <Route path="/" element={<HomePage/>}/>

        </Routes>

      <Footer /> 
    </div>
  );
}
