import React, { useState, useRef, useCallback } from 'react';
import { datas } from './datas';
import Editor from './Editor';
import './Custom.css';

const Custom = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAddForm, setShowAddForm] = useState(false);
  const [topicName, setTopicName] = useState('');
  const [topicKeywords, setTopicKeywords] = useState('');
  const [customTopics, setCustomTopics] = useState([]);
  const [showEditor, setShowEditor] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const customTopicsRef = useRef(null);
  const inputRef = useCallback((node) => {
    if (node !== null) {
      node.focus();
    }
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredData =
    selectedCategory === 'All'
      ? datas
      : datas.filter((item) => item.category === selectedCategory);

  const filteredCustomData = customTopics.filter(
    (item) => item.category === 'Custom'
  );

  const handleDeleteTopic = (topicIndex) => {
    if (selectedCategory === 'Custom') {
      const updatedCustomTopics = [...customTopics];
      updatedCustomTopics.splice(topicIndex, 1);
      setCustomTopics(updatedCustomTopics);
    }
  };

  const handleAddTopic = () => {
    setShowAddForm(true);
  };

  const handleSaveTopic = () => {
    const newTopic = {
      category: 'Custom',
      topic: topicName,
      keywords: topicKeywords.split(',').map((keyword) => keyword.trim()),
    };

    setCustomTopics([...customTopics, newTopic]);
    setTopicName('');
    setTopicKeywords('');
    setShowAddForm(false);
  };

  const handleToggleAddForm = () => {
    setShowAddForm((prevState) => !prevState);
    if (customTopicsRef.current) {
      customTopicsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWriteTopic = (topic) => {
    setSelectedTopic(topic);
    setShowEditor(true);
    setTimeout(() => {
      const editorSection = document.getElementById('editorSection');
      if (editorSection) {
        editorSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 0);
  };

  const handleEditorClose = () => {
    setShowEditor(false);
  };

  const handleToggleNav = () => {
    setIsNavOpen((prevState) => !prevState);
  };

  const keywordColors = {
  seo: '#f25565', 
  sales: '#e7f56c', 
  strategy: '#62f255', 
  'own a business': '#e7f56c', 
  'website design': '#f25565', 
  marketing: '#62f255', 
  };

  return (
    <div className="container">
      <nav  className='navbar'>
        <div className={`nav-toggle ${isNavOpen ? 'open' : ''}`} onClick={handleToggleNav}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={`nav-items${isNavOpen ? ' open' : ''}`} ul>
          <li 
            className={selectedCategory === 'All' ? 'active' : ''} 
            onClick={() => handleCategoryChange('All')}
          >
            All
          </li>
          <li
            className={selectedCategory === 'Custom' ? 'active' : ''}
            onClick={() => handleCategoryChange('Custom')}
          >
            Custom
          </li>
          <li
            className={selectedCategory === 'ICP' ? 'active' : ''}
            onClick={() => handleCategoryChange('ICP')}
          >
            ICP
          </li>
          <li
            className={selectedCategory === 'Mission' ? 'active' : ''}
            onClick={() => handleCategoryChange('Mission')}
          >
            Mission
          </li>
          <li
            className={selectedCategory === 'Product' ? 'active' : ''}
            onClick={() => handleCategoryChange('Product')}
          >
            Product
          </li>
        </ul>
      </nav>

      <button className="toggleFormButton" onClick={handleToggleAddForm}>
        Customized Version
      </button>

      <div className="content">
        {selectedCategory === 'Custom' ? (
          filteredCustomData.map((item, index) => (
            <div key={index} className="topic">
              <h2>{item.topic}</h2>
              <div className="keywordContainer">
                {item.keywords.map((keyword, keyIndex) => {
                  const trimmedKeyword = keyword.trim().toLowerCase();
                  const color = keywordColors[trimmedKeyword];
                  return (
                    <span
                      key={keyIndex}
                      className="keyword"
                      style={{ backgroundColor: color }}
                    >
                      {keyword}
                    </span>
                  );
                })}
              </div>
              <button
                className="deleteTopicButton"
                onClick={() => handleDeleteTopic(index)}
              >
                Delete Topic
              </button>
        
              <button
                className="writeButton"
                onClick={() => handleWriteTopic(item.topic)}
              >
                Write &gt;
              </button>
              
            </div>
          ))
        ) : (
          filteredData.map((item, index) => (
            <div key={index} className="topic">
              <h2>{item.topic}</h2>
              <div className="keywordContainer">
                {item.keywords.map((keyword, keyIndex) => {
                  const trimmedKeyword = keyword.trim().toLowerCase();
                  const color = keywordColors[trimmedKeyword];
                  return (
                    <span
                      key={keyIndex}
                      className="keyword"
                      style={{ backgroundColor: color }}
                    >
                      {keyword}
                    </span>
                  );
                })}
              </div>
              <button
                className="writeButton"
                onClick={() => handleWriteTopic(item.topic)}
              >
                Write &gt;
              </button>
             
            </div>
          ))
        )}

        {showAddForm && (
          <div ref={customTopicsRef} className="addForm">
            <h3>Add New Topic</h3>
            <form className="form">
              <div className="input-box">
                <input
                  type="text"
                  placeholder='Topic Name'
                  value={topicName}
                  className="form-input"
                  onChange={(e) => setTopicName(e.target.value)}
                  ref={inputRef}
                />
              </div>
              <div className="input-box">
                <input
                  type="text"
                  placeholder='Keywords(comma-separated)'
                  value={topicKeywords}
                  className="form-input"
                  onChange={(e) => setTopicKeywords(e.target.value)}
                />
                
              </div>
              <button className="form-button" type="button" onClick={handleSaveTopic}>
                Save
              </button>
            </form>
          </div>
        )}

        {showEditor && <Editor onClose={handleEditorClose} />}
      </div>
    </div>
  );
};

export default Custom;