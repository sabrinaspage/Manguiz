import React from "react";
import { CharacterGrid } from "../../components/CharacterGrid/index";
import { CharacterCard } from "../../components/CharacterCard/index";
import firebase, { storage } from "../../firebase";
import { useEffect, useState } from "react";

const ChooseACharacter = () => {
  const [characters, setCharacters] = useState(null);
  const [image, setImage] = useState({});
  const [url, setUrl] = useState({});


  const handleFireBaseUpload = e => {
    e.preventDefault();
    const ref = storage.ref(imageAsURL);
    const uploadTask = ref.put(image)
    uploadTask.on("state_changed", console.log, console.error, () => {
      ref.getDownloadURL().then((url) => {
        setUrl(url)
      })
    })
  }

  useEffect(() => {
    firebase
      .firestore()
      .collection("characters")
      .onSnapshot((snapshot) => {
        const newCharacters = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCharacters(newCharacters);
      });

    console.log(imageAsURL);
  }, [imageAsURL]);

  return (
    <>
    <h1 className="display-3 text-center"> Choose a Character </h1>
      <CharacterGrid>
        {characters
          ? characters.map((i) => <CharacterCard character={i} onClick={() => setImage(i)}/>)
          : "Loading..."}
      </CharacterGrid>
    </>
  );
};

export default ChooseACharacter;
