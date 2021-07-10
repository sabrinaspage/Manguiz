import React from "react";
import "./index.css";

export const CharacterCard = ({ character, onClick, selected }) => {
  return (
    <div className="col text" onClick={onClick}>
      <div className="img-hover-zoom img-hover-zoom--quick-zoom">
        <img src={character.image} alt="" width="100%" height="100%" />
      </div>
        <h5 className="text-overlap">{character.name}</h5>
        <p className="text-overlap">{character.description}</p>
    </div>
  );
};
