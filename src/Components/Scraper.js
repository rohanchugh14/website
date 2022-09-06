import React from 'react'
import "../CSS/App.css";
import { Card } from "@themesberg/react-bootstrap";
const Scraper = () => {
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