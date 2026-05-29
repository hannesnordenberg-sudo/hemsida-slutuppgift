let cart = JSON.parse(localStorage.getItem("rosesCart")) || [];
document.addEventListener("DOMContentLoaded", () => {
    const addToCartButtons = document.querySelectorAll(".btn2");
    addToCartButtons.forEach(button => {
        if(button.getAttribute("onclick") !== null) return; 
        button.addEventListener("click", (event) => {
            const card = event.target.closest(".card");
            const productName = card.querySelector("h3").innerText;
            const productPriceText = card.querySelector("p").innerText;
            const productPrice = parseInt(productPriceText.replace(" kr", ""));
            addToCart(productName, productPrice);
        });
    });
    updateCartUI();
    if (document.getElementById("checkoutCartItems")) {
        renderCheckoutPage();
    }
});
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: name, price: price, quantity: 1 });
    }
    localStorage.setItem("rosesCart", JSON.stringify(cart));

    updateCartUI();
}
function updateCartUI() {
    const cartCountElement = document.getElementById("cartCount");
    const cartItemsList = document.getElementById("cartItemsList");
    const cartTotalElement = document.getElementById("cartTotal");
    if (!cartItemsList) return;
    cartItemsList.innerHTML = "";
    let totalItems = 0;
    let totalPrice = 0;

    cart.forEach(item => {
        totalItems += item.quantity;
        totalPrice += item.price * item.quantity;

        const li = document.createElement("li");
        li.innerHTML = `
            <span>${item.name} (${item.quantity}st)</span>
            <span>${item.price * item.quantity} kr</span>
        `;
        cartItemsList.appendChild(li);
    });
    if (totalItems > 0) {
        cartCountElement.innerText = totalItems;
        cartCountElement.style.display = "flex";
    } else {
        cartCountElement.style.display = "none";
    }

    cartTotalElement.innerText = totalPrice;
}
function renderCheckoutPage() {
    const checkoutContainer = document.getElementById("checkoutCartItems");
    const checkoutTotalElement = document.getElementById("checkoutTotal");

    if (cart.length === 0) {
        checkoutContainer.innerHTML = "<p>Din varukorg är tom. Gå och köp lite eko mat!</p>";
        checkoutTotalElement.innerText = "0";
        return;
    }

    checkoutContainer.innerHTML = "";
    let totalPrice = 0;
    cart.forEach(item => {
        totalPrice += item.price * item.quantity;
        const itemRow = document.createElement("div");
        itemRow.style.display = "flex";
        itemRow.style.justify = "space-between";
        itemRow.style.padding = "10px 0";
        itemRow.style.borderBottom = "10px solid white"; 
        itemRow.innerHTML = `
            <span><strong>${item.name}</strong> (Antal: ${item.quantity}st)</span>
            <span>${item.price * item.quantity} kr (${item.price} kr/st)</span>
        `;
        checkoutContainer.appendChild(itemRow);
    });
    checkoutTotalElement.innerText = totalPrice;
}