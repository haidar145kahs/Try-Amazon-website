import { cart, removeFromCart, addToCart, updateDeliveryOption}  from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import {deliveryOptions} from "../js/deliveryOption.js"
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
let today = dayjs();
let deliveryDate = today.add(5,'days');
console.log(deliveryDate.format('dddd, MMMM ,D'))
function renderOrderSummury(){

    let cartSummryHTML = '';
    
    cart.forEach((cartItem)=>{  
        let productId= cartItem.productId;
        let machingProduct;
        products.forEach((product)=>{
            if( product.id === productId){
                machingProduct = product;   
            }
    
        });
        let deliveryOptionId = cartItem.deliveryOptionsId;
        
        let deliveryOption;
        deliveryOptions.forEach((option) => {
            if(option.id === deliveryOptionId){
                deliveryOption = option;
                
            }
        })
            let today = dayjs();
            let deliveryDate = today.add(deliveryOption.deliveryDays,'days');
            let dateString = deliveryDate.format('dddd, MMMM D');
            console.log(dateString);
    
        cartSummryHTML+=`
        <div class="cart-item-container js-cart-item-container-${machingProduct.id}">
            <div class="delivery-date">
            Delivery date: ${dateString}
            </div>
    
            <div class="cart-item-details-grid">
            <img class="product-image"
                src="${machingProduct.image}">
    
            <div class="cart-item-details">
                <div class="product-name">
                ${machingProduct.name}
                </div>
                <div class="product-price">
                $${formatCurrency(machingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary">
                    Update
                </span>
                <span class="delete-quantity-link link-primary js-delete-link"data-product-id ="${machingProduct.id}">
                    Delete
                </span>
                </div>
            </div>
    
            <div class="delivery-options">
                    <div class="delivery-options-title">
                        Choose a delivery option:
                    </div>
                    ${deliveryOptionHTML(machingProduct,cartItem)}
            </div>
            </div>
            </div>`;
    });
    function deliveryOptionHTML(machingProduct,cartItem){
        let html = '';
        deliveryOptions.forEach((deliveryOption)=> { 
            let today = dayjs();
            const deliveryDate = today.add(deliveryOption.deliveryDays,'days');
            const dateString = deliveryDate.format('dddd, MMMM D');
    
            let priceString= deliveryOption.priceCents=== 0 
            ? 'FREE'
            :`$${formatCurrency(deliveryOption.priceCents)} `;
    
            let isChecked = deliveryOption.id === cartItem.deliveryOptionsId;
    
            html+=`             
        <div class="delivery-option js-delivery-option"
        data-product-id = ${machingProduct.id}
        data-delivery-option-id=${deliveryOption.id}>
                <input type="radio"
                    ${isChecked ? 'checked' : ''}
                    class="delivery-option-input"
                    name="delivery-option-${machingProduct.id}">
                <div>
                <div class="delivery-option-date">
                    ${dateString}
                </div>
                <div class="delivery-option-price">
                    ${priceString} - Shipping
                </div>
            </div>
        </div>
                `
        });
        return html ; 
    
    }
    
    document.querySelector('.js-order-summary').innerHTML = cartSummryHTML;
    document.querySelectorAll('.js-delete-link').forEach((link)=> {
        link.addEventListener('click', ()=> {
        const productId = link.dataset.productId;
            removeFromCart(productId);
            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            container.remove();
        });
    });
            document.querySelectorAll('.js-delivery-option').forEach((element) => {
                element.addEventListener('click',()=>{
                    const {productId,deliveryOptionId}=element.dataset
                    updateDeliveryOption(productId,deliveryOptionId);
                    renderOrderSummury();
                });
                
            });
}
renderOrderSummury();