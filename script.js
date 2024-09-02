let carrito = [];
let total = 0;

function actualizarCarrito() {
    const carritoItems = document.getElementById("carritoItems");
    carritoItems.innerHTML = "";
    total = 0;

    carrito.forEach((item, index) => {
        const itemElemento = document.createElement("div");
        itemElemento.classList.add("item-carrito");
        itemElemento.innerHTML = `
            <p>${item.nombre}</p>
            <p>$${item.precio}</p>
            <p>Cantidad: ${item.cantidad}</p>
            <button class="quitar" data-index="${index}">Quitar</button>
        `;
        carritoItems.appendChild(itemElemento);
        total += item.precio * item.cantidad;
    });

    document.getElementById("total").textContent = total.toFixed(2);

    // Si no hay productos en el carrito, mostrar un mensaje
    if (carrito.length === 0) {
        carritoItems.innerHTML = "<p>No hay productos en el carrito.</p>";
    }

    // Agregar eventos de quitar producto
    document.querySelectorAll(".quitar").forEach(button => {
        button.addEventListener("click", () => {
            const index = button.getAttribute("data-index");
            carrito.splice(index, 1);
            actualizarCarrito();
        });
    });
}

// Evento para agregar productos al carrito
document.querySelectorAll(".agregar").forEach(button => {
    button.addEventListener("click", () => {
        const producto = button.closest(".producto");
        const nombre = producto.getAttribute("data-nombre");
        const precio = parseFloat(producto.getAttribute("data-precio"));
        const cantidad = parseInt(producto.querySelector(".cantidad").value);

        const productoExistente = carrito.find(item => item.nombre === nombre);
        if (productoExistente) {
            productoExistente.cantidad += cantidad;
        } else {
            carrito.push({ nombre, precio, cantidad });
        }

        actualizarCarrito();
    });
});

// Evento para proceder a la compra
document.getElementById("procederCompra").addEventListener("click", () => {
    if (carrito.length > 0) {
        const modal = document.getElementById("pagoTarjeta");
        modal.style.display = "block";
    } else {
        alert("No hay productos en el carrito.");
    }
});

// Cerrar el modal de pago
document.querySelector(".close").addEventListener("click", () => {
    const modal = document.getElementById("pagoTarjeta");
    modal.style.display = "none";
});

// Simulación del pago
document.getElementById("formPago").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Pago realizado con éxito!");
    carrito = [];
    actualizarCarrito();
    document.getElementById("pagoTarjeta").style.display = "none";
});
