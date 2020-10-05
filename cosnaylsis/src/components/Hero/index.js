import React from "react";
import "./Hero.css";

function Hero() {
  return (
    <div className="Hero">
      <div className="Hero-image"></div>
      <div className="Hero-about">
        <h1 className="Hero-description Hero-description-p1 typewriter">Curious about your everyday products? </h1>
        <h3 className="Hero-description Hero-description-p2">Cosnalysis provides statistical information on your skincare products with visuals.</h3>
      </div>
    </div>
  );
}

export default Hero;