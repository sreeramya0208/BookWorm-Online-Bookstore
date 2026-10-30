function registerUser() {

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let phone = document.getElementById("phone").value;
    let address = document.getElementById("address").value;

    if (name === "") {
        document.getElementById("message").innerHTML =
            "Please enter your name.";
        return;
    }

    if (email === "") {
        document.getElementById("message").innerHTML =
            "Please enter your email.";
        return;
    }

    if (password === "") {
        document.getElementById("message").innerHTML =
            "Please enter your password.";
        return;
    }

    if (password !== confirmPassword) {
        document.getElementById("message").innerHTML =
            "Passwords do not match.";
        return;
    }

    if (phone === "") {
        document.getElementById("message").innerHTML =
            "Please enter your phone number.";
        return;
    }

    if (address === "") {
        document.getElementById("message").innerHTML =
            "Please enter your address.";
        return;
    }

    document.getElementById("message").innerHTML =
        "Registration successful!";
}


function loginUser() {

    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    if (email === "") {
        document.getElementById("loginMessage").innerHTML =
            "Please enter your email.";
        return;
    }

    if (password === "") {
        document.getElementById("loginMessage").innerHTML =
            "Please enter your password.";
        return;
    }

    document.getElementById("loginMessage").innerHTML =
        "Login successful!";
}


function updateProfile() {

    let name = document.getElementById("profileName").value;
    let email = document.getElementById("profileEmail").value;
    let phone = document.getElementById("profilePhone").value;
    let address = document.getElementById("profileAddress").value;

    if (name === "") {
        document.getElementById("profileMessage").innerHTML =
            "Please enter your name.";
        return;
    }

    if (email === "") {
        document.getElementById("profileMessage").innerHTML =
            "Please enter your email.";
        return;
    }

    if (phone === "") {
        document.getElementById("profileMessage").innerHTML =
            "Please enter your phone number.";
        return;
    }

    if (address === "") {
        document.getElementById("profileMessage").innerHTML =
            "Please enter your address.";
        return;
    }

    document.getElementById("profileMessage").innerHTML =
        "Profile updated successfully!";
}


/* Shopping Cart */

let cart = JSON.parse(localStorage.getItem("cart")) || [];


function addToCart(bookName, price) {

    let found = false;

    for (let i = 0; i < cart.length; i++) {

        if (cart[i].name === bookName) {
            cart[i].quantity++;
            found = true;
        }
    }

    if (found === false) {

        let book = {
            name: bookName,
            price: price,
            quantity: 1
        };

        cart.push(book);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    document.getElementById("catalogMessage").innerHTML =
        bookName + " has been added to the cart.";
}


function searchBooks() {

    let searchText =
        document.getElementById("searchBook").value.toLowerCase();

    let books = document.getElementsByClassName("book");

    let found = false;

    for (let i = 0; i < books.length; i++) {

        let bookText = books[i].innerHTML.toLowerCase();

        if (bookText.includes(searchText)) {
            books[i].style.display = "block";
            found = true;
        } else {
            books[i].style.display = "none";
        }
    }

    if (found === false) {
        document.getElementById("searchMessage").innerHTML =
            "No books found.";
    } else {
        document.getElementById("searchMessage").innerHTML = "";
    }
}


function displayCart() {

    let cartItems = document.getElementById("cartItems");

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p>Your cart is empty.</p>";

        document.getElementById("subtotal").innerHTML =
            "Subtotal: €0";

        document.getElementById("total").innerHTML =
            "Total: €0";

        return;
    }

    let subtotal = 0;

    for (let i = 0; i < cart.length; i++) {

        let itemTotal =
            cart[i].price * cart[i].quantity;

        subtotal = subtotal + itemTotal;

        cartItems.innerHTML +=
            "<div class='cart-book'>" +
            "<h3>" + cart[i].name + "</h3>" +
            "<p>Price: €" + cart[i].price + "</p>" +
            "<p>Quantity: " + cart[i].quantity + "</p>" +

            "<input type='button' value='-' " +
            "onclick='decreaseQuantity(" + i + ")'>" +

            " " + cart[i].quantity + " " +

            "<input type='button' value='+' " +
            "onclick='increaseQuantity(" + i + ")'>" +

            "<br><br>" +

            "<input type='button' value='Remove' " +
            "onclick='removeBook(" + i + ")'>" +

            "</div><br>";
    }

    document.getElementById("subtotal").innerHTML =
        "Subtotal: €" + subtotal;

    document.getElementById("total").innerHTML =
        "Total: €" + subtotal;
}


