//a class built to handle complex numbers
class ComplexNumber {
    realNum;
    complexCoefficient;
    constructor(realNum, complexCoefficient) {
        //rounds to at most 3 decimals whenever number is created
        //avoids rounding errors
        this.realNum = parseFloat(realNum.toFixed(3));
        this.complexCoefficient = parseFloat(complexCoefficient.toFixed(3));
    }

    toString() {
        //takes absolute value of complex coefficient to ensure that string output will be
        // ... - complexCoefficient if negative or 0 + complexCoefficient if positive
        return (String(this.realNum) + (this.complexCoefficient < 0 ? " - " : " + ") + String(Math.abs(this.complexCoefficient)) + "i");
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
        return complexConjugate.mul(this);
    }

    //dividing complex numbers is not really necessary within the scope of this project,
    //as all it is useful for is finding the greatest common factor or simplifying
}
export default ComplexNumber;