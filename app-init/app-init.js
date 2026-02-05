// app-init.js
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar la aplicación
    const app = new AppRouter();
    
    // Exponer globalmente para debugging
    window.app = app;
    
    console.log('Aplicación inicializada correctamente');
    console.log('Usa window.app.navigate("search") o window.app.navigate("registration") para navegar');
});