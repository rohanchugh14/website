// Imports
import React from "react";
import axios from "axios";
import cities from "../Utility/Cities";

// Hooks
import { useState } from "react";
import { Routes } from "../Utility/Routes";

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

const getTickets = (e) => {
  e.preventDefault();
  console.log("Getting tickets");
  // console.log(e.target[1].value);
  for(let i = 0; i < e.target.length; i++) {
    console.log(e.target[i].value);
  }
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
          <form onSubmit={getTickets}>
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
