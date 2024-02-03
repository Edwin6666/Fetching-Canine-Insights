import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faSave } from "@fortawesome/free-solid-svg-icons";

const DogTable = ({
  dogs,
  searchTerm,
  editIndex,
  onDelete,
  onEdit,
  onSave,
  onChange,
}) => {
  return (
    <div className="scroll-box">
      <table className="dog-table">
        <thead>
          <tr>
            <th>Dog Name</th>
            <th>Sub-Breed</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dogs.map((dog, index) => (
            <tr key={index}>
              <td>
                {editIndex === index ? (
                  <input
                    type="text"
                    value={dogs[index].name}
                    onChange={(e) => onChange(e, index, "name")}
                  />
                ) : (
                  dog.name
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <input
                    type="text"
                    value={dogs[index].subBreed}
                    onChange={(e) => onChange(e, index, "subBreed")}
                  />
                ) : (
                  dog.subBreed
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <button className="save-btn" onClick={() => onSave(index)}>
                    Save <FontAwesomeIcon icon={faSave} />
                  </button>
                ) : (
                  <button className="edit-btn" onClick={() => onEdit(index)}>
                    Edit <FontAwesomeIcon icon={faEdit} />
                  </button>
                )}
                <button className="delete-btn" onClick={() => onDelete(index)}>
                  Delete <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DogTable;
