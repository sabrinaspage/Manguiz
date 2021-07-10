import React from "react";

export const CharacterGrid = ({ character }) => {
  return (
    <div class="">
      <img class="" src={character.image} alt="" />
        <h5>{character.name}</h5>
        <p>{character.description}</p>
    </div>
  );
};
