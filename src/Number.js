//a class built to handle complex numbers
class ComplexNumber {
    realNum;
    complexCoefficient;
    constructor(realNum, complexCoefficient) {
        //rounds to at most 3 decimals whenever number is created
        //avoids rounding errors
        this.realNum = +(Math.round(realNum + "e+3") + "e-3");
        this.complexCoefficient = +(Math.round(complexCoefficient + "e+3") + "e-3");
    }

    toString() {
        return (String(this.realNum) + " + " + String(this.complexCoefficient) + "i");
    }

    add(num) {
        let newRealNum = this.realNum + num.realNum;
        let newComplexCoefficient = this.complexCoefficient + num.complexCoefficient;
        return new ComplexNumber(newRealNum, newComplexCoefficient);
    }

    sub(num) {
        let newRealNum = this.realNum - num.realNum;
        let newComplexCoefficient = this.complexCoefficient - num.complexCoefficient;
        return new ComplexNumber(newRealNum, newComplexCoefficient);
    }

    mul(num) {
        
        
        let newRealNum = this.realNum * num.realNum + this.complexCoefficient * num.complexCoefficient * -1 ;
        let newComplexCoefficient = (this.realNum* num.complexCoefficient) + (this.complexCoefficient * num.realNum);
        return new ComplexNumber(newRealNum, newComplexCoefficient);
    }

    complexConjugate() {
        return new ComplexNumber(this.realNum, this.complexCoefficient * -1);
    }

    getMagnitude() {
        let complexConjugate = this.complexConjugate();
        complexConjugate = complexConjugate.mul(this);
        return complexConjugate;
    }

    //dividing complex numbers is not really necessary within the scope of this project,
    //as all it is useful for is finding the greatest common factor or simplifying
}
export default ComplexNumber;