import React from "react";
import Intro from "./Intro";
import "../../CSS/Home.scss";
import { Card } from "react-bootstrap";
const Home = () => {
  return (
    <>
    <Card>
      <Card.Body>
        <Card.Title><span className="title">Hello!</span></Card.Title>
        <Card.Text>
          Welcome to my website!
        </Card.Text>
      </Card.Body>
    </Card>
      <Intro />
    </>
  );
};

export default Home;
