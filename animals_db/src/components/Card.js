import styles from "./Card.module.css";

const Card = ({name, size, continent, diet, type, picture}) =>{


    return (
        <div className={styles.card}>
            <img src={picture} alt={name} />
            <h3>{name}</h3>
            <p>Size: {size}</p> 
            <p>Location: {continent}</p>
            <p>Type: {type}</p>
            <p>Diet: {diet}</p>
        </div>
    )
}

export default Card;