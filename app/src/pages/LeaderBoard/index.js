import { useEffect, useState } from "react";
import "./index.css";
import LeaderRow from "../../components/LeaderRow/index";
import firebase from "../../firebase";

const LeaderBoard = () => {
  const [leaders, setLeaders] = useState(null);

  useEffect(() => {
    firebase
      .firestore()
      .collection("user-points")
      .onSnapshot((snapshot) => {
        const newLeaders = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));

        setLeaders(newLeaders)
      });
  });

  return (
    <div class="leaderboard">
      <h1>
        <span> Leaderboard </span>
      </h1>
      {leaders ? (
        <table className="content">
          <tbody className="body">
            {leaders.map((i) => (
              <LeaderRow person={i} />
            ))}
          </tbody>
        </table>
      ) : (
        "Loading"
      )}
    </div>
  );
};

export default LeaderBoard;
