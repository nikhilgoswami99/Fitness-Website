import React, { useEffect, useState } from 'react'
import styles from './carousel.module.css'

import img1 from '../../assets/carousel-1.jpg'
import img2 from '../../assets/carousel-2.jpg'
import img3 from '../../assets/carousel-3.png'


function Carousel() {

    const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      image: img1,
      title: "Transform Your Fitness Journey",
      description: "Personalized workouts powered by AI technology"
    },
    {
      image: img2,
      title: "Achieve Your Goals Faster",
      description: "Smart training programs adapted to your progress"
    },
    {
      image: img3,
      title: "Train Smarter, Not Harder",
      description: "Get real-time feedback and advanced analytics"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };




  return (
    <div className={styles.carousel}>
      {slides.map((slide, index) => (
        <div 
          key={index} 
          className={`${styles.slide} ${index === currentSlide ? styles.active : ''}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className={styles.backdropFilter}>
            <div className={styles.content}>
              <h2 className={styles.title}>{slide.title}</h2>
              <p className={styles.description}>{slide.description}</p>
              
              <div className={styles.buttons}>
                <a href="/contact" className={styles.contactBtn}>Contact Us</a>
                <a href="/register" className={styles.registerBtn}>Register Now</a>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      <div className={styles.dots}>
        {slides.map((_, index) => (
          <button 
            key={index} 
            className={`${styles.dot} ${index === currentSlide ? styles.active : ''}`} 
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Carousel
