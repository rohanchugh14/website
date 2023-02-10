// Imports
import React from "react";
import axios from "axios";
import {
  Routes,
  cities,
  defaultParameters,
  getDateStr,
} from "../Utility/Utility";
import sortingArrows from "../Static/sorting_arrows.png";

// Hooks
import { useState } from "react";

// Components
import DatePicker from "react-datepicker";
import ReactSelect from "react-select";

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
  console.log("getting destination cities");
  console.log("originId: " + originId);
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
  })
  .catch((err) => {
    console.log(err);
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
  setJourneys,
  setTableData,
  errors,
  setErrors
) => {
  console.log("testing get tickets");
  e.preventDefault();
  let errorsPresent = false;
  let currErrors = errors;
  if (originCity === -1) {
    currErrors = { ...currErrors, originCity: "Please select an origin city" };
    errorsPresent = true;
  }
  if (destinationCity === -1) {
    currErrors = {
      ...currErrors,
      destinationCity: "Please select a destination city",
    };
    errorsPresent = true;
  }
  if (!firstDate) {
    currErrors = { ...currErrors, firstDate: "Please select a date" };
    errorsPresent = true;
  }
  if (e.target[1].checked) {
    if (!secondDate) {
      currErrors = { ...currErrors, secondDate: "Please select a second date" };
      errorsPresent = true;
    } else if (secondDate < firstDate) {
      currErrors = {
        ...currErrors,
        secondDate: "Please select a date that is after the first date",
      };
      errorsPresent = true;
    }
  }

  if (errorsPresent) {
    setErrors(currErrors);
    return;
  } else {
    setErrors({}); // clear errors
  }

  setTableData("loading");

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
  for (let date of dates) {
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
    let res = axios.post(Routes.proxy, data, { params });
    // journeys.push(...res.data.journeys);
    journeys.push(res);
  }
  journeys = await Promise.all(journeys);
  journeys = journeys.reduce((acc, journey) => {
    acc.push(...journey.data.journeys);
    return acc;
  }, []);
  // journeys = journeys.map((journey) => journey.data.journeys);
  setTableData(
    journeys.map((journey) => (
      <TableRow journey={journey} key={journey.journeyId.toString()} />
    ))
  );
  setJourneys(journeys);
  // setTableData(getJourneyRows(journeys));
};

const sortJourneys = (
  journeys,
  increasingDate,
  increasingPrice,
  label,
  setJourneys,
  setTableData,
  setIncreasingDate,
  setIncreasingPrice
) => {
  let sortedJourneys = journeys;
  if (label === "date") {
    sortedJourneys = journeys.sort((a, b) => {
      let aDate = new Date(a.departureDateTime);
      let bDate = new Date(b.departureDateTime);
      if (increasingDate) {
        setIncreasingDate(false);
        return bDate - aDate;
      } else {
        setIncreasingDate(true);
        return aDate - bDate;
      }
    });
  } else if (label === "price") {
    sortedJourneys = journeys.sort((a, b) => {
      if (a.price !== b.price) {
        if (increasingPrice) {
          setIncreasingPrice(false);
          return b.price - a.price;
        }
        setIncreasingPrice(true);
        return a.price - b.price;
      }
      let aDate = new Date(a.departureDateTime);
      let bDate = new Date(b.departureDateTime);
      setIncreasingPrice(!increasingPrice);
      return aDate - bDate;
    });
  }
  setJourneys(sortedJourneys);
  setTableData(
    sortedJourneys.map((journey) => (
      <TableRow journey={journey} key={journey.journeyId.toString()} />
    ))
  );
};

const TableRow = (props) => {
  let journey = props.journey;
  let date =
    journey.departureDateTime.slice(5, 7) +
    "/" +
    journey.departureDateTime.slice(8, 10) +
    "/" +
    journey.departureDateTime.slice(2, 4);
  let time = journey.departureDateTime.slice(11, 16).split(":");
  let ampm = "AM";
  if (parseInt(time[0]) > 12) {
    time[0] = parseInt(time[0]) - 12;
    ampm = "PM";
  }
  time = time.join(":") + " " + ampm;
  // format journey.price to always have two decimal places
  let price = `$${journey.price.toFixed(2)}`;
  let url = new URL(Routes.tickets);
  for (let param in defaultParameters) {
    url.searchParams.append(param, defaultParameters[param]);
  }
  url.searchParams.append("originId", journey.origin.cityId);
  url.searchParams.append("destinationId", journey.destination.cityId);
  url.searchParams.append(
    "departureDate",
    journey.departureDateTime.slice(0, 10)
  );
  return (
    <tr>
      <td>{date}</td>
      <td>
        <a
          className="highlight"
          rel="noreferrer"
          href={url.toString()}
          target="_blank"
        >
          Megabus
        </a>
      </td>
      <td>{journey.origin.cityName}</td>
      <td>{journey.destination.cityName}</td>
      <td>{time}</td>
      <td className="highlight">{price}</td>
    </tr>
  );
};

// fix bug on mobile where clicking a menu item does not call onChange handler


const Scraper = () => {
  const [destinationCities, setDestinationCities] = useState([]);
  const [dateType, setDateType] = useState("single");
  const [firstDate, setFirstDate] = useState(new Date());
  const [secondDate, setSecondDate] = useState(new Date());
  const [originCity, setOriginCity] = useState(-1);
  const [destinationCity, setDestinationCity] = useState(-1);
  const [journeys, setJourneys] = useState(null);
  const [increasingDate, setIncreasingDate] = useState(true);
  const [increasingPrice, setIncreasingPrice] = useState(false);
  const [tableData, setTableData] = useState(
    journeys
      ? journeys.map((journey) => (
          <TableRow journey={journey} key={journey.journeyId.toString()} />
        ))
      : ""
  );
  const [errors, setErrors] = useState({});
  const originCities = [];
  for (let city in cities) {
    originCities.push({ value: cities[city], label: city });
  }

  return (
    <div>
      <div className="upper-scraper">
        <div className="label">
          Enter the information below to find the cheapest bus ticket
        </div>
        <div className="form">
          <form
            onSubmit={(e) =>
              getTickets(
                e,
                originCity,
                destinationCity,
                firstDate,
                secondDate,
                setJourneys,
                setTableData,
                errors,
                setErrors
              )
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
                  <ReactSelect
                  onBlur={event => event.preventDefault()}
                  components={{
                    DropdownIndicator: () => null
                  }}
                    className="select"
                    classNamePrefix={"select"}
                    placeholder="Enter a city..."
                    isSearchable
                    options={originCities}
                    required
                    unstyled
                    onChange={(opt) => {
                      console.log("changing first one");
                      console.log("opt: ", opt);
                      console.log("opt.value: ", opt.value);
                      setOriginCity(opt.value);
                      setDestinationCity(-1);
                      setErrors({ ...errors, originCity: "" });
                      getDestinationCities(opt.value, setDestinationCities);
                    }}
                    // components={{ DropdownIndicator: () => null }}
                  />
                </div>
                {errors.originCity && (
                  <span className="error">{errors.originCity}</span>
                )}
              </div>
              <div className="field">
                <div>
                  <label htmlFor="destination">To</label>
                </div>
                <div>
                  <ReactSelect
                    // signal to re-render when origin city changes and deselect
                    // destination city
                    key={originCity}
                    onBlur={event => event.preventDefault()}
                    className="select"
                    classNamePrefix={"select"}
                    isSearchable
                    onChange={(opt) => {
                      setDestinationCity(opt.value);
                      setErrors({ ...errors, destinationCity: "" });
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
                    components={{
                      DropdownIndicator: () => null
                    }}

                  />
                </div>
                {errors.destinationCity && (
                  <span className="error">{errors.destinationCity}</span>
                )}
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
                {errors.firstDate && (
                  <span className="error">{errors.firstDate}</span>
                )}
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
                  {errors.secondDate && (
                    <span className="error">{errors.secondDate}</span>
                  )}
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
      {tableData === "loading" ? (
        <div className="loading-container">
          <div className="loader"></div>
          <div>Finding your tickets!</div>
        </div>
      ) : tableData === "" ? (
        <></>
      ) : tableData.length === 0 ? (
        <div className="loading-container">
          No tickets found {":("}
          <br />
          Try using a range of dates to get the best functionality, or try to
          make the range bigger!{" "}
        </div>
      ) : (
        <div className="lower-scraper">
          <div className="instructions">
            <div className="instruction">
              Select the bus ticket to book your ride
            </div>
            <div className="instruction">
              Click the <span className="highlight">arrows</span> to sort your
              results
            </div>
          </div>
          <div className="table">
            <table>
              <tr className="header">
                <th>
                  <span
                    className="sortable"
                    onClick={() =>
                      sortJourneys(
                        journeys,
                        increasingDate,
                        increasingPrice,
                        "date",
                        setJourneys,
                        setTableData,
                        setIncreasingDate,
                        setIncreasingPrice
                      )
                    }
                  >
                    Date{" "}
                    <img src={sortingArrows} alt="Arrows to sort table"></img>
                  </span>
                </th>
                <th>Bus Ticket</th>
                <th>From</th>
                <th>To</th>
                <th>Time</th>
                <th>
                  <span
                    className="sortable"
                    onClick={() =>
                      sortJourneys(
                        journeys,
                        increasingDate,
                        increasingPrice,
                        "price",
                        setJourneys,
                        setTableData,
                        setIncreasingDate,
                        setIncreasingPrice
                      )
                    }
                  >
                    Price{" "}
                    <img src={sortingArrows} alt="Arrows to sort table"></img>
                  </span>
                </th>
              </tr>
              {tableData}
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Scraper;
