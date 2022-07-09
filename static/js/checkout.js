let checkout = document.querySelector("#checkout");

checkout.addEventListener("click", function(){

    let csrf = document.getElementsByName("csrfmiddlewaretoken");

    if(basket.length > 0){

        let cart = JSON.parse(localStorage.getItem("basket"));
       
        fetch("/cart",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'X-CSRFToken' : csrf[0].value,
                },
                body: JSON.stringify(cart)
            })
            .then(response => {
                if (response.status !== 200) {
                    return Promise.reject();
                }
                return response.json();
            })
            .then(function (data) {

                localStorage.removeItem("basket");

                link = "/" + data + "/checkout";
                window.location.href = link;

            })
            .catch(() => console.log('Помилка!'));
    }

})