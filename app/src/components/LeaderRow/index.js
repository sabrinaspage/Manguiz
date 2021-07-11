import "./index.css";

const LeaderRow = ({ person }) => {
  return (
    <tr id="row">
      <td width={100} className="points"> {person.displayName} </td>
      <td width={100} className="place"> {person.correct} total points</td>
    </tr>
  );
};

export default LeaderRow;
