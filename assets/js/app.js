// get elements
const product_form = document.getElementById('product_form');
const product_list = document.getElementById('product_list');
const product_update_form = document.getElementById('product_update_form');
const msg = document.querySelector('.msg');
const single_product = document.querySelector('.single-product');


// get all products

const getAllProducts = () => {

  // get all LS Data
  const data = readLSData('product');

    // init val
    let list = '';

  // check LSData exists
  if(!data || data.length == 0 ){
    list = `
      <tr>
        <td colspan="7">No product found.</td>
      </tr>
    `;
  }

  // show all data to List
  if( data && data.length > 0 ){

    let final_amount = 0;

    // loop for data
    data.map( (item , index) => {
      final_amount += (item.price * item.quantity);
      list += `
        <tr>
        <td>${ index + 1 }</td>
        <td><img src="${ item.photo  }" alt=""></td>
        <td>${ item.name }</td>
        <td>${ item.price } BDT</td>
        <td>${ item.quantity }</td>
        <td>${ item.price * item.quantity } BDT</td>
        <td>
          <a href="#shop_single_modal" product_index="${index}" data-bs-toggle="modal" class="btn btn-info btn-sm product_view"><i class="fas  fa-eye"></i></a>
          <a href="#shop_edit_modal" product_index="${index}" data-bs-toggle="modal" class="btn btn-warning btn-sm product_edit"><i class="fas   fa-edit"></i></a>
          <a href="" product_index="${index}" class="btn btn-danger btn-sm product_delete"><i class="fas  fa-trash"></i></a>
        </td>
        </tr>
      `;
    });

    list += `
      <tr>
        <td colspan='6' class='text-end'>Final Amount = ${final_amount} BDT</td><td></td>
      </tr>
    `;

  }

    product_list.innerHTML = list;

}
getAllProducts();


// Submit product form
product_form.onsubmit = (e) => {
  e.preventDefault();


  // get form data from FormData Object
  let form_data = new FormData(e.target);
  let productData = Object.fromEntries(form_data.entries());
  let { name,price,quantity,photo } = Object.fromEntries(form_data.entries());



  // init values
  const data = [];


  // form validation

  if(!name || !price || !quantity || !photo){
    msg.innerHTML = setAlert('All fields are required !');
  }else{

    createLSData('product' , productData);


    msg.innerHTML = setAlert('Data Stable !' , 'success');
    product_form.reset();
    getAllProducts();
  }


}


// single product show
product_list.onclick = (e) => {
  e.preventDefault();


  // single product view
  if(e.target.classList.contains('product_view')){
    
    // get single product data ID
    let index = e.target.getAttribute('product_index');
    let data = readLSData('product');
    
    // get data key
    const { name, price , photo , quantity } = data[index];
    
    // send data to modal
    single_product.innerHTML = `
      <img class="shadow" src="${photo}" alt="">
      <h1 class="my-3">${name}</h1>
      <p>Price : ${price} BDT</p>
    `;

  }
  
  
  // product edit 
  if(e.target.classList.contains('product_edit')){

    
   // get product index
   let index = e.target.getAttribute('product_index');

   // get product value 
   let data = readLSData('product');
   const { name , price , photo , quantity } = data[index];  

   // form value set 
   product_update_form.innerHTML = `
   <div class="my-3">
   <label for="">Name</label>
   <input name="name" type="text" value="${name}" class="form-control">
     </div>
     <div class="my-3">
       <label for="">Price</label>
       <input name="price" type="text" value="${price}" class="form-control">
     </div>
     <div class="my-3">
       <label for="">Quantity / KG</label>
       <input name="quantity" type="text" value="${quantity}" class="form-control">
     </div>
     <div class="my-3">
       <input name="index" type="hidden" value="${index}" class="form-control">
     </div>
     <div class="my-3">
       <img class="w-100" src="${photo}" alt="">
     </div>
     <div class="my-3">
       <label for="">Photo</label>
       <input name="photo" type="text" value="${photo}"  class="form-control">
     </div>
     <div class="my-3">
       <input type="submit" value="Update Now" class="btn btn-primary     w-100">
     </div>
   `;
  }


  // product delete
  if( e.target.classList.contains('product_delete') ){
    
    // get data index
    let index = e.target.getAttribute('product_index');
    let data = readLSData('product');

    // delete index data
    data.splice(index , 1);
    
    // update latest data
    updateLSData('product' , data)

    // now reload data
    getAllProducts();

  }



}










// product update form submit

product_update_form.onsubmit = (e) => {
  e.preventDefault();
  
  // get form data/
  const form_data = new FormData(e.target);
  const {name, price, quantity , photo , index} = Object.fromEntries(form_data.entries());

  
  // get all data
  let all_data = readLSData('product');

  all_data[index] = {name,price,quantity,photo};


  // update your Data

  updateLSData('product' , all_data);

  getAllProducts();


}