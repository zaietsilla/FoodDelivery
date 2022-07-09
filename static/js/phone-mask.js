document.addEventListener("DOMContentLoaded", function() {

    let phoneInputs = document.querySelectorAll("input[data-tel-input]");

    let getInputNumbersValue = function(input){
        return input.value.replace(/\D/g, "");
    }

    let onPhoneInput = function(e) {
        let input = e.target,
            inputNumbersValue = getInputNumbersValue(input);
            formattedInputValue = "+380";
            selectionStart = input.selectionStart;

        if(inputNumbersValue[0] == "3" && inputNumbersValue[1] == "8" && inputNumbersValue[2] == "0"){

            if(inputNumbersValue.length > 3){

                formattedInputValue += " (" + inputNumbersValue.substring(3, 5);    
            }
            if(inputNumbersValue.length > 5){
                formattedInputValue += ") " + inputNumbersValue.substring(5, 8);
            }
            if(inputNumbersValue.length > 8){
                formattedInputValue += "-" + inputNumbersValue.substring(8, 10);
            }
            if(inputNumbersValue.length > 10){
                formattedInputValue += "-" + inputNumbersValue.substring(10, 12);
            }
        }

        input.value = formattedInputValue;

    }

    for (let i = 0; i < phoneInputs.length; i++) {
        const element = phoneInputs[i];
        element.addEventListener("input", onPhoneInput);
    }

})