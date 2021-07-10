import React from "react";
import "./index.css";

export const CharacterCard = ({ character, onClick }) => {
  return (
    <div class="col text" onClick={onClick}>
      <div class="img-hover-zoom img-hover-zoom--quick-zoom">
        <img src={character.image} alt="" width="100%" height="100%" />
      </div>
        <h5 class="text-overlap">{character.name}</h5>
        <p class="text-overlap">{character.description}</p>
    </div>
  );
};
