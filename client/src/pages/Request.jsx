import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGoogleAuth } from "../hooks/useGoogleAuth";
import { getRequestsApi } from "../apis/process";

const Request = () => {
  const { user, GoogleAuthButton } = useGoogleAuth();
  const [requests, setRequests] = useState([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      const res = await getRequestsApi(user, category);
      if (res) setRequests(res);
    };
    fetchRequests();
  }, [user, category]);

  return (
    <div className="requests-display-container">
      {user && (
        <p className="view-requests-link">
          <Link to="/">Submit a new request? &rarr;</Link>
        </p>
      )}
      <h2>All Service Requests</h2>
      <div className="response-header">
        <div className="">
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="form-input"
          >
            <option value="">Select a category</option>
            <option value="General Queries">General Queries</option>
            <option value="Product Features Queries">
              Product Features Queries
            </option>
            <option value="Product Pricing Queries">
              Product Pricing Queries
            </option>
            <option value="Product Feature Implementation Requests">
              Product Feature Implementation Requests
            </option>
          </select>
        </div>
      </div>
      {user ? (
        requests.conversations?.length > 0 ? (
          <div className="requests-grid">
            {requests.conversations?.map((request) => (
              <div key={request.id} className="request-card">
                <h3>{request.tags.tags[0].name}</h3>
                <p dangerouslySetInnerHTML={{ __html: request.source.body }} />
              </div>
            ))}
          </div>
        ) : (
          <p className="no-requests-found">No service requests found</p>
        )
      ) : (
        <div className="google-auth-button">
          <p>Please sign in to view all requests</p>
          <GoogleAuthButton />
        </div>
      )}
    </div>
  );
};

export default Request;
