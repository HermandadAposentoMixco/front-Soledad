import { jsPDF } from "https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.es.min.js";

export function generarPDF(datos) {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Comprobante de Registro", 20, 20);

  doc.setFontSize(12);
  doc.text(`Nombre: ${datos.nombres} ${datos.apellidos}`, 20, 40);
  doc.text(`CUI: ${datos.cui}`, 20, 50);
  doc.text(`Correo: ${datos.correo}`, 20, 60);

  doc.text(`Código de acceso: ${datos.password}`, 20, 80);

  doc.save("comprobante-soledad.pdf");
}
