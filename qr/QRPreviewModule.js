export class QRPreviewModule {

    constructor(){
        this.element = document.createElement("section");
        this.element.className = "card qr-card";
        this.build();
    }

    build(){

        const title = document.createElement("h3");
        title.textContent = "Vista previa / QR";

        // MARCO
        this.qrFrame = document.createElement("div");
        this.qrFrame.className = "qr-frame";

        this.qrCanvas = document.createElement("div");
        this.qrCanvas.className = "qr-canvas";

        this.qrFrame.append(this.qrCanvas);

        // TEXTO INFO
        const info = document.createElement("p");
        info.className = "qr-info";
        info.textContent =
        "Aquí se mostrará el contenido del QR cuando generes el comprobante.";

        // BOTONES
        const actions = document.createElement("div");
        actions.className = "qr-actions";

        const btnQR = document.createElement("button");
        btnQR.textContent = "Descargar QR";
        btnQR.className = "btn-secondary";

        const btnPDF = document.createElement("button");
        btnPDF.textContent = "Descargar PDF";
        btnPDF.className = "btn-primary";

        actions.append(btnQR, btnPDF);

        this.element.append(title, this.qrFrame, info, actions);
    }
}
