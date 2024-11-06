export let cart = [];

export function addToCart(productId){
    let MatchingItem ;
    cart.forEach((cartItem) => {
        if(productId === cartItem.productId){
            MatchingItem = cartItem;
        };
    });
        if(MatchingItem){
            MatchingItem.quantity+= 1;
        }
        else{
            cart.push({
                productId: productId ,
                quantity: 1
            })
        }
};
