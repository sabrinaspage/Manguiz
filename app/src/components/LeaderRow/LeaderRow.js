import "./LeaderRow.css";

const validURL = (str) => {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
};

const LeaderImage = ({ avatar }) => {
  return <>{validURL(avatar) ? <img src={avatar} class="image" alt="avatar"/> : <span class="dot"/>}</>;
};

const LeaderRow = ({ person }) => {
  return (
    <tr id="row">
      <td width={100} className="place"> {person.place} </td>
      <td width={100} className="avatar"> <LeaderImage avatar={person.avatar} /> </td>
      <td width={100} className="name"> {person.name} </td>
      <td width={100} className="points"> {person.points} </td>
    </tr>
  );
};

export default LeaderRow;
