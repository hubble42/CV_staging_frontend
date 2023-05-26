// import React, { useState } from 'react';
// import Select from 'react-select';
// import Videoupload from './videoupload';
// import './App.css'


// function FileUpload(props) {
//   const [file, setFile] = useState(null);
//   const [imageSrc, setImageSrc] = useState(null);
//   const [classes, setClasses] = useState([]);
//   const [selectedObjects, setSelectedObjects] = useState([]);

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('selectedOptions', JSON.stringify(props.selectedOptions));  
//     fetch('http://127.0.0.1:8000/upload_image_file/', {
//       method: 'POST',
//       body: formData,
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         const decodedImage = atob(data.file);
//         const arrayBuffer = new ArrayBuffer(decodedImage.length);
//         const uint8Array = new Uint8Array(arrayBuffer);
  
//         // Convert the decoded image to a Uint8Array
//         for (let i = 0; i < decodedImage.length; i++) {
//           uint8Array[i] = decodedImage.charCodeAt(i);
//         }
  
//         // Create a data URL and set the image source
//         const blob = new Blob([uint8Array], { type: 'image/jpeg' }); // Change the MIME type if the image is in a different format
//         const url = URL.createObjectURL(blob);
//         setImageSrc(url);
//         setClasses(data.classes);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };
  

//   const handleSelectChange = (selectedObjects) => {
//     setSelectedObjects(selectedObjects);
//   };

//   const options = classes.map((classItem) => ({ value: classItem, label: classItem }));

//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <input type="file" accept='image/*' onChange={handleFileChange} />
//         <button className='button' type="submit">Upload</button>
//         {classes.length > 0 && (
//           <Select
//             options={options}
//             value={selectedObjects}
//             isMulti
//             closeMenuOnSelect={false}
//             hideSelectedOptions={false}
//             onChange={handleSelectChange}
//           />
//         )}
//       </form>
//       <div >
//         {imageSrc && <img className='image-container' src={imageSrc} alt="processed" />}
//       </div>
//       <div>
//         <h2 className='heading'>Video Upload:</h2>
//         <Videoupload  handleSelectChange={selectedObjects} />
//       </div>    
//     </>
//   );
// }  

// export default FileUpload;

import React, { useState } from 'react';
import UploadComponent from './uploadcomponent';
import ImageComponent from './imageupload';
import Videoupload from './videoupload';
import './App.css'

function FileUpload() {
  const [imageSrc, setImageSrc] = useState(null);

  const handleImageUpload = (data) => {
    const decodedImage = atob(data);
    const arrayBuffer = new ArrayBuffer(decodedImage.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    // Convert the decoded image to a Uint8Array
    for (let i = 0; i < decodedImage.length; i++) {
      uint8Array[i] = decodedImage.charCodeAt(i);
    }

    // Create a data URL and set the image source
    const blob = new Blob([uint8Array], { type: 'image/jpeg' }); // Change the MIME type if the image is in a different format
    const url = URL.createObjectURL(blob);
    setImageSrc(url);
  };

  return (
    <>
      <UploadComponent onImageUpload={handleImageUpload} />
      <ImageComponent imageSrc={imageSrc} />
      {/* <div>
        <h2 className='heading'>Video Upload:</h2>
        <Videoupload  handleSelectChange={selectedObjects} />
      </div>     */}
    </>
  );
}  

export default FileUpload
