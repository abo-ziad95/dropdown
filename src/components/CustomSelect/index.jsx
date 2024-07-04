import React, { useState, useEffect, useRef, memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { FixedSizeList as List } from 'react-window';

import styles from './CustomSelect.module.css';
import { keyEvent } from './constants';

const CustomSelect = ({ options, loading, onChange }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [isOpen, setIsOpen] = useState(true);
  const [activeIndex, setActiveIndex] = useState(-1);
  const selectRef = useRef(null);
  const listRef = useRef(null);

  const handleOptionClick = useCallback(({ Name }) => {
    setSelectedOption(Name);
    setIsOpen(false);
    if (onChange) {
      onChange(Name);
    }
  }, [onChange]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleBlur = () => {
    setIsOpen(false);
  };

  const handleKeyDown = (event) => {
    switch (event.key) {
      case keyEvent.ARROW_DOWN:
        setIsOpen(true);
        setActiveIndex((prevIndex) => Math.min(prevIndex + 1, options.length - 1));
        break;
      case keyEvent.ARROW_UP:
        setActiveIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        break;
      case keyEvent.ENTER:
        setIsOpen(true);
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
    if (isOpen && activeIndex >= 0 && listRef.current) {
      listRef.current.scrollToItem(activeIndex, 'center');
    }
  }, [isOpen, activeIndex]);

  const Row = useCallback(
    ({ index, style }) => (
      <div
        key={options[index].objectId}
        className={`option ${index === activeIndex ? styles.active : ''}`}
        onClick={() => handleOptionClick(options[index])}
        onMouseEnter={() => setActiveIndex(index)}
        style={style}
      >
        {options[index].Name}
      </div>
    ),
    [options, activeIndex, handleOptionClick],
  );

  return (
    <div className={styles.customSelect} onBlur={handleBlur} tabIndex="0" onKeyDown={handleKeyDown} ref={selectRef}>
      <div className={styles.selectedOption} onClick={handleToggle}>
        {selectedOption || 'Select an option'}
      </div>
      {isOpen && (
        <div className={styles.optionsContainer}>
          {loading ? (
            <div className={styles.loader}>Loading...</div>
          ) : (

            <List
              height={200}
              itemCount={options.length}
              itemSize={35}
              width={198}
              ref={listRef}
            >
              {Row}
            </List>
          )}
        </div>
      )}
    </div>
  );
};

CustomSelect.propTypes = {
  options: PropTypes.array,
  loading: PropTypes.bool,
  onChange: PropTypes.func,
};

export default memo(CustomSelect);
