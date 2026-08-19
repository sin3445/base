const api = 'http://localhost:3000';

async function testPost() {
  console.log("Testing POST /clientes...");
  try {
    const res = await fetch(`${api}/clientes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: 'Test Client 2',
        telefono: '123123',
        usuarioId: 1 // We know user 1 exists from previous test
      })
    });
    
    const text = await res.text();
    console.log("Status:", res.status);
    console.log("Response:", text);
    
    console.log("\nTesting POST /clientes with invalid user ID...");
    const res2 = await fetch(`${api}/clientes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: 'Test Client 3',
        telefono: '123123',
        usuarioId: 9999 // This should trigger a FK error
      })
    });
    const text2 = await res2.text();
    console.log("Status:", res2.status);
    console.log("Response:", text2);
    
  } catch(e) {
    console.error("Error:", e);
  }
}

testPost();
