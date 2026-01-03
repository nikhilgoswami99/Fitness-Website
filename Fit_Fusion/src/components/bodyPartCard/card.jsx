/*
  Component: Card (BodyPartCard)
  Purpose: Small clickable card representing an exercise body part.
  Props:
  - `obj` : { type, imageUrl } - displays the card content.
  - `handleCardClick(type)` : function invoked when user clicks the card.
  Notes:
  - Pure presentational component; click handler is passed from parent.
*/
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
