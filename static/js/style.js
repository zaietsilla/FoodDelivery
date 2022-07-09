let scrollpos = window.scrollY;
let header = document.querySelector(".header");

function add_class_on_scroll() {
    header.classList.add("header_blur");
}

function remove_class_on_scroll() {
    header.classList.remove("header_blur");
}

window.addEventListener('scroll', function(){ 

    scrollpos = window.scrollY;

    if(scrollpos > 10){
        add_class_on_scroll();
    }
    else {
        remove_class_on_scroll();
    }

});





function down(){
    var item = document.getElementById("products");
    var topPos = item.offsetTop - 175;
    
    window.scroll({top: topPos, left: 0, behavior: 'smooth'});
}






  
function trackScroll() {
    var scrolled = window.pageYOffset;
    var coords = document.documentElement.clientHeight;

    if (scrolled > coords) {
    goTopBtn.classList.add('back_to_top-show');
    }
    if (scrolled < coords) {
    goTopBtn.classList.remove('back_to_top-show');
    }
}

function backToTop() {
    if (window.pageYOffset > 0) {
    window.scrollBy(0, -80);
    setTimeout(backToTop, 15);
    }
}

var goTopBtn = document.querySelector('.back_to_top');

window.addEventListener('scroll', trackScroll);
goTopBtn.addEventListener('click', backToTop);















var cart = document.querySelector('.cart');
cart.addEventListener("click", function(e){

    document.querySelector(".widget-right").classList.add('widget-right-opened');
    document.querySelector(".mist").classList.add('mist_active');

    document.body.classList.add("lock");

});





const widget = document.getElementById("cart-widget");
document.addEventListener("click", function(event) {

    let widgetClick = widget.contains(event.target);
    let cartClick = cart.contains(event.target);

    if (widgetClick == false && cartClick == false) {

        document.querySelector(".widget-right").classList.remove("widget-right-opened");
        document.querySelector(".mist").classList.remove("mist_active");
        
        document.body.classList.remove("lock");

    }

});








const cartWidgetClose = document.querySelector(".cart-widget-close");
cartWidgetClose.addEventListener("click", function(){

    document.querySelector(".widget-right").classList.remove("widget-right-opened");
    document.querySelector(".mist").classList.remove("mist_active");
    
    document.body.classList.remove("lock");

});












let menu = document.querySelector("#menu");

menu.addEventListener("click", function(){

    document.querySelector(".widget-left").classList.add('widget-left-opened');
    document.querySelector(".fog").classList.add('fog_active');
    document.body.classList.add("fixation");

});



const widgetMenu = document.querySelector("#menu-widget");

document.addEventListener("click", function(event) {

    let widgetClick = widgetMenu.contains(event.target);
    let menuClick = menu.contains(event.target);

    if (widgetClick == false && menuClick == false) {

        document.querySelector(".widget-left").classList.remove('widget-left-opened');
        document.querySelector(".fog").classList.remove("fog_active");
        document.body.classList.remove("fixation");

    }

});



const menuWidgetClose = document.querySelector(".menu-widget-close");

menuWidgetClose.addEventListener("click", function(){

    document.querySelector(".widget-left").classList.remove('widget-left-opened');
    document.querySelector(".fog").classList.remove("fog_active");
    document.body.classList.remove("fixation");

});




let result;

result = localStorage.getItem("result");

if (result === 'success') {

    document.body.classList.add("disable");
    document.querySelector('#success-modal').classList.add("modal-window_active");

}

let success_modal_close = document.querySelector('#success-modal-close')

success_modal_close.addEventListener("click", function(){

    localStorage.removeItem("result");
    location.href = location.href;

});