import styles from './Dropdown.module.css';

const Dropdown = ({ label, options, onSelect }) => {

  const handleChange = (event) => {
    onSelect(label, event.target.value); 
  }

  return (
    <div>
      <label className={styles.dropdownLabel}>{label}</label>
      <select className={styles.dropdownSelect} onChange={handleChange}>
        <option value="">Select an option</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;