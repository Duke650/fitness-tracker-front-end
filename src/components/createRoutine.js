import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateRoutine({ setRoutines, token, routineName, setRoutineName, routineGoal, setRoutineGoal, isPublic, setIsPublic, error, setError}) {
    const navigate = useNavigate()

  const handleCreateRoutine = async (e) => {
    e.preventDefault();
    try {
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
          isPublic: isPublic
        }),
      }
    );
    const result = await resp.json();
    result.activities = [];
    if(!resp.ok) {
      setError(result.error)
    } else {
      setRoutines((prev) => [result, ...prev]);
      setError("")
    navigate("/")

    }
    
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
          name="isPublic"
          value={isPublic}
          onChange={() => setIsPublic(!isPublic)}
        />
        <label htmlFor="isPublic">make public?</label>
        {error && <div>Routine name already exists</div>}
        <input
          type="submit"
          value="Create Routine"
          onClick={handleCreateRoutine}
        />
      </form>
    </div>
  );
}
