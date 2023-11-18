import React, { useState } from 'react';
import Unsolved from './Unsolved';
import Solved from './Solved';

const GrievanceHistory = () => {
  const [isGrievanceHistoryOpen, setGrievanceHistoryOpen] = useState(false);
  const [isSolvedGrievancesOpen, setSolvedGrievancesOpen] = useState(false);
  const [isUnsolvedGrievancesOpen, setUnsolvedGrievancesOpen] = useState(false);

  const toggleGrievanceHistory = () => {
    setGrievanceHistoryOpen(!isGrievanceHistoryOpen);
  };

  const toggleSolvedGrievances = () => {
    setSolvedGrievancesOpen(!isSolvedGrievancesOpen);
  };

  const toggleUnsolvedGrievances = () => {
    setUnsolvedGrievancesOpen(!isUnsolvedGrievancesOpen);
  };

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="grievance-container">
            {/* Grievance History Button */}
            <button className="collapsible-button" onClick={toggleGrievanceHistory}>
              <i className="fas fa-list-ul"></i>
              Grievance History
            </button>
            {/* Grievance History Content */}
            {isGrievanceHistoryOpen && (
              <div className="collapsible-content">
                {/* Solved Button */}
                <button className="collapsible-button" onClick={toggleSolvedGrievances}>
                  <i className="fas fa-check"></i>
                  Solved
                </button>
                {/* Solved Grievances */}
                {isSolvedGrievancesOpen && (
                  <div className="collapsible-content">
                    <Solved />
                  </div>
                )}
                {/* Unsolved Button */}
                <button className="collapsible-button" onClick={toggleUnsolvedGrievances}>
                  <i className="fas fa-times"></i>
                  Unsolved
                </button>
                {/* Unsolved Grievances */}
                {isUnsolvedGrievancesOpen && (
                  <div className="collapsible-content">
                    <Unsolved />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default GrievanceHistory;
