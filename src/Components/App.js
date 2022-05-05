// import React from 'react';
import "../CSS/App.css";
import {
    parseNum,
    randomEvent,
    getQubitNum,
    pickRandomEvent,
} from "../Utility/Utility";
import { Card } from "@themesberg/react-bootstrap";
import React, { useState } from "react";
import Qubit from "../Utility/Qubit";
import Latex from "react-latex-next";

function App() {
    const fr = new FileReader();
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const [valid, setValid] = useState(true);
    const [quantumState, setQuantumState] = useState("");
    const [tensorProduct, setTensorProduct] = useState([]);
    const [counts, setCounts] = useState([]);
    const [numQubits, setNumQubits] = useState(0);
    const [latexStrings, setLatexStrings] = useState([]);
    const [probs, setProbs] = useState([]);

    const fireShots = (e, nQubits, probabilities) => {
        e.preventDefault();
        let numShots = e.target[0].value;

        let counts = new Array(probabilities.length).fill(0);
        for (let i = 0; i < numShots; i++) {
            let index = pickRandomEvent(probabilities);
            counts[index]++;
        }
        let latStrings = [];
        probabilities.forEach((prob, state) => {
            if (prob > 0)
                latStrings.push("$|" + state.toString(2).padStart(nQubits, "0") +
                        "\\rangle :" + counts[state].toString() + "$");
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
                    const lines = fr.result
                        .split("\n")
                        .filter((line) => line.length > 0);
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
        console.log("all 0 qubits", qubits);
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
            console.log("currLine", lines[currIndex]);
            console.log("index", index);
            qubits[index].applyGate(lines[currIndex]);
            currIndex++;
        }
        console.log("numQubits", nQubits);
        let amplitudes = [];
        let probabilities = [];
        if (nQubits > 1) {
            console.log(qubits);
            amplitudes = Qubit.getTensorProduct(qubits);
            let qStates = [];

            console.log(amplitudes);
            probabilities = Qubit.getProbabilities(amplitudes);
            console.log(probabilities);
            setProbs(probabilities);
        } else {
            amplitudes = qubits[0].getAmplitude();
            probabilities = qubits[0].getProbability();
            setProbs(probabilities);
        }
        let quantState = "";
        console.log("amplitudes", amplitudes);
        for(let i = 0; i < amplitudes.length; i++) {
          if(probabilities[i] > 0) {
            quantState += "$" + (i != 0 && (amplitudes[i].realComponent > 0 || amplitudes[i].imaginaryComponent > 0) ? "+$ $" : "") + amplitudes[i] + "|" + i.toString(2).padStart(nQubits, "0") + "\\rangle$ ";

          }
        }
        setQuantumState(quantState);

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
            console.log("currLine", lines[currIndex]);
            console.log("index", index);
            qubits[index].applyGate(lines[currIndex]);
            currIndex++;
        }
        return qubits;
    };

    const measureQubits = (qubits, nQubits) => {
        if (nQubits > 1) {
            let tP = Qubit.getTensorProduct(qubits);
            console.log(tP);
            let probabilities = Qubit.getProbabilities(tP);
        }
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
                                <h3><Latex>{quantumState}</Latex></h3>
                            </div>
                            <div className="center-text mb-2">
                                <br />
                                <h2>Enter number of shots to fire: </h2>
                                <form onSubmit={(e) => fireShots(e, numQubits, probs)}>
                                    <input type="number" min="1" />
                                    <button type="submit">Fire</button>
                                </form>
                                {latexStrings.length ?(
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
                                ) : <>  </>}
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
