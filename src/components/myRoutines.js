import { useState, useEffect } from "react";
export default function MyRoutines({ username }) {
  const [myRoutines, setMyRoutines] = useState([]);
  console.log("myRoutines :>> ", myRoutines);
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

  useEffect(() => {
    fetchMyRoutines();
  }, []);
  return (
    <div>
      <h3>My Routines</h3>
      {myRoutines.map((routine) => {
        return (
          <div>
            <p>Name: {routine.name}</p>
            <p>Goal: {routine.goal}</p>
            {routine.activities && <p>Activities: </p> && (
              <p>
                {routine.activities.map((r) => {
                  return (
                    <div key={r.id}>
                      <p>
                        {r.name} {r.description}
                      </p>
                    </div>
                  );
                })}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
