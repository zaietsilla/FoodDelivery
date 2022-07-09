var btns = document.querySelectorAll(".myBtn");

btns.forEach(btn => {

    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];

    btn.addEventListener("click", function() {
        modal.style.display = "block";
        setTimeout(CloseModal, 2500);
    })

    span.onclick = function() {
    modal.style.display = "none";
    }

    function CloseModal() {
        modal.style.display = "none";
    }

}
)