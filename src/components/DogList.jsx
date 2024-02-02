import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/DogList.css";

function DogList() {
  const [dogImages, setDogImages] = useState([]);
  const [dogSubBreeds, setDogSubBreeds] = useState({});

  useEffect(() => {
    axios
      .get("https://dog.ceo/api/breeds/image/random/50")
      .then((response) => {
        setDogImages(response.data.message);
        fetchDogInfo();
      })
      .catch((error) => {
        console.error("Error fetching dog images:", error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchDogInfo = () => {
    axios
      .get("https://dog.ceo/api/breeds/list/all")
      .then((response) => {
        const allBreeds = response.data.message;
        const dogSubBreedsMap = {};

        Promise.all(
          Object.keys(allBreeds).map((breedName) =>
            axios
              .get(`https://dog.ceo/api/breed/${breedName}/list`)
              .then((response) => {
                const subBreeds = response.data.message;
                dogSubBreedsMap[breedName] =
                  subBreeds && subBreeds.length > 0 ? subBreeds : null;
              })
          )
        ).then(() => {
          setDogSubBreeds(dogSubBreedsMap);
        });
      })
      .catch((error) => {
        console.error("Error fetching dog info:", error);
      });
  };

  const extractBreedName = (imageUrl) => {
    const parts = imageUrl.split("/");
    const breedIndex = parts.indexOf("breeds") + 1;
    return parts[breedIndex].split("-")[0];
  };

  const filterImagesWithSubBreeds = (images) => {
    return images.filter((imageUrl) => {
      const breedName = extractBreedName(imageUrl);
      return dogSubBreeds[breedName] && dogSubBreeds[breedName].length > 0;
    });
  };

  const filteredImages = filterImagesWithSubBreeds(dogImages);

  return (
    <section className="dog-list-section">
      <div className="container">
        <div className="dog-grid">
          {filteredImages.map((imageUrl, index) => {
            const breedName = extractBreedName(imageUrl);
            const subBreeds = dogSubBreeds[breedName] || [];
            return (
              <div className="dog-card" key={index}>
                <h1>{breedName}</h1>
                <img
                  src={imageUrl}
                  alt={`Dog ${index + 1}`}
                  className="dog-img"
                />
                <div className="dog-info">
                  <h2 className="dog-title">
                    {subBreeds.length > 0 ? (
                      <span className="sub-breeds">
                        {" "}
                        - {subBreeds.join(", ")}
                      </span>
                    ) : (
                      <span className="sub-breeds"> - Not SubBreeds</span>
                    )}
                  </h2>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default DogList;
