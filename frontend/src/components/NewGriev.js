import React, { useState } from 'react';
import Bank from './Bank';
import ATM from './ATM';
import { loginDetails } from './Login';

function NewGriev() {
  const [isNewGrievanceOpen, setNewGrievanceOpen] = useState(false);
  const [selectedGrievanceType, setSelectedGrievanceType] = useState(null);
  const [bankValues, setBankValues] = useState(null);
  const [atmValues, setAtmValues] = useState(null);

  const handleGrievanceTypeChange = (event) => {
    setSelectedGrievanceType(event.target.value);
  };

  const handleBankValuesExport = (values) => {
    setBankValues(values);
  };

  const handleATMvaluesExport = (values) => {
    setAtmValues(values);
  }

  const isSubmitButtonEnabled = selectedGrievanceType === 'Bank' || selectedGrievanceType === 'ATM';

  const handleGrievanceSubmit = (event) => {
    event.preventDefault();

    let data = {
      grievanceType: selectedGrievanceType,
    };
    // Dealing after the button is submitted
    if (selectedGrievanceType === "Bank") {
      // Deal with the bankValues
      data = { ...loginDetails, ...data, ...bankValues };
    } else {
      // Deal with the atmValues
      data = { ...loginDetails, ...data, ...atmValues };
    }
    // Close the grievance content after submission
    setNewGrievanceOpen(false);
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="new-grievance">
          {/* Grievance button */}
          <button
            className="new-grievance-button"
            onClick={() => setNewGrievanceOpen(!isNewGrievanceOpen)}
          >
            {/* Pencil logo for new grievance button */}
            <i className="fas fa-pencil-alt" style={{ paddingRight: "15px" }}></i>
            Start a new grievance
          </button>
          {/* Grievance Content */}
          {isNewGrievanceOpen && (
            <div className="collapsible-content" id="new-grievance-content">
              <form onSubmit={handleGrievanceSubmit}>
                <label className="grievance-title" style={{ fontSize: "105%", color: "#3366ff" }}>
                  Choose grievance with or at:
                </label>
                <br /><br />
                {/* Grievance Type Radio Buttons */}
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="grievance-type"
                    value="Bank"
                    id="Bank"
                    onChange={handleGrievanceTypeChange}
                  />
                  <label className="form-check-label" htmlFor="Bank">Bank</label>
                </div>
                <div className="form-check form-check-inline" style={{ marginLeft: "20%" }}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="grievance-type"
                    value="ATM"
                    id="ATM"
                    onChange={handleGrievanceTypeChange}
                  />
                  <label className="form-check-label" htmlFor="ATM">ATM</label>
                </div>

                {/* Additional Grievance Details based on selected type */}
                {selectedGrievanceType === 'Bank' && <Bank onExport={handleBankValuesExport} />}
                {selectedGrievanceType === 'ATM' && <ATM onExport2={handleATMvaluesExport} />}
                {/* ATM component or other components go here */}

                {/* Submit Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary submit-button"
                    disabled={!isSubmitButtonEnabled}
                    style={{ opacity: isSubmitButtonEnabled ? 1 : 0.5, pointerEvents: isSubmitButtonEnabled ? "auto" : "none" }}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NewGriev;
