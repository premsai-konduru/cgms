import React, { useState } from 'react';
import Bank from './Bank';
import ATM from './ATM';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
import useGriev from '../hooks/useGriev';

const grievanceUrl = '/grievance';

function NewGriev() {
  const { auth } = useAuth();
  const { setGrievance } = useGriev();
  const [isNewGrievanceOpen, setNewGrievanceOpen] = useState(false);
  const [selectedGrievanceType, setSelectedGrievanceType] = useState(null);
  const [bankValues, setBankValues] = useState(null);
  const [atmValues, setAtmValues] = useState(null);
  const [SubmittedStatus, setSubmittedStatus] = useState(false);

  const handleGrievanceTypeChange = (event) => {
    setSelectedGrievanceType(event.target.value);
  };

  const handleBankValuesExport = (values) => {
    setBankValues(values);
  };

  const handleATMvaluesExport = (values) => {
    setAtmValues(values);
  }

  const isSubmitButtonEnabled = () => {
    if (selectedGrievanceType === "Bank" && bankValues) {
      for (const element of bankValues) {
        if (element === undefined) return false;
      }
      return true;
    }
    if (selectedGrievanceType === "ATM" && atmValues) {
      for (const element of atmValues) {
        if (element === undefined) return false;
      }
      return true;
    }
    return false; // Return false for other cases or when arrays are not defined
  };


  const handleGrievanceSubmit = async (event) => {
    event.preventDefault();

    let data = {
      grievanceType: selectedGrievanceType,
    };
    // Dealing after the button is submitted
    if (selectedGrievanceType === "Bank") {
      // Deal with the bankValues
      data = { user: auth?.user, pwd: auth?.pwd, issue: { ...data, ...bankValues } };
    } else {
      // Deal with the atmValues
      data = { user: auth?.user, pwd: auth?.pwd, issue: { ...data, ...atmValues } };
    }

    console.log(data);
    //console.log(auth);
    try {
      await axios.post(
        grievanceUrl,
        JSON.stringify(data),
        {
          headers: {
            "Authorization": `Bearer ${auth?.accessToken}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true,
        },
      );
      // Set the state to trigger the useEffect in Unsolved component
      setSubmittedStatus(true);
      // Use the status again to the Global Context Provider
      setGrievance({SubmittedStatus});
      // After successfully changing the global variable, make the SubmittedStatus false
      setSubmittedStatus(false);
    }
    catch (err) {
      // Handle errors
      if (!err?.response) {
        alert("No response from the server");
      } else if (err?.response.status === 400) {
        alert("Missing some data");
      } else if (err?.response.status === 403) {
        alert("You are forbidden");
      } else {
        alert(err.message);
      }
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
