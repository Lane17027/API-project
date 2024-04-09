import Header from "./Header";
import Footer from "./Footer";
import Spots from "./Spots";
import SpotsDetails from "./SpotsDetails";
import '../App.css'
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import SearchSpotList from "./SearchSpotList";
import ShowAllPhoto from "./ShowAllPhoto";



export default function Main() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/spots/:id" element={<SpotsDetails />} />
        <Route path="/search" element={<SearchSpotList />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/show-all-photos/:id" element={<ShowAllPhoto/>} />
      </Routes>
      <Footer />
    </div>
  );
}
