import { FormModule } from "../formulario/FormModule.js";
import { QRPreviewModule } from "../registro/RegistrationFormModule.js";

export class AppRouter {

    constructor(root){
        this.root = root;
    }

    loadFormulario(){

        this.root.innerHTML = "";

        const page = document.createElement("div");
        page.className = "page";

        const header = this.createHeader();
        const content = document.createElement("div");
        content.className = "content";

        this.formModule = new FormModule();
        this.qrModule = new QRPreviewModule();

        content.append(
            this.formModule.element,
            this.qrModule.element
        );

        page.append(header, content);
        this.root.append(page);
    }

    createHeader(){
        const header = document.createElement("header");
        header.className = "header";

        const logo = document.createElement("img");
        logo.src = "./assets/escudoSoledad.png";

        const titleBox = document.createElement("div");

        const title = document.createElement("h1");
        title.textContent = "Plataforma - Confirmación de información de devoto";

        const subtitle = document.createElement("span");
        subtitle.textContent = "Sistema de actualización / comprobante con QR";

        titleBox.append(title, subtitle);
        header.append(logo, titleBox);

        return header;
    }
}
