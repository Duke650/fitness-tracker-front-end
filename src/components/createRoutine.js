import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateRoutine({ setRoutines, token, routineName, setRoutineName, routineGoal, setRoutineGoal, isPublic, setIsPublic}) {
    const navigate = useNavigate()

  const handleCreateRoutine = async (e) => {
    try {
        e.preventDefault();
    const resp = await fetch(
      "http://fitnesstrac-kr.herokuapp.com/api/routines",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: routineName,
          goal: routineGoal,
          isPublic,
        }),
      }
    );
    const result = await resp.json();
    result.activities = [];
    console.log("result :>> ", result);
    setRoutines((prev) => [result, ...prev]);
    navigate("/")
    } catch (err) {
        console.error(err);
    }
    
    
  };
  return (
    <div>
      <h1>Create new routine</h1>
      <form>
        <input
          type="text"
          placeholder="name"
          onChange={(e) => setRoutineName(e.target.value)}
        />
        <input
          type="text"
          placeholder="goal"
          onChange={(e) => setRoutineGoal(e.target.value)}
        />
        <input
          type="checkbox"
          id="isPublic"
          onChange={() => setIsPublic(!isPublic)}
        />
        <label htmlFor="isPublic">make public?</label>
        <input
          type="submit"
          value="Create Routine"
          onClick={handleCreateRoutine}
        />
      </form>
    </div>
  );
}
