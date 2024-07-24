// Variables
var carritoCompras = [];

// Función para cargar productos
function cargarProductos(categoria) {
    const archivoJson = categoria === 'categoriasPrincipal' ? 'categoriasPrincipal.json' : `${categoria}.json`;
    fetch(`../ArchivosJson/${archivoJson}`)
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('productos', JSON.stringify(data));
            categoriaProductos(data);
        })
        .catch(error => console.error('Error al cargar productos', error));
}

// Función para mostrar productos en el contenedor

function categoriaProductos(data) {
    const contenedor = document.getElementById('contenedorProductos');
    const contenedor1 = document.getElementById('contenedorProductos1');
    const contenedor2 = document.getElementById('contenedorProductos2');
    const contenedor3 = document.getElementById('contenedorProductos3');

    contenedor.innerHTML = '';
    contenedor1.innerHTML = '';
    contenedor2.innerHTML = '';
    contenedor3.innerHTML = '';

    var contador = 0;

    data.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.className = 'col-md-2 col-sm-4 col-6 producto';

        const nombre = document.createElement('h1');
        nombre.textContent = producto.nombre;

        const imagen = document.createElement('img');
        imagen.src = producto.img;
        imagen.alt = producto.nombre;

        const descripcion = document.createElement('p');
        descripcion.textContent = producto.descripcion || '';

        const precio = document.createElement('p');
        precio.textContent = producto.precio || '';

        const btn = document.createElement('button');
        btn.innerHTML = 'Comprar <i class="bi bi-cart"></i>';
        btn.className = 'btn btn-primary';
        btn.addEventListener('click', () => {
            agregarAlCarrito(producto);
        });

        productoDiv.appendChild(nombre);
        productoDiv.appendChild(imagen);
        productoDiv.appendChild(descripcion);
        productoDiv.appendChild(precio);
        productoDiv.appendChild(btn);

        contador++;
        if (contador <= 4) {
            contenedor.appendChild(productoDiv);
        } else if (contador > 4 && contador <= 8) {
            contenedor1.appendChild(productoDiv);
        } else if (contador > 8 && contador <= 12) {
            contenedor2.appendChild(productoDiv);
        } else if (contador > 12 && contador <= 16) {
            contenedor3.appendChild(productoDiv);
        }
    });
    console.log(contador);
}

// Función para buscar productos
function buscarProducto() {
    const filtroProducto = document.getElementById('txtBuscar').value.toLowerCase();
    console.log('Filtro:', filtroProducto);

    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    console.log('Productos:', productos);

    const productosFiltrados = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(filtroProducto)
    );
    console.log('Productos Filtrados:', productosFiltrados);

    categoriaProductos(productosFiltrados);
}

// Función para actualizar el modal del carrito
function actualizarModalCarrito() {
    const productosCarrito = document.getElementById('productosCarrito');
    productosCarrito.innerHTML = ''; // Limpiar contenido anterior

    carritoCompras.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.className = 'col-md-3 col-sm-4 col-6 producto';

        const nombre = document.createElement('h5');
        nombre.textContent = producto.nombre;

        const imagen = document.createElement('img');
        imagen.src = producto.img;
        imagen.alt = producto.nombre;
        imagen.style.width = '100px'; 

        const descripcion = document.createElement('p');
        descripcion.textContent = producto.descripcion || '';

        const precio = document.createElement('p');
        precio.textContent = producto.precio || '';

        productoDiv.appendChild(imagen);
        productoDiv.appendChild(nombre);
        productoDiv.appendChild(descripcion);
        productoDiv.appendChild(precio);

        productosCarrito.appendChild(productoDiv);
    });
}

// Función para agregar productos al carrito
function agregarAlCarrito(producto) {
    carritoCompras.push(producto);
    console.log('Carrito', carritoCompras);
    actualizarIconCarrito();
    actualizarModalCarrito(); // Actualiza el contenido del modal
}

// Función para actualizar el icono del carrito
function actualizarIconCarrito() {
    const cantidad = carritoCompras.length;
    document.getElementById('cantidadCarrito').textContent = cantidad;
}


function cambiarCategoria(categoria) {
    cargarProductos(categoria);
    const botonCategorias = document.getElementById('categorias');
    const textoCategoria = categoria.charAt(0).toUpperCase() + categoria.slice(1);
    botonCategorias.textContent = textoCategoria;
}
// Cargar productos y agregar evento al campo de búsqueda
document.addEventListener('DOMContentLoaded', function () {
    cargarProductos('categoriasPrincipal'); 

    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    document.getElementById('txtBuscar').addEventListener('input', buscarProducto);
});
