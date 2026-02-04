// AppRouter.js
class AppRouter {
    constructor() {
        this.currentView = 'search';
        this.userData = null;
        this.init();
    }

    init() {
        this.renderLayout();
        this.initializeModules();
        this.showView('search');
    }

    renderLayout() {
        const app = document.getElementById('app');
        app.innerHTML = `
            <!-- Header -->
            <header class="app-header">
                <div class="header-content">
                    <div class="logo-container">
                        <img src="escudoSoledad.png" alt="" class="logo">
                            
                            <path d="M50 20 L60 45 L85 45 L65 60 L72 85 L50 70 L28 85 L35 60 L15 45 L40 45 Z" 
                                  fill="#d4af37" stroke="#d4af37" stroke-width="1"/>
                            <circle cx="50" cy="50" r="8" fill="#d4af37"/>
                        </svg>
                    </div>
                    <div class="text-content">
                        <h1 class="header-title">Plataforma - Confirmación de información de devoto</h1>
                        <p class="header-subtitle">Sistema de actualización / comprobante con QR</p>
                    </div>
                </div>
            </header>

            <!-- Main Content -->
            <main class="main-container">
                <!-- Vista 1: Búsqueda -->
                <div id="searchView" class="view">
                    <div class="two-column-layout">
                        <div class="column-left">
                            <div id="searchFormContainer"></div>
                        </div>
                        <div class="column-right">
                            <div id="qrPreviewContainer"></div>
                        </div>
                    </div>
                </div>

                <!-- Vista 2: Registro/Actualización -->
                <div id="registrationView" class="view">
                    <div id="registrationFormContainer"></div>
                </div>
            </main>
        `;
    }

    initializeModules() {
        // Inicializar módulo de búsqueda
        this.searchForm = new FormModule('searchFormContainer');
        this.searchForm.onSubmit = (data) => this.handleSearch(data);

        // Inicializar módulo de QR Preview
        this.qrPreview = new QRPreviewModule('qrPreviewContainer');

        // Inicializar módulo de registro
        this.registrationForm = new RegistrationFormModule('registrationFormContainer');
        this.registrationForm.onBack = () => this.showView('search');
        this.registrationForm.onSubmit = (data) => this.handleGeneratePDF(data);
    }

    handleSearch(data) {
        console.log('Buscando información para:', data.document);
        
        // Simular consulta a API
        setTimeout(() => {
            // Datos simulados de respuesta
            this.userData = {
                nombres: 'Juan Carlos',
                apellidos: 'Pérez González',
                cui: data.document,
                telefono: '50231234567',
                correo: 'juan.perez@example.com',
                sexo: 'hombre',
                direccion: 'Ciudad de Guatemala, Zona 1',
                fechaNacimiento: '1990-05-15',
                turno: 'extra-ordinario'
            };

            // Navegar a la vista de registro con los datos
            this.showView('registration');
            this.registrationForm.loadData(this.userData);

        }, 500);
    }

    handleGeneratePDF(data) {
        console.log('Generando PDF con datos:', data);
        
        // Generar QR con los datos
        const qrData = JSON.stringify({
            nombre: `${data.nombres} ${data.apellidos}`,
            cui: data.cui,
            turno: data.turno,
            fecha: new Date().toLocaleDateString()
        });

        this.qrPreview.generateQR(qrData);

        // Mostrar vista de búsqueda con el QR
        this.showView('search');

        // Scroll al QR
        setTimeout(() => {
            document.getElementById('qrPreviewContainer').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }, 300);

        // Simular generación de PDF
        setTimeout(() => {
            alert('¡Comprobante generado exitosamente!\nPuedes descargarlo usando los botones.');
        }, 1000);
    }

    showView(viewName) {
        // Ocultar todas las vistas
        document.querySelectorAll('.view').forEach(view => {
            view.classList.remove('active');
        });

        // Mostrar la vista seleccionada
        const viewMap = {
            'search': 'searchView',
            'registration': 'registrationView'
        };

        const viewId = viewMap[viewName];
        if (viewId) {
            document.getElementById(viewId).classList.add('active');
            this.currentView = viewName;
        }

        // Scroll al inicio
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Método público para navegar
    navigate(viewName) {
        this.showView(viewName);
    }
}

// Exportar
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AppRouter;
}