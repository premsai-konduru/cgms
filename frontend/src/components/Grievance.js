import React from 'react'
import GrievanceHistory from './GrievanceHistory'
import NewGriev from './NewGriev'

function Grievance() {
    return (
        <div className="container">
            <GrievanceHistory />
            <NewGriev />
        </div>
    )
}

export default Grievance