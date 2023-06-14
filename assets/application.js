// Put your application javascript here
// const addToCartForms = document.querySelectorAll('form[action="/cart/add"]');
const addToCartForms = document.querySelectorAll('form[action="/cart/add]');

addToCartForms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
  });
});
