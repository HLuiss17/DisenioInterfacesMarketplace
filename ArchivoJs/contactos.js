document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío predeterminado del formulario

    // Obtener valores de los campos
    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const mail = document.getElementById('mail').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    // Obtener el contenedor del mensaje de éxito
    const mensajeExito = document.getElementById('mensajeExito');

    // Validar los campos
    if (nombre === '' || apellido === '' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail) || mensaje === '') {
        alert('Por favor, complete todos los campos correctamente.');
    } else {
        alert("Mensaje enviado");
        limpiarCampos();
    }
});
function limpiarCampos() {
    document.getElementById('nombre').value = '';
    document.getElementById('apellido').value = '';
    document.getElementById('mail').value = '';
    document.getElementById('mensaje').value = '';
}