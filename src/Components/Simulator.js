// import React from 'react';
import "../CSS/App.css";
import { onChange, fireShots } from "../Utility/Runner";
import { Card } from "@themesberg/react-bootstrap";
import React, { useState } from "react";
import Latex from "react-latex-next";

const Simulator = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [valid, setValid] = useState(true);
  const [numQubits, setNumQubits] = useState(0);
  const [latexStrings, setLatexStrings] = useState([]);
  const [probs, setProbs] = useState([]);
  const [simpleView, setSimpleView] = useState(true);
  const [simpleQuantumState, setSimpleQuantumState] = useState("");
  const [expandedQuantumState, setExpandedQuantumState] = useState("");

  
  
  
  return (
    <div>
      <Card border="light" className="bg-white shadow-sm mb-4">
        <Card.Body>
          <div className="center-text mb-2">
            <h1 className="mb-1">Quantum Simulator</h1>
            <input type="file" onChange={(e) => onChange(e, setFile, setFileName, setValid, setProbs, setSimpleQuantumState, setExpandedQuantumState, setNumQubits)} />
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
                <form onSubmit={(e) => fireShots(e, numQubits, probs, setLatexStrings)}>
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

export default Simulator;
