import React from "react";
import { Button, Image } from "react-bootstrap";
import "../../CSS/Logos.scss";
const Logos = () => {
  return (
    <div>
      <Button
        as="a"
        href="https://www.google.com/"
        target="_blank"
        variant="link"
        rel="noopener noreferrer"
      >
        <Image
          src="/img/email-logo.svg"
          style={{marginTop: "1vw" }}
        />
      </Button>
      <Button
        as="a"
        href="https://www.google.com/"
        target="_blank"
        variant="link"
        rel="noopener noreferrer"
      >
        <Image
          src="/img/github-logo.svg"
          style={{marginTop: "1vw" }}
        />
      </Button>
      <Button
        as="a"
        href="https://www.google.com/"
        target="_blank"
        variant="link"
        rel="noopener noreferrer"
      >
        <Image
          src="/img/linkedin-logo.svg"
          style={{marginTop: "1vw" }}
        />
      </Button>
    </div>
  );
};

export default Logos;
