//a class built to handle complex numbers
class ComplexNumber {
    realComponent;
    imaginaryComponent;
    constructor(realComponent, imaginaryComponent) {
        //rounds to at most 3 decimals whenever number is created
        //avoids rounding errors
        this.realComponent = parseFloat(realComponent.toFixed(3));
        this.imaginaryComponent = parseFloat(imaginaryComponent.toFixed(3));
    }

    toString() {
        //takes absolute value of complex coefficient to ensure that string output will be
        // ... - imaginaryComponent if negative or 0 + imaginaryComponent if positive
        let str = "";
        if(this.realComponent !== 0) {
            str += this.realComponent;
            if(this.imaginaryComponent !== 0) {
                str += this.imaginaryComponent > 0 ? " + " : " - ";
                str += Math.abs(this.imaginaryComponent) + "i";
            }
        } else if(this.imaginaryComponent !== 0) {
            str += this.imaginaryComponent + "i";
        } else {
            str = "0";
        }
        return str;

        // return (String(this.realComponent) + (this.imaginaryComponent < 0 ? " - " : " + ") + 
        // String(Math.abs(this.imaginaryComponent)) + "i");
    }

    add(num) {
        let newRealComponent = this.realComponent + num.realComponent;
        let newImaginaryComponent = this.imaginaryComponent + num.imaginaryComponent;
        return new ComplexNumber(newRealComponent, newImaginaryComponent);
    }

    sub(num) {
        let newRealComponent = this.realComponent - num.realComponent;
        let newImaginaryComponent = this.imaginaryComponent - num.newImaginaryComponent;
        return new ComplexNumber(newRealComponent, newImaginaryComponent);
    }

    mul(num) {
        
        
        let newRealComponent = this.realComponent * num.realComponent + this.imaginaryComponent * 
        num.imaginaryComponent * -1 ;

        let newImaginaryComponent = (this.realComponent* num.imaginaryComponent) + 
        (this.imaginaryComponent * num.realComponent);
        
        return new ComplexNumber(newRealComponent, newImaginaryComponent);
    }

    getComplexConjugate() {
        return new ComplexNumber(this.realComponent, this.imaginaryComponent * -1);
    }

    getMagnitude() {
        let complexConjugate = this.getComplexConjugate();
        return complexConjugate.mul(this).realComponent;
    }

    //dividing complex numbers is not really necessary within the scope of this project,
    //as all it is useful for is finding the greatest common factor or simplifying
}
export default ComplexNumber;