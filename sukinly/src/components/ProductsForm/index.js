import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./ProductsForm.css";

/**
 * ProductsForm renders a controlled form for product names. 
 */
function ProductsForm({ analyzeProducts }) {
  const INITIAL_STATE = { product1: "", product2: "", product3: "", product4: "", product5: "" }
  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleChange = (evt) => {
    let { name, value } = evt.target;
    setFormData(currData => ({ ...currData, [name]: value }));
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    analyzeProducts(formData);
    console.log("submitted");
  }

  return (
    <div className="ProductsForm">
      <div className="ProductsForm-banner">Put in your 5 most used products and we'll let you know your skincare routine's stats!</div>
      <Form onSubmit={handleSubmit}>
        <Form.Control type="text" name="product1" value={formData.product1} onChange={handleChange} placeholder="Product #1" />
        <Form.Control type="text" name="product2" value={formData.product2} onChange={handleChange} placeholder="Product #2" />
        <Form.Control type="text" name="product3" value={formData.product3} onChange={handleChange} placeholder="Product #3" />
        <Form.Control type="text" name="product4" value={formData.product4} onChange={handleChange} placeholder="Product #4" />
        <Form.Control type="text" name="product5" value={formData.product5} onChange={handleChange} placeholder="Product #5" />
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
}

export default ProductsForm;