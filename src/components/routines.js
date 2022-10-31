import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
export default function Routines({
  routines,
  username,
  handleDelete,
  fetchRoutines,
}) {

  useEffect(() => {
    fetchRoutines;
  });

  return (
    <div>
      <u>
        <h1 className="headers">Routines</h1>
      </u>
      <div className="create-routine">
        <Link
          to="/createRoutine"
          className="btn btn-outline-primary create-btn"
        >
          Create Routine
        </Link>
      </div>
      {routines.map((routine) => {
        if (routine.isPublic) {
          return (
            <div key={routine.id} className="card">
              <div className="card-header ">
                <strong>{routine.name}</strong>
              </div>
              <div className="card-body">
                <h5 className="card-title">
                  Created by: {routine.creatorName}
                </h5>
                <p className="card-text">
                  <strong>Goal: </strong>
                  {routine.goal}
                </p>
                <strong>Activities:</strong>
                <div className="card-text">
                  {routine.activities.map((activity) => {
                    return (
                      <div key={activity.id}>
                        <p>{activity.name}</p>
                        <p> about: {activity.description}</p>
                      </div>
                    );
                  })}{" "}
                </div>
              </div>

              {routine.creatorName === username && (

                <div>
                <a
                  className="btn btn-outline-danger"
                  onClick={() => handleDelete(routine.id)}
                >
                  DELETE
                </a>
                <div>
                  <form>
                    <input type="text" />
                  </form>
                  </div>
                <button
                onClick={() => setShowEditForm(true)}
                  className="btn btn-outline-primary"
                >
                  edit
                </button>
                </div>
              )}
            </div>
          );
        }
      })}
    </div>
  );
}
