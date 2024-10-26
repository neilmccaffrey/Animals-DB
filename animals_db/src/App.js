import { useEffect, useState } from "react";
import Dropdown from "./components/Dropdown";
import styles from './App.module.css';

export default function App() {
  const [filters, setFilters] = useState({
    Size: '',
    Continent: '',
    Type: '',
    Diet: ''
  });

  useEffect(() => {
    console.log('Filters updated:', filters);
  }, [filters]);

  const handleSelect = (dropdownLabel, value) => {
    // Update the corresponding filter in the state
    setFilters((prevFilters) => ({
      ...prevFilters,
      [dropdownLabel]: value
    }));
  }

  const handleClick = () => {
    alert("clicked");
  }

    
  return (
    <div className={styles.row}>
    <Dropdown 
    label="Size" 
    options={['Small', 'Medium', 'Large', 'Extra Large']}
    onSelect={handleSelect} 
    />
    <Dropdown 
    label="Continent" 
    options={['North America', 'South America', 'Europe', 'Asia', 'Africa', 'Australia', 'Antartica']}
    onSelect={handleSelect} 
    />
    <Dropdown 
    label="Type" 
    options={['Mammals', 'Birds', 'Reptiles', 'Amphibians']}
    onSelect={handleSelect} 
    />
    <Dropdown 
    label="Diet" 
    options={['Insectivore', 'Herbivore', 'Carnivore', 'Omnivore']}
    onSelect={handleSelect} 
    />
    <button className={styles.button} onClick={handleClick}>Search</button>
    </div>
  );
}