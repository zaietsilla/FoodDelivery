let promo = document.getElementById("promo");

if(promo){
    promo.addEventListener("change", function(){

        let code = promo.value;
    
        const request = new XMLHttpRequest();
        const url = "/promo?code=" + code;
        request.open('GET', url);
        request.setRequestHeader('Content-Type', 'application/json');
        request.addEventListener("readystatechange", () => {
            
            if (request.readyState === 4 && request.status === 200) {

                data = JSON.parse(request.responseText);

                let cost = document.getElementById("total-cost");
                let discount = data["discount"];

                let div = document.querySelector(".products-total-cost-promo");
                let div2 = document.querySelector(".products-total-cost");

                let discountCost = document.getElementById("total-cost-promo");

                if(discount != "None"){
                    div.style.display = "block";
                    div2.style.display = "none";

                    discountCost.textContent = Math.round((parseInt(cost.textContent) / 100) * ( 100 - discount ))+" грн";
                }else {
                    div.style.display = "none";
                    div2.style.display = "block";
                }

            }

        });
    
        request.send();
    
    })
}