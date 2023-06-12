import { useState } from "react";
import "./style.css";

const OriginaldataArray = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
]


export default function App(){
  const [dataArray,setdataArray] = useState(OriginaldataArray);
  const [stocked,setstocked] = useState(false);

    function handleSearch(isStocked){
      const value = document.querySelector('.input-btn').value.toLowerCase();
      const newArray = OriginaldataArray.filter(data=>
        data.name.toLowerCase().includes(value) && (!isStocked || data.stocked ) );
      setdataArray(newArray);
    }

    function handleCheckboxChanged(check){
      setstocked(check);
      if(check){
        const newArray = dataArray.filter(data=>data.stocked);
        setdataArray(newArray);
      }
      else{
        handleSearch(false)
      }
    }
      

  return(
    <div className="main-container">
      <SearchBar searchBarFunction={handleSearch} checkboxFunction={handleCheckboxChanged} stocked={stocked}/>
      <ProductTable dataArray={dataArray}/>
    </div>
  )

}

function SearchBar({searchBarFunction, checkboxFunction , stocked}){

    function handleInputChange(){
      searchBarFunction(stocked);
    }

    function handleCheckboxChange(event){
      const check = event.target.checked;
      checkboxFunction(check);
    }
  
  return (
    <form className="searchbar-form">
      <input type="text" className="input-btn" placeholder="search..." onChange={handleInputChange}/> <br />
      <input type="checkbox" id="searchBar-checkbox"  onChange={handleCheckboxChange}/> 
      <label htmlFor="searchBar-checkbox">Only show products in stock</label>
    </form>
  )
}

function ProductTable({dataArray}){
  
  let rows = [];
  let latestCategory = null;
  dataArray.forEach((data,index)=>{
    if(latestCategory != data.category){
      latestCategory = data.category;
      rows.push(
        <tr key={index} className="product-category"> <th> {latestCategory}</th></tr>
      )
    }
    rows.push(<ProductRow data={data}/>)
    
  })
  return(
    <div className="product-table">
        <table>
          <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
          </thead>
          <tbody>
            <tr>{rows}</tr>
          </tbody>
        </table>
    </div>
  )
}

function ProductRow({data}){ 
  let thisname;
  if(data.stocked==false) {
    thisname = <span style={{color:'red'}}>{data.name}</span>
  }else{ thisname = data.name}
     
  return(
    <tr>
      <td>{thisname}</td>
      <td>{data.price}</td>
    </tr>
  )
}