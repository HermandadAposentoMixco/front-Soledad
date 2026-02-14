export class QRPreviewModule {

    constructor(){
        this.element = document.createElement("section");
        this.element.className = "card qr";

        this.build();
    }

    build(){

        const title = document.createElement("h3");
        title.textContent = "Vista previa / QR";

        this.qrBox = document.createElement("div");
        this.qrBox.className = "qr-box";

        const btnGroup = document.createElement("div");
        btnGroup.className = "btn-group";

        const qrBtn = document.createElement("button");
        qrBtn.textContent = "Descargar QR";
        qrBtn.className = "btn-secondary";

        const pdfBtn = document.createElement("button");
        pdfBtn.textContent = "Descargar PDF";
        pdfBtn.className = "btn-primary";

        btnGroup.append(qrBtn, pdfBtn);

        this.element.append(title, this.qrBox, btnGroup);
    }
}
