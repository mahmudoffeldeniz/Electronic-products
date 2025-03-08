import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import "../assets/Carousel.css";

import { Navigation, Pagination, Autoplay } from "swiper/modules";

export default function App() {
  return (
    <>
      <Swiper
        rewind={true}
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        modules={[Navigation, Pagination, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img
            src="https://m-cdn.phonearena.com/images/review/6766-wide-two_1200/Samsung-Galaxy-A36-5G-vs-Galaxy-S25-Predestined-outcome.jpg?1740993804"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://www.androidheadlines.com/wp-content/uploads/2023/03/best-att-phones-AH-oct-23-1420x799.webp"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://humenglish.com/wp-content/uploads/2023/09/iPhone-14-Pro-vs-iPhone-15-Pro-Feature-2.jpg"
            alt=""
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
