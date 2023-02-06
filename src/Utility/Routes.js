const CONSTANTS = {
    megabusAPI: "https://us.megabus.com/journey-planner/api",
    host: "http://localhost:3001",
}
const Routes = {
    journeys: CONSTANTS.megabusAPI + "/journeys",
    destinationCities: CONSTANTS.megabusAPI + "/destination-cities",
    proxy: CONSTANTS.host + "/proxy",
};

export { CONSTANTS, Routes };