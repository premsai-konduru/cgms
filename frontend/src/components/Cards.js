import React, { useEffect, useState } from 'react'

function Cards({ cardDetails }) {
    const [cardIssue, setCardIssue] = useState(null);
    const [cardDescription, setCardDescription] = useState(null);

    const handleCardChange = (event) => {
        setCardIssue(event.target.value);
    };

    useEffect(() => {
        exportCards();
    }, [cardIssue, cardDescription]);

    const exportCards = () => {
        let values = {
            card_Issue: cardIssue,
            issue_Description: cardDescription
        };
        // Pass the values to the parent component or another function
        if (cardDetails) {
            cardDetails(values);
        }
    };

    return (
        <div className="atm123">

            <label className="grievance-title">Choose card issue:</label>
            <div style={{ marginLeft: "1rem" }}>
                <label><input type="radio" name="card-issue-type" value="CardDeclined" onChange={handleCardChange} /> Card
                    Declined</label>
                <label><input type="radio" name="card-issue-type" value="CardLost" onChange={handleCardChange} /> Card
                    Lost</label>
                <label className="grievance-title">Describe more:</label>
                <textarea className="form-control describer" name="card-issue-description"
                    placeholder="Describe the card issue" style={{ marginBottom: "20px" }}
                    onChange={(event) => setCardDescription(event.target.value)}>
                </textarea>
            </div>
        </div>
    )
}

export default Cards