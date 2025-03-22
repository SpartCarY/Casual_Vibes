// Simulación de un arreglo "cart" para almacenar los productos añadidos
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Arreglo con información de los productos
const products = [
    {
        id: 1,
        name: "Converse Red",
        price: 1000.99,
        image: "/public/image/converse_PNG45.png",
        description: "Diseñados para ofrecer soporte y estilo, estos zapatos son ideales tanto para el gimnasio como para un look casual.",
        colors: ["Rojo", "Negro"],
        sizes: [39, 40, 41, 42],
    },
    {
        id: 2,
        name: "Converse BlueSky",
        price: 2000.99,
        image: "/public/image/112137-converse-shoes-png-download-free.png",
        description: "Perfectos para actividades de alto rendimiento, estos zapatos destacan por su ligereza y durabilidad.",
        colors: ["Blanco", "Beige"],
        sizes: [38, 39, 40, 42],
    },
    {
        id: 3,
        name: "Converse White",
        price: 1750.99,
        image: "/public/image/OIP__6_-removebg-preview (1).png",
        description: "Diseñados para ofrecer soporte y estilo, estos zapatos son ideales tanto para el gimnasio como para un look casual.",
        colors: ["Negro", "Gris"],
        sizes: [40, 41, 42, 43],
    },
    {
        id: 4,
        name: "Converse Red",
        price: 1200.99,
        image: "/public/image/18-184149_transparent-converse-shoe-png-png-download-removebg-preview.png",
        description: "Perfectos para actividades de alto rendimiento, estos zapatos destacan por su ligereza y durabilidad.",
        colors: ["Negro", "Gris"],
        sizes: [40, 41, 42, 43],
    },
    {
        id: 5,
        name: "Vans",
        price: 1500.99,
        image: "/public/image/4573103-middle-removebg-preview.png",
        description: "Diseñados para brindar comodidad en todo momento, estos zapatos se adaptan a tu estilo de vida dinámico",
        colors: ["Negro", "Gris"],
        sizes: [40, 41, 42, 43],
    },
    {
        id: 6,
        name: "Vans 2",
        price: 2200.99,
        image: "/public/image/R.png",
        description: "Un diseño moderno y elegante que combina con cualquier outfit, ya sea deportivo o casual.",
        colors: ["Negro", "Gris"],
        sizes: [40, 41, 42, 43],
    },
    {
        id: 7,
        name: "Nike 1",
        price: 1100.99,
        image: "/public/image/OIP__8_-removebg-preview (1).png",
        description: "Máxima tecnología de amortiguación y soporte en un diseño versátil para todos tus entrenamientos.",
        colors: ["Negro", "Gris"],
        sizes: [40, 41, 42, 43],
    },
    {
        id: 8,
        name: "Nike 2",
        price: 1500.99,
        image: "/public/image/OIP__9_-removebg-preview.png",
        description: "Diseñados para el atleta urbano, estos zapatos ofrecen estilo y funcionalidad en cada paso.",
        colors: ["Negro", "Gris", "Rojo"],
        sizes: [40, 41, 42, 43],
    },
];

// Función para obtener el producto desde el ID de la URL
function getProductById(id) {
    return products.find((product) => product.id === id);
}

// Función para cargar la información del producto en la página
function loadProductInfo(product) {
    if (!product) {
        document.querySelector("main").innerHTML = "<h1>Producto no encontrado</h1>";
        return;
    }

    // Cargar nombre del producto
    document.getElementById("title-description").textContent = product.name;

    // Cargar imagen
    document.querySelector(".container-img img").src = product.image;

    // Cargar precio
    document.querySelector(".container-price span").textContent = `$${product.price.toFixed(2)}`;

    // Cargar descripción
    document.querySelector(".text-description p").textContent = product.description;

    // Cargar colores
    const colorSelect = document.getElementById("colour");
    product.colors.forEach((color) => {
        const option = document.createElement("option");
        option.value = color.toLowerCase();
        option.textContent = color;
        colorSelect.appendChild(option);
    });

    // Cargar tallas
    const sizeSelect = document.getElementById("size");
    product.sizes.forEach((size) => {
        const option = document.createElement("option");
        option.value = size;
        option.textContent = size;
        sizeSelect.appendChild(option);
    });
}

