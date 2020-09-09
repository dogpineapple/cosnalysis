import React from "react";
import "./Hero.css";

function Hero() {
  return (
    <div className="Hero">
      <img src="https://previews.123rf.com/images/pinkasevich/pinkasevich1907/pinkasevich190700019/127235504-cosmetic-set-of-blank-label-bottles-for-mockup-packaging-of-skincare-product-cream-serum-oil-shampoo.jpg" alt="stock-skincare" />
      <p className="Hero-description Hero-description-p1">Curious about your everyday products? </p>
      <p className="Hero-description Hero-description-p2">Sukin.ly provides statistical information on your skincare products with visuals.</p>
    </div>
  );
}

export default Hero;