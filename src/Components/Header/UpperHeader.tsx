import React from "react";
import Logos from "./Logos";
import Image from "react-bootstrap/Image";
import "../../CSS/UpperHeader.scss";

const UpperHeader = () => {
  return (
    <div className="upper-header">
      <Logos className="side" />
      <Image src="/img/rohan-chugh-logo.svg" />
      <div className="side rc-logo-container">
        <Image src="/img/rc-logo.svg" className="rc-logo" />
      </div>
    </div>
  );
};

export default UpperHeader;
