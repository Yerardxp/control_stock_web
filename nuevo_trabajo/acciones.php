<?php
// Establecer la conexión con la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "control_stock";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Operación de Modificar
if (isset($_POST['accion']) && $_POST['accion'] === 'modificar') {
    $nombre = $_POST['nombre'];
    $nuevoPrecio = $_POST['nuevoPrecio'];

    $sql = "UPDATE productos SET precio = '$nuevoPrecio' WHERE descripcion = '$nombre'";

    if ($conn->query($sql) === TRUE) {
        echo "Modificación exitosa";
    } else {
        echo "Error al modificar el producto: " . $conn->error;
    }
}

// Operación de Eliminar
if (isset($_POST['accion']) && $_POST['accion'] === 'eliminar') {
    $nombre = $_POST['nombre'];

    $sql = "DELETE FROM productos WHERE descripcion = '$nombre'";

    if ($conn->query($sql) === TRUE) {
        echo "Eliminación exitosa";
    } else {
        echo "Error al eliminar el producto: " . $conn->error;
    }
}

// Cerrar la conexión
$conn->close();
?>
