const VALID_GATES = ["h", "x", "y", "z", "i", "p0", "p1", "s","u", "sdg"];
export const parseNum = (line) => {
    return parseInt(line.substring(7));
};

export const getGate = (line) => {
    let gate = line.substring(0, line.indexOf(" "));
    if(gate.charAt(0) === "u") {
        gate = "u";
    }
    if (VALID_GATES.includes(gate)) {
        return gate.toUpperCase();
    }
    return null;
};

export const randomEvent = (probability) => {
    return Math.random() < probability;
};

export const getUnitaryParameters = (line) => {
    let parameters = line.substring(2, line.indexOf("q") - 2).split(",");
    parameters = parameters.map((elem) => {
        let frac = elem.split("/");
        let numerator = isNaN(parseInt(frac[0])) ? Math.PI : parseInt(frac[0]) * (frac[0].includes("pi") ? Math.PI : 1);
        let denominator = isNaN(parseInt(frac[1]))
            ? Math.PI
            : parseInt(frac[1]) * (frac[1].includes("pi") ? Math.PI : 1);
        return numerator / denominator;
    });
    return parameters;
};
