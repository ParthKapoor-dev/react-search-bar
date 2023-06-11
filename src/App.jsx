import { useState , useEffect} from "react";
import "./style.css";

const OriginaldataArray = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
]
// const seconddataArray=[
//   { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
//   { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
//   { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
//   { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
// ]


export default function App(){
  const [dataArray,setdataArray] = useState(OriginaldataArray);
  const [stocked,setstocked] = useState(false);

      function searchBarFunction(valueOfStocked){
      let inputBtn = document.querySelector('.input-btn');
      let newArray=[];

      OriginaldataArray.forEach(originalData=>{

        let Name = originalData.name.split('');
        let value = inputBtn.value.split('');
          if(value.every(ValueLetter=>{
            return(Name.some(NameLetter=>(NameLetter.toLowerCase()==ValueLetter.toLowerCase())))
          })) {
            if(valueOfStocked && !originalData.stocked) return
            else newArray.push(originalData);
          }                       
      });
      setdataArray(newArray);

    }
    function checkboxChanged(check){
      setstocked(check);
      if(!stocked){
        let newArray=[];
        dataArray.forEach(Data=>{
          if(Data.stocked) newArray.push(Data)
        });
        setdataArray(newArray);
      }else{
        searchBarFunction(false);
      }
      
    }

  return(
    <div className="main-container">
      <SearchBar searchBarFunction={searchBarFunction} stockedfunc={checkboxChanged} stocked={stocked}/>
      <ProductTable dataArray={dataArray}/>
    </div>
  )

}

function SearchBar({searchBarFunction,stockedfunc , stocked}){

  
  return (
    <form className="searchbar-form">
      <input type="text" className="input-btn" placeholder="search..." onChange={()=>searchBarFunction(stocked)}/> <br />
      <input type="checkbox" id="searchBar-checkbox"  onChange={(e)=>stockedfunc(e.target.checked)}/> 
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