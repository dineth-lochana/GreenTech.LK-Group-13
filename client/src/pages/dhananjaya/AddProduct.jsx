import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const AddProduct = () => {

  const [Product, setProducts] = useState({
    ProductName: "",
    description: "",
    Category: "",
    Imagepath: null,
    Price: "",
    
  });
  const [error,setError] = useState(false)

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === 'Imagepath') {
      
      setProducts((prev) => ({ ...prev, [e.target.name]: e.target.files[0] }));
    } else {
      setProducts((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('ProductName', Product.ProductName);
      formData.append('description', Product.description);
      formData.append('Category', Product.Category);
      formData.append('Price', Product.Price);
      formData.append('Imagepath', Product.Imagepath);
  
      await axios.post("http://localhost:8800/products", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate("/Product");
    } catch (err) {
      console.log(err);
      setError(true)
    }
  };
  return (
    <div style={{ paddingBottom:'100px' ,paddingTop:'150px'}}>
    <div className="form" >
    <h1 style={{ textAlign: 'center',  fontSize: '30px' }}>Add New Product</h1>
    <input
      type="text"
      placeholder="Product Name"
      name="ProductName"
      onChange={handleChange}
    />
    <textarea
      rows={5}
      type="text"
      placeholder="Product description"
      name="description"
      onChange={handleChange}
    />
    <input
      type="text"
      placeholder="Product price"
      name="Price"
      onChange={handleChange}
    />
 <input type="file" name="Imagepath" onChange={handleChange} accept="image/*" />
       <input
      type="text"
      placeholder="Product Category"
      name="Category"
      onChange={handleChange}
    />
    <button onClick={handleClick}>Add</button>
    {error && "Something went wrong!"}
    
  </div >
  </div>
  )
}

export default AddProduct;
