import React from "react";
import axios from "axios";
import Hero from "../Hero";
import ExampleSection from "../ExampleSection";
import ProductsForm from "../ProductsForm";

function Homepage() {
  const BASE_URL = "http://localhost:3001";

  const analyzeProducts = async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/products/analyze`, data);
      console.log('Success:', response.data);
    } catch (err) {
      console.error(`Something went wrong: ${err}`);
    }
  }

  return (
    <div className="Homepage">
      <Hero />
      <ExampleSection />
      <ProductsForm analyzeProducts={analyzeProducts} />
    </div>
  );
}

export default Homepage;