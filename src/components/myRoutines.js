import { useState, useEffect } from "react";
import { callApi } from "../api/utils";
export default function MyRoutines({
  username,
  handleDelete,
  routines,
  setRoutines,
  activities,
  setActivities,
  token,
  myRoutines,
  setMyRoutines,
  routineName,
  setRoutineName,
  routineGoal,
  setRoutineGoal,
  isPublic,
  setIsPublic,
}) {
  const [showAddActivity, setShowAddActivity] = useState(false);
  const [duration, setDuration] = useState(0);
  const [count, setCount] = useState(0);
  const [activityId, setActivityId] = useState("");
  const [showEditRoutine, setShowEditRoutine] = useState(false);
  const [updateRoutineName, setUpdateRoutineName] = useState(routineName);
  const [updateRoutineGoal, setUpdateRoutineGoal] = useState(routineGoal);

  console.log(updateRoutineName, updateRoutineGoal);

  const fetchMyRoutines = async () => {
    try {
      const resp = await fetch(
        `http://fitnesstrac-kr.herokuapp.com/api/users/${username}/routines`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await resp.json();
      setMyRoutines(result);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddActivity = async (routineId) => {
    try {
      const data = await callApi({
        method: "POST",
        body: {
          activityId,
          count,
          duration,
        },
        path: `/routines/${routineId}/activities`,
      });
      const activity = activities.find((a) => a.id.toString() === activityId);

      activity.duration = duration;
      activity.count = count;

      setMyRoutines((prev) => {
        prev.map((r) => {
          if (routineId === r.id) {
            routine.activities = [...routine.activities, activity];
          }
          return r;
        });
      });
      setRoutines((prev) =>
        prev.map((r) => {
          if (routineId === r.id) {
            routine.activities = [...r.activities, activity];
          }
        })
      );
      setActivities([data, ...activities]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmitUpdateRoutine = async (routineId) => {
    console.log('routineId :>> ', routineId);
    try {
    const data = await callApi({
      method: "PATCH",
      body: {
        name: updateRoutineName,
        goal: updateRoutineGoal
      },
      path: `routines/${routineId}`
    })
    console.log('data :>> ', data);
    setMyRoutines(p => {
      p.map(r => {
        if (r.id === routineId) {
          return data;
        }
        return p
      })
    })
    fetchMyRoutines();
  } catch(err) {
    console.error(err);
  }
  }

  const handleDeleteActivity = async (routineActivityId) => {
    try {
      await callApi({
        method: "DELETE",
        token,
        path: `/routine_activities/${routineActivityId}`,
      });
      const updatedRoutines = routines.filter(
        (r) => r.activities.routineActivityId !== routineActivityId
      );
      setRoutines(updatedRoutines);
      const updatedMyRoutines = myRoutines.filter(
        (r) => r.activities.routineActivityId !== routineActivityId
      );
      setMyRoutines(updatedMyRoutines);
      fetchMyRoutines();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMyRoutines();
  }, []);

  return (
    <div className="myRoutines-container">
      <h3>My Routines</h3>
      {myRoutines.map((routine) => {
        return (
          <div key={routine.id}>
            <h5>Routine: </h5>
            <p>Name: {routine.name}</p>
            <p>Goal: {routine.goal}</p>
            <h5>Activities: </h5>
            {routine.activities.map((a) => {
              return (
                <div key={a.id}>
                  <p>name: {a.name}</p>
                  <p>reps: {a.count}</p>
                  <p>duration (min): {a.duration}</p>

                  <button
                    className="btn btn-outline-danger"
                    onClick={() => handleDeleteActivity(a.routineActivityId)}
                  >
                    Delete Activity
                  </button>
                </div>
              );
            })}
            {showEditRoutine && (
              <div>
                <form>
                  <input
                    type="text"
                    placeholder="name"
                    value={updateRoutineName}
                    onChange={(e) => setUpdateRoutineName(e.target.value)}
                  />

                  <input
                    type="text"
                    placeholder="goal"
                    value={updateRoutineGoal}
                    onChange={(e) => setUpdateRoutineGoal(e.target.value)}
                  />
                  <input
          type="submit"
          value="update routine"
          onClick={() => handleSubmitUpdateRoutine(routine.id)}
        />
                </form>
              </div>
            )}
            {showAddActivity && (
              <div>
                <form>
                  <label htmlFor="activity">Choose Activity: </label>
                  <select
                    value={activityId}
                    onChange={(e) => setActivityId(e.target.value)}
                    name="activity"
                  >
                    {activities.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    placeholder="duration"
                    onChange={(e) => setDuration(e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="reps"
                    onChange={(e) => setCount(e.target.value)}
                  />
                  <input
                    type="submit"
                    value="Add"
                    onClick={() => handleAddActivity(routine.id)}
                  />
                </form>
              </div>
            )}
            <button
              className="btn btn-outline-warning"
              onClick={() => setShowAddActivity(!showAddActivity)}
            >
              add activity
            </button>
            <button
              className="btn btn-outline-warning"
              onClick={() => {
                console.log('routine.id :>> ', routine.id);
                setShowEditRoutine(!showEditRoutine)
              }}
            >
              edit routine
            </button>
            <button
              className="btn btn-outline-danger"
              onClick={() => handleDelete(routine.id)}
            >
              Delete routine
            </button>
          </div>
        );
      })}
    </div>
  );
}
