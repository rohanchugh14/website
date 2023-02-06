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

const Scraper = () => {
  const [dateValue, setDateValue] = useState("single");
  const [firstDate, setFirstDate] = useState(new Date());
  const [secondDate, setSecondDate] = useState(new Date());
  const options = [];
  for (let city in cities) {
    options.push({ value: cities[city], label: city });
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
          <form>
            <div className="top-layer">
              <div className="label">Lets Go</div>
              <div
                className="radio-buttons"
                onChange={(e) => setDateValue(e.target.value)}
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
                  options={options}
                  required 
                  unstyled
                  />
                  {/* <input
                    type="search"
                    id="origin"
                    name="origin"
                    placeholder="Enter a city"
                    required
                  /> */}
                </div>
              </div>
              <div className="field">
                <div>
                  <label htmlFor="destination">To</label>
                </div>
                <div>
                <Select
                  className="select"
                  classNamePrefix={"select"}
                  isSearchable
                  noOptionsMessage={() => {return "Select a city to leave from first."}}
                  options={[]} 
                  required 
                  unstyled/>
                </div>
              </div>
              <div className="field date" key={dateValue}>
                <div>
                  <label htmlFor="firstDate">
                    {dateValue === "single" ? "Date" : "Start Date"}
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
              {dateValue === "range" ? (
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
      {/* <Card border="light" className="bg-white shadow-sm mb-4">
                <Card.Body>
                    <div className="center-text mb-2">
                        <h1 className="mb-1">Ticket Scraper</h1>
                    </div>
                </Card.Body>
            </Card> */}
    </div>
  );
};

export default Scraper;
