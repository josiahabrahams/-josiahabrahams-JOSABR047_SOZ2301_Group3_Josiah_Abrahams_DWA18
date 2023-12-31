import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css'
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
/**
 * @typedef {Object} ShowsPreviewData
 * @prop {string} title - title of show
 * @prop {string} image - image of show
 * 
 */
 
 /**
  * @typedef {Object} ShowsPreview
  * @prop {ShowsPreviewData} showsPreview
  * 
  */
/**
 * this component is the carousel piece that use the data from the api to produce five randaom slide 
 * pieces that contain the picture and image
 * @param {ShowsPreview} props 
 * @returns 
 */
export const Carousel = (props) => {
  /** produces random numbers used to select 5 random show from the the object {@link showsPreview} in the App component */
  const randomNumber =()=> Math.floor(Math.random()*51)
   const slide1 = props.showsPreview[randomNumber()]
   const slide2 = props.showsPreview[randomNumber()]
   const slide3 = props.showsPreview[randomNumber()]
   const slide4 = props.showsPreview[randomNumber()]
   const slide5 = props.showsPreview[randomNumber()]
  
    return (
  <div style={{margin:'10%'}}>
    <Swiper
    // install Swiper modules
    modules={[Navigation, Pagination, Scrollbar, A11y]}
    spaceBetween={50}
    slidesPerView={1}
    navigation
    pagination={{ clickable: true }}
    
  >

      <SwiperSlide>
        <div style={{textAlign:'center'}}>
          <img src={slide1.image} style={{width:'45%'}}/>
          <div>{slide1.title}</div>
        </div>
        </SwiperSlide>
      <SwiperSlide>
        <div style={{textAlign:'center'}}>
          <img src={slide2.image} style={{width:'45%'}}/>
          <div>{slide2.title}</div>
        </div>
        </SwiperSlide>
      <SwiperSlide>
        <div style={{textAlign:'center'}}>
          <img src={slide3.image} style={{width:'45%'}}/>
          <div>{slide3.title}</div>
        </div>
        </SwiperSlide>
      <SwiperSlide>
        <div style={{textAlign:'center'}}>
          <img src={slide4.image} style={{width:'45%'}}/>
          <div>{slide4.title}</div>
        </div>
        </SwiperSlide>
      <SwiperSlide>
        <div style={{textAlign:'center'}}>
          <img src={slide5.image} style={{width:'45%'}}/>
          <div>{slide5.title}</div>
        </div>
        </SwiperSlide>
    </Swiper>
    </div>
  );
};