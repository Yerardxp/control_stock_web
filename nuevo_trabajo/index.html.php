<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css">
    <title>Control de Stock</title>
</head>
<body>
<div class="container">
    <h1>Control de Stock</h1>

    <!-- Formulario para agregar productos -->
    <form id="formularioAgregar">
        <label for="codigoProducto">Código:</label>
        <input type="text" id="codigoProducto" required>

        <label for="descripcionProducto">Descripción:</label>
        <input type="text" id="descripcionProducto" required>

        <label for="precioProducto">Precio:</label>
        <input type="number" id="precioProducto" step="0.01" required>

        <button type="button" onclick="agregarProducto()">Agregar Producto</button>
    </form>

    <!-- Buscar producto por nombre -->
    <label for="busqueda">Buscar por nombre:</label>
    <input type="text" id="busqueda" onkeyup="buscarProducto()">

    <!-- Tabla de productos -->
    <table id="tablaProductos">
        <tr>
            <th>#</th>
            <th>Código</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Acciones</th>
        </tr>
        <!-- Aquí se cargarán dinámicamente los productos -->
    </table>

    <!-- Ventana emergente para modificar producto -->
    <div id="modalModificar" class="modal">
        <div class="modal-content">
            <span class="close" onclick="cerrarModalModificar()">&times;</span>
            <h2>Modificar Producto</h2>
            <form id="formularioModificar">
                <label for="nombreProducto">Nombre del Producto:</label>
                <input type="text" id="nombreProducto" required>

                <label for="precioProductoModificar">Precio:</label>
                <input type="number" id="precioProductoModificar" step="0.01" required>

                <button type="button" onclick="modificarProducto()">Guardar Cambios</button>
            </form>
        </div>
    </div>

    <!-- Ventana emergente de confirmación de eliminación -->
    <div id="modalEliminar" class="modal-confirmacion">
        <div class="modal-content-confirmacion">
            <p>¿Estás seguro de eliminar este producto?</p>
            <button onclick="eliminarProducto(window.indiceEliminar)">Sí, Eliminar</button>
            <button onclick="cerrarVentanaEliminar()">Cancelar</button>
        </div>
    </div>
</div>

<!-- Ventana emergente de resultados de búsqueda -->
<div id="modalResultados" class="modal">
    <div class="modal-content" id="modalContentResultados">
        <span class="close" onclick="cerrarVentanaResultadosBusqueda()">&times;</span>
        <!-- Contenido de resultados -->
    </div>
</div>



<script src="scripts.js"></script>
</body>
</html>
