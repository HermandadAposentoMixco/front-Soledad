// FormModule.js
class FormModule {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.isNotGuatemalan = false;
        this.documentValue = '';
        this.init();
    }

    init() {
        this.render();
        this.attachEventListeners();
    }

    render() {
        this.container.innerHTML = `
            <div class="form-container">
                <h1 class="form-title">CONFIRMACIÓN DE INFORMACIÓN DE DEVOTO</h1>
                
                <div class="instructions-section">
                    <h2 class="instructions-title">Instrucciones</h2>
                    <p class="instruction-text">
                        • Ingrese los 13 dígitos de su número de DPI o CUI y haga clic en <strong>CONSULTAR INFORMACIÓN</strong>.
                    </p>
                </div>

                <div class="checkbox-container">
                    <div class="custom-checkbox" id="notGuatemalaCheckbox"></div>
                    <label class="checkbox-label" for="notGuatemalaCheckbox">
                        No soy de Guatemala
                    </label>
                </div>

                <div class="form-group">
                    <label class="form-label" for="documentInput">
                        Documento de Identificación <span class="required">*</span>
                    </label>
                    <input 
                        type="text" 
                        id="documentInput" 
                        class="form-input" 
                        placeholder="Ej: 3059567870301"
                        maxlength="13"
                    >
                </div>

                <div class="form-footer">
                    <p class="required-note">Los campos con * son obligatorios.</p>
                    <button class="submit-button" id="submitButton">
                        CONSULTAR INFORMACIÓN
                    </button>
                </div>
            </div>
        `;
    }

    attachEventListeners() {
        const checkbox = document.getElementById('notGuatemalaCheckbox');
        const checkboxLabel = document.querySelector('.checkbox-label');
        const input = document.getElementById('documentInput');
        const submitButton = document.getElementById('submitButton');

        // Checkbox toggle
        checkbox.addEventListener('click', () => this.toggleCheckbox());
        checkboxLabel.addEventListener('click', () => this.toggleCheckbox());

        // Input validation
        input.addEventListener('input', (e) => this.handleInputChange(e));

        // Submit
        submitButton.addEventListener('click', () => this.handleSubmit());

        // Enter key
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSubmit();
            }
        });
    }

    toggleCheckbox() {
        this.isNotGuatemalan = !this.isNotGuatemalan;
        const checkbox = document.getElementById('notGuatemalaCheckbox');
        const input = document.getElementById('documentInput');

        if (this.isNotGuatemalan) {
            checkbox.classList.add('checked');
            input.removeAttribute('maxlength');
            input.placeholder = 'Ingrese su documento de identificación';
        } else {
            checkbox.classList.remove('checked');
            input.setAttribute('maxlength', '13');
            input.placeholder = 'Ej: 3059567870301';
        }
    }

    handleInputChange(e) {
        const input = e.target;
        
        if (!this.isNotGuatemalan) {
            // Solo números para DPI/CUI
            input.value = input.value.replace(/[^0-9]/g, '');
        }
        
        this.documentValue = input.value;
    }

    validateForm() {
        if (!this.documentValue.trim()) {
            alert('Por favor, ingrese su documento de identificación.');
            return false;
        }

        if (!this.isNotGuatemalan && this.documentValue.length !== 13) {
            alert('El DPI/CUI debe tener exactamente 13 dígitos.');
            return false;
        }

        return true;
    }

    handleSubmit() {
        if (!this.validateForm()) {
            return;
        }

        console.log('Consultando información...');
        console.log('Es extranjero:', this.isNotGuatemalan);
        console.log('Documento:', this.documentValue);

        // Aquí puedes agregar la lógica para enviar los datos
        this.onSubmit({
            isNotGuatemalan: this.isNotGuatemalan,
            document: this.documentValue
        });
    }

    // Método que puedes sobrescribir o pasar como callback
    onSubmit(data) {
        alert(`Consultando documento: ${data.document}`);
        // Implementa tu lógica de envío aquí
    }
}

// Exportar el módulo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FormModule;
}