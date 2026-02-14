import QRCode from "https://cdn.jsdelivr.net/npm/qrcode@1.5.1/build/qrcode.min.js";

export function generarQR(data) {
  const canvas = document.getElementById("qrCanvas");
  QRCode.toCanvas(canvas, JSON.stringify(data), {
    width: 200
  });
}
