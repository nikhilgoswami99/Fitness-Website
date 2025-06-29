import React, { useState } from 'react'
import styles from './workout.module.css'

import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);


  const getworkouts = async () => {
    let data = [
      {
        type: 'Chest',
        imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
        durationInMin: 30
      },
      {
        type: 'Abs',
        imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWJzJTIwd29ya291dHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
        durationInMin: 90
      },
      {
        type: 'Shoulder',
        imageUrl: 'https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
        durationInMin: 40
      },
      {
        type: 'Back',
        imageUrl: 'https://images.unsplash.com/photo-1603287681836-b174ce5074c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmFjayUyMHdvcmtvdXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
        durationInMin: 70
      },
      {
        type: 'Biceps',
        imageUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
        durationInMin: 50
      },
      {
        type: 'Triceps',
        imageUrl: 'https://images.unsplash.com/photo-1530822847156-5df684ec5ee1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dHJpY2Vwc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
        durationInMin: 60
      },

      {
        type: 'Legs',
        imageUrl: 'https://images.unsplash.com/photo-1434608519344-49d77a699e1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGVnJTIwd29ya291dHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
        durationInMin: 80
      },

      {
        type: 'Cardio',
        imageUrl: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y2FyZGlvfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
        durationInMin: 100
      },
      {
        type: 'Forearms',
        imageUrl: 'https://images.unsplash.com/photo-1591940742878-13aba4b7a34e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9yZWFybXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
        durationInMin: 110
      }
    ]
    setWorkouts(data)
  }
  React.useEffect(() => {
    getworkouts()
  }, [])



  return (
    <div>
      <h1 className={styles.workoutsHeading}>Workouts</h1>

      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{ clickable: true}}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 10 },
          768: { slidesPerView: 4, spaceBetween: 20 },
          1024: { slidesPerView: 5, spaceBetween: 30 },
        }}
        modules={[Pagination]}
        className={styles.mySwiper}
      >
        {workouts && workouts.map((item, index) => (
          <SwiperSlide key={index}>
            <div
              className={styles.swiperSlide}
              style={{
                backgroundImage: `url(${item.imageUrl})`,
              }}
              onClick={() => {
                window.location.href = `/workout/${item.type}`;
              }}
            >
              <div className={styles.swiperSlideContent}>
                <h2>{item.type}</h2>
                <p>{item.durationInMin} min</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  )
}

export default Workouts
