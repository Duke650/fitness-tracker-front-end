import { useEffect, useState } from "react";

export default function Activites() {
  const [activities, setActivities] = useState([]);
  console.log("activities :>> ", activities);
  const fetchActivities = async () => {
    try {
      const resp = await fetch(
        "http://fitnesstrac-kr.herokuapp.com/api/activities",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await resp.json();
      setActivities(result);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchActivities();
  }, []);
  return (
    <div>
      <h1>Activities</h1>
      {activities.map((activity) => {
        return (
          <div key={activity.id}>
            <strong>Name: </strong>
            <p>{activity.name}</p>
            <strong>Description: </strong> 
            <p>{activity.description}</p>
          </div>
        );
      })}
    </div>
  );
}
