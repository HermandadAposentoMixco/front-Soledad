// app.js
// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', function() {
    const form = new FormModule('formApp');
    
    // Personalizar el comportamiento del submit
    form.onSubmit = function(data) {
        console.log('Datos recibidos:', data);
        
        // Ejemplo: enviar a una API
        /*
        fetch('/api/consultar-devoto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            console.log('Respuesta:', result);
            // Manejar la respuesta
        })
        .catch(error => {
            console.error('Error:', error);
        });
        */
        
        alert(`Consultando información para documento: ${data.document}`);
    };
});
