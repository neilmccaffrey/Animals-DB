import { useState } from "react";
import Dropdown from "./components/Dropdown";
import styles from './App.module.css';
import axios from 'axios';
import Card from "./components/Card";

export default function App() {
  const [filters, setFilters] = useState({
    Size: '',
    Continent: '',
    Type: '',
    Diet: ''
  });
  const [animals, setAnimals] = useState([]);

  const handleSelect = (dropdownLabel, value) => {
    // Update the corresponding filter in the state
    setFilters((prevFilters) => ({
      ...prevFilters,
      [dropdownLabel]: value
    }));
  }

  const handleClick = () => {
    // Create a params object with only non-empty filter values
  const params = {};
  Object.keys(filters).forEach((key) => {
    if (filters[key]) {
      params[key.toLowerCase()] = filters[key]; // Convert key to lowercase for backend compatibility
    }
  });

  // Send request to backend with selected filters
  axios
    .get(`http://localhost:3001/search`, { params })
    .then((response) => {
      setAnimals(response.data); // Update state with search results
    })
    .catch((error) => console.error('Error fetching animals:', error));
  }

    
  return (
    <>
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
    options={['Mammal', 'Bird', 'Reptile', 'Amphibian']}
    onSelect={handleSelect} 
    />
    <Dropdown 
    label="Diet" 
    options={['Insectivore', 'Herbivore', 'Carnivore', 'Omnivore']}
    onSelect={handleSelect} 
    />
    <button className={styles.button} onClick={handleClick}>Search</button>
    </div>
    <div className={styles.cardContainer}>
        {animals.map((animal, idx) => (
          <Card key={idx} name={animal.name} size={animal.size} continent={animal.continent} diet={animal.diet} type={animal.type} picture={animal.picture} />
        ))}
    </div>
    </>
  );
}