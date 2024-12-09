import React, { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [category, setCategory] = useState("");
  const [comments, setComments] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category || !comments) {
      alert("Please fill out all fields!");
      return;
    }

    console.log(category, comments);
  };

  return (
    <div className="service-form-container">
      <h2>Submit a Service Request</h2>
      <form onSubmit={handleSubmit} className="service-form">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="form-input"
          required
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

        <label htmlFor="comments">Comments</label>
        <textarea
          id="comments"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          className="form-input"
          rows="4"
          placeholder="Enter your comments here..."
          required
        />

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>

      <p className="view-requests-link">
        <Link to="/requests">View All Requests &rarr;</Link>
      </p>
    </div>
  );
};

export default Home;
