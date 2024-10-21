class Carrito {
    constructor() {
        this.productos = [];
        this.total = 0;
    }

    
    agregarProducto(producto) {
        if (!producto) {
            console.error("No se puede agregar un producto indefinido");
            return;
        }
        
        // Asegúrate de que se agrega correctamente el producto
        const productoExistente = this.productos.find(p => p.SKU === producto.SKU);
        if (productoExistente) {
            productoExistente.cantidad++;
        } else {
            producto.cantidad = 1; // Añadimos una propiedad cantidad
            this.productos.push(producto);
        }
        this.mostrarCarrito(); // Actualizar el carrito
    }

    mostrarCarrito() {
        const cartItemsContainer = document.getElementById('cart-items');
        cartItemsContainer.innerHTML = ''; // Limpiar contenido anterior

        if (this.productos.length === 0) {
            cartItemsContainer.innerHTML = '<tr><td colspan="4">El carrito está vacío.</td></tr>';
            return;
        }

        this.productos.forEach(producto => {
            const totalProducto = (producto.price * producto.cantidad).toFixed(2); // Calcula el total para el producto
            const productoRow = document.createElement('tr');
            productoRow.innerHTML = `
                <td>${producto.title}</td>
                <td>${producto.cantidad}</td>
                <td>${producto.price}€</td>
                <td>${totalProducto}€</td>
            `;
            cartItemsContainer.appendChild(productoRow);
        });
    }

    actualizarTotal() {
        const totalPrice = this.productos.reduce((acc, prod) => acc + prod.precio, 0);
        const totalElement = document.getElementById('total-price');
        if (totalElement) {
            totalElement.innerText = `${totalPrice}€`;
        } else {
            console.error("El elemento para mostrar el total no se encuentra en el DOM");
        }
    }

    vaciarCarrito() {
        this.productos = [];
        this.mostrarCarrito();
    }
}

// Exportar la clase
export default Carrito;
