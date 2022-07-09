let basket;

if(localStorage.getItem("basket") == null)
{
    basket = [];
}
else{
    basket = JSON.parse(localStorage.getItem("basket"));
    cart_render(basket)
}





let ClearBasketButton = document.getElementById("clear-basket");

ClearBasketButton.addEventListener("click", function(){

    basket = [];
    localStorage.setItem("basket", JSON.stringify(basket));

    cart_render(basket)

})






function cart_render(basket) {

    let basketWidget = document.querySelector(".cart-scroll-content");
    
    let all_html = "";

    for(let i = 0; i < basket.length; i++){
        let html = `<div class="cart-product">
            <div class="cart-product-info">
                <img src="` + basket[i]["image"] + `" alt="" class="cart-product-image">
                <div class="cart-product-desc">
                    <div class="cart-product-name">` + basket[i]["title"] + `</div>
                    <div class="cart-product-addition">
                        <div class="cart-product-price">
                            <span>Ціна:</span>
                            <span>` + basket[i]["price"] + ` грн</span>
                        </div>
                        <div class="cart-product-count">
                            <span class="cart-product-count-title">Кількість:</span>
                            <span>` + basket[i]["quantity"] + `</span>
                        </div>
                    </div>
                </div>
                <div class="cart-product-delete">
                    <ion-icon name="close-outline" data-goods-id="` + basket[i]["id"] + `" class="cart-product-delete-button"></ion-icon>
                </div>
            </div>
        </div>`;

        all_html = all_html + html;

    }

    basketWidget.innerHTML = all_html;


    let amount = document.querySelector(".cart-widget-footer .cart-amount .amount");
    
    let sum = 0;

    for (let index = 0; index < basket.length; index++) {

        let res = basket[index]["price"] * basket[index]["quantity"];
        sum = sum + res;
        
    }

    amount.textContent = sum + " грн"





    let cart_count_class = document.querySelector(".cart-count");
    let cart_count = 0;

    for (let index = 0; index < basket.length; index++) {

        let res = parseInt( basket[index]["quantity"]);
        cart_count = cart_count + res;
        
    }

    cart_count_class.textContent = cart_count;




    let cart_product_delete_button_class = document.querySelectorAll(".cart-product-delete-button");

    cart_product_delete_button_class.forEach(element => {
        
        element.addEventListener("click", function(){

            let product_id = element.dataset.goodsId;
            let new_arr = [];

            basket.forEach(element => {
                
                if(element["id"] != product_id) {
                    new_arr.push(element);
                }

            });

            if(new_arr.length === 0){
                localStorage.removeItem("basket");
            }else{
                localStorage.setItem("basket", JSON.stringify(new_arr));
            }

            basket = new_arr;

            cart_render(basket)

        })

    });



}