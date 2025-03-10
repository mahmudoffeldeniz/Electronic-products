import React from "react";
import Slider from "../Companents/Carousel";
import ProductList from "./ProductList";
import BrandSlider from "../Companents/Brands";
function HomePage() {
  return (
    <div>
      <Slider />
      <BrandSlider />
      <ProductList />
    </div>
  );
}

export default HomePage;
