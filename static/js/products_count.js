var elements = document.querySelectorAll('.product');

Array.prototype.forEach.call(elements, function(el, i){

    let price = parseInt(el.querySelector('.product .product_static_price').textContent);
    let changePrice = el.querySelector(".product_price");

    let changeOldPrice = el.querySelector(".product_old_price");

    let plus = el.querySelector('.plus');
    let minus = el.querySelector('.minus');

    let input = el.querySelector('.quantity_input');


    plus.addEventListener('click', function() {
    
        if(input.value < 255) {
            input.value++;
            changePrice.textContent = (price * input.value) + " грн";
            
            if (typeof el.querySelector('.product .product_static_old_price') !== 'undefined') {

                if(el.querySelector('.product .product_static_old_price') !== null){
                    let old_price = parseInt(el.querySelector('.product .product_static_old_price').outerText);
                   
                    changeOldPrice.textContent = (old_price * input.value) + " грн";
                }
            }

        }

    });

    minus.addEventListener('click', function() {

        if(input.value > 1 ) {
            changePrice.textContent = (price * input.value) - (price * 1)  + " грн";
            
            if (typeof el.querySelector('.product .product_static_old_price') !== 'undefined') {

                if(el.querySelector('.product .product_static_old_price') !== null){
                    let old_price = parseInt(el.querySelector('.product .product_static_old_price').outerText);
                   
                    changeOldPrice.textContent = (old_price * input.value) - (old_price * 1) + " грн";
                }
            }

            input.value--;

        }

    });

    input.addEventListener('change', function() {

        changePrice.textContent = (price * input.value) + " грн";

        if (typeof el.querySelector('.product .product_static_old_price') !== 'undefined') {

            if(el.querySelector('.product .product_static_old_price') !== null){
                let old_price = parseInt(el.querySelector('.product .product_static_old_price').outerText);
               
                changeOldPrice.textContent = (old_price * input.value) + " грн";
            }
        }

    });
    
});





let test2 = document.querySelectorAll(".product");

test2.forEach(element => {


    let button = element.querySelector(".add_to_cart");

    let input = element.querySelector(".quantity input");
    let image = element.querySelector(".product_image");    //src
    let title = element.querySelector(".product_detail .product_title");  //textContent
    let price = element.querySelector(".product_detail .product_static_price"); //.textContent

    button.addEventListener("click", function(){

        json = {
            id: button.dataset.goodsId,
            quantity: input.value,
            image: image.src,
            title: title.textContent,
            price: price.textContent
        }

        if(localStorage.getItem("basket") == null)
        {
            basket = [];
        }
        else{
            basket = JSON.parse(localStorage.getItem("basket"));
        }

        let filterItem = basket.filter((v) => v.id == button.dataset.goodsId);

        if(filterItem.length != 0) {

            filterItem = filterItem[0];

            filterItem.quantity = parseInt(filterItem.quantity) + parseInt(input.value);
            filterItem.image = image.src;
            filterItem.title = title.textContent;
            filterItem.price = price.textContent;
            
        }else{
            basket.push(json);
        }

        localStorage.setItem("basket", JSON.stringify(basket));
        
        cart_render(basket)

    })

});