// DisplayResult.js
import React from 'react';

function DisplayResult({ imageSrc, videoUrl }) {
  return (
    <div>
      {imageSrc && <img src={imageSrc} alt="processed" />}
      {videoUrl && (
        <div className="video-container">
          <video src={videoUrl} controls />
        </div>
      )}
    </div>
  );
}

export default DisplayResult;