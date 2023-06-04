let forms=document.getElementById('my-form');
forms.addEventListener('submit',userInput);
let price=document.getElementById('price');
let product=document.getElementById('product');
let category=document.getElementById('category');

let electronicItems=document.getElementById('electronics');
let foodItems=document.getElementById('foods');
let skincareItems=document.getElementById('skincare');
function userInput(e){
    e.preventDefault();
    console.log(category.value);
    const obj={
       Price:price.value,
       Product:product.value,
       Category:category.value 
    }
    axios.post("https://crudcrud.com/api/74756b95ef574a0ab1f3fc93c2b1e794/SellingData",obj)
    .then((response)=>{
       showOrderDetails(response.data); 
    }).catch((err)=>{
      document.body.innerHTML="<h1>please make correct apis</h1>";
    });
}
document.addEventListener("DOMContentLoaded",()=>{
    axios.get("https://crudcrud.com/api/74756b95ef574a0ab1f3fc93c2b1e794/SellingData")
    .then((response)=>{
      
      for(let i=0;i<response.data.length;i++){
        showOrderDetails(response.data[i]);
       
      }
    }).catch((err)=>{
      alert(err);
    });
  });
function showOrderDetails(obj){
    let li=document.createElement('li');
    li.id=obj._id;
    let textNode=document.createTextNode(`${obj.Price}-${obj.Product}-${obj.Phone} `);
   li.appendChild(textNode);
   let btn=document.createElement('button');
    btn.appendChild(document.createTextNode('Delete Order'));
    li.appendChild(btn);
    console.log(obj.Category);
    if(obj.Category==="Food"){
        foodItems.appendChild(li);
    }
    else if(obj.Category==="Electronics"){
        electronicItems.appendChild(li);
    }
    else if(obj.Category==="SkinCare"){
        skincareItems.appendChild(li);
    }
   
    
    let ids=obj._id;
    btn.addEventListener("click",()=>{
   
      axios.delete("https://crudcrud.com/api/74756b95ef574a0ab1f3fc93c2b1e794/SellingData/"+ids)
      .then((res)=>{
       deleteUserScreen(ids);
      }).catch((err)=>{
        console.log("error");
      });
    });
    

}
function deleteUserScreen(id){
    let parnt=document.getElementById(id).parentElement;
  parnt.removeChild(document.getElementById(id));
}
