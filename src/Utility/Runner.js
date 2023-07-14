import {
    getNumQubits,
    getQubitNum,
  } from "../Utility/Parser";
import Qubit from "./Qubit";

export const onChange = (e, setFile, setFileName, setValid, setProbabilities, setSimpleQuantumState, setExpandedQuantumState, setNumQubits) => {
    //only set the file if the file is not null
    const fr = new FileReader();

    if (e.target.files[0]) {
      const rawFile = e.target.files[0];
      const name = rawFile.name;
      console.log(name);
      setFileName(name);
      const extension = name.split(".").pop().toLowerCase();
      console.log(extension);
      if (extension === "qasm") {
        setValid(true);
        //make sure file extension is QASM
        fr.readAsText(e.target.files[0]);
        fr.onloadend = () => {
          //separate the file into each line, removing any blank lines
          const lines = fr.result.split("\n").filter((line) => line.trim().length > 0);
          if (lines[0].trim() !== "OPENQASM 2.0;") {
            setValid(false);
            return;
          }
          setFile(lines);
          run(lines, setProbabilities, setSimpleQuantumState, setExpandedQuantumState, setNumQubits);
        };
      } else {
        setValid(false);
      }
    } else {
      console.log("file is null");
      setFile(null);
    }
  };
  const run = (lines, setProbabilities, setSimpleQuantumState, setExpandedQuantumState, setNumQubits) => {
    let [qubits, numQubits, currIndex] = initialize(lines);
    console.log(qubits, numQubits, currIndex);
    setNumQubits(numQubits);
    qubits = prepareQubits(qubits, lines, currIndex);
    let [probabilities, sQState, eQState] = measureQubits(qubits, numQubits);
    setProbabilities(probabilities);
    setSimpleQuantumState(sQState);
    setExpandedQuantumState(eQState);
  }
  const initialize = (lines) => {
    
    let [numQubits, currIndex] = getNumQubits(lines);
    let qubits = [];
    for (let i = 0; i < numQubits; i++) {
      let qubit = new Qubit();
      qubits.push(qubit);
    }
    return [qubits, numQubits, currIndex];
    
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
      console.log(index);
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
    } else {
      amps = qubits[0].getAmplitude();
      probabilities = qubits[0].getProbability();
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

  export const fireShots = (e, numQubits, probabilities, setLatexStrings) => {
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
            state.toString(2).padStart(numQubits, "0") +
            "\\rangle :" +
            counts[state].toString() +
            "$"
        );
    });
    setLatexStrings(latStrings);
  };