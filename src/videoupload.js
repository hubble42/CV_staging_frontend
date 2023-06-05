// import { useState, useEffect } from "react";
// import "./App.css";
// import { AiOutlineCloudUpload } from "react-icons/ai";
// import { Button, Tooltip } from "@chakra-ui/react";

// function Videoupload(props) {
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   // const [videoUrll, setVideoUrll] = useState(null);

//   const handleFileChange = (event) => {
//     const uploadedFile = event.target.files[0];
//     setFile(uploadedFile);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const formData = new FormData();
//     formData.append("file", file);
//     setLoading(true);
//     const variable = [];
//     for (let i = 0; i < props.selectedObjects.length; i++) {
//       variable.push(props.selectedObjects[i]["value"]);
//     }
//     formData.append("selected_options", variable);
//     fetch("http://127.0.0.1:8000/uploadvideo/", {
//       method: "POST",
//       body: formData,
//     })
//       .then((response) => {
//         if (response.ok) {
//           return response.blob(); // Get the video blob from the response
//         }
//         throw new Error("Network response was not ok.");
//       })
//       .then((blob) => {
//         const videoObjectUrl = URL.createObjectURL(blob);
//         props.setVideoUrl(videoObjectUrl); // Set the video URL
//         props.setFilePath(file);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error occurred during video upload:", error);
//       });
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit} className="upload-media">
//         <input
//           className="block w-full text-md text-gray-900 border border-gray-300 rounded-sm cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
//           aria-describedby="file_input_help"
//           id="file_input"
//           type="file"
//           accept="video/*"
//           onChange={handleFileChange}
//         />
//         <p
//           className="mt-1 text-sm text-gray-500 dark:text-gray-300"
//           id="file_input_help"
//         >
//           MP4 (MAX. 10min).
//         </p>
//         <Button
//           type="submit"
//           leftIcon={<AiOutlineCloudUpload fontSize="20px" />}
//           colorScheme="teal"
//           variant="solid"
//           isDisabled={!file}
//           size={"sm"}
//           loadingText={"Uploading..."}
//           isLoading={loading}
//         >
//           {!file ? (
//             <Tooltip label="Please upload a video" aria-label="A tooltip">
//               Upload
//             </Tooltip>
//           ) : (
//             "Upload"
//           )}
//         </Button>
//       </form>
//     </>
//   );
// }
// export default Videoupload;
import React, { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { Button, Tooltip } from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";

function Videoupload(props) {
  // const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  // const handleFileChange = (acceptedFiles) => {
  //   if (acceptedFiles && acceptedFiles.length > 0) {
  //     setFile(acceptedFiles[0]);
  //   }
  // };
  // const { getRootProps, getInputProps, isDragActive } = useDropzone({
  //   accept: "video/mp4",
  //   maxFiles: 1,
  //   onDrop: handleFileChange,
  // });

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", props.file);
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
          // const ok = <p>File uploaded successfully!</p>;
          return response.blob(); // Get the video blob from the response
        }
        throw new Error(alert("Network response was not ok."));
      })
      .then((blob) => {
        const videoObjectUrl = URL.createObjectURL(blob);
        props.setVideoUrl(videoObjectUrl); // Set the video URL
        // props.setFilePath(getInputProps());
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error occurred during video upload:", error);
      });
  };

  return (
    <div className="upload-media">
      <div
        {...props.getRootProps()}
        className={`dropzone ${props.isDragActive ? "active" : ""}`}
      >
        <input {...props.getInputProps()} />
        {props.file ? (
          <p>
            File uploaded successfully!
            <br />
            Now click on upload to run it.
          </p>
        ) : (
          <>
            {props.isDragActive ? (
              <p>Drop the video file here...</p>
            ) : (
              <p>Drag and drop a video file here, or click to select</p>
            )}
          </>
        )}
      </div>
      <Button
        type="submit"
        leftIcon={<AiOutlineCloudUpload fontSize="20px" />}
        colorScheme="teal"
        variant="solid"
        isDisabled={!props.file}
        size={"sm"}
        loadingText={"Uploading..."}
        isLoading={loading}
        onClick={handleSubmit}
      >
        {!props.file ? (
          <Tooltip label="Please upload a video" aria-label="A tooltip">
            Upload
          </Tooltip>
        ) : (
          "Upload"
        )}
      </Button>
    </div>
  );
}

export default Videoupload;
