import { generarPDF } from "../utils/pdfGenerator.js";
import { generarQR } from "../utils/qrGenerator.js";
import { guardarDevoto } from "../utils/api.js";

document.getElementById("btnGenerar").addEventListener("click", async () => {

  const datos = {
    nombres: nombres.value,
    apellidos: apellidos.value,
    cui: cui.value,
    correo: correo.value,
    telefono: telefono.value,
    direccion: direccion.value,
    password: Math.random().toString(36).slice(-8)
  };

  await guardarDevoto(datos);

  generarQR(datos);
  generarPDF(datos);
});
