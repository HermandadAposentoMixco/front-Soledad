// RegistrationFormModule.js
class RegistrationFormModule {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.formData = {
            nombres: '',
            apellidos: '',
            cui: '',
            telefono: '',
            correo: '',
            sexo: 'hombre',
            direccion: '',
            fechaNacimiento: '',
            turno: ''
        };
        this.init();
    }

    init() {
        this.render();
        this.attachEventListeners();
    }

    render() {
        this.container.innerHTML = `
            <div class="registration-container">
                <h1 class="registration-title">Registro / Actualización de Devoto</h1>
                
                <form id="registrationForm">
                    <div class="form-row">
                        <div class="form-field">
                            <label class="field-label">
                                Nombres <span class="required-mark">*</span>
                            </label>
                            <input 
                                type="text" 
                                class="field-input" 
                                id="nombres"
                                name="nombres"
                                required
                            >
                        </div>
                        
                        <div class="form-field">
                            <label class="field-label">
                                Apellidos <span class="required-mark">*</span>
                            </label>
                            <input 
                                type="text" 
                                class="field-input" 
                                id="apellidos"
                                name="apellidos"
                                required
                            >
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-field">
                            <label class="field-label">
                                CUI / DPI <span class="required-mark">*</span>
                            </label>
                            <input 
                                type="text" 
                                class="field-input" 
                                id="cui"
                                name="cui"
                                value="3059567870301"
                                disabled
                            >
                        </div>
                        
                        <div class="form-field">
                            <label class="field-label">Teléfono</label>
                            <input 
                                type="tel" 
                                class="field-input" 
                                id="telefono"
                                name="telefono"
                            >
                        </div>
                    </div>

                    <div class="form-row single">
                        <div class="form-field">
                            <label class="field-label">
                                Correo electrónico <span class="required-mark">*</span>
                            </label>
                            <input 
                                type="email" 
                                class="field-input" 
                                id="correo"
                                name="correo"
                                placeholder="ejemplo@correo.com"
                                required
                            >
                        </div>
                    </div>

                    <div class="radio-group">
                        <label class="radio-label">Sexo</label>
                        
                        <div class="radio-option" data-value="mujer">
                            <div class="custom-radio" id="radioMujer"></div>
                            <span class="radio-text">Mujer</span>
                        </div>
                        
                        <div class="radio-option" data-value="hombre">
                            <div class="custom-radio checked" id="radioHombre"></div>
                            <span class="radio-text">Hombre</span>
                        </div>
                    </div>

                    <div class="form-row single">
                        <div class="form-field">
                            <label class="field-label">Dirección</label>
                            <input 
                                type="text" 
                                class="field-input" 
                                id="direccion"
                                name="direccion"
                                placeholder="Ciudad, Calle, etc."
                            >
                        </div>
                    </div>

                    <div class="form-row single">
                        <div class="form-field">
                            <label class="field-label">Fecha de nacimiento</label>
                            <div class="date-input">
                                <input 
                                    type="date" 
                                    class="field-input" 
                                    id="fechaNacimiento"
                                    name="fechaNacimiento"
                                    placeholder="dd/mm/aaaa"
                                >
                            </div>
                        </div>
                    </div>

                    <div class="form-row single">
                        <div class="form-field">
                            <label class="field-label">
                                Seleccione o confirme el turno que has cargado actualmente
                            </label>
                            <select class="field-select" id="turno" name="turno">
                                <option value="extra-ordinario">Extra Ordinario Caballeros - Santo Entierro</option>
                                <option value="turno-1">Turno 1 - Hermandad del Señor</option>
                                <option value="turno-2">Turno 2 - Cofradía de Jesús</option>
                                <option value="turno-3">Turno 3 - Guardia de Honor</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-actions">
                        <button type="button" class="action-button button-back" id="backButton">
                            Volver
                        </button>
                        <button type="submit" class="action-button button-generate" id="generateButton">
                            Generar comprobante (PDF)
                        </button>
                    </div>
                </form>
            </div>
        `;
    }

    attachEventListeners() {
        const form = document.getElementById('registrationForm');
        const backButton = document.getElementById('backButton');
        const radioOptions = document.querySelectorAll('.radio-option');
        const inputs = form.querySelectorAll('input, select');

        // Radio buttons
        radioOptions.forEach(option => {
            option.addEventListener('click', () => this.handleRadioChange(option));
        });

        // Form inputs
        inputs.forEach(input => {
            input.addEventListener('change', (e) => this.handleInputChange(e));
        });

        // Back button
        backButton.addEventListener('click', () => this.handleBack());

        // Form submit
        form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    handleRadioChange(selectedOption) {
        const value = selectedOption.dataset.value;
        const allRadios = document.querySelectorAll('.custom-radio');
        
        allRadios.forEach(radio => radio.classList.remove('checked'));
        selectedOption.querySelector('.custom-radio').classList.add('checked');
        
        this.formData.sexo = value;
    }

    handleInputChange(e) {
        const { name, value } = e.target;
        this.formData[name] = value;
    }

    validateForm() {
        const requiredFields = ['nombres', 'apellidos', 'correo'];
        
        for (let field of requiredFields) {
            if (!this.formData[field] || this.formData[field].trim() === '') {
                alert(`El campo ${field} es obligatorio`);
                return false;
            }
        }

        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.formData.correo)) {
            alert('Por favor, ingrese un correo electrónico válido');
            return false;
        }

        return true;
    }

    handleBack() {
        if (confirm('¿Estás seguro que deseas volver? Los cambios no guardados se perderán.')) {
            this.onBack();
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        
        // Actualizar datos del formulario
        const formElement = e.target;
        const formData = new FormData(formElement);
        
        for (let [key, value] of formData.entries()) {
            this.formData[key] = value;
        }

        if (!this.validateForm()) {
            return;
        }

        console.log('Generando comprobante con datos:', this.formData);
        this.onSubmit(this.formData);
    }

    // Métodos que pueden ser sobrescritos
    onBack() {
        console.log('Volver presionado');
        // Implementar navegación
    }

    onSubmit(data) {
        console.log('Formulario enviado:', data);
        alert('Generando comprobante PDF...');
        // Implementar generación de PDF
    }

    // Método para pre-cargar datos
    loadData(data) {
        this.formData = { ...this.formData, ...data };
        
        // Actualizar inputs
        Object.keys(data).forEach(key => {
            const input = document.getElementById(key);
            if (input) {
                input.value = data[key];
            }
        });

        // Actualizar radio
        if (data.sexo) {
            const radioOption = document.querySelector(`[data-value="${data.sexo}"]`);
            if (radioOption) {
                this.handleRadioChange(radioOption);
            }
        }
    }

    // Método para obtener datos actuales
    getData() {
        return { ...this.formData };
    }
}

// Exportar el módulo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RegistrationFormModule;
}