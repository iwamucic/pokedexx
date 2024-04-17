import React from 'react';
import './Pagination.css'; 

export default function Pagination({ goToNextPage, goToPreviousPage }) {
  return (
    <div className="pagination-container">
      {goToPreviousPage && (
        <button className="pagination-button" onClick={goToPreviousPage}>
          Previous
        </button>
      )}
      {goToNextPage && (
        <button className="pagination-button" onClick={goToNextPage}>
          Next
        </button>
      )}
    </div>
  );
}
