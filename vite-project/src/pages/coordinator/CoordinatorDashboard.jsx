import React from 'react'
import { Link } from 'react-router-dom'
const CoordinatorDashboard = () => {
  return (
    <div>
      <Link to={"/add-event"}>Add Event</Link>
    </div>
  )
}

export default CoordinatorDashboard
