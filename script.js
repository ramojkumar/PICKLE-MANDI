/*=========================================
        PICKLE MANDI - script.js
                PART 1
=========================================*/

let cart = JSON.parse(localStorage.getItem("pickleCart")) || [];

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const totalPrice = document.getElementById("totalPrice");
const cartBtn = document.getElementById("cartBtn");
const cartSection = document.getElementById("cartSection");

/*==========================
        TOAST
===========================*/

function showToast(message){

let toast=document.querySelector(".toast");

if(!toast){

toast=document.createElement("div");
toast.className="toast";
document.body.appendChild(toast);

}

toast.innerHTML=message;

toast.classList.add("show");

setTimeout(()=>{

toast.classList.remove("show");

},2500);

}

/*==========================
        SAVE CART
===========================*/

function saveCart(){

localStorage.setItem("pickleCart",JSON.stringify(cart));

}

/*==========================
        UPDATE COUNT
===========================*/

function updateCartCount(){

let count=0;

cart.forEach(item=>{

count+=item.quantity;

});

cartCount.innerHTML=count;

}

/*==========================
      FIND PRODUCT
===========================*/

function findProduct(id){

return products.find(product=>product.id===id);

}

/*==========================
      ADD TO CART
===========================*/

function addToCart(id){

    const product = findProduct(id);

    const select = document.getElementById("size-"+id);

    const selectedWeight = select.options[select.selectedIndex].dataset.weight;

    const selectedPrice = Number(select.value);

    const existing = cart.find(item =>
        item.id === id &&
        item.weight === selectedWeight
    );

    if(existing){

        existing.quantity++;

        showToast("Quantity Updated");

    }else{

        cart.push({

            id:product.id,
            name:product.name,
            weight:selectedWeight,
            price:selectedPrice,
            image:product.image,
            quantity:1

        });

        showToast(product.name+" Added");

    }

    saveCart();
    updateCartCount();
    renderCart();

}

/*==========================
      REMOVE ITEM
===========================*/

function removeItem(id){

cart=cart.filter(item=>item.id!==id);

saveCart();

updateCartCount();

renderCart();

showToast("Item Removed");

}

/*==========================
      INCREASE
===========================*/

function increaseQty(id){

const item=cart.find(item=>item.id===id);

if(item){

item.quantity++;

}

saveCart();

updateCartCount();

renderCart();

}

/*==========================
      DECREASE
===========================*/

function decreaseQty(id){

const item=cart.find(item=>item.id===id);

if(!item)return;

item.quantity--;

if(item.quantity<=0){

cart=cart.filter(i=>i.id!==id);

}

saveCart();

updateCartCount();

renderCart();

}

/*==========================
      TOTAL
===========================*/

function calculateTotal(){

let total=0;

cart.forEach(item=>{

total+=item.price*item.quantity;

});

totalPrice.innerHTML=total;

}

/*==========================
      RENDER CART
===========================*/

function renderCart(){

if(cart.length===0){

cartItems.innerHTML=`

<div style="text-align:center;padding:40px;">

<h3>Your cart is empty 🛒</h3>

</div>

`;

calculateTotal();

return;

}

cartItems.innerHTML="";

cart.forEach(item=>{

cartItems.innerHTML+=`

<div class="cart-item">

<div class="cart-left">

<h3>${item.name}</h3>

<p>

${item.weight}

</p>

<p>

₹${item.price}

</p>

<div class="qty-box">

<button onclick="decreaseQty(${item.id})">

-

</button>

<span>

${item.quantity}

</span>

<button onclick="increaseQty(${item.id})">

+

</button>

</div>

</div>

<div class="cart-right">

<h3>

₹${item.price*item.quantity}

</h3>

<button

class="remove-btn"

onclick="removeItem(${item.id})">

Remove

</button>

</div>

</div>

`;

});

calculateTotal();

}

/*==========================
      CART BUTTON
===========================*/

cartBtn.addEventListener("click",()=>{

cartSection.scrollIntoView({

behavior:"smooth"

});

});

/*==========================
      CHECKOUT BUTTON
===========================*/

document.getElementById("checkoutBtn")

.addEventListener("click",()=>{

document.getElementById("checkout")

.scrollIntoView({

behavior:"smooth"

});

});

/*==========================
      INITIAL LOAD
===========================*/

updateCartCount();

renderCart();
/*=========================================
        PICKLE MANDI - script.js
                PART 2
=========================================*/

/*==========================
        DARK MODE
===========================*/

const darkBtn = document.getElementById("darkModeBtn");

if(localStorage.getItem("theme") === "dark"){
    document.body.classList.add("dark");
    darkBtn.innerHTML='<i class="fa-solid fa-sun"></i>';
}

darkBtn.addEventListener("click",()=>{

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        localStorage.setItem("theme","dark");
        darkBtn.innerHTML='<i class="fa-solid fa-sun"></i>';
    }else{
        localStorage.setItem("theme","light");
        darkBtn.innerHTML='<i class="fa-solid fa-moon"></i>';
    }

});


