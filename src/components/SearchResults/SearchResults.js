// src/SearchResults/SearchResults.js
import React from 'react';
import Product from '../Product/Product'; // Import the Product component

function SearchResults() {
  // Replace this with your search results content
  return (
    <div className="search-results">
      <h1>Search Results</h1>
      <p>I will have to use material ui autocomplete combobox here - maybe for the product categories</p>
      <Product /> {/* Render the Product component */}
      {/* Add more product listings here */}
    </div>
  );
}

export default SearchResults;
