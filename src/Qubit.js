
import Vector from "./Vector";
import Matrix from "./Matrix";
import ComplexNumber from "./Number";
//class constants

//gates
const H = new Matrix(new Vector(new ComplexNumber(1/Math.sqrt(2), 0), new ComplexNumber(1/Math.sqrt(2), 0)), new Vector(new ComplexNumber(1/Math.sqrt(2), 0), new ComplexNumber(-1/Math.sqrt(2), 0)));
const X = new Matrix(new Vector(new ComplexNumber(0, 0), new ComplexNumber(1, 0)), new Vector(new ComplexNumber(1, 0), new ComplexNumber(0, 0)));
const Y = new Matrix(new Vector(new ComplexNumber(0, 0), new ComplexNumber(0, 1)), new Vector(new ComplexNumber(0, -1), new ComplexNumber(0, 0)));
const Z = new Matrix(new Vector(new ComplexNumber(1, 0), new ComplexNumber(0, 0)), new Vector(new ComplexNumber(0, 0), new ComplexNumber(-1, 0)));
const I = new Matrix(new Vector(new ComplexNumber(1, 0), new ComplexNumber(0, 0)), new Vector(new ComplexNumber(0, 0), new ComplexNumber(1, 0)));
const P_0 = new Matrix(new Vector(new ComplexNumber(1, 0), new ComplexNumber(0, 0)), new Vector(new ComplexNumber(0, 0), new ComplexNumber(0, 0)));
const P_1 = new Matrix(new Vector(new ComplexNumber(0, 0), new ComplexNumber(0, 0)), new Vector(new ComplexNumber(0, 0), new ComplexNumber(1, 0)));
const S = new Matrix(new Vector(new ComplexNumber(1, 0), new ComplexNumber(0, 0)), new Vector(new ComplexNumber(0, 0), new ComplexNumber(0, 1)));
const S_DAG = new Matrix(new Vector(new ComplexNumber(1, 0), new ComplexNumber(0, 0)), new Vector(new ComplexNumber(0, 0), new ComplexNumber(0, -1)));
const GATE_DICT = {
    "H": H,
    "X": X,
    "Y": Y,
    "Z": Z,
    "I": I,
    "P_0": P_0,
    "P_1": P_1,
    "S": S,
    "SDG": S_DAG
}
/**
 * A Qubit class that is built on top of the vector class.
 * It uses the vector class as the internal representation of the qubit,
 * adding a few useful methods. Mostly used for display
 */
class Qubit extends Vector {
    quantumState;


    applyGate(gate) {
        console.log("applying gate: " + gate);
        let result = GATE_DICT[gate.toUpperCase()].multiply(this);
        this.horizontalComponent = result.components[0];
        this.verticalComponent = result.components[1];
        this.components = result.components;
    }

    getProbability() {
        let probability = new Vector(this.horizontalComponent.getMagnitude(), this.verticalComponent.getMagnitude());
        return probability.horizontalComponent;
    }
}

export default Qubit;