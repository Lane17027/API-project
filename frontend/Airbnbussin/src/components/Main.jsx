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
import CreateReview from "./CreateReview";

//Google-Maps api key: AIzaSyDjXjj_HGAQqvWGL-V6V9k-8l6aV-V48o8


export default function Main() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/spots/:id" element={<SpotsDetails />} />
        <Route path="/search" element={<SearchSpotList />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/show-all-photos/:id" element={<ShowAllPhoto/>} />
        <Route path="/create-review/:id" element={<CreateReview/>}/>
      </Routes>
      <Footer />
    </div>
  );
}
