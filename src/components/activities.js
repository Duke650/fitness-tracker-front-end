import { useEffect, useState } from "react";
import { callApi } from "../api/utils";
export default function Activites({token, activities, setActivities}) {
  const [ showCreateActivity, setShowCreateActivity ] = useState(false);
  const [ activityName, setActivityName ] = useState("")
  const [ activityDescription, setActivityDescription ] = useState("");

  const fetchActivities = async () => {
    try {
      const data = await callApi({path: "/activities"})
      setActivities(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateActivity = async (e) => {
    e.preventDefault()
    // try {
    //   const data = await callApi({
    //     method: "POST",
    //     body: {
    //       name: activityName,
    //       description: activityDescription
    //     },
    //     token,
    //     path: "/activities"
    //   })
    //   // const activity = activities.find(a => a.name === activityName)
    //   // if(activity) {
    //   //   console.error(err);
    //   // }
    //   console.log('data :>> ', data);
    //   
    // } catch (err) {
    //   console.log(err);
    // }
    try {
      const response = await fetch("http://fitnesstrac-kr.herokuapp.com/api/activities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: activityName,
          description: activityDescription,
        }),
      });
      const data = await response.json();
      setActivities(prev => [data, ...prev])
      setShowCreateActivity(!showCreateActivity)
    } catch (err) {
      console.error(err);
    }
    
  }


  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <div>
      <u><h1 className="headers">Activities</h1></u>
      {showCreateActivity && 
        <form>
          <input type="text" placeholder="name" onChange={e => setActivityName(e.target.value)}/>
          <input type="text" placeholder="description" onChange={e => setActivityDescription(e.target.value)}/>
          <button onClick={handleCreateActivity}>add</button>
        </form>
        }
      <button className="btn btn-outline-primary" onClick={() => setShowCreateActivity(!showCreateActivity)}>Create activity</button>
      
      {activities.map((activity) => {
        return (
          <div key={activity.id} className="card d-flex flex-wrap bd-highlight">
            <div className="card-header p-2 bd-highlight">
            <strong>Name: </strong>
            <p>{activity.name}</p>
            <strong>Description: </strong> 
            <p>{activity.description}</p>
          </div>
          </div>
        );
      })}
    </div>
  );
}

