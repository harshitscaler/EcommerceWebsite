// localStorage data
var data = [
    {
        img: 'img/products/f3.jpg',
        title: 'Cartoon Astronaut T-Shirts',
        price: 49.99
    }
];

loadData();

function loadData() {
    if (localStorage.getItem('data') === null) {
        data = [];
    } else {
        data = JSON.parse(localStorage.getItem('data'));
    }

    let cartList = document.getElementById('cart-items');
    data.forEach(item => {
        let cartItem = `
            <div class="cart-item">
                <div class="cart-img">
                    <img src="${item.img}" alt="">
                </div>
                <div class="cart-info">
                    <h3>${item.title}</h3>
                    <span>${item.price}</span>
                </div>
                <div class="cart-remove" onclick="this.parentElement.remove(); calculateTotal(); saveData();">
                    <i class="fas fa-times"></i>
                </div>
            </div>
        `;
        cartList.innerHTML += cartItem;
    });

    calculateTotal();
}

function saveData() {
    data = [];
    let cartItems = document.querySelectorAll('.cart-item');
    cartItems.forEach(cartItem => {
        let img = cartItem.querySelector('img').src;
        let title = cartItem.querySelector('h3').innerText;
        let price = cartItem.querySelector('span').innerText;
        data.push({img, title, price});
    });
    localStorage.setItem('data', JSON.stringify(data));
}

let add_cart_buttons = document.querySelectorAll('.add-to-cart-button');
add_cart_buttons.forEach(button => {
    button.addEventListener('click', () => {
        let cartList = document.getElementById('cart-items');
        let product = button.parentElement;
        let img = product.querySelector('img').src;
        let title = product.querySelector('h5').innerText;
        let price = product.querySelector('h4').innerText;
        
        let cartItem = `
            <div class="cart-item">
                <div class="cart-img">
                    <img src="${img}" alt="">
                </div>
                <div class="cart-info">
                    <h3>${title}</h3>
                    <span>${price}</span>
                </div>
                <div class="cart-remove" onclick="this.parentElement.remove(); calculateTotal();">
                    <i class="fas fa-times"></i>
                </div>
            </div>
        `;

        cartList.innerHTML += cartItem;
        calculateTotal();
        saveData();
    });
});

function calculateTotal() {
    let cartItems = document.querySelectorAll('.cart-item');
    let total = 0;
    cartItems.forEach((cartItem, i) => {
        let cartItemPrice = parseFloat(cartItem.querySelector('.cart-info span').innerText.replace('$', ''));
        total += cartItemPrice;
    });
    document.getElementById('cart-total').innerText = '$' + total;
}

const bar=document.getElementById('bar');
const nav = document.getElementById('navbar');
const close = document.getElementById('close');

if(bar){
    bar.addEventListener('click', ()=>{
        nav.classList.toggle('active');
    })
}

if(close){
    close.addEventListener('click', ()=>{
        nav.classList.remove('active');
    })
}
