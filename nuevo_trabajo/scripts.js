// Array para almacenar temporalmente los productos
let productos = obtenerProductosLocalStorage() || [];

// Función para agregar un producto al array y actualizar la tabla
function agregarProducto() {
    const codigo = document.getElementById("codigoProducto").value;
    const descripcion = document.getElementById("descripcionProducto").value;
    const precio = document.getElementById("precioProducto").value;

    // Validar que los campos no estén vacíos
    if (codigo === "" || descripcion === "" || precio === "") {
        alert("Por favor, complete todos los campos.");
        return;
    }

    // Crear un objeto producto
    const nuevoProducto = {
        codigo: codigo,
        descripcion: descripcion,
        precio: precio
    };

    // Agregar el producto al array
    productos.push(nuevoProducto);

    // Guardar productos en localStorage
    guardarProductosLocalStorage();

    // Limpiar los campos del formulario
    document.getElementById("codigoProducto").value = "";
    document.getElementById("descripcionProducto").value = "";
    document.getElementById("precioProducto").value = "";

    // Actualizar la tabla de productos
    mostrarProductos();
}

// Función para mostrar los productos en la tabla
function mostrarProductos() {
    const tablaProductos = document.getElementById("tablaProductos");

    // Limpiar la tabla antes de agregar los productos
    while (tablaProductos.rows.length > 1) {
        tablaProductos.deleteRow(1);
    }

    // Agregar los productos a la tabla
    productos.forEach((producto, index) => {
        const row = tablaProductos.insertRow(index + 1);
        const cellNumero = row.insertCell(0);
        const cellCodigo = row.insertCell(1);
        const cellDescripcion = row.insertCell(2);
        const cellPrecio = row.insertCell(3);
        const cellAcciones = row.insertCell(4);

        cellNumero.innerHTML = index + 1;
        cellCodigo.innerHTML = producto.codigo;
        cellDescripcion.innerHTML = producto.descripcion;
        cellPrecio.innerHTML = producto.precio;

        // Botones de modificar y eliminar
        const btnModificar = document.createElement("button");
        btnModificar.innerText = "Modificar";
        btnModificar.onclick = function() {
            abrirModalModificar(index);
        };

        const btnEliminar = document.createElement("button");
        btnEliminar.innerText = "Eliminar";
        btnEliminar.onclick = function() {
            mostrarVentanaEliminar(index);
        };

        cellAcciones.appendChild(btnModificar);
        cellAcciones.appendChild(btnEliminar);
    });
}

// Función para abrir la ventana emergente de modificar
// Función para abrir la ventana emergente de modificar
function abrirModalModificar(index) {
    const producto = productos[index];

    // Verificar si el producto y los elementos existen
    if (producto && document.getElementById("nombreProducto") && document.getElementById("precioProductoModificar")) {
        document.getElementById("nombreProducto").value = producto.descripcion;
        document.getElementById("precioProductoModificar").value = producto.precio;

        // Mostrar la ventana emergente
        document.getElementById("modalModificar").style.display = "block";

        // Guardar el índice del producto a modificar
        window.indiceModificar = index;
    } else {
        console.error("Error al abrir la ventana de modificar: Elementos no encontrados.");
    }
}

// Función para modificar un producto
function modificarProducto() {
    const index = window.indiceModificar;
    const nombre = document.getElementById("nombreProducto").value;
    const nuevoPrecio = document.getElementById("precioProductoModificar").value;

    // Validar que los campos no estén vacíos
    if (nombre === "" || nuevoPrecio === "") {
        alert("Por favor, complete todos los campos.");
        return;
    }

    // Modificar el producto en el array
    productos[index].descripcion = nombre;
    productos[index].precio = nuevoPrecio;

    // Guardar productos en localStorage
    guardarProductosLocalStorage();

    // Cerrar la ventana emergente
    cerrarModalModificar();

    // Actualizar la tabla de productos
    mostrarProductos();
}

// Función para cerrar la ventana emergente de modificar
function cerrarModalModificar() {
    // Limpiar los campos del formulario
    document.getElementById("nombreProducto").value = "";
    document.getElementById("precioProductoModificar").value = "";

    // Ocultar la ventana emergente
    document.getElementById("modalModificar").style.display = "none";
}

