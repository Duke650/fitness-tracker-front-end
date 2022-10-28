import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
export default function Routines({ routines, setRoutines, username, token }) {

  const handleDelete = async (idToDelete) => {
    try {
      const resp = await fetch(`http://fitnesstrac-kr.herokuapp.com/api/routines/${idToDelete}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      }
    )
    const result = await resp.json();
    if (result) {
      const newRoutines = routines.filter(r => r.id !== idToDelete)
      setRoutines(newRoutines)
    }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h1>Routines</h1>
      <div className="create-routine-container">
      <Link to="/createRoutine" className="btn btn-outline-primary">Create Routine</Link>
      </div>
      {routines.map((routine) => {
        if (routine.isPublic) {
        return (
          <div key={routine.id} id="routine-container">
            <ul className="list-group">
              <li className="list-group-item">
            <strong>Created by: </strong>
            <p>{routine.creatorName}</p>
            <strong>Routine Name: </strong>
            <p>{routine.name}</p>
            <strong>Goal: </strong>
            <p>{routine.goal}</p>
            <strong>Activities: </strong>
            {routine.activities.map((activity) => {
              return (
                <div key={activity.id}>
                  <p>
                    {activity.name} {activity.description}
                  </p>
                </div>
              );
            })}
            {routine.creatorName === username && <button onClick={() => handleDelete(routine.id)}>DELETE</button>}
            </li>
            </ul>
          </div>
        )};
      })}
    </div>
  );
}
