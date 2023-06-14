import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import data from "./data";
import "./editor.css";

const abbreviationDictionary = {
  AI: "Artificial Intelligence",
  ML: "Machine Learning",
  IoT: "Internet of Things",
  CSS: "Cascading Style Sheets",
  HTML: "Hypertext Markup Language",
};

const Editor = ({ onClose, onGenerate }) => {
  const [selectedTone, setSelectedTone] = useState("");
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageWidth, setImageWidth] = useState(50);
  const [imageHeight, setImageHeight] = useState(null);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);
  const { topic } = useParams(); // Retrieve the topic parameter from the URL

  useEffect(() => {
    // Fetch the specific content for the editor based on the topic
    // You can replace this logic with your own data fetching mechanism
    const topicData = data.find((item) => item.topic === topic);
    if (topicData) {
      setSelectedTone(topicData.tone);
      setContent(topicData.content);
    }
  }, [topic]);

  const handleToneChange = (event) => {
    setSelectedTone(event.target.value);
  };

  const handleGenerate = () => {
    const selectedData = data.find((item) => item.tone === selectedTone);
    if (selectedData) {
      const randomIndex = Math.floor(Math.random() * selectedData.descriptions.length);
      const generatedContent = selectedData.descriptions[randomIndex];
      setContent(generatedContent);
    }
  };

  const handleKeyDown = (event) => {
    if (event.ctrlKey && event.key === "z") {
      event.preventDefault();
      handleUndo();
    } else if (event.key === " ") {
      const words = content.split(" ");
      const lastWord = words[words.length - 1];
      const expandedWord = abbreviationDictionary[lastWord.toUpperCase()];
      if (expandedWord) {
        event.preventDefault();
        setContent(content.replace(lastWord, expandedWord));
      }
    } else if (event.key === "ArrowRight") {
      const words = content.split(" ");
      const lastWord = words[words.length - 1];
      const expandedWord = abbreviationDictionary[lastWord.toUpperCase()];
      if (expandedWord) {
        event.preventDefault();
        const expandedContent = content.replace(lastWord, expandedWord);
        setContent(expandedContent);
        textareaRef.current.selectionStart = expandedContent.length;
        textareaRef.current.selectionEnd = expandedContent.length;
      }
    }
  };

  const handleUndo = () => {
    const words = content.trim().split(" ");
    words.pop();
    setContent(words.join(" "));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
    setImageWidth(50); // Reset width to default value
    setImageHeight(null); // Reset height to default value
  };

  const handleImageEdit = () => {
    fileInputRef.current.click();
  };

  const handleImageWidthChange = (event) => {
    const widthValue = parseInt(event.target.value);
    setImageWidth(widthValue);
  };

  const handleImageHeightChange = (event) => {
    const heightValue = parseInt(event.target.value);
    setImageHeight(heightValue);
  };

  return (
    <div id="editorSection" className="editor">
      <h3>Editor</h3>
      <div className="editor-controls">
        <select value={selectedTone} onChange={handleToneChange}>
          <option value="">Select Tone</option>
          {data.map((item) => (
            <option key={item.tone} value={item.tone}>
              {item.tone}
            </option>
          ))}
        </select>
        <button onClick={handleGenerate}>Generate</button>
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={handleImageUpload}
        />
        {selectedImage ? (
          <div className="image-controls">
            <label>
              Width:
              <input type="number" value={imageWidth} onChange={handleImageWidthChange} />
            </label>
            <label>
              Height:
              <input type="number" value={imageHeight || ""} onChange={handleImageHeightChange} />
            </label>
            <button className="edit-image-button" onClick={handleImageEdit}>
              Edit Image
            </button>
            <button className="remove-image-button" onClick={() => setSelectedImage(null)}>
              Remove Image
            </button>
          </div>
        ) : (
          <button className="add-image-button" onClick={handleImageEdit}>
            Add Image
          </button>
        )}
      </div>
      <textarea
        className="editor-textarea"
        ref={textareaRef}
        value={content}
        onChange={(event) => setContent(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      {selectedImage && (
        <div className="selected-image-container" style={{ width: `${imageWidth}px`, height: imageHeight ? `${imageHeight}px` : "auto" }}>
          <img className="selected-image" src={selectedImage} alt="Selected" style={{ width: `${imageWidth}px`, height: imageHeight ? `${imageHeight}px` : "auto" }} />
        </div>
      )}
      <button className="close-button" onClick={onClose}>Close</button>
    </div>
  );
};

export default Editor;