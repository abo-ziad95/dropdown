import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import './styles.css';
import { api, keyEvent } from './constants';

const CustomSelect = ({ onChange }) => {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const selectRef = useRef(null);

  useEffect(() => {
    const fetchOptions = async () => {
      const response = await fetch(api.URL, {
        headers: {
          'X-Parse-Application-Id': api.ID, // This is the fake app's application id
          'X-Parse-Master-Key': api.KEY, // This is the fake app's readonly master key
        },
      });
      const data = await response.json();
      setOptions(data.results);
    };

    fetchOptions();
  }, []);

  const handleOptionClick = ({ Name }) => {
    setSelectedOption(Name);
    setIsOpen(false);
    if (onChange) {
      onChange(Name);
    }
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleBlur = () => {
    setIsOpen(false);
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case keyEvent.ARROW_DOWN:
        setActiveIndex((prevIndex) => Math.min(prevIndex + 1, options.length - 1));
        break;
      case keyEvent.ARROW_UP:
        setActiveIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        break;
      case keyEvent.ENTER:
        if (activeIndex >= 0) {
          handleOptionClick(options[activeIndex]);
        }
        break;
      case keyEvent.SPACE:
        setIsOpen(!isOpen);
        break;
      case keyEvent.ESCAPE:
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (isOpen && activeIndex >= 0) {
      const activeElement = selectRef.current.querySelector(`.option:nth-child(${activeIndex + 1})`);
      activeElement.scrollIntoView({ block: 'nearest' });
    }
  }, [isOpen, activeIndex]);

  return (
    <div className="custom-select" onBlur={handleBlur} tabIndex="0" onKeyDown={handleKeyDown} ref={selectRef}>
      <div className="selected-option" onClick={handleToggle}>
        {selectedOption || 'Select an option'}
      </div>
      {isOpen && (
        <div className="options-container">
          {options.map((option, index) => (
            <div
              key={option.objectId}
              className={`option ${index === activeIndex ? 'active' : ''}`}
              onClick={() => handleOptionClick(option)}
              onMouseEnter={() => setActiveIndex(index)}
            >
              {option.Name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

CustomSelect.propTypes = {
  onChange: PropTypes.func,
};

export default CustomSelect;
