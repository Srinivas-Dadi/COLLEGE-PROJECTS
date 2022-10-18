let searchForm = document.querySelector('.search-form');
document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
    shoppingCart.classList.remove('active');
}
let shoppingCart = document.querySelector('.cart-box');
document.querySelector('#cart-btn').onclick = () =>{
    shoppingCart.classList.toggle('active');
    searchForm.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
}
let loginForm = document.querySelector('.login-form');
document.querySelector('#login-btn').onclick = () =>{
    loginForm.classList.toggle('active');
    searchForm.classList.remove('active');
    navbar.classList.remove('active');
    shoppingCart.classList.remove('active');
}
let navbar = document.querySelector('.navbar');
document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    loginForm.classList.remove('active');
    shoppingCart.classList.remove('active');
}
window.onscroll=()=>{
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
}

let popup=document.getElementById("popup");
function openPopup(){
  popup.classList.add("open-popup");
}
function close1Popup(){
  popup.classList.remove("open-popup");
  loginForm.classList.remove('active');
}
function closePopup(){
    popup.classList.remove("open-popup");
}
var swiper = new Swiper(".product-slider", {
    loop:true,
    spaceBetween: 30,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    centeredSlides: true,
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1020: {
        slidesPerView: 3,
      },
    },
});

var swiper = new Swiper(".review-slider", {
    loop:true,
    spaceBetween: 30,
    autoplay: {
        delay: 7500,
        disableOnInteraction: false,
    },
    centeredSlides: true,
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1020: {
        slidesPerView: 3,
      },
    },
});




class CartItem{
  constructor(desc, name, img, price){
      this.name = name
      this.desc = desc
      this.img=img
      this.price = price
      this.quantity = 1
 }
}

class LocalCart{
  static key = 'cartItems'

  static getLocalCartItems(){
      let cartMap = new Map()
   const cart = localStorage.getItem(LocalCart.key)   
   if(cart===null || cart.length===0)  return cartMap
      return new Map(Object.entries(JSON.parse(cart)))
  }

  static addItemToLocalCart(id, item){
      let cart = LocalCart.getLocalCartItems()
      if(cart.has(id)){
          let mapItem = cart.get(id)
          mapItem.quantity +=1
          cart.set(id, mapItem)
      }
      else
      cart.set(id, item)
     localStorage.setItem(LocalCart.key,  JSON.stringify(Object.fromEntries(cart)))
     updateCartUI()
      
  }

  static removeItemFromCart(id){
  let cart = LocalCart.getLocalCartItems()
  if(cart.has(id)){
      let mapItem = cart.get(id)
      if(mapItem.quantity>1)
     {
      mapItem.quantity -=1
      cart.set(id, mapItem)
     }
     else
     cart.delete(id)
  } 
  if (cart.length===0)
  localStorage.clear()
  else
  localStorage.setItem(LocalCart.key,  JSON.stringify(Object.fromEntries(cart)))
     updateCartUI()
  }
}


const cartIcon = document.querySelector('.fa-cart-arrow-down')
const wholeCartWindow = document.querySelector('.whole-cart-window')
wholeCartWindow.inWindow = 0
const addToCartBtns = document.querySelectorAll('.add-to-cart-btn')
addToCartBtns.forEach( (btn)=>{
  btn.addEventListener('click', addItemFunction)
}  )

function addItemFunction(e){
  const id = e.target.parentElement.parentElement.getAttribute("data-id")
  const img = e.target.parentElement.previousElementSibling.src
  const name = e.target.parentElement.textContent
  const desc = e.target.parentElement.children[0].textContent
  let price = e.target.parentElement.children[1].textContent
 price = price.replace("Price: Rs.", '')
  const item = new CartItem(desc, name, img, price)
  LocalCart.addItemToLocalCart(id, item)
console.log(price)
}


cartIcon.addEventListener('mouseover', ()=>{
if(wholeCartWindow.classList.contains('hide'))
wholeCartWindow.classList.remove('hide')
})

cartIcon.addEventListener('mouseleave', ()=>{
  // if(wholeCartWindow.classList.contains('hide'))
  setTimeout( () =>{
      if(wholeCartWindow.inWindow===0){
          wholeCartWindow.classList.add('hide')
      }
  } ,500 )
  
  })

wholeCartWindow.addEventListener('mouseover', ()=>{
   wholeCartWindow.inWindow=1
})  

wholeCartWindow.addEventListener('mouseleave', ()=>{
  wholeCartWindow.inWindow=0
  wholeCartWindow.classList.add('hide')
})  
function alert()
{
  confirm("Thankyou!!..Visit Us Again");
}

function updateCartUI(){
  const cartWrapper = document.querySelector('.cart-wrapper')
  cartWrapper.innerHTML=""
  const items = LocalCart.getLocalCartItems()
  if(items === null) return
  let count = 0
  let total = 0
  for(const [key, value] of items.entries()){
      const cartItem = document.createElement('div')
      cartItem.classList.add('cart-item')
      let price
     if(value.quantity===0)
      {
        price=0
      }
      else
      {
      price = value.price*value.quantity
      price = Math.round(price*100)/100
      count+=1
      total += price
      total = Math.round(total*100)/100
      }
      cartItem.innerHTML =
      `
      <img src="${value.img}"> 
                     <div class="details">
                         <h3>${value.desc}</h3>
                         <p>${value.name}
                          <span class="quantity">Quantity: ${value.quantity}</span>
                             <span class="price">Price: Rs.${price}</span>
                         </p>
                     </div>
                     <div class="cancel"><i class="fas fa-window-close"></i></div>
      `
     cartItem.lastElementChild.addEventListener('click', ()=>{
         LocalCart.removeItemFromCart(key)
     })
      cartWrapper.append(cartItem)
  }

  if(count > 0){
      cartIcon.classList.add('non-empty')
      let root = document.querySelector(':root')
      root.style.setProperty('--after-content', `"${count}"`)
      const subtotal = document.querySelector('.subtotal')
      subtotal.innerHTML = `SubTotal: Rs.${total}`
  }
  else
  cartIcon.classList.remove('non-empty')
}
document.addEventListener('DOMContentLoaded', ()=>{updateCartUI()})
