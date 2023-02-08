// Imports
import React from "react";
import axios from "axios";
import {
  Routes,
  cities,
  defaultParameters,
  getDateStr,
} from "../Utility/Utility";

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

const getTravelDates = async (
  firstDate,
  secondDate,
  originCity,
  destinationCity
) => {
  let params = new URLSearchParams();
  params.append("originCityId", originCity);
  params.append("destinationCityId", destinationCity);
  let data = {
    url: Routes.travelDates,
    method: "GET",
    body: {},
    headers: {},
  };
  let tempFirstDate = new Date(getDateStr(firstDate));
  let tempSecondDate = new Date(getDateStr(secondDate));
  let dates = await axios.post(Routes.proxy, data, { params });
  dates = dates.data.availableDates.filter((date) => {
    let d = new Date(date);
    return d >= tempFirstDate && d <= tempSecondDate;
  });

  
  return dates;
};

const getTickets = async (
  e,
  originCity,
  destinationCity,
  firstDate,
  secondDate,
  setJourneys
) => {
  e.preventDefault();

  let journeys = [];
  let dates = [];
  // if the user has selected multiple dates
  // we need to get all journeys between that range
  if (e.target[1].checked) {
    let allDates = await getTravelDates(
      firstDate,
      secondDate,
      originCity,
      destinationCity
    );
    dates = allDates;
  } else {
    dates.push(getDateStr(firstDate));
  }
  for(let date of dates) {
    let params = new URLSearchParams(defaultParameters);

    params.append("originId", originCity);
    params.append("destinationId", destinationCity);
    params.append("departureDate", date);
    
    let data = {
      url: Routes.journeys,
      method: "GET",
      body: {},
      headers: {},
    };
    let res = await axios.post(Routes.proxy, data, { params });
    journeys.push(...res.data.journeys);
  }
  console.log(journeys);
  setJourneys(journeys);
};

const Scraper = () => {
  const [destinationCities, setDestinationCities] = useState([]);
  const [dateType, setDateType] = useState("single");
  const [firstDate, setFirstDate] = useState(new Date());
  const [secondDate, setSecondDate] = useState(new Date());
  const [originCity, setOriginCity] = useState(-1);
  const [destinationCity, setDestinationCity] = useState(-1);
  const [journeys, setJourneys] = useState(null);
  const originCities = [];
  for (let city in cities) {
    originCities.push({ value: cities[city], label: city });
  }
  let params = new URLSearchParams(defaultParameters);
  params.append("originId", "320");
  params.append("destinationId", "318");
  params.append("departureDate", "2023-02-03");
  
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
          <form
            onSubmit={(e) =>
              getTickets(e, originCity, destinationCity, firstDate, secondDate, setJourneys)
            }
          >
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
      {journeys ? ( 
      <div className="lower-scraper">
        <div className="instructions">
          <div className="instruction">

          Select the bus ticket to book your ride
          </div>
          <div className="instruction">
            Click the <span className="highlight">arrows</span> to sort your results
          </div>
        </div>
        <div className="table">
          <table>
            <tr className="header">
                <th>Date</th>
                <th>Bus Ticket</th>
                <th>From</th>
                <th>To</th>
                <th>Time</th>
                <th>Price</th>
            </tr>
            {

            }
            <tr>
              <td>mm/dd/yy</td>
              <td className="highlight">Brand of Bus (Link to ticket)</td>
              <td>From city, state</td>
              <td>To city, state</td>
              <td>00:00 AM/PM</td>
              <td className="highlight">$0.00</td>
            </tr>
          </table>        
        </div>
      </div>) : <></> }
    </div>
  );
};

export default Scraper;
