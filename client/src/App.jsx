import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [listProduct, setListProduct] = useState([]);
  const [status, setStatus] = useState("Loading");

  useEffect(() => {
    getListProduct();
  }, []);

  const getListProduct = async () => {
    try {
      const result = await axios.get("http://localhost:4001/products");
      console.log(result);
      setListProduct(result.data.data);
      setStatus("complete");
    } catch {
      setStatus("failed");
    }   
  };

  const deleteProduct = async (productId) => {
    await axios
      .delete(`http://localhost:4001/products/${productId}`)
      .then(getListProduct);
  };
  if (status === "Loading") {
    return  <span>"Loading..."</span>;
  } else if (status === "failed") {
    return <span>"Fetching Error..."</span>;
  }
    return (
      <div className="App">
        <div className="app-wrapper">
          <h1 className="app-title">Products</h1>
        </div>
        <div className="product-list">
          {listProduct.map((item, index) => {
            return (
              <div key={index} className="product">
                <div className="product-preview">
                  <img
                    src={item.image}
                    alt="some product"
                    width="350"
                    height="350"
                  />
                </div>
                <div className="product-detail">
                  <h1>Product name: {item.name}</h1>
                  <h2>Product price: {item.price} Baht</h2>
                  <p>Product description: {item.description}</p>
                </div>
                <button
                  className="delete-button"
                  onClick={() => {
                    deleteProduct(item.id);
                  }}
                >
                  x
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
}

export default App;
