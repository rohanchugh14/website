// import React from 'react';
import "../CSS/App.css";
import { parseNum, randomEvent } from "../Utility/Utility";
import { Card } from "@themesberg/react-bootstrap";
import React, { useState } from "react";
import Qubit from "../Utility/Qubit";

function App() {
    const fr = new FileReader();
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const [valid, setValid] = useState(true);
    const [quantumState, setQuantumState] = useState("");
    const [qubit, setQubit] = useState(null);
    const [zeroCount, setZeroCount] = useState(-1);
    const [oneCount, setOneCount] = useState(-1);

    const fireShots = (e) => {
        e.preventDefault();
        let numShots = e.target[0].value;
        let zeroCount = 0;
        let oneCount = 0;
        for (let i = 0; i < numShots; i++) {
            if (randomEvent(qubit.getProbability().realNum)) {
                zeroCount++;
            } else {
                oneCount++;
            }
        }
        setZeroCount(zeroCount);
        setOneCount(oneCount);
    };
    const onChange = (e) => {
        //only set the file if the file is not null
        if (e.target.files[0]) {
            const rawFile = e.target.files[0];
            const name = rawFile.name;
            setFileName(name);
            const extension = name.split(".").pop().toLowerCase();
            if (extension === "qasm") {
                setValid(true);
                //make sure file extension is QASM
                fr.readAsText(e.target.files[0]);
                fr.onloadend = () => {
                    //separate the file into each line, removing any blank lines
                    const lines = fr.result
                        .split("\n")
                        .filter((line) => line.length > 0);
                    if (lines[0] !== "OPENQASM 2.0;") {
                        setValid(false);
                        return;
                    }
                    setZeroCount(-1);
                    setOneCount(-1);
                    setFile(lines);
                    initialize(lines);
                };
            } else {
                setValid(false);
            }
        } else {
            setFile(null);
        }
    };

    const initialize = (lines) => {
        let currIndex = 0;

        while (!lines[currIndex].includes("qreg")) {
            currIndex++;
        }
        let numQubits = parseNum(lines[currIndex]);
        currIndex++;
        let qubits = [];
        for (let i = 0; i < numQubits; i++) {
            let qubit = new Qubit();
            qubits.push(qubit);
        }

        while (lines[currIndex]) {
            qubits[0].applyGate(lines[currIndex]);
            currIndex++;
        }
        setQubit(qubits[0]);
        setQuantumState(qubits[0].toString());
    };

  return (
    <div>
      <Card border="light" className="bg-white shadow-sm mb-4">
        <Card.Body>
          <div className="center-text mb-2">
            <h1>Quantum Simulator</h1>

            {
              //create a file input that sets file to be the file that was uploaded
            }
            <input type="file" onChange={onChange} />
            <br />
          </div>
          {!valid ? (
            <span className="error">
              Only QASM files are accepted. Please try again.
            </span>
          ) : null}
          {valid && file ? (
            <div>
              <div className="center-text mb-1">
                <h2>Quantum State: {quantumState}</h2>
              </div>
              <div className="center-text mb-2">
                <br />
                <h2>Enter number of shots to fire: </h2>
                <form onSubmit={fireShots}>
                  <input type="number" min="1" />
                  <button type="submit">Fire</button>
                </form>
                {zeroCount === -1 ? (
                  <></>
                ) : (
                  <div>
                    <h3>Zero Count: {zeroCount}</h3>
                    <h3>One Count: {oneCount}</h3>
                  </div>
                )}
              </div>

              <h3>{fileName + ":"}</h3>
              <code className="left-align-text" id="code-snippet">
                {file.map((element, index) => (
                  <React.Fragment key={index}>
                    <br />
                    {element}
                  </React.Fragment>
                ))}
              </code>
            </div>
          ) : (
            <></>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default App;
