import React from "react";
import { Link } from "react-router-dom";

const Request = () => {
  const requests = [
    {
      id: 1,
      category: "General Queries",
      comments: "I have a question about your return policy.",
    },
    {
      id: 2,
      category: "Product Features Queries",
      comments: "Does this product support Bluetooth?",
    },
    {
      id: 3,
      category: "Product Pricing Queries",
      comments: "Can I get a discount on bulk purchases?",
    },
    {
      id: 4,
      category: "Product Feature Implementation Requests",
      comments: "Can you add dark mode to your application?",
    },
  ];

  return (
    <div className="requests-display-container">
      <p className="view-requests-link">
        <Link to="/">Submit a new request? &rarr;</Link>
      </p>
      <h2>All Service Requests</h2>
      <div className="requests-grid">
        {requests.map((request) => (
          <div key={request.id} className="request-card">
            <h3>{request.category}</h3>
            <p>{request.comments}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Request;
