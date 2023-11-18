import React, { useEffect, useState } from 'react';
import Machine from './Machine';
import Cards from './Cards';

function ATM({ onExport2 }) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [card_vals, setCard_vals] = useState(null);
    const [machineVals, setMachineVals] = useState(null);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    useEffect(() => {
        exportAtm();
    },[card_vals, machineVals, selectedOption]);

    const exportAtm = () => {
        let values = {
            issueWith: selectedOption,
        };
        if (selectedOption === "Cards") {
            values = { ...values, ...card_vals };
        }
        else {
            values = { ...values, ...machineVals };
        }
        // Pass the values to the parent component or another function
        if (onExport2) {
            onExport2(values);
        }
    };

    const handle_card = (Values) => {
        setCard_vals(Values);
    };

    const handle_machine = (Values) => {
        setMachineVals(Values);
    };

    return (
        <div className="grievance-options" id="atm-options">
            <label className="grievance-title" style={{ marginTop: "1rem" }}>Issue with:</label>
            <div className="row" style={{ marginBottom: "0.5rem" }}>
                {/* Cards radio */}
                <div className="col-auto">
                    <label className="form-check-label" style={{ marginLeft: "2.2rem" }}>
                        <input
                            className="form-check-input"
                            type="radio"
                            name="atm-issue-type"
                            value="Cards"
                            checked={selectedOption === 'Cards'}
                            onChange={handleOptionChange}
                        />
                        Cards
                    </label>
                </div>
                {/* Machine radio */}
                <div className="col-auto">
                    <label className="form-check-label" style={{ marginLeft: "2.9rem" }}>
                        <input
                            className="form-check-input"
                            type="radio"
                            name="atm-issue-type"
                            value="Machine"
                            checked={selectedOption === 'Machine'}
                            onChange={handleOptionChange}
                        />
                        Machine
                    </label>
                </div>
            </div>
            <div style={{ marginLeft: "1rem", marginTop: "1rem" }}>
                {/* Render Cards component if "Cards" option is selected */}
                {selectedOption === 'Cards' && <Cards cardDetails={handle_card} />}

                {/* Render Machine component if "Machine" option is selected */}
                {selectedOption === 'Machine' && <Machine machineDetails={handle_machine} />}
            </div>
        </div>
    );
}

export default ATM;
