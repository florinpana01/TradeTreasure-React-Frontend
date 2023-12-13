import React, { useState, useEffect } from 'react';

function Product() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8001/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array ensures useEffect runs only once (on mount)

  return (
    <div className="product-list">
      <h2>Product List</h2>
      {products.map((product) => (
        <div key={product.id} className="product">
          <h3>{product.title}</h3>
          <p>Description: {product.description}</p>
          <p>Category: {product.category}</p>
          {/* <p>Price: ${product.price.toFixed(2)}</p> */}
          {/* Add more product information here */}
        </div>
      ))}
    </div>
  );
}

export default Product;
