// Clase Carrito para manejar la lógica del carrito
class Carrito {
    constructor(productos) {
        this.productos = productos;  // Todos los productos de la API
        this.carrito = {};  // Objeto para almacenar productos y sus cantidades
    }

    actualizarUnidades(sku, unidades) {
        // Si unidades es 0, removemos el producto del carrito
        if (unidades === 0) {
            delete this.carrito[sku];
        } else {
            this.carrito[sku] = unidades;
        }
        this.actualizarTotal();
    }

    obtenerInformacionProducto(sku) {
        return this.productos.find(producto => producto.SKU === sku);
    }

    obtenerCarrito() {
        const productosCarrito = [];
        let total = 0;
        for (let sku in this.carrito) {
            const producto = this.obtenerInformacionProducto(sku);
            const cantidad = this.carrito[sku];
            const subtotal = cantidad * parseFloat(producto.price);
            total += subtotal;
            productosCarrito.push({
                ...producto,
                quantity: cantidad,
                subtotal: subtotal.toFixed(2)
            });
        }
        return {
            total: total.toFixed(2),
            products: productosCarrito
        };
    }

    actualizarTotal() {
        const carritoInfo = this.obtenerCarrito();
        document.getElementById('total-price').innerText = carritoInfo.total + '€';
    }

    renderizarProductosIniciales() {
        const cartItems = document.getElementById('cart-items');
        cartItems.innerHTML = ''; // Limpiamos los items actuales

        this.productos.forEach(producto => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${producto.title}</td>
                <td><input type="number" value="0" min="0" data-sku="${producto.SKU}"></td>
                <td>${producto.price}€</td>
                <td>0€</td>
            `;
            cartItems.appendChild(fila);
        });

        // Añadir event listeners para cambios de cantidad
        document.querySelectorAll('input[type="number"]').forEach(input => {
            input.addEventListener('change', (e) => {
                const sku = e.target.getAttribute('data-sku');
                const unidades = parseInt(e.target.value);
                this.actualizarUnidades(sku, unidades);
                this.actualizarFilaSubtotal(e.target, sku, unidades);
            });
        });
    }

    actualizarFilaSubtotal(inputElement, sku, unidades) {
        const producto = this.obtenerInformacionProducto(sku);
        const subtotal = unidades * parseFloat(producto.price);
        const fila = inputElement.closest('tr');
        const subtotalTd = fila.querySelector('td:last-child');
        subtotalTd.innerText = `${subtotal.toFixed(2)}€`;
    }
}

// Simulación de la llamada a una API para obtener los productos
fetch('https://jsonblob.com/1293960939114979328')
    .then(response => response.json())
    .then(data => {
        const carrito = new Carrito(data.products);
        carrito.renderizarProductosIniciales(); // Renderizar los productos en la tabla
        carrito.actualizarTotal(); // Inicializar el carrito vacío con el total
    })
    .catch(error => console.log('Error al cargar los productos: ', error));
