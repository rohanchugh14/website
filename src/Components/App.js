import { Card } from "@themesberg/react-bootstrap";
import React, { useState } from "react";
import Navbar from "./Navbar";

const App = () => {
  return (
    <div>
      <Navbar />
        <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Body>
                <div className="center-text mb-2">
                    <h1 className="mb-1">Quantum Simulator</h1>
                </div>
            </Card.Body>
        </Card>
    </div>
  )
}

export default App