// Función para mostrar la ventana emergente de confirmación de eliminación
function mostrarVentanaEliminar(index) {
    // Mostrar la ventana emergente
    document.getElementById("modalEliminar").style.display = "block";

    // Guardar el índice del producto a eliminar
    window.indiceEliminar = index;
}

// Función para cerrar la ventana emergente de confirmación de eliminación
function cerrarVentanaEliminar() {
    // Ocultar la ventana emergente
    document.getElementById("modalEliminar").style.display = "none";
}

// Función para eliminar un producto del array y actualizar la tabla
function eliminarProducto(index) {
    // Eliminar el producto del array
    productos.splice(index, 1);

    // Guardar productos en localStorage
    guardarProductosLocalStorage();

    // Cerrar la ventana emergente
    cerrarVentanaEliminar();

    // Actualizar la tabla de productos
    mostrarProductos();
}

// Función para guardar productos en localStorage
function guardarProductosLocalStorage() {
    localStorage.setItem("productos", JSON.stringify(productos));
}

// Función para obtener productos de localStorage
function obtenerProductosLocalStorage() {
    const productosLocalStorage = localStorage.getItem("productos");
    return productosLocalStorage ? JSON.parse(productosLocalStorage) : null;
}

// ...

// Función para buscar productos por nombre
function buscarProducto() {
    const busqueda = document.getElementById("busqueda").value.trim().toLowerCase();

    // Verificar si la búsqueda no está vacía
    if (busqueda !== "") {
        // Filtrar productos que coincidan con la búsqueda
        const resultados = productos.filter(producto =>
            producto.descripcion.toLowerCase().includes(busqueda)
        );

        // Mostrar los resultados en una nueva ventana emergente
        mostrarResultadosBusqueda(resultados);
    } else {
        // Si la búsqueda está vacía, cerrar la ventana emergente
        cerrarVentanaResultadosBusqueda();
    }
}

// Función para mostrar los resultados de la búsqueda en una ventana emergente
function mostrarResultadosBusqueda(resultados) {
    // Crear el contenido de la ventana emergente de resultados de búsqueda
    let contenido = "<h2>Resultados de Búsqueda</h2>";
    if (resultados.length === 0) {
        contenido += "<p>No se encontraron resultados.</p>";
    } else {
        contenido += "<table>";
        contenido += "<tr><th>#</th><th>Código</th><th>Descripción</th><th>Precio</th></tr>";
        resultados.forEach((producto, index) => {
            contenido += `<tr>`;
            contenido += `<td>${index + 1}</td>`;
            contenido += `<td>${producto.codigo}</td>`;
            contenido += `<td>${producto.descripcion}</td>`;
            contenido += `<td>${producto.precio}</td>`;
            contenido += `</tr>`;
        });
        contenido += "</table>";
    }

    // Mostrar la ventana emergente de resultados de búsqueda
    mostrarVentanaResultadosBusqueda(contenido);
}

// Función para mostrar la ventana emergente de resultados de búsqueda
function mostrarVentanaResultadosBusqueda(contenido) {
    const modalResultados = document.getElementById("modalResultados");
    const modalContentResultados = document.getElementById("modalContentResultados");

    // Colocar el contenido en la ventana emergente
    modalContentResultados.innerHTML = contenido;

    // Mostrar la ventana emergente
    modalResultados.style.display = "block";
}

// Función para cerrar la ventana emergente de resultados de búsqueda
function cerrarVentanaResultadosBusqueda() {
    document.getElementById("modalResultados").style.display = "none";
}

// Manejar el evento 'keydown' en el campo de búsqueda
document.getElementById("busqueda").addEventListener("keydown", function(event) {
    // Verificar si la tecla presionada es 'Enter'
    if (event.key === "Enter") {
        event.preventDefault(); // Evitar que se envíe el formulario por defecto
        buscarProducto();
    }
});


// Cerrar la ventana emergente de resultados de búsqueda al hacer clic fuera de ella
window.onclick = function(event) {
    const modalResultados = document.getElementById("modalResultados");
    if (event.target === modalResultados) {
        cerrarVentanaResultadosBusqueda();
    }
};



// Llamada a la función para mostrar productos (puede ir al final del archivo)
mostrarProductos();
