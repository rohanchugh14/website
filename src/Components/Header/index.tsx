import React from "react";
import CustomNavbar from "./CustomNavbar";
import UpperHeader from "./UpperHeader";
import "../../CSS/Header.scss";
const Header = () => {
  return (
    <div className="header">
      <UpperHeader />
      <CustomNavbar />
    </div>
  );
};

export default Header;
