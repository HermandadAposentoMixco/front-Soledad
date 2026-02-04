// QRPreviewModule.js
class QRPreviewModule {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.qrData = null;
        this.pdfData = null;
        this.init();
    }

    init() {
        this.render();
        this.attachEventListeners();
    }

    render() {
        this.container.innerHTML = `
            <div class="qr-preview-container">
                <h1 class="qr-title">Vista previa / QR</h1>
                
                <div class="qr-display-area" id="qrDisplayArea">
                    <div class="qr-placeholder" id="qrPlaceholder">
                        <svg class="qr-placeholder-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M14 2V8H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M16 13H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M16 17H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M10 9H9H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div class="loading-spinner" id="loadingSpinner"></div>
                    <img class="qr-image" id="qrImage" alt="QR Code Preview">
                </div>

                <p class="qr-info-text">
                    Aquí se mostrará el contenido del QR cuando generes el comprobante.
                </p>

                <div class="qr-buttons-container">
                    <button class="qr-button gray" id="downloadQrButton">
                        Descargar QR
                    </button>
                    <button class="qr-button yellow" id="downloadPdfButton">
                        Descargar PDF
                    </button>
                </div>
            </div>
        `;
    }

    attachEventListeners() {
        const downloadQrButton = document.getElementById('downloadQrButton');
        const downloadPdfButton = document.getElementById('downloadPdfButton');

        downloadQrButton.addEventListener('click', () => this.downloadQR());
        downloadPdfButton.addEventListener('click', () => this.downloadPDF());
    }

    // Mostrar loading
    showLoading() {
        const placeholder = document.getElementById('qrPlaceholder');
        const spinner = document.getElementById('loadingSpinner');
        const image = document.getElementById('qrImage');

        placeholder.style.display = 'none';
        spinner.classList.add('active');
        image.classList.remove('active');
    }

    // Ocultar loading
    hideLoading() {
        const spinner = document.getElementById('loadingSpinner');
        spinner.classList.remove('active');
    }

    // Cargar imagen QR
    loadQRImage(imageUrl) {
        this.showLoading();

        const image = document.getElementById('qrImage');
        const placeholder = document.getElementById('qrPlaceholder');

        image.onload = () => {
            this.hideLoading();
            placeholder.style.display = 'none';
            image.classList.add('active');
        };

        image.onerror = () => {
            this.hideLoading();
            alert('Error al cargar la imagen del QR');
            placeholder.style.display = 'flex';
        };

        image.src = imageUrl;
        this.qrData = imageUrl;
    }

    // Generar QR usando una librería (ejemplo con QRCode.js o API)
    async generateQR(data) {
        this.showLoading();

        try {
            // Opción 1: Usar API de QR
            const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(data)}`;
            this.loadQRImage(qrUrl);

            // Opción 2: Usar librería local (necesitarías incluir qrcode.js)
            /*
            const QRCode = window.QRCode;
            const canvas = document.createElement('canvas');
            await QRCode.toCanvas(canvas, data, { width: 400 });
            const imageUrl = canvas.toDataURL('image/png');
            this.loadQRImage(imageUrl);
            */

        } catch (error) {
            this.hideLoading();
            console.error('Error generando QR:', error);
            alert('Error al generar el código QR');
        }
    }

    // Descargar QR
    downloadQR() {
        if (!this.qrData) {
            alert('Primero debes generar un código QR');
            return;
        }

        const image = document.getElementById('qrImage');
        const link = document.createElement('a');
        link.href = image.src;
        link.download = `comprobante-qr-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        console.log('Descargando QR...');
    }

    // Descargar PDF
    async downloadPDF() {
        if (!this.qrData) {
            alert('Primero debes generar un código QR');
            return;
        }

        console.log('Generando PDF...');

        // Aquí integrarías jsPDF o llamarías a tu API
        /*
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        doc.setFontSize(20);
        doc.text('Comprobante de Devoto', 20, 20);
        
        const image = document.getElementById('qrImage');
        doc.addImage(image.src, 'PNG', 15, 40, 180, 180);
        
        doc.save(`comprobante-${Date.now()}.pdf`);
        */

        // Simulación
        alert('Descargando PDF...\n(Integra jsPDF o tu API de generación de PDF)');
    }

    // Método para establecer datos del PDF desde fuera
    setPDFData(pdfBlob) {
        this.pdfData = pdfBlob;
    }

    // Limpiar vista
    clear() {
        const placeholder = document.getElementById('qrPlaceholder');
        const image = document.getElementById('qrImage');

        image.classList.remove('active');
        placeholder.style.display = 'flex';
        this.qrData = null;
        this.pdfData = null;
    }
}

// Exportar el módulo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QRPreviewModule;
}