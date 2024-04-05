import Header from "./Header";
import Footer from "./Footer";
import Spots from "./Spots";
import SpotsDetails from "./SpotsDetails";
import '../App.css'
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import SearchSpotList from "./SearchSpotList";
// export default function Main() {
//   return (
//     <div>
//       <div>
//       <Header />
//       </div>

//       <Routes>
//         <Route path="/spots/:id" element={<SpotsDetails/>}/>
//         <Route path="/" element={<HomePage/>}/>

//         </Routes>

//       <Footer />
//     </div>
//   );
// }



export default function Main() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/spots/:id" element={<SpotsDetails />} />
        <Route path="/search" element={<SearchSpotList />} /> 
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Footer />
    </div>
  );
}
