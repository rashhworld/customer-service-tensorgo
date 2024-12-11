import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGoogleAuth } from "../hooks/useGoogleAuth";
import { sendRequestApi } from "../apis/process";

const Home = () => {
  const { user, GoogleAuthButton } = useGoogleAuth();
  const [request, setRequest] = useState({ category: "", comments: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!request.category || !request.comments) {
      alert("Please fill out all fields!");
      return;
    }

    setLoading(true);
    const res = await sendRequestApi(user, request.category, request.comments);
    if (res) {
      setRequest({ category: "", comments: "" });
      setLoading(false);
    }
  };

  return (
    <div className="service-form-container">
      <h2>Submit a Service Request</h2>
      <form onSubmit={handleSubmit} className="service-form">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={request.category}
          onChange={(e) => setRequest({ ...request, category: e.target.value })}
          className="form-input"
          required
        >
          <option value="" hidden>
            Select a category
          </option>
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

        <label htmlFor="comments">Comments</label>
        <textarea
          id="comments"
          value={request.comments}
          onChange={(e) => setRequest({ ...request, comments: e.target.value })}
          className="form-input"
          rows="4"
          placeholder="Enter your comments here..."
          required
        />

        {user ? (
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Submitting..." : "Submit Request"}
          </button>
        ) : (
          <div className="google-auth-button">
            <p>Please sign in to submit your request</p>
            <GoogleAuthButton />
          </div>
        )}
      </form>

      {user && (
        <p className="view-requests-link">
          <Link to="/requests">View All Requests &rarr;</Link>
        </p>
      )}
    </div>
  );
};

export default Home;
