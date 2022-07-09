document.addEventListener("DOMContentLoaded", function(){

    const form = document.getElementById("order");
    form.addEventListener("submit", orderCheck);

    async function orderCheck(e){
        e.preventDefault();

        let error = formValidate(form);
        let formData = new FormData(form);
        let csrf = document.getElementsByName("csrfmiddlewaretoken");

        if (error === 0){
            
            fetch(
                '/create',
                {
                    method: "POST",
                    headers: {
                        'X-CSRFToken' : csrf[0].value,
                    },
                    body: formData
                })
            .then(response => {
                if (response.status !== 200) {
                    return Promise.reject();
                }
                return response.json();
            }).then(value => {

                if (value['result'] == 'success'){
                    
                    localStorage.setItem('result', 'success')
                    document.location.href="/";

                } else if (value['result'] == 'failure'){

                    alert('Помилка! Перезагрузіть сторінку та спробуйте ще раз.')
                    location.href = location.href;
                }

            })
            .catch(() => console.log('Помилка!'));

        } else {
            var item = document.getElementById("first_name");
            var topPos = item.offsetTop - 175;
            
            window.scroll({top: topPos, left: 0, behavior: 'smooth'});
        }

        //console.log(error);
    }

    function formValidate(form){
        let errorCount = 0;
        let required = document.querySelectorAll(".req");

        required.forEach(e => {

            input = e.querySelector(".input");
            error = e.querySelector(".input-error");
            select = e.querySelector("select");
            phone = e.querySelector(".phone");

            if(input != null){

                removeError(input, error);

                if(input.value === ""){
                    addError(input, error, "Будь ласка, заповніть це поле");
                    errorCount++;
                }

            }

            if(phone != null){

                removeError(phone, error);

                if(phone.value.replace(/\D/g, "").length != 12){
                    addError(phone, error, "Вкажіть, будь ласка, коректний номер телефону");
                    errorCount++;
                }

            }

            if(select != null){

                removeError(select, error);

                if (select.value == 0) {
                    addError(select, error, "Будь ласка, заповніть це поле");
                    errorCount++;
                }
            }


        });

        return errorCount;
    }

    function addError(input, error, text){
        input.classList.add("error");
        error.textContent = text;
    }

    function removeError(input, error){
        input.classList.remove("error");
        error.textContent = "";
    }

})