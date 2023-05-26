import React, { useState, useEffect } from "react";
import Select from "react-select";

function PreLoadedImages(props) {
  const [objects, setObjects] = useState([]);
  const [selectedObjects, setSelectedObjects] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/pre-loaded-images/")
      .then((response) => response.json())
      .then((data) => setObjects(data.objects))
      .catch((error) => console.error(error));
  }, []);

  const options = objects.map((object) => ({ value: object, label: object }));
  console.log(objects);
  return (
    <>
      <div className="media">
        <h1>Pre-loaded Images:</h1>
        {objects.length > 0 && (
          <Select
            options={options}
            value={selectedObjects}
            isMulti
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            onChange={(selectedObjects) => {
              props.handleSelectChange(selectedObjects);
              setSelectedObjects(selectedObjects);
            }}
          />
        )}
      </div>
    </>
  );
}

export default PreLoadedImages;
