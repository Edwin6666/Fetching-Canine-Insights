import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Styles/Welcome.css";
import axios from "axios";
import toast from "react-hot-toast";

function Welcome() {
  const [dogImageUrl, setDogImageUrl] = useState("");

  useEffect(() => {
    axios
      .get("https://dog.ceo/api/breeds/image/random")
      .then((response) => {
        setDogImageUrl(response.data.message);
      })
      .catch((error) => {
        toast.error("Error fetching dog image:", error);
      });
  }, []);

  return (
    <main className="container">
      <section className="content">
        <div className="image-container">
          {dogImageUrl && <img src={dogImageUrl} alt="Dog" className="image" />}
        </div>
        <div className="text-container">
          <h2 className="category">Canine lover</h2>
          <h1 className="title">Isn't it true that we all like dogs?</h1>
          <p className="description">
            Do you love four-legged friends and want to enjoy a daily dose of
            canine cuteness? Then you are in the right place! Our app brings you
            a random selection of the most adorable images of dogs from around
            the world.
          </p>
          <Link to="/list" className="button">
            Discover More
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Welcome;
