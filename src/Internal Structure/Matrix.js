import Vector from "./Vector";
import ComplexNumber from "./ComplexNumber";
//each matrix is 2x2, represented internally as 2 column vectors
class Matrix extends Vector {
    //col vectors of matrix
    cols = new Array(2);
    leftCol;
    rightCol;
    constructor(leftCol, rightCol) {
        super();
        this.cols[0] = leftCol;
        this.cols[1] = rightCol;
        this.leftCol = leftCol;
        this.rightCol = rightCol;
    }

    //basis for applying a gate to a qubit, done by multiplying a matrix by a column vector
    multiply(vector) {
        let result = new Vector(new ComplexNumber(0, 0), new ComplexNumber(0, 0));
        for(let r = 0; r < 2; r++) {
            result.components[r] = this.leftCol.components[r]
            .mul(vector.horizontalComponent)
            .add(this.rightCol.components[r].mul(vector.verticalComponent));
        }   
        return result;
    }
    
    toString() {
        return "[" + this.leftCol.toString() + ", " + this.rightCol.toString() + "]";
    }


}

export default Matrix;