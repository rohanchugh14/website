import React from "react";
// import Navbar from "./Navbar";
import "../CSS/App.scss";
import Scraper from "./Scraper";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ReadyPlayerCreditRedirect from "./ReadyPlayerCreditRedirect";

const App = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Scraper />} />
        <Route path="/ready_player_credit" element={<ReadyPlayerCreditRedirect/>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App