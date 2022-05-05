// import React from 'react';
import "../CSS/App.css";
import {
  parseNum,
  getQubitNum,
} from "../Utility/Parser";
import { Card } from "@themesberg/react-bootstrap";
import React, { useState } from "react";
import Qubit from "../Utility/Qubit";
import Latex from "react-latex-next";

function App() {
  const fr = new FileReader();
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [valid, setValid] = useState(true);
  const [numQubits, setNumQubits] = useState(0);
  const [latexStrings, setLatexStrings] = useState([]);
  const [probs, setProbs] = useState([]);
  const [simpleView, setSimpleView] = useState(true);
  const [simpleQuantumState, setSimpleQuantumState] = useState("");
  const [expandedQuantumState, setExpandedQuantumState] = useState("");

  const fireShots = (e, nQubits, probabilities) => {
    e.preventDefault();
    let numShots = e.target[0].value;

    let counts = new Array(probabilities.length).fill(0);
    for (let i = 0; i < numShots; i++) {
      let index = Qubit.pickRandomEvent(probabilities);
      counts[index]++;
    }
    let latStrings = [];
    probabilities.forEach((prob, state) => {
      if (prob > 0)
        latStrings.push(
          "$|" +
            state.toString(2).padStart(nQubits, "0") +
            "\\rangle :" +
            counts[state].toString() +
            "$"
        );
    });
    setLatexStrings(latStrings);
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
          const lines = fr.result.split("\n").filter((line) => line.length > 0);
          if (lines[0] !== "OPENQASM 2.0;") {
            setValid(false);
            return;
          }
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
    let nQubits = parseNum(lines[currIndex]);
    setNumQubits(nQubits);
    currIndex++;
    let qubits = [];
    for (let i = 0; i < nQubits; i++) {
      let qubit = new Qubit();
      qubits.push(qubit);
    }
    qubits = prepareQubits(qubits, lines, currIndex);
    // while (lines[currIndex]) {
    //   if (
    //     lines[currIndex].includes("creg") ||
    //     lines[currIndex].includes("measure") ||
    //     lines[currIndex].includes("barrier")
    //   ) {
    //     currIndex++;
    //     continue;
    //   }
    //   let index = getQubitNum(lines[currIndex]);
    //   qubits[index].applyGate(lines[currIndex]);
    //   currIndex++;
    // }
    let [probabilities, sQState, eQState] = measureQubits(qubits, nQubits);
    setProbs(probabilities);
    setSimpleQuantumState(sQState);
    setExpandedQuantumState(eQState);
    // let amps = [];
    // let probabilities = [];
    // if (nQubits > 1) {
    //   amps = Qubit.getTensorProduct(qubits);

    //   probabilities = Qubit.getProbabilities(amps);
    //   setProbs(probabilities);
    // } else {
    //   amps = qubits[0].getAmplitude();
    //   probabilities = qubits[0].getProbability();
    //   setProbs(probabilities);
    // }
    // let expQuantState = "$[$";
    // let simpQuantState = "";
    // for (let i = 0; i < amps.length; i++) {
    //   if (probabilities[i] > 0) {
    //     simpQuantState +=
    //       "$" +
    //       (i !== 0 &&
    //       (amps[i].realComponent > 0 ||
    //         amps[i].imaginaryComponent > 0)
    //         ? "+$ $"
    //         : "") +
    //       (amps[i].realComponent !== 0 &&
    //       amps[i].imaginaryComponent !== 0
    //         ? "("
    //         : "") +
    //       amps[i] +
    //       (amps[i].realComponent !== 0 &&
    //       amps[i].imaginaryComponent !== 0
    //         ? ")"
    //         : "") +
    //       "|" +
    //       i.toString(2).padStart(nQubits, "0") +
    //       "\\rangle$ ";
    //   }
    //   expQuantState += "$" + amps[i] + (i < amps.length - 1 ? ",$ " : "]$");
    // }
    // setSimpleQuantumState(simpQuantState);
    // setExpandedQuantumState(expQuantState);
  };

  const prepareQubits = (qubits, lines, currIndex) => {
    while (lines[currIndex]) {
      if (
        lines[currIndex].includes("creg") ||
        lines[currIndex].includes("measure") ||
        lines[currIndex].includes("barrier")
      ) {
        currIndex++;
        continue;
      }
      let index = getQubitNum(lines[currIndex]);
      qubits[index].applyGate(lines[currIndex]);
      currIndex++;
    }
    return qubits;
  };

  const measureQubits = (qubits, nQubits) => {
    let amps = [];
    let probabilities = [];
    if (nQubits > 1) {
      amps = Qubit.getTensorProduct(qubits);

      probabilities = Qubit.getProbabilities(amps);
      setProbs(probabilities);
    } else {
      amps = qubits[0].getAmplitude();
      probabilities = qubits[0].getProbability();
      setProbs(probabilities);
    }
    let expQuantState = "$[$";
    let simpQuantState = "";
    for (let i = 0; i < amps.length; i++) {
      if (probabilities[i] > 0) {
        simpQuantState +=
          "$" +
          (i !== 0 &&
          (amps[i].realComponent > 0 ||
            amps[i].imaginaryComponent > 0)
            ? "+$ $"
            : "") +
          (amps[i].realComponent !== 0 &&
          amps[i].imaginaryComponent !== 0
            ? "("
            : "") +
          amps[i] +
          (amps[i].realComponent !== 0 &&
          amps[i].imaginaryComponent !== 0
            ? ")"
            : "") +
          "|" +
          i.toString(2).padStart(nQubits, "0") +
          "\\rangle$ ";
      }
      expQuantState += "$" + amps[i] + (i < amps.length - 1 ? ",$ " : "]$");
    }
    return [probabilities, simpQuantState, expQuantState];
  };
  return (
    <div>
      <Card border="light" className="bg-white shadow-sm mb-4">
        <Card.Body>
          <div className="center-text mb-2">
            <h1 className="mb-1">Quantum Simulator</h1>
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
                <h2>Quantum State:</h2>
                <h3>{simpleView ?
                  <Latex>{simpleQuantumState}</Latex> : <Latex>{expandedQuantumState}</Latex>
                }
                </h3>
                <button onClick={()=>setSimpleView(!simpleView)}>{simpleView ? "Expand" : "Simplify"}</button>
              </div>
              <div className="center-text mb-2">
                <br />
                <h2>Enter number of shots to fire: </h2>
                <form onSubmit={(e) => fireShots(e, numQubits, probs)}>
                  <input type="number" min="1" />
                  <button type="submit">Fire</button>
                </form>
                {latexStrings.length ? (
                  <div>
                    <h2>Counts:</h2>
                    {latexStrings ? (
                      latexStrings.map((el) => (
                        <h3>
                          <Latex>{el}</Latex>
                        </h3>
                      ))
                    ) : (
                      <div>Not loaded</div>
                    )}
                  </div>
                ) : (
                  <> </>
                )}
              </div>

              <h3>{fileName + ":"}</h3>
              <code className="left-align-text" id="code-snippet">
                {file.map((line, index) => (
                  <React.Fragment key={index}>
                    <br />
                    {line}
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
