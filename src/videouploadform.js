import { useState } from 'react';

function VideoUploadForm({ handleSelectChange, onFileSelected }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    onFileSelected(selectedFile);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    const variable =[]
    for (let i = 0; i < handleSelectChange.length; i++) {
      variable.push(handleSelectChange[i]['value']);
    }
    formData.append('selected_options', variable);
    fetch('http://127.0.0.1:8000/uploadvideo/', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          const videoBlob = response.blob();

          return videoBlob;
        }
        throw new Error('Network response was not ok.');
      })
      .then((blob) => {
        onFileSelected(null);
      })
      .catch((error) => {
        console.error('Error occurred during video upload:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>
  );
}

export default VideoUploadForm;
