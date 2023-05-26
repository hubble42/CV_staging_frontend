import React, { useState } from "react";
import PreLoadedImages from "./preloadedimages";
import "./App.css";
import ImageComponent from "./imageupload";
import UploadComponent from "./uploadcomponent";
import Videoupload from "./videoupload";
import { AiOutlineClose } from "react-icons/ai";
import { FaAngleRight } from "react-icons/fa";
import { Checkbox } from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  Sidebar,
  //   Menu,
  //   MenuItem,
  //   SubMenu,
  useProSidebar,
} from "react-pro-sidebar";

function Home() {
  const { collapseSidebar, collapsed } = useProSidebar();
  console.log(collapsed);
  const [isChecked, setIsChecked] = useState(false);

  //   const [sidebarOpen, setSidebarOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [imageSrc1, setImageSrc1] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [selectedObjects, setSelectedObjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [options, setoptions] = useState(false);
  function handleCheckboxChange() {
    setIsChecked(!isChecked);
  }
  const handleImageUpload = (data) => {
    setLoading(true);
    const decodedImage = atob(data);
    const arrayBuffer = new ArrayBuffer(decodedImage.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    // Convert the decoded image to a Uint8Array
    for (let i = 0; i < decodedImage.length; i++) {
      uint8Array[i] = decodedImage.charCodeAt(i);
    }

    // Create a data URL and set the image source
    const blob = new Blob([uint8Array], { type: "image/jpeg" }); // Change the MIME type if the image is in a different format
    const url = URL.createObjectURL(blob);
    setTimeout(() => {
      setImageSrc(url);
      setLoading(false);
    }, 2000);
  };
  const handleImageUpload1 = (data) => {
    setLoading(true);
    const decodedImage = atob(data);
    const arrayBuffer = new ArrayBuffer(decodedImage.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    // Convert the decoded image to a Uint8Array
    for (let i = 0; i < decodedImage.length; i++) {
      uint8Array[i] = decodedImage.charCodeAt(i);
    }

    // Create a data URL and set the image source
    const blob = new Blob([uint8Array], { type: "image/jpeg" }); // Change the MIME type if the image is in a different format
    const url = URL.createObjectURL(blob);
    setTimeout(() => {
      setImageSrc1(url);
      setLoading(false);
    }, 2000);
  };
  const handleSelectChange = (selectedObjects) => {
    setSelectedObjects(selectedObjects);
  };
  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        minHeight: "100vh",
      }}
    >
      <Sidebar>
        <div className="sidebar-main">
          <div className="sidebar-item">
            <h2>Select Option</h2>
          </div>

          <div className="sidebar-item">
            <Checkbox
              size="md"
              colorScheme="green"
              defaultChecked
              isChecked={isChecked}
              onChange={handleCheckboxChange}
            >
              Custom image
            </Checkbox>
          </div>

          <motion.div
            layout
            transition={{ duration: 0.3 }}
            className={` ${isChecked ? "mang-padding" : ""} sidebar-item`}
          >
            {!isChecked && (
              <>
                <div>
                  <PreLoadedImages handleSelectChange={handleSelectChange} />
                </div>
                <h1>Video Upload:</h1>
                <Videoupload
                  loading={loading}
                  selectedObjects={selectedObjects}
                  setVideoUrl={setVideoUrl}
                />
              </>
            )}
          </motion.div>

          <motion.div
            layout
            transition={{ duration: 0.3 }}
            className={` ${isChecked ? "" : "mang-padding"} sidebar-item`}
          >
            {isChecked && (
              <div>
                <h1>Image Upload:</h1>
                <UploadComponent
                  loading={loading}
                  setoptions={setoptions}
                  onImageUpload={handleImageUpload}
                  onImageUpload1={handleImageUpload1}
                  handleSelectChange={handleSelectChange}
                />
                <h1>Video Upload:</h1>
                <Videoupload
                  loading={loading}
                  selectedObjects={selectedObjects}
                  setVideoUrl={setVideoUrl}
                />
              </div>
            )}
          </motion.div>
        </div>
        <div className={` ${collapsed ? "menu-icon-in" : "menu-icon-out"} `}>
          <button onClick={() => collapseSidebar()}>
            {collapsed ? (
              <div className="sidebar-icons">
                <FaAngleRight />
              </div>
            ) : (
              <div className="sidebar-icons">
                <AiOutlineClose />
              </div>
            )}
          </button>
        </div>
      </Sidebar>

      {/* main-content */}

      <div className="main-content container mx-auto px-24 py-12">
        {imageSrc || videoUrl ? (
          <ImageComponent
            options={options}
            imageSrc={imageSrc}
            imageSrc1={imageSrc1}
            videoUrl={videoUrl}
            isChecked={isChecked}
          />
        ) : (
          <div>
            <h1>Object Detection</h1>
            <p>
              Object detection is a computer vision task that involves detecting
              and localizing objects within an image or video stream. The goal
              of object detection is to identify objects of interest in an image
              and draw bounding boxes around them to indicate their location.
              Object detection algorithms typically use deep learning
              techniques, such as convolutional neural networks (CNNs), to
              extract features from images and classify them into different
              object classes. These algorithms are trained on large datasets of
              labeled images to learn how to recognize different objects in
              various contexts. There are several popular object detection
              frameworks, including Faster R-CNN, YOLO (You Only Look Once), and
              SSD (Single Shot Detector). These frameworks differ in their
              approach to detecting objects, but all aim to achieve high
              accuracy and real-time performance. Object detection has numerous
              applications, including autonomous vehicles, surveillance systems,
              medical imaging, and industrial automation.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
export default Home;
