import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../Styles/DogCrud.css";
import toast from "react-hot-toast";
import DogForm from "./DogForm";
import DogTable from "./DogTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";

const DogCrud = () => {
  const [dogs, setDogs] = useState([]);
  const [formData, setFormData] = useState({ name: "", subBreed: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    axios
      .get("https://dog.ceo/api/breeds/list/all")
      .then((response) => {
        const allBreeds = response.data.message;
        const dogsList = [];

        Object.keys(allBreeds).forEach((breedName) => {
          const subBreeds = allBreeds[breedName];
          if (subBreeds.length > 0) {
            subBreeds.forEach((subBreed) => {
              dogsList.push({ name: breedName, subBreed: subBreed });
            });
          } else {
            dogsList.push({ name: breedName, subBreed: "" });
          }
        });

        setDogs(dogsList);
      })
      .catch((error) => {
        toast.error("Error fetching dog data:", error);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("dogs", JSON.stringify(dogs));
  }, [dogs]);

  const handleChange = (e, index, fieldName) => {
    const { value } = e.target;
    const updatedDogs = [...dogs];
    updatedDogs[index][fieldName] = value;
    setDogs(updatedDogs);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const addDog = () => {
    if (formData.name.trim() === "" || formData.subBreed.trim() === "") {
      toast.error("Please complete all fields");
      return;
    }

    setDogs([...dogs, formData]);
    setFormData({ name: "", subBreed: "" });
    toast.success("Successfully added");
  };

  const deleteDog = (index) => {
    const updatedDogs = [...dogs];
    updatedDogs.splice(index, 1);
    setDogs(updatedDogs);
  };

  const toggleEdit = (index) => {
    setEditIndex(index);
  };

  const saveDog = (index) => {
    setEditIndex(null);
    toast.success("Successfully saved");
  };

  const filteredDogs = dogs.filter((dog) => {
    return (
      dog.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dog.subBreed.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <section className="background-container">
      <div className="container-table">
        <h1 className="title-table">
          Manage Dogs and Sub-breeds <FontAwesomeIcon icon={faPaw} />
        </h1>
        <div className="search-container">
          <input
            className="input"
            type="search"
            placeholder="🔍 Search dogs..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <DogForm
          formData={formData}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
          onSubmit={addDog}
        />
        <DogTable
          dogs={filteredDogs}
          searchTerm={searchTerm}
          editIndex={editIndex}
          onDelete={deleteDog}
          onEdit={toggleEdit}
          onSave={saveDog}
          onChange={handleChange}
        />
      </div>
    </section>
  );
};

export default DogCrud;
