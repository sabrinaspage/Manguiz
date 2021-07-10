import { useEffect, useState } from "react";
import "./LeaderBoard.css";
import LeaderRow from "../../components/LeaderRow/LeaderRow";

const LeaderBoard = () => {
  const [leaders, setLeaders] = useState(null);

  useEffect(() => {
    fetch("/leaders")
      .then((res) => res.json())
      
      .then((data) => setLeaders(data));
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
