import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/DogList.css";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDog, faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
function DogList() {
  const [dogImages, setDogImages] = useState([]);
  const [dogSubBreeds, setDogSubBreeds] = useState({});
  const Api_Url = "https://dog.ceo/api";
  useEffect(() => {
    axios
      .get(`${Api_Url}/breeds/image/random/50`)
      .then((response) => {
        setDogImages(response.data.message);
        fetchDogInfo();
      })
      .catch((error) => {
        toast.error("Error fetching dog images:", error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchDogInfo = () => {
    axios
      .get(`${Api_Url}/breeds/list/all`)
      .then((response) => {
        const allBreeds = response.data.message;
        const dogSubBreedsMap = {};

        Promise.all(
          Object.keys(allBreeds).map((breedName) =>
            axios
              .get(`${Api_Url}/breed/${breedName}/list`)
              .then((response) => {
                const subBreeds = response.data.message;
                dogSubBreedsMap[breedName] =
                  subBreeds && subBreeds.length > 0
                    ? subBreeds.slice(0, 3)
                    : null;
              })
          )
        ).then(() => {
          setDogSubBreeds(dogSubBreedsMap);
        });
      })
      .catch((error) => {
        toast.error("Error fetching dog info:", error);
      });
  };

  const extractBreedName = (imageUrl) => {
    const parts = imageUrl.split("/");
    const breedIndex = parts.indexOf("breeds") + 1;
    return parts[breedIndex].split("-")[0];
  };

  const filteredImages = dogImages.filter((imageUrl) => {
    const breedName = extractBreedName(imageUrl);
    return dogSubBreeds[breedName] && dogSubBreeds[breedName].length > 0;
  });

  return (
    <section className="dog-list-section">
      <div className="dog-container">
        <div className="manage-link">
          {" "}
          <Link className="button-link" to="/table">
            Manage <FontAwesomeIcon icon={faScrewdriverWrench} />
          </Link>
        </div>
        <h1 className="title-list">
          Dog List <FontAwesomeIcon icon={faDog} />
        </h1>

        <div className="dog-grid">
          {filteredImages.map((imageUrl, index) => {
            const breedName = extractBreedName(imageUrl);
            const subBreeds = dogSubBreeds[breedName];

            return (
              <div className="dog-card" key={index}>
                <h1 className="name-dog">{breedName}</h1>
                <div className="img-container">
                  <img
                    src={imageUrl}
                    alt={`Dog ${index + 1}`}
                    className="dog-img"
                  />
                </div>
                <div className="dog-info">
                  <h2 className="dog-title">
                    Sub-Breeds:
                    {subBreeds.length > 0 ? (
                      <ul className="sub-breeds">
                        {subBreeds.map((subBreed, subIndex) => (
                          <li key={subIndex}>{subBreed}</li>
                        ))}
                      </ul>
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
