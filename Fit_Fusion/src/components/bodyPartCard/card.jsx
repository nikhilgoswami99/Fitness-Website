import React from 'react'
import styles from './card.module.css'

function Card(props) {

  
  return (
    <div onClick={() => {props.handleCardClick(props.obj.type)}} className={styles.card}>
      <img className={styles.cardImg} src={props.obj.imageUrl} alt="" />
      <div>
        <h2  className={styles.heading}>{props.obj.type}</h2>
      </div>
    </div>
  )
}

export default Card