/*==========================
      WHATSAPP ORDER
===========================*/
document.getElementById("whatsappOrder").addEventListener("click", () => {

    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const address = document.getElementById("customerAddress").value.trim();
    const payment = document.getElementById("payment").value;

    if (name === "" || phone === "" || address === "") {
        showToast("Please fill all details");
        return;
    }

    if (cart.length === 0) {
        showToast("Your cart is empty");
        return;
    }

    let message = `🛒 *Pickle Mandi Order*

━━━━━━━━━━━━━━━━━━━━━━

👤 *Customer Details*

• *Name:* ${name}
• *Phone:* ${phone}
• *Address:* ${address}
• *Payment:* ${payment}

━━━━━━━━━━━━━━━━━━━━━━

📦 *Products*

`;

    cart.forEach((item, index) => {

        message += `${index + 1}. *${item.name}*

📦 Size : ${item.weight}
🔢 Qty  : ${item.quantity}
💰 Price : Rs.${item.price * item.quantity}

`;

    });

    message += `━━━━━━━━━━━━━━━━━━━━━━

💰 *Total Amount : Rs.${totalPrice.innerHTML}*

━━━━━━━━━━━━━━━━━━━━━━

🙏 Thank you for choosing *Pickle Mandi* ❤️

We appreciate your order!`;

    const whatsappURL = `https://wa.me/919398841028?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank");

});

/*==========================
      SMOOTH NAVIGATION
===========================*/

document.querySelectorAll('a[href^="#"]').forEach(link=>{

link.addEventListener("click",function(e){

e.preventDefault();

const target=document.querySelector(this.getAttribute("href"));

if(target){

target.scrollIntoView({

behavior:"smooth"

});

}

});

});


/*==========================
      CONTACT LINKS
===========================*/

document.querySelectorAll("#contact a").forEach(link=>{

link.style.color="var(--primary)";

});


/*==========================
      FAQ
===========================*/

document.querySelectorAll("details").forEach(detail=>{

detail.addEventListener("toggle",()=>{

if(detail.open){

document.querySelectorAll("details").forEach(other=>{

if(other!==detail){

other.removeAttribute("open");

}

});

}

});

});


/*==========================
      PHONE VALIDATION
===========================*/

const phone=document.getElementById("customerPhone");

phone.addEventListener("input",()=>{

phone.value=phone.value.replace(/[^0-9]/g,'');

if(phone.value.length>10){

phone.value=phone.value.slice(0,10);

}

});


/*==========================
      SEARCH CLEAR
===========================*/

const search = document.getElementById("search");

search.addEventListener("input", () => {

    const value = search.value.toLowerCase();

    const filtered = products.filter(product =>
        product.name.toLowerCase().includes(value)
    );

    displayProducts(filtered);

});

/*==========================
      BUTTON EFFECT
===========================*/

document.querySelectorAll("button").forEach(btn=>{

btn.addEventListener("mousedown",()=>{

btn.style.transform="scale(.95)";

});

btn.addEventListener("mouseup",()=>{

btn.style.transform="scale(1)";

});

btn.addEventListener("mouseleave",()=>{

btn.style.transform="scale(1)";

});

});


/*==========================
      EMPTY CART AFTER ORDER
===========================*/

function clearCart(){

cart=[];

saveCart();

updateCartCount();

renderCart();

}

document.getElementById("whatsappOrder").addEventListener("click",()=>{

setTimeout(()=>{

clearCart();

showToast("Thank you for ordering ❤️");

},1000);

});
const productContainer = document.getElementById("productContainer");

function displayProducts(productList){

    productContainer.innerHTML = "";

    if(productList.length===0){
        productContainer.innerHTML="<h2>No products found</h2>";
        return;
    }

    productList.forEach(product=>{

        productContainer.innerHTML += `

        <div class="product-card">

            <img src="${product.image}" alt="${product.name}">

            <div class="product-info">

                <h3>${product.name}</h3>

                <p>${product.description}</p>

                <select
                    id="size-${product.id}"
                    class="size-select"
                    onchange="changePrice(this,${product.id})">

                    ${product.sizes.map(size => `
                        <option
                            value="${size.price}"
                            data-weight="${size.weight}">
                            ${size.weight} - ₹${size.price}
                        </option>
                    `).join("")}

                </select>

                <div
                    class="price"
                    id="price-${product.id}">

                    ₹${product.sizes[0].price}

                </div>

                <button
                    class="add-cart"
                    onclick="addToCart(${product.id})">

                    Add to Cart

                </button>

            </div>

        </div>

        `;

    });

}
function changePrice(select,id){

    document.getElementById("price-"+id).innerHTML="₹"+select.value;

}
const categoryButtons = document.querySelectorAll(".category");

categoryButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        categoryButtons.forEach(btn=>btn.classList.remove("active"));

        button.classList.add("active");

        const category = button.textContent.trim();

        if(category==="All"){

            displayProducts(products);

        }else{

            const filtered = products.filter(product=>product.category===category);

            displayProducts(filtered);

        }

    });

});


/*==========================
      PAGE LOAD
===========================*/

window.addEventListener("load",()=>{

updateCartCount();

renderCart();

displayProducts(products);

});


/*==========================
      END OF FILE
===========================*/