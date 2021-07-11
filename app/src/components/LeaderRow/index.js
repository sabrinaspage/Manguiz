import "./index.css";

const LeaderRow = ({ person }) => {
  return (
    <tr id="row">
      <td width={200} className="points"> {person.displayName} </td>
      <td width={200} className="place"> {person.correct} total points</td>
    </tr>
  );
};

export default LeaderRow;
