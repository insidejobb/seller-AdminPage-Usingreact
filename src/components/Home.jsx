import React, { useState, useEffect } from "react";
//import classes from "./home.module.css";
import Button from "./Button";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem("products"));
    if (savedProducts) {
      setProducts(savedProducts);
    }
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();

    const pprice = event.target.pprice.value;
    const pname = event.target.pname.value;
    const category = document.getElementById("select").value;

    const newProduct = {
      pprice,
      pname,
      category,
    };

    const updatedProducts = [...products, newProduct];
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setProducts(updatedProducts);

    // Reset form fields
    event.target.reset();
  };

  const handleDelete = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);

    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="pprice">Choose Price: </label>
          <input type="number" id="pprice" required />
          <label htmlFor="pname">Choose dish: </label>
          <input type="text" id="pname" required />
          <label htmlFor="category">Choose a Table </label>
          <select name="category" id="select">
            <option value="TABLE1">TABLE1</option>
            <option value="TABLE2">TABLE2</option>
            <option value="TABLE3">TABLE3</option>
          </select>
          <Button>AddToBill</Button>
        </div>
      </form>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <div>
              <p>Choose Price: {product.pprice}</p>
              <p>Choose dish: {product.pname}</p>
              <p>Choose a table:{product.category}</p>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