function increaseQuantity(index) {

    cart[index].quantity++;

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();
}


function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();
}


function removeBook(index) {

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();
}


/* Payment */

function makePayment() {

    let cardName = document.getElementById("cardName").value;
    let cardNumber = document.getElementById("cardNumber").value;
    let expiryDate = document.getElementById("expiryDate").value;
    let cvv = document.getElementById("cvv").value;

    if (cardName === "") {
        document.getElementById("paymentMessage").innerHTML =
            "Please enter the cardholder name.";
        return;
    }

    if (cardNumber === "") {
        document.getElementById("paymentMessage").innerHTML =
            "Please enter the card number.";
        return;
    }

    if (cardNumber.length !== 16 || isNaN(cardNumber)) {
        document.getElementById("paymentMessage").innerHTML =
            "Card number must contain 16 digits.";
        return;
    }

    if (expiryDate === "") {
        document.getElementById("paymentMessage").innerHTML =
            "Please enter the expiry date.";
        return;
    }

    if (expiryDate.length !== 5 ||
        expiryDate.charAt(2) !== "/") {
        document.getElementById("paymentMessage").innerHTML =
            "Please enter expiry date in MM/YY format.";
        return;
    }

    if (cvv === "") {
        document.getElementById("paymentMessage").innerHTML =
            "Please enter the CVV.";
        return;
    }

    if (cvv.length !== 3 || isNaN(cvv)) {
        document.getElementById("paymentMessage").innerHTML =
            "CVV must contain 3 digits.";
        return;
    }

    let total = 0;

    for (let i = 0; i < cart.length; i++) {

        total = total +
            cart[i].price * cart[i].quantity;
    }

    let today = new Date();

    let orderId =
        "BW" +
        today.getFullYear() +
        (today.getMonth() + 1) +
        today.getDate() +
        today.getHours() +
        today.getMinutes() +
        today.getSeconds();

    localStorage.setItem("orderId", orderId);
    localStorage.setItem("orderCustomer", cardName);
    localStorage.setItem("orderBooks", JSON.stringify(cart));
    localStorage.setItem("orderTotal", total);
    localStorage.setItem(
        "orderDate",
        today.toLocaleDateString()
    );

    document.getElementById("paymentMessage").innerHTML =
        "Payment successful!";
}


/* Order Confirmation */

function showConfirmation() {

    let orderId =
        localStorage.getItem("orderId");

    let customerName =
        localStorage.getItem("orderCustomer");

    let orderBooks =
        JSON.parse(localStorage.getItem("orderBooks"));

    let orderTotal =
        localStorage.getItem("orderTotal");

    let orderDate =
        localStorage.getItem("orderDate");

    document.getElementById("confirmationMessage").innerHTML =
        "Thank you! Your order has been placed successfully.";

    document.getElementById("orderId").innerHTML =
        "Order ID: " + orderId;

    document.getElementById("customerName").innerHTML =
        "Cardholder Name: " + customerName;

    let orderedBooks =
        document.getElementById("orderedBooks");

    orderedBooks.innerHTML = "";

    for (let i = 0; i < orderBooks.length; i++) {

        orderedBooks.innerHTML +=
            "<p>" +
            orderBooks[i].name +
            " - Quantity: " +
            orderBooks[i].quantity +
            "</p>";
    }

    document.getElementById("orderTotal").innerHTML =
        "Total Amount: €" + orderTotal;

    document.getElementById("orderDate").innerHTML =
        "Order Date: " + orderDate;
}

function searchFromHome() {

    let searchText =
        document.getElementById("homeSearch").value.toLowerCase();

    let books =
        document.getElementsByClassName("book");

    let found = false;

    for (let i = 0; i < books.length; i++) {

        let bookText =
            books[i].innerHTML.toLowerCase();

        if (bookText.includes(searchText)) {
            books[i].style.display = "block";
            found = true;
        } else {
            books[i].style.display = "none";
        }
    }
}