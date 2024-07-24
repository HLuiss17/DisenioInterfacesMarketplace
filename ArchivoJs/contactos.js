document.addEventListener('DOMContentLoaded', function() {
    const mensajeInput = document.getElementById('mensaje');

    // Función para contar las palabras
    function contarPalabras(texto) {
        return texto.trim().split(/\s+/).length;
    }     

    // Función para validar la cantidad de palabras     
    function validarPalabras() {
        const mensaje = mensajeInput.value.trim();
        if (contarPalabras(mensaje) > 25) {
            // Si se excede el límite, recortar el texto a 100 palabras
            const palabras = mensaje.split(/\s+/).slice(0, 100).join(' ');
            mensajeInput.value = palabras;
            alert('El mensaje no puede tener más de 100 palabras.');
        }
    }

    // Evento para validar la cantidad de palabras en tiempo real
    mensajeInput.addEventListener('input', validarPalabras);

    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault(); 

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
});
