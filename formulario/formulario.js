   const { jsPDF } = window.jspdf;
    const API_URL = "https://api.websoledad.org/api";

    const step1=document.getElementById('step1'), step2=document.getElementById('step2');
    const consultBtn=document.getElementById('consultBtn'), backBtn=document.getElementById('backBtn');
    const cuiInput=document.getElementById('cuiInput'), noGuate=document.getElementById('noGuate');
    const devotoForm=document.getElementById('devotoForm');
    const nombresEl=document.getElementById('nombres'), apellidosEl=document.getElementById('apellidos'),
          cuiForm=document.getElementById('cuiForm'), telefonoEl=document.getElementById('telefono'),
          correoEl=document.getElementById('correo'), direccionEl=document.getElementById('direccion'),
          fnEl=document.getElementById('fn'), notaEl=document.getElementById('nota');
    const previewQr=document.getElementById('previewQr'), previewText=document.getElementById('previewText'), downloadQrBtn=document.getElementById('downloadQrBtn');
    const tdCui=document.getElementById('tdCui'), tdNombres=document.getElementById('tdNombres'), tdApellidos=document.getElementById('tdApellidos'),
          tdFn=document.getElementById('tdFn'), tdTel=document.getElementById('tdTel'), tdCorreo=document.getElementById('tdCorreo'), tdDir=document.getElementById('tdDir'),
          tdNota=document.getElementById('tdNota');
    const cuiGrande=document.getElementById('cuiGrande'), qrComprobante=document.getElementById('qrComprobante'),
          contraseñaPdf=document.getElementById('contraseñaPdf'), fechaComprobante=document.getElementById('fechaComprobante'),
          comprobanteContainer=document.getElementById('comprobanteContainer');

    function onlyDigits(s){return s.replace(/\D/g,'');}
    function randomPassword(len=6){const c='ABCDEFGHJKMNPQRSTUVWXYZ23456789';let o='';for(let i=0;i<len;i++)o+=c.charAt(Math.floor(Math.random()*c.length));return o;}

    // Paso 1: consultar CUI
    consultBtn.addEventListener('click', async ()=>{
      const cui=onlyDigits(cuiInput.value).trim();
      if(!cui){alert('Ingrese su número de CUI/DPI.'); return;}
      if(!noGuate.checked && cui.length !== 13){alert('El CUI debe tener 13 dígitos.'); return;}
      cuiForm.value=cui;

      try {
        const res = await fetch(`${API_URL}/devotos/${cui}`);
        if(!res.ok) throw new Error();
        const data = await res.json();
        nombresEl.value = data.nombres || '';
        apellidosEl.value = data.apellidos || '';
        telefonoEl.value = data.telefono || '';
        correoEl.value = data.correo || '';
        direccionEl.value = data.direccion || '';
        fnEl.value = data.fn || '';
        notaEl.value = data.nota || '';
        if(data.sexo) document.querySelector(`input[name="sexo"][value="${data.sexo}"]`)?.click();
        alert('Información encontrada.');
      } catch {
        alert('No se encontró información, puede registrarse.');
      }

      step1.classList.remove('visible'); step1.classList.add('form-section');
      step2.classList.add('visible'); step2.classList.remove('form-section');
    });

    // Botón volver
    backBtn.addEventListener('click',()=>{
      step2.classList.remove('visible'); step2.classList.add('form-section');
      step1.classList.add('visible'); step1.classList.remove('form-section');
    });

    // Generar comprobante
  devotoForm.addEventListener('submit', async e=>{
  e.preventDefault();
  const data = {
    cui: onlyDigits(cuiForm.value),
    nombres: nombresEl.value.trim(),
    apellidos: apellidosEl.value.trim(),
    telefono: telefonoEl.value.trim(),
    correo: correoEl.value.trim(),
    direccion: direccionEl.value.trim(),
    fn: fnEl.value,
    nota: notaEl.value.trim(),
    sexo: (document.querySelector('input[name="sexo"]:checked')||{}).value||''
  };

  if(!data.nombres||!data.apellidos||!data.cui||!data.correo){
    alert('Complete los campos obligatorios.');
    return;
  }

  // Guardar en backend
  try {
    const res = await fetch(`${API_URL}/devotos`, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(data)
    });
    const r = await res.json();
    alert(r.message || "Registro guardado.");
  } catch {
    alert('Error al guardar en la base de datos.');
  }

  // Mostrar datos en comprobante
  tdCui.textContent = data.cui;
  tdNombres.textContent = data.nombres;
  tdApellidos.textContent = data.apellidos;
  tdFn.textContent = data.fn || '-';
  tdTel.textContent = data.telefono || '-';
  tdCorreo.textContent = data.correo || '-';
  tdDir.textContent = data.direccion || '-';
  tdNota.textContent = data.nota || '-';
  cuiGrande.textContent = data.cui;
  fechaComprobante.textContent = new Date().toLocaleDateString();

  // Generar contraseña y QR
  const pass = randomPassword(6);
  contraseñaPdf.textContent = pass;

  const qrContent = [
    `CUI: ${data.cui}`,
    `Nombres: ${data.nombres}`,
    `Apellidos: ${data.apellidos}`,
    `Correo: ${data.correo}`,
    `Teléfono: ${data.telefono||'-'}`,
    `Dirección: ${data.direccion||'-'}`,
    `Sexo: ${data.sexo||'-'}`,
    `Turno: ${data.nota||'-'}`,
    `Contraseña: ${pass}`
  ].join('\n');

  try {
    const dataUrl = await QRCode.toDataURL(qrContent,{width:400,margin:1});
    qrComprobante.src = dataUrl;
    previewQr.src = dataUrl;
    previewText.textContent = qrContent;
  } catch(err){
    alert('Error generando QR');
    return;
  }

  comprobanteContainer.style.display = 'block';

  // Generar PDF y enviarlo por correo
  try {
    const el = document.getElementById('comprobante');
    const canvas = await html2canvas(el,{scale:2,useCORS:true});
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF({unit:'mm', format:'a4'});
    const pdfW = pdf.internal.pageSize.getWidth();
    const pdfH = pdf.internal.pageSize.getHeight();
    const imgProps = pdf.getImageProperties(imgData);

    let imgWidth = pdfW;
    let imgHeight = (imgProps.height * imgWidth) / imgProps.width;
    if(imgHeight > pdfH){
      const scale = pdfH / imgHeight;
      imgWidth *= scale;
      imgHeight *= scale;
    }

    pdf.addImage(imgData,'PNG',0,0,imgWidth,imgHeight);
    pdf.save(`comprobanteDevoto_${data.cui}.pdf`);


const pdfBase64 = pdf.output("datauristring");

await fetch("https://api.websoledad.org/api/enviar-comprobante", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    correo: data.correo,
    nombres: data.nombres,
    apellidos: data.apellidos,
    cui: data.cui,
    turno: data.nota,
    pdfBase64: pdfBase64
  })
});

alert("📧 Correo enviado correctamente con el comprobante adjunto.");


  } catch(err) {
    console.error("Error PDF:", err);
    alert("⚠️ Error al generar el PDF.");
  }
});
