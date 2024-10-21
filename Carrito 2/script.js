import Carrito from './carrito.js';

// Crear una instancia de Carrito
const carrito = new Carrito();

// URL base para la API de categorías usando un proxy alternativo
const baseURLCategories = 'https://jsonblob.com/api/1298035970451300352';

// Función para obtener los productos usando fetch desde la URL
async function obtenerProductos() {
    const genre = ''; // Si necesitas agregar un género, defínelo aquí
    const opts = '';  // Si necesitas agregar opciones adicionales, defínelo aquí

    try {
        const response = await fetch(`${baseURLCategories}${genre}${opts}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json', // Asegúrate de definir el tipo de contenido
            }
        });

        // Verificar si la respuesta es exitosa
        if (!response.ok) {
            throw new Error(`Error en la red: ${response.status} ${response.statusText}`);
        }

        const data = await response.json(); // Convertir la respuesta a JSON
        console.log(data); // Verificar los datos obtenidos

        // Verificar que 'products' sea un array
        if (Array.isArray(data.products)) {
            mostrarProductos(data.products); // Mostrar productos si 'products' es un array
        } else {
            console.error('Los datos obtenidos no contienen un array de productos');
        }
    } catch (error) {
        console.error('Error al obtener los productos:', error);
    }
}

// Función para mostrar los productos en el HTML
function mostrarProductos(productos) {
    const productosDiv = document.getElementById('productos');
    productosDiv.innerHTML = ''; // Limpiar el contenido anterior

    productos.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.innerHTML = `
            <h3>${producto.title}</h3>
            <p>Precio: ${producto.price}€</p>
            <button class="agregar-carrito" data-sku="${producto.SKU}">Agregar al Carrito</button>
        `;
        productosDiv.appendChild(productoDiv);
    });

    // Agregar evento a los botones para añadir productos al carrito
    const botonesAgregar = document.querySelectorAll('.agregar-carrito');
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', (event) => {
            const skuProducto = event.target.getAttribute('data-sku');
            const productoSeleccionado = productos.find(p => p.SKU === skuProducto);
            console.log("Producto seleccionado:", productoSeleccionado); // Verifica el producto
            carrito.agregarProducto(productoSeleccionado); // Asegúrate de que esto esté correcto
        });
    });
}


// Obtener los productos al cargar la página
document.addEventListener('DOMContentLoaded', obtenerProductos);
