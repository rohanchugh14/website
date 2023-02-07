// Imports
import React from "react";
import axios from "axios";
import { Routes, cities, defaultParameters } from "../Utility/Utility";

// Hooks
import { useState } from "react";

// Components
import DatePicker from "react-datepicker";
import Select from "react-select";

// CSS
import "react-datepicker/dist/react-datepicker.css";
import "../CSS/App.scss";

const getDestinationCities = (originId, setDestinationCities) => {
  let params = new URLSearchParams();
  params.append("originCityId", originId);
  let data = {
    url: Routes.destinationCities,
    method: "GET",
    body: {},
    headers: {},
  };
  axios.post(Routes.proxy, data, { params }).then((res) => {
    // get all destination cities and metadata
    let cities = res.data.cities;
    // remove origin city from list of destination cities,
    // and format for react select by mapping each city to just
    // the id and name as the value and label respectively
    cities = cities.reduce((destinations, city) => {
      if (city.id !== originId) {
        destinations.push({ value: city.id, label: city.name });
      }
      return destinations;
    }, []);
    setDestinationCities(cities);
  });
};

const getTravelDates = async (firstDate, secondDate, originCity, destinationCity) => {
  let params = new URLSearchParams();
  params.append("originCityId", originCity);
  params.append("destinationCityId", destinationCity);
  let data = {
    url: Routes.travelDates,
    method: "GET",
    body: {},
    headers: {},
  }
  let dates = await axios.post(Routes.proxy, data, { params })
  dates = dates.data.availableDates.filter(date=> {
    let d = new Date(date);
    // ensures that date comparisons are done in UTC since time is irrelevant
    d.setDate(d.getUTCDate());
   
    return d >= firstDate && d <= secondDate;
  });
  

  // let currentDate = new Date(firstDate);
  // while (currentDate <= secondDate) {
  //   dates.push(currentDate);
  //   currentDate = new Date(currentDate);
  //   currentDate.setDate(currentDate.getDate() + 1);
  // }
  return dates;
}

const getTickets = async (e, originCity, destinationCity, firstDate, secondDate) => {
  e.preventDefault();
  console.log("Getting tickets");
  let params = new URLSearchParams();
  for(let key in defaultParameters) {
    params.append(key, defaultParameters[key]);
  }
  params.append("originId", originCity);
  params.append("destinationId", destinationCity);
  // console.log(e.target[2]);
  // console.log(e.target[2].value);
  // console.log("origin City", originCity);
  // console.log("destination City", destinationCity);
  // console.log("first date", firstDate.toISOString());
  // console.log("second date", secondDate.toISOString());
  // console.log(e.target[3].value);
  let journeys = [];
  // if the user has selected multiple dates
  // we need to get all journeys between that range
  if(e.target[1].checked) {
    let dates = await getTravelDates(firstDate, secondDate, originCity, destinationCity);
    console.log(dates);

  }
  // params.append("originId", originId);
  // let 
  

};

const Scraper = () => {
  const [destinationCities, setDestinationCities] = useState([]);
  const [dateType, setDateType] = useState("single");
  const [firstDate, setFirstDate] = useState(new Date());
  const [secondDate, setSecondDate] = useState(new Date());
  const [originCity, setOriginCity] = useState(-1);
  const [destinationCity, setDestinationCity] = useState(-1);
  const originCities = [];
  for (let city in cities) {
    originCities.push({ value: cities[city], label: city });
  }

  let params = new URLSearchParams();

  params.append("originId", "320");
  params.append("destinationId", "318");
  params.append("departureDate", "2023-02-03");
  params.append("totalPassengers", "1");
  params.append("concessionCount", "0");
  params.append("nusCount", "0");
  params.append("otherDisabilityCount", "0");
  params.append("wheelchairSeated", "0");
  params.append("pcaCount", "0");
  params.append("days", "1");
  let data = {
    url: Routes.journeys,
    method: "GET",
    body: {},
    headers: {},
  };
  axios
    .post(Routes.proxy, data, { params })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });

  return (
    <div>
      <div className="upper-scraper">
        <div className="label">
          Enter the information below to find the cheapest bus ticket
        </div>
        <div className="form">
          <form onSubmit={(e) => getTickets(e, originCity, destinationCity, firstDate, secondDate)}>
            <div className="top-layer">
              <div className="label">Lets Go</div>
              <div
                className="radio-buttons"
                onChange={(e) => setDateType(e.target.value)}
              >
                <input
                  type="radio"
                  name="date-type"
                  id="single"
                  value="single"
                  defaultChecked
                  required
                />
                <label htmlFor="single">Single Date</label>
                <input type="radio" name="date-type" id="range" value="range" />
                <label htmlFor="range">Range of Dates</label>
              </div>
            </div>
            <div className="main">
              <div className="field">
                <div>
                  <label htmlFor="origin">From</label>
                </div>
                <div>
                  <Select
                    className="select"
                    classNamePrefix={"select"}
                    isSearchable
                    options={originCities}
                    required
                    unstyled
                    onChange={(opt) => {
                      setOriginCity(opt.value);
                      getDestinationCities(opt.value, setDestinationCities);
                    }}
                    components={{ DropdownIndicator: () => null }}
                  />
                </div>
              </div>
              <div className="field">
                <div>
                  <label htmlFor="destination">To</label>
                </div>
                <div>
                  <Select
                    // signal to re-render when origin city changes and deselect
                    // destination city
                    key={originCity}
                    className="select"
                    classNamePrefix={"select"}
                    isSearchable
                    onChange={(opt) => {
                      setDestinationCity(opt.value);
                    }}
                    noOptionsMessage={
                      destinationCities.length
                        ? () => "No cities found"
                        : () => "Select a city to leave from first."
                    }
                    options={destinationCities}
                    defaultValue={null}
                    clearVal
                    required
                    placeholder="Enter a city..."
                    unstyled
                    components={{ DropdownIndicator: () => null }}
                  />
                </div>
              </div>
              <div className="field date" key={dateType}>
                <div>
                  <label htmlFor="firstDate">
                    {dateType === "single" ? "Date" : "Start Date"}
                  </label>
                </div>
                <div>
                  <DatePicker
                    selected={firstDate}
                    onChange={(date) => setFirstDate(date)}
                    id="firstDate"
                    required
                  />
                </div>
                
              </div>
              {dateType === "range" ? (
                <div id="optionalSecondDate" className="field date">
                  <div>
                    <label htmlFor="secondDate">End Date</label>
                  </div>
                  <div>
                    <DatePicker
                      selected={secondDate}
                      onChange={(date) => setSecondDate(date)}
                      id="secondDate"
                      required
                    />
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="submit">
              <button className="sub" type="submit">
                Find My Tickets
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Scraper;
