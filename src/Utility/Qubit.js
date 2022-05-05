
import Vector from "../Internal Structure/Vector";
import Matrix from "../Internal Structure/Matrix";
import ComplexNumber from "../Internal Structure/ComplexNumber";
import { getGate, getUnitaryParameters } from "./Utility";
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
const T = new Matrix(new Vector(new ComplexNumber(1, 0), new ComplexNumber(0, 0)), new Vector(new ComplexNumber(0, 0), new ComplexNumber(Math.cos(Math.PI/4), Math.sin(Math.PI/4))));
const T_DAG = new Matrix(new Vector(new ComplexNumber(1, 0), new ComplexNumber(0, 0)), new Vector(new ComplexNumber(0, 0), new ComplexNumber(Math.cos(-Math.PI/4), Math.sin(-Math.PI/4))));
const GATE_DICT = {
    "H": H,
    "X": X,
    "Y": Y,
    "Z": Z,
    "I": I,
    "P_0": P_0,
    "P_1": P_1,
    "S": S,
    "SDG": S_DAG,
    "T": T,
    "TDG": T_DAG
}
/**
 * A Qubit class that is built on top of the vector class.
 * It uses the vector class as the internal representation of the qubit,
 * adding a few useful methods. Mostly used for display
 */
class Qubit extends Vector {
    //creates a new Qubit, defaulting to |0> or the horizontal state.
    constructor() {
        super(new ComplexNumber(1,0), new ComplexNumber(0,0));
    }

    applyGate(line) {
        let gate = getGate(line);
        if (gate == null) return;
        let matrix;
        if(gate === "U") {
            let params = getUnitaryParameters(line);
            matrix = this.createUnitary(params[0], params[1], params[2]);
        } else {
            matrix = GATE_DICT[gate];
        }
        let result = matrix.multiply(this);
        this.horizontalComponent = result.components[0];
        this.verticalComponent = result.components[1];
        this.components = result.components;
    }

    //returns the probabilities of 0 and 1 for this qubit
    getProbability() {
        let probabilities = [];
        probabilities.push(this.horizontalComponent.getMagnitude());
        probabilities.push(this.verticalComponent.getMagnitude());
        return probabilities;
    }

    getAmplitude() {
        return this.components;
    }

    //utility method for getting the probabilities for each state of a tensor product
    static getProbabilities(tensorProduct) {
        let probabilities = [];
        tensorProduct.forEach(state => probabilities.push(state.getMagnitude()));
        return probabilities;
    }

    createUnitary(theta, phi, lambda) {
        //divide theta by 2 since all parameters use theta/2
        let cosTheta = new ComplexNumber(Math.cos(theta / 2.0), 0);
        let sinTheta = new ComplexNumber(Math.sin(theta / 2.0), 0);

        let leftHorizontal = cosTheta;
        let leftVertical = this.getExponentToI(phi).mul(sinTheta);
        //multiply by negative 1 at the end
        let rightHorizontal = this.getExponentToI(lambda).mul(sinTheta)
        .mul(new ComplexNumber(-1, 0));
        
        let rightVertical = this.getExponentToI(phi+lambda).mul(cosTheta);

        let leftVector = new Vector(leftHorizontal, leftVertical);
        let rightVector = new Vector(rightHorizontal, rightVertical);

        return new Matrix(leftVector, rightVector);

    }

    getExponentToI(angle) {
        let realComponent = Math.cos(angle);
        let imaginaryComponent = Math.sin(angle);
        return new ComplexNumber(realComponent, imaginaryComponent);
    }

    static getTensorProduct(qubits) {
        let result = qubits[0].components;
        for(let i = 1; i < qubits.length; i++) {
            let tempResult = [];
            let qubitToMultiply = qubits[i].components;
            for(let scalarIndex = 0; scalarIndex < 2; scalarIndex++) {
                for(let resIndex = 0; resIndex < result.length; resIndex++) {
                    tempResult.push(qubitToMultiply[scalarIndex].mul(result[resIndex]));
                }
            }
            result = tempResult;
        }
        return result;
    }
}

export default Qubit;