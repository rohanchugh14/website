import React from 'react'
import "../CSS/App.css";
import { Card } from "@themesberg/react-bootstrap";
const Scraper = () => {
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "suId=74b8ad47-5511-4327-b189-e352f516c5ef; uId=878b4767-417b-4bfb-99c4-34658d3ae991");

    var requestOptions = {
    method: 'GET',
    redirect: 'follow'
    };

    fetch("https://us.megabus.com/journey-planner/api/journeys/travel-dates?originCityId=320&destinationCityId=318", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    return (
        <div>
            <Card border="light" className="bg-white shadow-sm mb-4">
                <Card.Body>
                    <div className="center-text mb-2">
                        <h1 className="mb-1">Ticket Scraper</h1>
                    </div>
                </Card.Body>
            </Card>
        </div>
  )
}

export default Scraper