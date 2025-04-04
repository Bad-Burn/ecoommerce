let cart = [];

function addToCart(productName, price) {
    const existingItem = cart.find(item => item.name === productName);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name: productName, price: price, quantity: 1 });
    }

    saveCart();
    showPopup(productName);
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function loadCart() {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
        cart = JSON.parse(storedCart);
    }
}

function displayCart() {
    loadCart();
    const cartContainer = document.getElementById("cart-items");
    cartContainer.innerHTML = "";

    let total = 0;

    cart.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";

        const itemName = document.createElement("p");
        itemName.textContent = `${item.name} - PHP ${item.price.toFixed(2)} x Quantity: ${item.quantity}`;
        cartItem.appendChild(itemName);

        const controls = document.createElement("div");
        controls.className = "item-controls";

        const addButton = document.createElement("button");
        addButton.textContent = "+";
        addButton.onclick = () => {
            item.quantity++;
            saveCart();
            displayCart();
        };

        const minusButton = document.createElement("button");
        minusButton.textContent = "-";
        minusButton.onclick = () => {
            item.quantity--;
            if (item.quantity === 0) {
                cart = cart.filter(cartItem => cartItem !== item);
            }
            saveCart();
            displayCart();
        };

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.onclick = () => {
            cart = cart.filter(cartItem => cartItem !== item);
            saveCart();
            displayCart();
        };

        controls.appendChild(addButton);
        controls.appendChild(minusButton);
        controls.appendChild(removeButton);
        cartItem.appendChild(controls);

        cartContainer.appendChild(cartItem);

        total += item.price * item.quantity;
    });

    const totalElement = document.createElement("p");
    totalElement.className = "cart-total";
    totalElement.textContent = `Total: PHP ${total.toFixed(2)}`;
    cartContainer.appendChild(totalElement);
}

// Function to show popup message
function showPopup(productName) {
    const popup = document.createElement("div");
    popup.className = "popup";
    popup.textContent = `${productName} has been added to the cart!`;
    document.body.appendChild(popup);

    setTimeout(() => {
        popup.remove();
    }, 2000);
}

// Checkout functionality
function proceedToCheckout() {
    loadCart();
    let totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    alert(`Thank you for your purchase! Total Amount: PHP ${totalAmount.toFixed(2)}`);
    cart = [];
    saveCart();
    displayCart();
}

// Load cart on page load
window.onload = () => {
    if (window.location.pathname.includes("cart.html")) {
        displayCart();
    }
    loadCart();
};
