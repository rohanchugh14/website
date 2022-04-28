//functions as class to store column vectors
class Vector {
    components = new Array(2);
    horizontalComponent;
    verticalComponent;
    constructor(horizontalComponent, verticalComponent) {
        if(arguments.length !== 0) {
        this.components[0] = horizontalComponent;
        this.components[1] = verticalComponent;
        this.horizontalComponent = horizontalComponent;
        this.verticalComponent = verticalComponent;
        }
    }
    toString() {
        
        return "[" + this.horizontalComponent.toString() + ", " + this.verticalComponent.toString() + "]";
    }
    
}

export default Vector;