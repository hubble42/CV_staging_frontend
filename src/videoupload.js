import { useState } from "react";
import "./App.css";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { Button, Tooltip } from "@chakra-ui/react";

function Videoupload(props) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);
    const variable = [];
    for (let i = 0; i < props.selectedObjects.length; i++) {
      variable.push(props.selectedObjects[i]["value"]);
    }
    formData.append("selected_options", variable);
    fetch("http://127.0.0.1:8000/uploadvideo/", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          const videoBlob = response.blob();

          return videoBlob;
        }
        throw new Error("Network response was not ok.");
      })
      .then((blob) => {
        const videoObjectUrl = URL.createObjectURL(blob);
        props.setVideoUrl(videoObjectUrl);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error occurred during video upload:", error);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="upload-media">
        <input
          className="block w-full text-md text-gray-900 border border-gray-300 rounded-sm cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          aria-describedby="file_input_help"
          id="file_input"
          type="file"
          accept="video/*"
          onChange={handleFileChange}
        />
        <p
          className="mt-1 text-sm text-gray-500 dark:text-gray-300"
          id="file_input_help"
        >
          MP4 (MAX. 10min).
        </p>
        <Button
          type="submit"
          leftIcon={<AiOutlineCloudUpload fontSize="20px" />}
          colorScheme="teal"
          variant="solid"
          isDisabled={!file}
          size={"sm"}
          loadingText={"Uploading..."}
          isLoading={loading}
        >
          {!file ? (
            <Tooltip label="Please upload a video" aria-label="A tooltip">
              Upload
            </Tooltip>
          ) : (
            "Upload"
          )}
        </Button>
      </form>
    </>
  );
}
export default Videoupload;
