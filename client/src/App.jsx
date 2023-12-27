import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";


function App() {
  const [productlist,setProduceList] = useState([])

const getData = async () => {
  const result = await axios.get("http://localhost:4001/products");
  setProduceList(result.data.data)
  console.log(result),[]
};



const deleteData = async (list) => {
 await axios.delete(`http://localhost:4001/products/${list}`);
 axios.get("http://localhost:4001/products")

}

useEffect (()=>{
getData()
})

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>

      {productlist.map((list,index)=>{
        return (<div key={index} className="product-list">
        <div className="product">
          <div className="product-preview">
            <img
              src={list.image}
              alt="some product"
              width="350"
              height="350"
            />
          </div>
          <div className="product-detail">
            <h1>Product name: {list.name}</h1>
            <h2>Product price: {list.price} Baht</h2>
            <p>Product description: {list.description}</p>
          </div>
          <button className="delete-button" onClick={()=>{
            deleteData(list.id)
          }
          }>x</button>
        </div>
      </div>)
      })}
      
    </div>
  );
}

export default App;
