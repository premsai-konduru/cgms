import React, { useState } from 'react';

function Buttons(uniqueId) {
    const [isOpen, setIsOpen] = useState(false);
    // const issueId = params.issueId;
    // console.log(issueId);

    const toggleDropdown = () => {
        setIsOpen(prevIsOpen => !prevIsOpen);
    };

    return (
        <div className="btn-group float-right" role="group" aria-label="Button group">
            <div className={`dropdown ${isOpen ? 'show' : ''}`}>
                <button className="btn btn-success dropdown-toggle" type="button" id={`forwardDropdown-${uniqueId}`} aria-haspopup="true" aria-expanded={isOpen ? 'true' : 'false'} onClick={toggleDropdown}>
                    Forward
                </button>
                <div className={`dropdown-menu ${isOpen ? 'show' : ''}`} aria-labelledby={`forwardDropdown-${uniqueId}`}>
                    <a className="dropdown-item" href="#">Action</a>
                    <a className="dropdown-item" href="#">Another action</a>
                    <a className="dropdown-item" href="#">Something else here</a>
                </div>
            </div>
            <button type='button' className="btn btn-danger">Discard</button>
        </div>
    );
}

export default Buttons;
