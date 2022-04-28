export const parseNum = (line) => {
    return parseInt(line.substring(7));
    
}

export const getGate = (line) => {
    let gate = line.substring(0, line.indexOf(" "));
    return gate;
}

export const randomEvent = (probability) => {
    return Math.random() < probability;
}