import styles from '../styles/dropdown.module.css';
import React from 'react';

const Dropdown = ({modify, remove}) => {
  return (
    <div className={styles['dropdown-content']}>
      <p onClick={() => modify(true)}>Modify</p>
      <p onClick={remove}>Delete</p>
    </div>
  );
}

export default Dropdown;