import React, { useState } from "react";
import Select from "react-select";
import "./App.css";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { Button, Tooltip } from "@chakra-ui/react";

// import { Button, ButtonGroup } from "@chakra-ui/react";

function UploadComponent(props) {
  const [file, setFile] = useState(null);
  const [classes, setClasses] = useState([]);
  const [selectedObjects, setSelectedObjects] = useState([]);
  // const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    // formData.append('selectedOptions', JSON.stringify(props.selectedOptions));
    fetch("http://127.0.0.1:8000/upload_image_file/", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setClasses(data.classes);
        props.onImageUpload(data.file);
        props.onImageUpload1(data.file1);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const options = classes.map((classItem) => ({
    value: classItem,
    label: classItem,
  }));

  return (
    <form onSubmit={handleSubmit} className="upload-media">
      <input
        type="file"
        className="block w-full text-md text-gray-900 border border-gray-300 rounded-sm cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        accept="image/*"
        onChange={handleFileChange}
      />
      <p
        className="mt-1 text-sm text-gray-500 dark:text-gray-300"
        id="file_input_help"
      >
        PNG or JPG (MAX. 800x400px).
      </p>
      <div className="mb-5">
        <Button
          type="submit"
          leftIcon={<AiOutlineCloudUpload fontSize="20px" />}
          colorScheme="teal"
          variant="solid"
          isDisabled={!file}
          size={"sm"}
          loadingText={"Uploading..."}
          isLoading={props.loading}
        >
          {!file ? (
            <Tooltip label="Please upload a image" aria-label="A tooltip">
              Upload
            </Tooltip>
          ) : (
            "Upload"
          )}
        </Button>
      </div>
      {classes.length > 0 && (
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
    </form>
  );
}

export default UploadComponent;
