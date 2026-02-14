export class FormModule {

    constructor(){
        this.element = document.createElement("section");
        this.element.className = "card form-card";
        this.build();
    }

    build(){

        // TITULO
        const title = document.createElement("h2");
        title.textContent = "CONFIRMACIÓN DE INFORMACIÓN DE DEVOTO";

        // INSTRUCCIONES
        const instructions = document.createElement("p");
        instructions.className = "instructions";
        instructions.textContent =
        "Ingrese los 13 dígitos de su número de DPI o CUI y haga clic en CONSULTAR INFORMACIÓN.";

        // CHECKBOX
        const checkboxContainer = document.createElement("label");
        checkboxContainer.className = "checkbox";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        const checkText = document.createElement("span");
        checkText.textContent = "No soy de Guatemala";

        checkboxContainer.append(checkbox, checkText);

        // LABEL
        const label = document.createElement("label");
        label.className = "field-label";
        label.textContent = "Documento de Identificación *";

        // INPUT
        this.input = document.createElement("input");
        this.input.type = "text";
        this.input.maxLength = 13;
        this.input.placeholder = "Ej: 3059567870301";
        this.input.className = "text-input";

        // TEXTO AYUDA
        const help = document.createElement("span");
        help.className = "help-text";
        help.textContent = "Los campos con * son obligatorios.";

        // BOTON
        this.btn = document.createElement("button");
        this.btn.textContent = "CONSULTAR INFORMACIÓN";
        this.btn.className = "btn-primary big";
        this.btn.style.display = "block";
        this.btn.style.marginLeft = "auto";


        this.element.append(
            title,
            instructions,
            checkboxContainer,
            label,
            this.input,
            help,
            this.btn
        );
    }
}
import { consultarDevoto } from "../utils/api.js";

document.getElementById("btnConsultar").addEventListener("click", async () => {
  const cui = document.getElementById("cuiInput").value;

  if (cui.length !== 13) {
    alert("CUI inválido");
    return;
  }

  try {
    const data = await consultarDevoto(cui);

    // Redirige al formulario y llena datos
    localStorage.setItem("devotoData", JSON.stringify(data));
    window.location.href = "formulario.html";

  } catch (error) {
    alert("No se encontró el devoto");
  }
});
