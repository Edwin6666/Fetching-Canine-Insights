import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const DogForm = ({ formData, onChange, onSubmit }) => {
  return (
    <div className="form">
      <input
        type="text"
        name="name"
        value={formData.name}
        placeholder="Dog Name"
        required
        onChange={onChange}
      />
      <input
        type="text"
        name="subBreed"
        value={formData.subBreed}
        placeholder="Sub-Breed"
        required
        onChange={onChange}
      />
      <button className="button-add" onClick={onSubmit}>
        Add Dog <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  );
};

export default DogForm;
