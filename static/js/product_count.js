document.addEventListener("DOMContentLoaded", function(){

    let item_price = document.querySelector(".item-desc .item-static-price");
    let item_change_price = document.querySelector(".item-desc .item-price");

    let item_old_price = document.querySelector(".item-desc .item-static-old-price");
    let item_change_old_price = document.querySelector(".item-desc .item-old-price");

    let item_plus = document.querySelector('.item-desc .item-quantity-control .quantity .plus');
    let item_minus = document.querySelector('.item-desc .item-quantity-control .quantity .minus');
    let item_input = document.querySelector(".item-desc .item-quantity-control .quantity input");
    
    if(item_plus){
        item_plus.addEventListener('click', function() {
    
            if(item_input.value < 255) {
    
                item_input.value++;
                item_change_price.textContent = ( parseInt(item_price.textContent) * item_input.value) + " грн";
                
                if (item_change_old_price.textContent !== '') {
                    item_change_old_price.textContent = ( parseInt(item_old_price.textContent) * item_input.value) + " грн";
                }
    
            }
    
        });
    }

    if(item_minus){
        item_minus.addEventListener('click', function() {

            if(item_input.value > 1 ) {
    
                item_change_price.textContent = ( parseInt(item_price.textContent) * item_input.value) - ( parseInt(item_price.textContent) * 1)  + " грн";
                
                if (item_change_old_price.textContent !== '') {
                    item_change_old_price.textContent = ( parseInt(item_old_price.textContent) * item_input.value) - ( parseInt(item_old_price.textContent) * 1)  + " грн";
                }
    
                item_input.value--;
    
            }
    
        });
    }

    if(item_input){
        item_input.addEventListener('change', function() {

            item_change_price.textContent = (parseInt(item_price.textContent) * item_input.value) + " грн";
    
            if (item_change_old_price.textContent !== '') {
                item_change_old_price.textContent = ( parseInt(item_old_price.textContent) * item_input.value) + " грн";
            }
    
        });
    }

})





let basketAdd = document.querySelector(".item-quantity-control .add_to_cart")

if(basketAdd){
    basketAdd.addEventListener("click", function(){

        let input = document.querySelector(".item-desc .item-quantity-control .quantity input");
        let image = document.querySelector(".item img");
        let title = document.querySelector(".item .item-desc h2");
        let price = document.querySelector(".item-desc .item-static-price");
    
        json = {
            id: basketAdd.dataset.goodsId,
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
    
        let filterItem = basket.filter((v) => v.id == basketAdd.dataset.goodsId);
    
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
}