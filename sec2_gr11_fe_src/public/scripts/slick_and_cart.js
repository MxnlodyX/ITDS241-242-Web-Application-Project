function Slider_Carousel() {
  $(document).ready(function () {
    $('.Carousel').slick({
      dots: false,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
      adaptiveHeight: true,
      prevArrow: '<button type="button" class="slick-prev"></button>',
      nextArrow: '<button type="button" class="slick-next"></button>'
    });
  });
}
// function Cart_detail(){
//   document.addEventListener("DOMContentLoaded", function () {
//     const cart = document.querySelector(".Shopping-Cart");
//     const orderDetails = document.querySelector(".order-details");
//     cart.addEventListener("mouseenter", () => {
//         orderDetails.classList.add("show");
//     });
//     cart.addEventListener("mouseleave", () => {
//         setTimeout(() => {
//             orderDetails.classList.remove("show");
//         }, 300);
//     });
//   });
// }
function use_function() {
  Slider_Carousel();

}
use_function()