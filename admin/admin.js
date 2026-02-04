 const API = "https://api.websoledad.org/api";
    const tbody = document.querySelector("tbody");
    const buscar = document.getElementById("buscar");

    async function cargar() {
      const res = await fetch(`${API}/all`);
      const data = await res.json();
      mostrar(data);
    }

    function mostrar(data) {
      tbody.innerHTML = data.map(d => `
        <tr>
          <td data-label="CUI">${d.cui}</td>
          <td data-label="Nombres">${d.nombres}</td>
          <td data-label="Apellidos">${d.apellidos}</td>
          <td data-label="Teléfono">${d.telefono || '-'}</td>
          <td data-label="Correo">${d.correo}</td>
          <td data-label="Dirección">${d.direccion || '-'}</td>
          <td data-label="Turno">${d.nota || '-'}</td>
        </tr>
      `).join('');
    }

    buscar.addEventListener("input", async e => {
      const q = e.target.value.trim();
      const res = await fetch(`${API}/search?q=${q}`);
      const data = await res.json();
      mostrar(data);
    });

    cargar();
  