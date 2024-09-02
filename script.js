let carrito = [];
let total = 0;

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

function actualizarCarrito() {
    const carritoItems = document.getElementById("carrito-contenido");
    carritoItems.innerHTML = "";

    if (carrito.length === 0) {
        carritoItems.innerHTML = "<p>No hay productos en el carrito.</p>";
    } else {
        carrito.forEach((item, index) => {
            const div = document.createElement("div");
            div.className = "cart-item";
            div.textContent = `${item.cantidad} x ${item.nombre} - S/ ${item.precio * item.cantidad}`;
            const btnQuitar = document.createElement("button");
            btnQuitar.textContent = "Eliminar";
            btnQuitar.className = "remove-btn";
            btnQuitar.addEventListener("click", () => {
                carrito.splice(index, 1);
                actualizarCarrito();
            });
            div.appendChild(btnQuitar);
            carritoItems.appendChild(div);
        });
    }

    total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    document.getElementById("total").textContent = `Total: S/ ${total.toFixed(2)}`;
}

document.getElementById("proceder-compra").addEventListener("click", () => {
    // Página de resumen antes del pago
    const resumen = carrito.map(item => `${item.cantidad} x ${item.nombre} - S/ ${item.precio * item.cantidad}`).join('\\n');
    alert(`Resumen de tu compra:\\n${resumen}\\nTotal: S/ ${total.toFixed(2)}`);

    // Integración de pasarelas de pago (simulada)
    const mediosPago = confirm("¿Deseas proceder con el pago con tarjeta o PayPal?");
    if (mediosPago) {
        // Aquí iría la integración real de la pasarela de pagos
        alert("Redirigiendo a la pasarela de pagos...");
        // Ejemplo de redirección
        window.location.href = "https://www.paypal.com/checkout";
    } else {
        alert("Redirigiendo al chat de WhatsApp para finalizar la compra.");
        const mensaje = `Hola, quiero comprar los siguientes productos:\\n${resumen}\\nTotal a pagar: S/ ${total.toFixed(2)}`;
        window.location.href = `https://wa.me/tu-numero-de-whatsapp?text=${encodeURIComponent(mensaje)}`;
    }
});
