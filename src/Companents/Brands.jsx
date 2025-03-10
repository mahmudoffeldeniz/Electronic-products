import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import "../assets/BrandSlider.css";

import { Navigation, Autoplay } from "swiper/modules";

export default function BrandSlider() {
  return (
    <Swiper
      spaceBetween={20}
      loop={true}
      autoplay={{ delay: 2000, disableOnInteraction: false }}
      navigation={false}
      modules={[Navigation, Autoplay]}
      className="brandSlider"
      breakpoints={{
        0: { slidesPerView: 3 }, // Mobil: 2 logo
        768: { slidesPerView: 5 }, // Desktop: 5 logo
      }}
      pagination={false}
    >
      <SwiperSlide>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/2560px-Samsung_Logo.svg.png"
          alt="Brand 1"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://loodibee.com/wp-content/uploads/iPhone-logo.png"
          alt="Brand 2"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://cdn.freebiesupply.com/logos/large/2x/sony-2-logo-png-transparent.png"
          alt="Brand 3"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Logitech_logo.png"
          alt="Brand 4"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://images.seeklogo.com/logo-png/32/2/novo-lg-logo-png_seeklogo-320154.png"
          alt="Brand 5"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://companylogos.org/wp-content/uploads/2024/08/Xiaomi-2021-300x169.png"
          alt="Brand 6"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://www.freepnglogos.com/uploads/dell-png-logo/dell-png-logo-emblem-19.png"
          alt="Brand 7"
        />
      </SwiperSlide>
    </Swiper>
  );
}
