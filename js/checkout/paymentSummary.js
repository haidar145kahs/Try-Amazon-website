import { cart } from "../../data/cart.js";
import { getProduct, products } from "../../data/products.js";
import {deliveryOptions,getDeliveryOption} from "../../data/deliveryOption.js";
import { formatCurrency } from "../utils/money.js";

export function renderPaymentSummary(){
    let productPriceCents = 0;
    let shippingPriceCents = 0;
    cart.forEach((cartItem) => {
        const product = getProduct(cartItem.productId);
        productPriceCents +=product.priceCents * cartItem.quantity
        let delivaryOption = getDeliveryOption(cartItem.deliveryOptionsId);
        shippingPriceCents += delivaryOption.priceCents;
        
    });
    let totalBeforTaxCents= shippingPriceCents+productPriceCents;
    let taxCents = totalBeforTaxCents * 0.1;
    let totalCents = totalBeforTaxCents+taxCents;
    let paymentSummaryHTML =`
            <div class="payment-summary-title">
                Order Summary
            </div>

            <div class="payment-summary-row">
                <div>Items (3):</div>
                <div class="payment-summary-money">
                $${formatCurrency(productPriceCents)}</div>
            </div>

            <div class="payment-summary-row">
                <div>Shipping &amp; handling:</div>
                <div class="payment-summary-money">
                $${formatCurrency(shippingPriceCents)}</div>
            </div>

            <div class="payment-summary-row subtotal-row">
                <div>Total before tax:</div>
                <div class="payment-summary-money">$${formatCurrency(totalBeforTaxCents)}</div>
            </div>

            <div class="payment-summary-row">
                <div>Estimated tax (10%):</div>
                <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
            </div>

            <div class="payment-summary-row total-row">
                <div>Order total:</div>
                <div class="payment-summary-money">
                $${formatCurrency(totalCents)}
                </div>
            </div>

            <button class="place-order-button button-primary">
                Place your order
            </button>
    `; 
document.querySelector('.js-payment-summary').innerHTML=paymentSummaryHTML;










}