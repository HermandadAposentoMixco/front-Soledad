export const API_URL = "https://api.websoledad.org";

export async function consultarDevoto(cui) {
  const response = await fetch(`${API_URL}/devoto/${cui}`);
  if (!response.ok) throw new Error("No encontrado");
  return await response.json();
}

export async function guardarDevoto(data) {
  const response = await fetch(`${API_URL}/devoto`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  return await response.json();
}