// Función para añadir productos al carrito
function addToCart(product) {
    const selectedColor = document.getElementById("colour").value;
    const selectedSize = document.getElementById("size").value;
    const quantity = parseInt(document.querySelector(".input-quantity").value, 10);

    if (!selectedColor || !selectedSize || quantity < 1) {
        alert("Por favor selecciona un color, talla y cantidad válidos.");
        return;
    }

    // Verificar si el producto ya está en el carrito con la misma combinación
    const existingProductIndex = cart.findIndex(
        (item) =>
            item.id === product.id &&
            item.color === selectedColor &&
            item.size === selectedSize
    );

    if (existingProductIndex > -1) {
        // Si ya existe, actualizar la cantidad
        cart[existingProductIndex].quantity += quantity;
    } else {
        // Si no existe, agregar un nuevo producto al carrito
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            color: selectedColor,
            size: selectedSize,
            quantity: quantity,
        });
    }

    // Guardar carrito en localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Función para mostrar los productos en el carrito
function displayCartItems() {
    const cartItemsContainer = document.querySelector(".cart-items");
    const subtotalElement = document.getElementById("subtotal");
    const taxElement = document.getElementById("tax");
    const totalElement = document.getElementById("total");

    cartItemsContainer.innerHTML = ""; // Limpiar contenedor
    let subtotal = 0;

    cart.forEach((item, index) => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("cart-item");

        itemElement.innerHTML = `
            <div class="item-info">
                <img src="${item.image}" alt="Imagen del producto" class="item-image" />
                <div>
                    <h3 class="item-name">${item.name}</h3>
                    <p class="item-color">Color: ${item.color}</p>
                    <p class="item-size">Talla: ${item.size}</p>
                </div>
            </div>
            <div class="item-quantity">
                <button class="decrease" data-index="${index}">-</button>
                <input type="number" value="${item.quantity}" min="1" class="quantity-input" data-index="${index}" />
                <button class="increase" data-index="${index}">+</button>
            </div>
            <div class="item-price">
                <p>$${(item.price * item.quantity).toFixed(2)}</p>
            </div>
            <button class="remove-item" data-index="${index}">Eliminar</button>
        `;

        cartItemsContainer.appendChild(itemElement);
        subtotal += item.price * item.quantity;
    });

    // Actualizar el resumen
    const tax = subtotal * 0.08; // 8% de impuestos
    const total = subtotal + tax;

    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    taxElement.textContent = `$${tax.toFixed(2)}`;
    totalElement.textContent = `$${total.toFixed(2)}`;

    // Eventos para los botones de cantidad y eliminar
    setupCartEvents();
}

// Configurar eventos para el carrito
function setupCartEvents() {
    // Eliminar producto
    document.querySelectorAll(".remove-item").forEach((button) => {
        button.addEventListener("click", (e) => {
            const index = e.target.dataset.index;
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            displayCartItems();
        });
    });

    // Incrementar cantidad
    document.querySelectorAll(".increase").forEach((button) => {
        button.addEventListener("click", (e) => {
            const index = e.target.dataset.index;
            cart[index].quantity += 1;
            localStorage.setItem("cart", JSON.stringify(cart));
            displayCartItems();
        });
    });

    // Decrementar cantidad
    document.querySelectorAll(".decrease").forEach((button) => {
        button.addEventListener("click", (e) => {
            const index = e.target.dataset.index;
            if (cart[index].quantity > 1) {
                cart[index].quantity -= 1;
                localStorage.setItem("cart", JSON.stringify(cart));
                displayCartItems();
            }
        });
    });
}

// Obtener el ID del producto desde la URL
const params = new URLSearchParams(window.location.search);
const productId = parseInt(params.get("id"), 10);

// Buscar el producto y cargarlo en la página
const selectedProduct = getProductById(productId);

document.addEventListener("DOMContentLoaded", () => {
    if (selectedProduct) {
        loadProductInfo(selectedProduct);

        // Configurar evento para el botón de "Añadir al carrito"
        const addToCartButton = document.querySelector(".btn-add-to-cart");
        addToCartButton.addEventListener("click", () => {
            addToCart(selectedProduct);
        });
    } else {
        // Mostrar carrito en la página correspondiente
        displayCartItems();
    }
});
